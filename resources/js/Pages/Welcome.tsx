import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appLangSelector } from '../Redux/Layout/selectors';
import Lang from 'lang.js';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import lngHeader from '../Lang/Header/translation';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
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

  useEffect(() => {
    if (auth.user) {
      location.href = '/dashboard';
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
        <div className="max-w-6xl mx-auto px-6 relative z-10 pt-[100px]">

        {/* <!-- HERO --> */}
        <section className="grid md:grid-cols-2 gap-8 items-center mt-6">
          {/* <!-- Left column --> */}
          <div className="space-y-5">
            <div className="text-xs font-semibold tracking-wide text-white">FEATURES</div>
            <h1 className="text-3xl md:text-2xl font-extrabold leading-tight">DentalCare —  <span className="text-xl font-bold">Автоматизований облік клініки</span></h1>
            <p className="text-white max-w-xl">Автоматизовані рішення для клінік: запис пацієнтів, білінг, медичні записи й аналітика. Точна копія стилю з ескізу: темне неонове оформлення, м’які розмиті плями та скляні картки.</p>

            <div className="flex gap-4 mt-2">
              <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-900 font-semibold shadow-[0_12px_40px_rgba(21,195,255,0.12)]">Взнати більше</button>
              <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#ed7b4a] to-[#410958] text-white shadow-[0_12px_40px_rgba(21,195,255,0.12)] font-bold">Дивитись демо</button>
            </div>

            {/* <!-- small stats row similar to eскіз --> */}
            <div className="flex gap-4 mt-6">
              <div className="glass px-4 py-3 rounded-xl flex flex-col">
                <div className="text-xs text-white">Клінік</div>
                <div className="font-bold text-lg">1,200+</div>
              </div>
              <div className="glass px-4 py-3 rounded-xl flex flex-col">
                <div className="text-xs text-white">Patients / mo</div>
                <div className="font-bold text-lg">28k</div>
              </div>
              <div className="glass px-4 py-3 rounded-xl flex flex-col">
                <div className="text-xs text-white">Avg. rating</div>
                <div className="font-bold text-lg">4.8</div>
              </div>
            </div>
          </div>

          {/* <!-- Right column: frame with "tooth" and UI inside --> */}
          <div className="relative flex big-block">
            {/* <!-- Outer rounded panel --> */}
            <div className="w-[520px] h-[360px] rounded-2xl glass p-2 relative overflow-hidden ml-[70px]">
              {/* <!-- top bar with small pills --> */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-white">Patient — ID #4392</div>
              </div>

              <div className="flex gap-1">
                {/* <!-- Left inside: tooth (big) --> */}
                <div className="flex-1 flex items-center justify-center">
                  {/* <!-- Tooth SVG (customized, gradient) --> */}
                  <img src="../../images/new-diz/222-1.png" />
                </div>

                {/* <!-- Right inside: dashboard snippet --> */}
                <div className="w-[250px] mr-4">
                  <div className="rounded-lg bg-[#06111a] border border-slate-700 p-3 mb-3">
                    <div className="text-xs text-white">Звітність</div>
                    <div className="h-2 bg-slate-500 rounded mt-1" style={{width: '80%'}}></div>
                    <div className="flex items-end justify-between mt-2">
                      <p className="text-[14px] text-white p-3">
                        <ul className="list-disc">
                          <li>планування розкладу</li>
                          <li>розрахунки з пацієнтами</li>
                          <li>розрахунки з постачальниками</li>
                          <li>складський облік</li>
                          <li>інтеграція в </li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            {/* <!-- bottom small caption --> */}
            <div className="absolute bottom-4 text-sm left-[20px] bottom-[5px] text-white">
              Зрозумілий интерфейс для лікарів та пацієнтів
            </div>

          </div>
        </section>

        <div className="flex flex-col mt-8 w-full text-white bg-[#000a21] p-[40px]">
          <p>Тепер нарешті лікар і пацієнт можуть говорити на одній хвилі, оскільки схеми лікування викладені просто й доступно — не тільки для фахівців, а й для звичайних людей.</p>
          <p className="mt-[20px]">Інтерактивна хроніка медичного лікування пацієнта, що дозволяє зберігати необмежену кількість файлів будь-яких типів у строгій послідовності за часом.</p>
        </div>

    {/* <!-- Features row (neon cards) --> */}
    <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      {/* <!-- Card 1 --> */}
      <div className="p-[1px] rounded-2xl data-block">
        <div className="bg-[#071122] rounded-2xl p-1 h-full">
          <div className="text-sm font-semibold mb-2">Візуалізація історії пацієнта</div>
          <div className="text-white text-sm">
            <img src="../../images/main-page/pic1.png" />
          </div>
        </div>
      </div>

      {/* <!-- Card 2 --> */}
      <div className="p-[1px] rounded-2xl data-block data-block-second">
        <div className="bg-[#071122] rounded-2xl p-1 h-full">
          <div className="text-sm font-semibold mb-2">Зрозумілий і гнучкий розклад</div>
          <div className="text-white text-sm">
            <img src="../../images/main-page/pic3.png" />
          </div>
        </div>
      </div>

      {/* <!-- Card 3 --> */}
      <div className="p-[1px] rounded-2xl data-block data-block-third">
        <div className="bg-[#071122] rounded-2xl p-1 h-full">
          <div className="text-sm font-semibold mb-2">Звітність та облік</div>
          <div className="text-white text-sm">
            <img src="../../images/main-page/pic4.png" />
          </div>
        </div>
      </div>
    </section>

    {/* <!-- How it works + testimonials --> */}
    <section className="mt-10 grid md:grid-cols-2 gap-6">
      <div className="glass p-6 rounded-2xl">
        <div className="text-sm font-semibold mb-3 uppercase">Як це працює</div>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-[#061226] text-center text-xs border border-slate-700">1. Реєєструєся</div>
          <div className="p-3 rounded-lg bg-[#061226] text-center text-xs border border-slate-700">2. Додаєш клініку та філіали</div>
          <div className="p-3 rounded-lg bg-[#061226] text-center text-xs border border-slate-700">3. Автоматизація процесу</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass p-4 rounded-xl text-center">
          <div className="avatar mx-auto">
            <img src="../../images/new-diz/pl-1.png" className="rounded-full w-full h-full" alt="" />
          </div>
          <div className="font-semibold mt-4">Start</div>
          <div className="text-xs text-white">Essentials • $9.99/mo</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="avatar mx-auto">
            <img src="../../images/new-diz/pl-3.png" className="rounded-full w-full h-full" alt="" />
          </div>
          <div className="font-semibold mt-4">Basic</div>
          <div className="text-xs text-white">Essentials • $19.99/mo</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="avatar mx-auto">
            <img src="../../images/new-diz/pl-4.png" className="rounded-full w-full h-full" alt="" />
          </div>
          <div className="font-semibold mt-4">Enterprise</div>
          <div className="text-xs text-white">Essentials • $29.99/mo</div>
        </div>
      </div>
    </section>

        {/* <footer className="mt-12 py-8 flex items-center justify-between text-sm text-white">
          <div>&copy; 2025 DentalCare — Demo</div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0b1220] flex items-center justify-center">f</div>
            <div className="w-8 h-8 rounded-full bg-[#0b1220] flex items-center justify-center">t</div>
            <div className="w-8 h-8 rounded-full bg-[#0b1220] flex items-center justify-center">in</div>
          </div>
        </footer> */}

  </div>
  <Footer />

</div>
      </>
  );
}