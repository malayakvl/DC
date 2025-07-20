import ApplicationLogo from '../Components/Header/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 bg-main">
      <div>
        <div className="flex min-w-[400px]">
          <div className="mx-auto">
            <img
              src="../../images/header/2.png"
              className="logo logo-main logo-m-new"
            />
          </div>
          {/*<div>*/}
          {/*  <span className="logo-title-new">*/}
          {/*    DenTal <span className="logo-title-p">Care</span>*/}
          {/*  </span>*/}
          {/*</div>*/}
        </div>
      </div>

      <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-[24rem] sm:rounded-lg relative">
        {children}
      </div>
    </div>
  );
}
