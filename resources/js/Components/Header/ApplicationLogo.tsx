export default function ApplicationLogo() {
  return (
    <div className="relative">
      {/* <div className="logo-reg"></div> */}
      <div className="flex items-center gap-4">
        <div className="flex-column">
          <div className="system-logo" />
          {/*<img src="../../images/header/logo.png" className="h-[65px]" />*/}
        </div>
        <div className="text-md font-bold leading-tight gradient-text-h">
          Dental<span>Care</span>
          <span className="slogan">Все для сучасної стоматології</span>
        </div>
      </div>
    </div>
  );
}
