import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import lngChat from '@/Lang/Chat/translation';
import { router } from '@inertiajs/react';

export default function FloatingDentalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Функция плавной прокрутки вниз
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const currentDay = new Date().getDay();
  const dayBackgrounds = [
    'chat-bg-sun', // Неділя
    'chat-bg-mon', // Понеділок
    'chat-bg-tue', // Вівторок
    'chat-bg-wed', // Середа
    'chat-bg-thu', // Четвер
    'chat-bg-fri', // П'ятниця
    'chat-bg-sat', // Субота
  ];
  const dynamicDayBg = dayBackgrounds[currentDay];

  const appLang = useSelector(appLangSelector);
  const msg = new Lang({
    messages: lngChat,
    locale: appLang,
  });

  // Загружаем список диалогов
  useEffect(() => {
    const fetchConversations = () => {
      fetch('/chatify/v1/conversations', {
        headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            setConversations(data.data);
            const totalUnread = data.data.reduce(
              (acc: number, curr: any) => acc + (curr.unread_count || 0),
              0
            );
            setUnreadCount(totalUnread);
          }
        })
        .catch((err) => console.error('Помилка завантаження чатів:', err));
    };

    fetchConversations();
    const interval = setInterval(fetchConversations, 30000);
    return () => clearInterval(interval);
  }, []);

  // При клике на конкретный диалог
  const handleSelectConversation = (conv: any) => {
    setActiveConversation(conv);

    if (!conv.id) {
      setMessages([]);
      return;
    }

    // 1. Отмечаем прочитанными на бэке
    (window as any).axios
      .post(`/chatify/v1/read/${conv.id}`)
      .catch((err: any) => console.error('Помилка прочтення:', err));

    // 2. Сбрасываем счетчик в списке диалогов и сразу пересчитываем общий бейдж `unreadCount`
    setConversations((prev: any) => {
      const updated = prev.map((c: any) => (c.id === conv.id ? { ...c, unread_count: 0 } : c));
      const totalUnread = updated.reduce(
        (acc: number, curr: any) => acc + (curr.unread_count || 0),
        0
      );
      setUnreadCount(totalUnread);
      return updated;
    });

    // 3. Загружаем сообщения чата и скролим вниз
    fetch(`/chatify/v1/messages/${conv.id}`, {
      headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setMessages(data.data);
          setTimeout(() => scrollToBottom('auto'), 50); // Мгновенный скролл при открытии
        }
      });
  };

  // Polling для активного чата каждые 3 секунды (ОБНОВЛЕННЫЙ: без дерганья скролла вверх)
  useEffect(() => {
    if (!activeConversation || !activeConversation.id) return;

    const interval = setInterval(() => {
      fetch(`/chatify/v1/messages/${activeConversation.id}`, {
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 'success') {
            setMessages((prevMessages) => {
              // Обновляем сообщения только если количество изменилось (пришло новое)
              if (data.data.length !== prevMessages.length) {
                setTimeout(() => scrollToBottom('smooth'), 50);
                return data.data;
              }
              return prevMessages;
            });
          }
        })
        .catch((err) => console.error('Помилка оновлення повідомлень:', err));
    }, 3000);

    return () => clearInterval(interval);
  }, [activeConversation]);

  const handleSend = (e: any) => {
    e.preventDefault();
    if (!newMessage.trim() && !attachment) return;
    if (!activeConversation) return;

    const chatMsg = {
      id: Date.now(),
      body: newMessage,
      attachment_name: attachment ? attachment.name : null,
      sender: 'me',
      time: msg.get('chat.now'),
    };

    setMessages((prev: any) => [...prev, chatMsg]);
    setTimeout(() => scrollToBottom('smooth'), 50);

    const formData = new FormData();
    formData.append('conversation_id', activeConversation.id);
    formData.append('recipient_id', activeConversation.peer?.id || '');
    formData.append('body', newMessage || '');
    formData.append('kind', 'user');

    if (attachment) {
      formData.append('attachment', attachment);
    }

    router.post('/chat/update', formData, {
      preserveScroll: true,
      onSuccess: () => {
        setNewMessage('');
        setAttachment(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Подтягиваем свежие сообщения после отправки
        if (activeConversation && activeConversation.id) {
          fetch(`/chatify/v1/messages/${activeConversation.id}`, {
            headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 'success') {
                setMessages(data.data);
                setTimeout(() => scrollToBottom('smooth'), 50);
              }
            });
        }

        // Обновляем список диалогов
        fetch('/chatify/v1/conversations', {
          headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 'success') {
              setConversations(data.data);
            }
          });
      },
      onError: (errors) => {
        console.error('Помилка валідації:', errors);
      },
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all transform animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Шапка віджета */}
          <div className="bg-gradient-to-r from-orange-200 to-orange-300 px-2 py-2.5 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2.5">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm tracking-wide text-black">
                DentalCare Chat
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {!activeConversation ? (
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50 bg-gray-100">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {msg.get('chat.title') || 'Діалоги'}
              </div>
              {conversations.length === 0 ? (
                <div className="text-center text-gray-400 text-xs mt-24">
                  Немає активних діалогів
                </div>
              ) : (
                conversations.map((conv: any) => (
                  <div
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv)}
                    className="p-2 flex items-center space-x-3 hover:bg-white cursor-pointer transition border-l-4 border-transparent hover:border-orange-500 relative"
                  >
                    <div
                      className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm shadow-inner bg-cover bg-no-repeat flex-shrink-0"
                      style={{
                        backgroundImage: `url(${conv.peer?.avatar ? `/storage/users/${conv.peer.avatar}` : '/images/no-photo.png'})`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800 text-sm truncate min-w-[200px]">
                          {conv.peer
                            ? `${conv.peer.first_name} ${conv.peer.last_name}`
                            : 'Співрозмовник'}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {conv.last_time ? conv.last_time.substring(11, 16) : ''}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{conv.last_message}</p>
                    </div>
                    {conv.unread_count > 0 && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {conv.unread_count}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className={`flex-1 flex flex-col bg-white chat-window ${dynamicDayBg}`}>
              {/* Підшапка з кнопкою назад */}
              <div className="px-3 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center space-x-2">
                <button
                  onClick={() => setActiveConversation(null)}
                  className="text-gray-500 hover:text-gray-800 text-xs font-medium px-2 py-1 rounded hover:bg-gray-200/60 transition"
                >
                  ← Назад
                </button>
                <div className="text-xs font-semibold text-gray-700 truncate flex items-center min-w-[200px] min-h-[45px]">
                  <div className="inline-block flex ml-1">
                    <div
                      style={{
                        backgroundImage: `url(${activeConversation.peer?.avatar ? `/storage/users/${activeConversation.peer.avatar}` : '/images/no-photo.png'})`,
                      }}
                      className={`chat-avatar`}
                    />
                    <div className="chat-name">
                      {activeConversation.peer
                        ? `${activeConversation.peer.first_name} ${activeConversation.peer.last_name}`
                        : 'Чат'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Список повідомлень */}
              <div ref={containerRef} className={`chat-messages-container`}>
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 text-xs mt-24">
                    {msg.get('chat.empty_message') || 'Напишіть перше повідомлення...'}
                  </div>
                ) : (
                  messages.map((m: any) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`text-xs px-3.5 py-2 rounded-2xl shadow-sm max-w-[80%] leading-relaxed ${
                          m.sender === 'me'
                            ? 'bg-[#fdc88f] text-[#c2410c] rounded-tr-none'
                            : 'bg-[#f0fdfa] text-[#187b73] border border-gray-100 rounded-tl-none'
                        }`}
                      >
                        {m.body}
                        {m.attachment && (
                          <div className="mt-1 pt-1 border-t border-white/20 text-[10px] flex items-center gap-1 opacity-90">
                            📎 <span>{m.attachment.name || 'Файл'}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-0.5 mx-1">{m.time}</span>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Панель выбранного файла */}
              {attachment && (
                <div className="px-3 py-1.5 bg-orange-50 border-t border-orange-100 flex items-center justify-between text-xs text-orange-800">
                  <span className="truncate max-w-[280px]">📎 {attachment.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAttachment(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="text-orange-600 font-bold hover:text-orange-900 ml-2"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Інпут введення та отправки */}
              <form
                onSubmit={handleSend}
                className="p-2.5 bg-white border-t border-gray-100 flex items-center gap-2"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAttachment(e.target.files[0]);
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-1.5 rounded-xl transition ${
                    attachment
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Прикріпити файл"
                >
                  📎
                </button>

                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={msg.get('chat.tip_message') || 'Повідомлення...'}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-orange-500 focus:bg-white transition"
                />

                <button
                  type="submit"
                  className="bg-orange-700 hover:bg-orange-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-medium transition shadow-sm"
                >
                  ➤
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Плаваюча кнопка-тригер */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-gradient-to-tr from-orange-400 to-orange-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none group"
      >
        <svg
          className="w-6 h-6 transition-transform group-hover:rotate-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
