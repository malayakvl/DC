import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import { Head } from '@inertiajs/react';


export default function GuestLayout({ children, auth }) {
  return (
    <>
      <Head title="Welcome" />
      <Header auth={auth} />
      <div className="body min-h-screen">
        <div className=" flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-main login-content">
          <div className="mt-6 bg-white px-6 py-4 sm:max-w-[24rem] rounded-lg mx-auto">
            {children}
          </div>
        </div>
        <Footer type={'absolute'}  />
      </div>
    </>

  );
}
