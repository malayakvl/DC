import React from 'react';
import PSR from './PSRView/index';
export default function ViewPSR({ psrData }: { psrData: any }) {
  const psr = psrData.psr ? JSON.parse(psrData.psr) : [];
  console.log('psrData', psr);

  return (
    <div className="py-0 w-full">
      <div className="w-full scroll-x">
        <PSR psrData={psr} />
      </div>
    </div>
  );
}
