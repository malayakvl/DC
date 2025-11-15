export default function ApplicationLogo() {
  return (
    <div className="relative">
      {/* <div className="logo-reg"></div> */}
      <div className="flex items-center gap-4">
            <div className="">
                <img src="../../images/new-diz/logo-e.png" className="h-[35px]" />
                {/* <img src="/public/logo-e.png" className="h-[50px]" /> */}
            </div>
            <div>
              <div className="text-md font-bold leading-tight gradient-text-h">DentalCare</div>
            </div>
          </div>
    </div>
  );
}
