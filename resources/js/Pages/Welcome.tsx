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
      <Header auth={auth} />
      <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 bg-main">
        <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20]">
          <div className="w-full">
            <main className="mt-16 px-[80px] mb-[50px] mx-auto w-full">


              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                <div className="flex items-start gap-4 rounded-lg ">
                  {/*BG IMG BLOCK*/}
                  <div className="pt-3 sm:pt-5 block-m-1 m-b-image"></div>
                </div>
                <div className="flex items-start gap-4 rounded-lg p-6 tooltip-right tooltip-main lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800">

                  <div className="pt-3 sm:pt-5">
                    <h2 className="text-2xl font-semibold text-white dark:text-white">
                      Єдина система управління стоматологічною клінікою
                    </h2>

                    <p className="mt-4">
                      <span className="text-[19px]">
                        Ведення медичних карток пацієнтів і автоматизація процесів роботи клініки в одному просторі<br/><br/>
                      </span>
                      <Link
                        href="/register"
                        className="btn-submit main-submit"
                      >
                        {lng.get('menu.register')}
                      </Link>
                      <Link
                        href="/login"
                        className="rounded-md px-4 py-2 text-white ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                      >
                        {lng.get('menu.login')} <span aria-hidden="true">&rarr;</span>
                      </Link>
                      <br/>

                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 mt-16">
                <div className="flex items-start gap-4 tooltip-left tooltip-main p-6">

                  <div className="pt-3 sm:pt-5">
                    <h2 className="text-2xl font-semibold text-white dark:text-white">
                      Розумний розклад
                    </h2>

                    <p className="mt-4">
                      <span className="text-[19px]">
                        Інтерактивний розклад клініки надасть всю важливу інформацію про пацієнтів за лічені секунди. <br/><br/>
                      </span>

                      <br/>

                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg ">
                  {/*BG IMG BLOCK*/}
                  <div className="pt-3 sm:pt-5 block-m-2 m-b-image"></div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 mt-16">
                <div className="flex items-start gap-4 rounded-lg ">
                  {/*BG IMG BLOCK*/}
                  <div className="pt-3 sm:pt-5 main-img-3 m-b-image"></div>
                </div>
                <div className="flex items-start gap-4 tooltip-right tooltip-main p-6">

                  <div className="pt-3 sm:pt-5 w-full">
                    <h2 className="text-2xl font-semibold text-white dark:text-white">
                      Візуальне сприйняття історії лікування
                    </h2>
                    <p className="mt-4">
                      <span className="text-[19px] text-white align-left">
                        Динамічна історія лікування пацієнта, яка в хронологічному порядку та необмеженій кількості зберігає файли всіх форматів. Знімки рентгену та періо карти. <br/><br/>
                      </span>

                      <br/>

                    </p>
                  </div>
                </div>

              </div>

            </main>


            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
