import React from 'react';
import PSR from './PSRView/index'
export default function ViewPSR({ psrData }) {
  const psr = JSON.parse(psrData.psr)

  return (
    <div className="py-0 w-full">
      <div className="w-full scroll-x">
        <PSR psrData={psr} />
      </div>
    </div>
  );
}
