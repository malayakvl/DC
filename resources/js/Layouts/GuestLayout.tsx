import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import { Head } from '@inertiajs/react';

export default function GuestLayout({ children, auth }) {
  return (
    <>
      <Head title="DentalCare system" />
      <div className="body-guest body-main min-h-[950px]">
        <Header auth={auth} />
        {/*<div className=" flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-main login-content">*/}
        {/*  <div className="mt-6 bg-[#10172b] px-6 py-4 sm:max-w-[24rem] rounded-lg mx-auto">*/}
        {/*    {children}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<br />*/}
        {/*<div className="auth-page">*/}
        {/*  <div className="auth-left">*/}
        {/*    <div className="auth-glow"></div>*/}

        {/*    <div className="auth-branding">*/}
        {/*      <span className="auth-label">DENTALCARE PLATFORM</span>*/}

        {/*      <h1>DentalCare</h1>*/}

        {/*      <p>Управляйте клінікою, пацієнтами, фінансами та розкладом в єдиній системі.</p>*/}
        {/*    </div>*/}

        {/*    <div className="auth-floating patients">*/}
        {/*      <span>Пацієнтів</span>*/}
        {/*      <strong>1,320</strong>*/}
        {/*      <small>↑ +12%</small>*/}
        {/*    </div>*/}

        {/*    <div className="auth-floating revenue">*/}
        {/*      <span>Дохід</span>*/}
        {/*      <strong>₴125,320</strong>*/}
        {/*      <small>↑ +22%</small>*/}
        {/*    </div>*/}

        {/*    <div className="auth-floating schedule">*/}
        {/*      <span>Записів сьогодні</span>*/}
        {/*      <strong>48</strong>*/}
        {/*      <small>↑ +8%</small>*/}
        {/*    </div>*/}
        {/*  </div>*/}

        {/*  <div className="auth-right">*/}
        {/*    <div className="auth-card">{children}</div>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="auth-page register-page">
          <div className="auth-left">
            <div className="auth-glow"></div>

            <div className="auth-branding">
              <span className="auth-label">DENTALCARE PLATFORM</span>

              <h1>
                Почніть <br /> безкоштовно
              </h1>

              <p>
                Створіть власний простір для управління клінікою та автоматизуйте щоденні процеси.
              </p>
            </div>

            <div className="auth-floating trial-card">
              <span>Пробний період</span>
              <strong>14 днів</strong>
              <small>Безкоштовно</small>
            </div>

            <div className="auth-floating clinic-card">
              <span>Нова клініка</span>
              <strong>Створено</strong>
              <small>✓ готово до роботи</small>
            </div>

            <div className="auth-floating team-card">
              <span>Команда</span>
              <strong>∞</strong>
              <small>Додавайте лікарів</small>
            </div>
          </div>

          <div className="auth-right">
            <div className="auth-card">{children}</div>
          </div>
        </div>
        <div className="clearfix"></div>
        <Footer />
      </div>
    </>
  );
}
