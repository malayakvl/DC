import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import { Head } from '@inertiajs/react';


export default function GuestLayout({ children, auth }) {
  
  return (
    <>
      <Head title="Welcome" />
      <div className="body-guest body-main min-h-[950px]">
        <Header auth={auth} />
        <div className=" flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-main login-content">
          <div className="mt-6 bg-[#10172b] px-6 py-4 sm:max-w-[24rem] rounded-lg mx-auto">
            {children}
          </div>
        </div>
        <br/>
        <Footer  />
      </div>
    </>

  );
}
