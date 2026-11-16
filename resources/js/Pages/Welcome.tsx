import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Lang from 'lang.js';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import lngHeader from '../Lang/Header/translation';
import React from 'react';
import {
  IconClock,
  IconUsers,
  IconCalendar,
  IconWallet,
  IconDental,
  IconPackage,
  IconChartBar,
  IconDeviceLaptop,
  IconShield,
  IconBolt,
  IconCloud,
  IconShieldLock,
} from '@tabler/icons-react';

export default function Welcome({ auth }: { auth: any }) {
  const appLang = useSelector(appLangSelector);
  const lng = new Lang({
    messages: lngHeader,
    locale: appLang,
  });
  const handleImageError = () => {
    document.getElementById('screenshot-container')?.classList.add('!hidden');
    document.getElementById('docs-card')?.classList.add('!row-span-1');
    document.getElementById('docs-card-content')?.classList.add('!flex-row');
    document.getElementById('background')?.classList.add('!hidden');
  };

  const features = [
    {
      title: 'Розклад',
      subtitle: 'Онлайн',
      icon: <IconCalendar color={'#f87f13'} />,
      description: 'Управління записями та розкладом лікарів',
      className: 'b1',
    },
    {
      title: 'Пацієнти',
      subtitle: 'CRM',
      icon: <IconUsers color={'#14b8a6'} />,
      description: 'Повна історія лікування та аналізи',
      className: 'b2',
    },
    {
      title: 'Лікування',
      subtitle: 'Плани',
      icon: <IconDental color={'#14b8a6'} />,
      description: 'Створення планів лікування та історія',
      className: 'b2',
    },
    {
      title: 'Фінанси',
      subtitle: 'Оплати',
      icon: <IconWallet color={'#f87f13'} />,
      description: 'Облік платежів та розрахунки',
      className: 'b1',
    },
    {
      title: 'Матеріали',
      subtitle: 'Склад',
      icon: <IconPackage color={'#f87f13'} />,
      description: 'Надходження, витрати, переміщення матеріалів',
      className: 'b1',
    },
    {
      title: 'Аналітика',
      subtitle: 'Звіти',
      icon: <IconChartBar color={'#14b8a6'} />,
      description: 'Детальні звіти для прийняття рішень',
      className: 'b2',
    },
  ];

  const benefits = [
    {
      title: 'Безпека даних',
      description: 'Захищене зберігання медичної інформації',
      icon: <IconShieldLock />,
    },
    {
      title: 'Економія часу',
      description: 'Менше рутинних задач для адміністраторів',
      icon: <IconClock />,
    },
    {
      title: 'Доступ 24/7',
      description: 'Працюйте з будь-якого пристрою',
      icon: <IconDeviceLaptop />,
    },
    {
      title: 'Автоматизація',
      description: 'Система бере рутину на себе',
      icon: <IconBolt />,
    },
    {
      title: 'Контроль фінансів',
      description: 'Доходи, витрати та аналітика в одному місці',
      icon: <IconWallet />,
    },
    {
      title: 'Хмарне зберігання',
      description: 'Автоматичні резервні копії та доступність',
      icon: <IconCloud />,
    },
  ];
  const testimonials = [
    {
      text: 'Раніше адміністратори працювали в Excel. Зараз весь розклад автоматизований і більше немає накладок між лікарями.',
      initials: 'ОК',
      name: 'Олена Коваль',
      clinic: 'Smile Dental · Львів',
    },
    {
      text: 'Ми керуємо кількома філіями. Вперше бачимо пацієнтів, фінанси та роботу лікарів в одній системі.',
      initials: 'АП',
      name: 'Андрій Петренко',
      clinic: 'Nova Clinic · Київ',
    },
    {
      text: 'Наші лікарі працюють у різних філіях. Розклад більше не конфліктує і адміністратори економлять години щодня.',
      initials: 'ІС',
      name: 'Ірина Савчук',
      clinic: 'Dental Plus · Одеса',
    },
  ];

  useEffect(() => {
    if (auth.user) {
      console.log(auth.user);
      // if (auth.user.filial_id) location.href = '/dashboard';
      // else location.href = '/dashboard-select';
    }
  }, [auth.user]);

  return (
    <>
      <Head title="Welcome" />
      {/* <Header auth={auth} /> */}
      <div className="body-main">
        {/* <!-- Top nav --> */}
        <Header auth={auth} />
        {/* <!-- Container --> */}
        <div className="md:w-full mx-auto relative z-10 mt-[75px]">
          <div className="relative teaser-container">
            <div className="w-white-teaser">
              <div className="hero-badge">⚡ Сучасна система управління стоматологією</div>
              <h1 className="hero-title">
                Управляйте клінікою <br />
                легко та <span>ефективно</span>
              </h1>
              <p className="hero-description">
                <span>DentalCare</span> сучасна CRM система, яка об’єднує пацієнтів, розклад,
                лікування, складський облік, фінанси та звіти в єдиній системі для зростання вашої
                клініки.
              </p>
              <div className="flex gap-4 mt-2">
                <button className="btn-register">Розпочати безкоштовно</button>
                <button className="btn-login">Дізнатися більше</button>
              </div>
            </div>
            <div className="hero-floating-cards">
              <div className="stat-card patients-card">
                <div className="stat-card-header">
                  <div className="stat-icon">
                    <IconUsers size={18} />
                  </div>

                  <span className="stat-card-label">Пацієнтів</span>
                </div>

                <div className="stat-card-value">1,320</div>

                <div className="stat-card-meta positive">+12% за місяць</div>
              </div>
              <div className="stat-card appointments-card">
                <div className="stat-card-header">
                  <div className="stat-icon">
                    <IconCalendar size={18} />
                  </div>

                  <span className="stat-card-label">Сьогодні прийомів</span>
                </div>

                <div className="stat-card-value">12</div>

                <div className="stat-card-meta positive">3 нових пацієнта</div>
              </div>
              <div className="stat-card revenue-card">
                <div className="stat-card-header">
                  <div className="stat-icon">
                    <IconWallet size={18} />
                  </div>

                  <span className="stat-card-label">Дохід за місяць</span>
                </div>

                <div className="stat-card-value">125,320</div>

                <div className="stat-card-meta positive">+23% за місяць</div>
              </div>
            </div>
          </div>
          <section className="modules-section">
            <div className="modules-row">
              {features.map((item, i) => (
                <div className="module-item" key={i}>
                  <div className="module-top">
                    <div className={`module-icon ${item.className}`}>{item.icon}</div>
                    <div className="text-block">
                      <h3>
                        {item.title}
                        <span className={`sub-${item.className}`}>{item.subtitle}</span>
                      </h3>
                      <span className="module-description">{item.description}</span>
                    </div>
                  </div>
                  {/*<div className="module-description">{item.description}</div>*/}
                </div>
              ))}
            </div>
          </section>

          <section className="why-section">
            <div className="why-left">
              <div className="section-badge">ПЕРЕВАГИ СИСТЕМИ</div>

              <h2>
                Чому клініки <br />
                обирають <span>DentalCare</span>
              </h2>

              <p>
                Оптимізуйте щоденні процеси, автоматизуйте рутину та зосередьтесь на розвитку вашої
                клініки.
              </p>
              <p>
                Від першого запису пацієнта до фінансової аналітики — усі ключові процеси об'єднані
                в одній сучасній системі управління.
              </p>

              <div className="tooth-preview">
                {/*<img src="../../images/main-page/t3-removebg-preview.png" alt="" />*/}
              </div>
            </div>

            <div className="why-right">
              <div className="dashboard-preview">
                <img src="../../images/main-page/dashboard.jpeg" alt="" />
              </div>

              <div className="floating-item top-left">
                <div className="benefit-float">
                  <div className="benefit-icon">
                    <IconShield size={32} color={'#f87f13'} />
                  </div>

                  <div className="benefit-content">
                    <h4>Безпека даних</h4>
                    <span>Захищене зберігання медичної інформації</span>
                  </div>
                </div>
              </div>

              <div className="floating-item left-middle">
                <div className="benefit-float">
                  <div className="benefit-icon">
                    <IconDeviceLaptop size={32} color={'#f87f13'} />
                  </div>

                  <div className="benefit-content">
                    <h4>Доступ 24/7</h4>
                    <span>Працюйте з будь-якого пристрою</span>
                  </div>
                </div>
              </div>

              <div className="floating-item left-bottom">
                <div className="benefit-float">
                  <div className="benefit-icon">
                    <IconWallet size={32} color={'#f87f13'} />
                  </div>

                  <div className="benefit-content">
                    <h4>Контроль фінансів</h4>
                    <span>Доходи та витрати в одному місці</span>
                  </div>
                </div>
              </div>

              <div className="floating-item right-middle">
                <div className="benefit-float">
                  <div className="benefit-icon">
                    <IconBolt size={32} color={'#f87f13'} />
                  </div>

                  <div className="benefit-content">
                    <h4>Автоматизація</h4>
                    <span>Система бере рутину на себе</span>
                  </div>
                </div>
              </div>

              <div className="floating-item bottom-center">
                <div className="benefit-float">
                  <div className="benefit-icon">
                    <IconChartBar size={32} />
                  </div>

                  <div className="benefit-content">
                    <h4>Аналітика</h4>
                    <span>Детальні звіти для прийняття рішень</span>
                  </div>
                </div>
              </div>

              <div className="circle-line"></div>
            </div>
          </section>
          <section className="why-section">
            <div className="why-left">
              <div className="dashboard-preview">
                <img src="../../images/main-page/dashboard.jpeg" alt="" />
              </div>

              <div className="floating-item top-left">
                <div className="benefit-float">
                  <div className="benefit-icon">
                    <IconShield size={32} />
                  </div>

                  <div className="benefit-content">
                    <h4>Безпека даних</h4>
                    <span>Захищене зберігання медичної інформації</span>
                  </div>
                </div>
              </div>

              <div className="floating-item left-middle-1">
                <div className="benefit-float">
                  <div className="benefit-icon">
                    <IconDeviceLaptop size={32} />
                  </div>

                  <div className="benefit-content">
                    <h4>Доступ 24/7</h4>
                    <span>Працюйте з будь-якого пристрою</span>
                  </div>
                </div>
              </div>

              <div className="floating-item left-bottom-1">
                <div className="benefit-float">
                  <div className="benefit-icon">
                    <IconWallet size={32} />
                  </div>

                  <div className="benefit-content">
                    <h4>Контроль фінансів</h4>
                    <span>Доходи та витрати в одному місці</span>
                  </div>
                </div>
              </div>

              <div className="floating-item right-middle-1">
                <div className="benefit-float">
                  <div className="benefit-icon">
                    <IconBolt size={32} />
                  </div>

                  <div className="benefit-content">
                    <h4>Автоматизація</h4>
                    <span>Система бере рутину на себе</span>
                  </div>
                </div>
              </div>

              <div className="floating-item bottom-center-1">
                <div className="benefit-float">
                  <div className="benefit-icon">
                    <IconChartBar size={32} />
                  </div>

                  <div className="benefit-content">
                    <h4>Аналітика</h4>
                    <span>Детальні звіти для прийняття рішень</span>
                  </div>
                </div>
              </div>

              <div className="circle-line"></div>
            </div>
            <div className="why-right">
              <div className="section-badge">ПЕРЕВАГИ СИСТЕМИ</div>

              <h2>
                Чому клініки <br />
                обирають <span>DentalCare Right</span>
              </h2>

              <p>
                Оптимізуйте щоденні процеси, автоматизуйте рутину та зосередьтесь на розвитку вашої
                клініки.
              </p>
              <p>
                Від першого запису пацієнта до фінансової аналітики — усі ключові процеси об'єднані
                в одній сучасній системі управління.
              </p>

              <div className="tooth-preview">
                {/*<img src="../../images/main-page/t3-removebg-preview.png" alt="" />*/}
              </div>
            </div>
          </section>
          <section className="cta-premium-section">
            <div className="cta-premium-wrapper">
              <div className="cta-left">
                <div className="cta-mini-badge">DentalCare CRM</div>

                <h2>
                  Готові вивести <br />
                  свою клініку <span>на новий рівень?</span>
                </h2>

                <p>
                  Автоматизуйте роботу клініки, оптимізуйте управління пацієнтами та фінансами,
                  зосередьтесь на розвитку бізнесу.
                </p>

                <div className="cta-actions">
                  <button className="cta-main-btn">Почати безкоштовно →</button>
                </div>

                <div className="cta-note">14 днів тестового доступу • Без прив’язки картки</div>
              </div>

              <div className="cta-right"></div>
            </div>
          </section>

          <section className="trust-section">
            <div className="">
              <div className="trust-header">
                <h2>
                  Нам довіряють клініки,
                  <br />
                  які <span>автоматизують бізнес</span>
                </h2>

                <p>
                  Сучасні стоматології, які вже оптимізували процеси управління та роботи з
                  пацієнтами.
                </p>
              </div>

              <div className="clinic-cloud">
                <span>Smile Dental</span>
                <span>Nova Clinic</span>
                <span>Dental Plus</span>
                <span>DentLab</span>
                <span>WhiteCare</span>
              </div>

              <div className="featured-testimonial">
                <div className="stars">★★★★★</div>

                <blockquote>
                  Раніше адміністратори працювали в Excel. Сьогодні ми керуємо розкладом, пацієнтами
                  та фінансами в одній системі.
                </blockquote>

                <div className="author">
                  <div className="avatar">ОК</div>

                  <div className="info">
                    <h4>Олена Коваль</h4>
                    <span>Smile Dental · Львів</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*<section className="testimonials-section">*/}
          {/*  <div className="testimonials-grid">*/}
          {/*    <div className="testimonials-header">*/}
          {/*      <span className="section-badge">Відгуки клінік</span>*/}

          {/*      <h2>*/}
          {/*        Нам довіряють клініки, <br />*/}
          {/*        які <span>автоматизують бізнес</span>*/}
          {/*      </h2>*/}

          {/*      <p>*/}
          {/*        Стоматології, які вже оптимізували роботу адміністраторів, лікарів та фінансів.*/}
          {/*      </p>*/}
          {/*    </div>*/}

          {/*    <div className="testimonials-grid">*/}
          {/*      {testimonials.map((item, i) => (*/}
          {/*        <div className="testimonial-card" key={i}>*/}
          {/*          <div className="testimonial-top">*/}
          {/*            <span className="testimonial-stars">★★★★★</span>*/}
          {/*            <div className="quote-icon">❝</div>*/}
          {/*          </div>*/}

          {/*          <p>{item.text}</p>*/}

          {/*          <div className="testimonial-footer">*/}
          {/*            <div className="testimonial-avatar">{item.initials}</div>*/}

          {/*            <div className="testimonial-info">*/}
          {/*              <h4>{item.name}</h4>*/}
          {/*              <span>{item.clinic}</span>*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      ))}*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</section>*/}
        </div>
        <Footer />
      </div>
    </>
  );
}
