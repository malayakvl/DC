import React from 'react';

export default function Tooth15({ className = '', tDia }) {
  const tooth15 = tDia;

  return (
    <>
      <g id="15" className="df-tooth-text" data-number="15">
        <text transform="matrix(1 0 0 1 435 340)" className="st3 st4 st5">
          15
        </text>
      </g>
      <g
        className="df-tooth-perio"
        data-number="15"
        transform={
          className === 'bottom'
            ? 'matrix(-0.6998369, 0.01510264, -0.01510264, -0.6998369 921 741)'
            : 'matrix(0.6988226, 0.0405874, -0.0405874, 0.6988226 25 -126)'
        }
        // transform="matrix(0.6988226, 0.0405874, -0.0405874, 0.6988226 25 -126)"
      >
        <g className="underlay" style={{ visibility: 'inherit' }}>
          <path
            className="st40"
            d="M631,233.9c0,0-3,28-4,40s-1,58-3,83s-13.1,61.9-14.1,83.5
            c-0.9,21.5-3.9,37.5,2.1,54.5s14,23,10,37s-14.6,37.3-14.3,60.7s-0.7,76.3,7.3,105.3s25,36.9,43,36c19-1,35-15,35-57s2-90,3-109
            s-12-39-14-50c-2-11,12-26,13-63s2-61-1-80s-9-66-13-84s-12-48-15-57s-11-21-22-18C636,218.1,632,223.9,631,233.9z"
          ></path>
        </g>
        <g id="TH_15" className="common-view" style={{ visibility: tooth15.status !== 'absent' ? 'inherit' : 'hidden' }}>
          <g className="dentin">
            <g
              style={{ visibility: 'inherit' }}
            >
              <path
                className="st9"
                d="M690,418.1c-0.6,6.4-1.4,12.8-2.6,19.2c-2.1,11.3-5.2,22.4-9.2,33.3l-26.2-6.6l-23.9,2.9
                c-3.5-9.1-5.8-18.6-6.8-28.2c-1.2-10.9-0.8-21.8,0.1-32.7c0.8-2.1,1.7-4.2,2.9-6.2c5-8.9,13.6-15.4,23.7-17.2
                c1.4-0.3,2.8-0.4,4.2-0.5c3.2-0.1,6.3,0.2,9.3,1.1c0.7,0.2,1.4,0.5,2.1,0.7c3.8,1.5,7.1,3.8,10.1,6.5c7.8,7,13.1,16.3,15.9,26.2
                C689.8,417.1,689.9,417.6,690,418.1z"
              ></path>
            </g>
            <g
              style={{ visibility: (tooth15.status === 'implant' || tooth15.status === 'middlepart') ? 'hidden' : 'inherit' }}
            >
              <path
                className="st10"
                d="M690.3,415c-0.1,1-0.1,2.1-0.2,3.1c-0.1-0.5-0.2-1-0.4-1.5
                c-2.8-10-8-19.2-15.9-26.2c-3-2.7-6.3-5-10.1-6.5c-0.7-0.3-1.4-0.5-2.1-0.7c-3-0.9-6.2-1.3-9.3-1.1c-1.4,0.1-2.8,0.2-4.2,0.5
                c-10.1,1.8-18.7,8.3-23.7,17.2c-1.1,2-2,4.1-2.9,6.2c0.2-2.4,0.4-4.8,0.7-7.2c2.2-22.4,5.8-44.8,8.3-67.2
                c3.3-30.1,4.2-60.5,4.3-90.8c0-9.4,2.2-19.5,10.1-21.1c0.2,0,0.4-0.1,0.6-0.1c8.5-1.2,13.5,8.2,16,17.7c4.4,17,8.5,34.1,11.9,51.3
                c4.4,22.2,7.7,44.6,11.1,66.9c1.9,12.2,3.8,24.5,4.8,36.7C689.9,399.7,690.3,407.3,690.3,415z"
              ></path>
            </g>
          </g>
          <g className="pulp">
            <g
              className="pulpitis-pfilling"
              data-position="15"
              style={{ visibility: 'inherit' }}
            >
              <path
                className="st22 target"
                d="M666,421.6c0,1.5-0.1,3-0.2,4.5c-0.4,3.8-1.2,7.6-2.6,11.2
                c-2.6-2-5.8-3.2-9.1-3.4c-3.2-0.2-6.4,0.6-9.1,2.2c-1-2.3-1.5-4.8-1.7-7.2c-0.2-2.4,0-4.9,0.6-7.2c2.1-16.2,4.2-39.5,4.2-39.5
                s2.8-0.2,4.2-0.3c3.1-0.2,6.3,0.2,9.3,1.1c0.7,0.2,1.4,0.5,2,0.7C664.5,396.3,665.3,408.9,666,421.6z"
              ></path>
            </g>
            <g
              className="pulpitis-pfilling"
              data-position="15"
              style={{ visibility: 'inherit' }}
            >
              <path
                className="st22 target"
                d="M663.7,383.7c-0.7-0.3-1.4-0.5-2.1-0.8c-3-0.9-6.2-1.2-9.3-1.1
                c-1.4,0.1-2.8,0.2-4.2,0.5c1.6-18.8,2.5-37.8,2.7-56.7c0.1-7.9,0.1-15.9-0.1-23.8c1.6-0.2,3.4-0.2,5.4,0h0
                c1.3,11.4,2.5,22.8,3.6,34.3C661.3,352,662.6,367.8,663.7,383.7z"
              ></path>
            </g>
            <g
              className="pulpitis-pfilling"
              data-position="15"
              style={{ visibility: 'inherit' }}
            >
              <path
                className="st22 target part"
                d="M656.2,301.9L656.2,301.9c-2-0.2-3.8-0.2-5.5,0c-0.5-27.6-2.4-55.1-5.8-82.5
                C649.2,246.7,653,274.3,656.2,301.9z"
              ></path>
            </g>
            <g
              className="level periodontitis"
              data-level="1"
              data-position="15"
              style={{ visibility: 'inherit', opacity: 0 }}
            >
              <circle className="st42" cx="641.5" cy="216.9" r="8.2"></circle>
            </g>
            <g
              className="level periodontitis"
              data-level="2"
              data-position="15"
              style={{ visibility: 'inherit', opacity: 0 }}
            >
              <circle className="st42" cx="643.2" cy="208.8" r="17.5"></circle>
            </g>
            <g
              className="level periodontitis"
              data-level="3"
              data-position="15"
              style={{ visibility: 'inherit', opacity: 0 }}
            >
              <circle className="st42" cx="641.5" cy="196.3" r="30"></circle>
            </g>
          </g>
          <g
            className="pin"
            style={{ visibility: 'inherit', opacity: 0 }}
          >
            <path
              className="st56"
              d="M621.6 438.6C622.6 448.2 624.9 457.7 628.4 466.8L652.3 463.9L678.5 470.6C682.5 459.7 685.6 448.6 687.7 437.3C688.9 431 689.7 424.6 690.3 418.2C690.2 417.8 689.6 417.2 689.5 416.7C686.7 406.7 681.5 397.5 673.6 390.5C671 388.1 668.1 386 664.8 384.6C664.5 384.4 664.2 384.3 663.9 384.2C663.8 384.1 663.6 384.1 663.5 384C662.8 383.7 662.1 383.5 661.4 383.3C658.9 382.5 656.3 382.2 653.7 382.2C653.3 382.2 652.9 382.2 652.5 382.2C651.1 382.3 649.7 382.4 648.3 382.7C647.8 382.8 647.3 382.9 646.8 383C637.4 385.1 629.3 391.4 624.6 399.9C623.5 401.9 622.6 404 621.7 406.1C620.8 416.8 620.4 427.7 621.6 438.6Z"
              style={{ visibility: 'hidden' }}
            ></path>
            <path
              className="st57"
              d="M644.2 464.9L652 464H652.1L664.5 467.2L655.4 296C655.2 294.6 655 293.1 654.8 291.3C654.4 290.7 653.8 290.3 653 290.2C651.7 290.1 650.5 291.1 650.5 292.4V293.3V293.4L644.2 464.9Z"
            ></path>
          </g>
          <g
            className="stump"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st14"
              d="M646.8,382.8c0.5-0.1,1-0.2,1.5-0.3c1.4-0.3,2.8-0.4,4.2-0.5c0.4,0,0.8,0,1.2,0c2.6,0,5.2,0.4,7.7,1.1
            c0.7,0.2,1.4,0.5,2.1,0.7c0.2,0.1,0.3,0.1,0.4,0.2c0.3,0.1,0.6,0.3,0.9,0.4l-9.6-92.3c-0.1-1.1-1-2-2.2-2.1
            c-1.3-0.1-2.5,0.9-2.5,2.2L646.8,382.8z"
            ></path>
            <path
              className="st15"
              d="M621.6,438.6c1,9.6,3.3,19.1,6.8,28.2l23.9-2.9l26.2,6.7c4-10.9,7.1-22,9.2-33.3c1.2-6.3,2-12.7,2.6-19.1
            c-0.1-0.4-0.7-1-0.8-1.5c-2.8-10-8-19.2-15.9-26.2c-2.6-2.4-5.5-4.5-8.8-5.9c-0.3-0.2-0.6-0.3-0.9-0.4c-0.1-0.1-0.3-0.1-0.4-0.2
            c-0.7-0.3-1.4-0.5-2.1-0.7c-2.5-0.8-5.1-1.1-7.7-1.1c-0.4,0-0.8,0-1.2,0c-1.4,0.1-2.8,0.2-4.2,0.5c-0.5,0.1-1,0.2-1.5,0.3
            c-9.4,2.1-17.5,8.4-22.2,16.9c-1.1,2-2,4.1-2.9,6.2C620.8,416.8,620.4,427.7,621.6,438.6z"
            ></path>
          </g>
          <g
            className="abutment"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <path
              className="st16"
              d="M687.7,410.2c-0.6-1.6-1.4-3.2-2.2-4.7c-2.9-5.6-6.7-10.7-11.5-15c-3.5-3.2-7.6-5.9-12.2-7.3
                c-3-0.9-6.2-1.3-9.3-1.1c-10.9,0.5-20.5,6.5-26.4,15.2c-0.5,0.8-1,1.6-1.5,2.4c-0.5,0.9-0.9,1.8-1.4,2.7c-0.4,0.8-0.7,1.6-1,2.4
                v-0.6l16.3-31.1l31-0.7L687.7,410.2z"
            ></path>
            <path
              className="st17"
              d="M690.3,418.1c-0.6,6.4-1.4,12.8-2.6,19.1c-2.1,11.3-5.2,22.4-9.2,33.3l-26.2-6.7l-23.9,2.9
                c-3.5-9.1-5.8-18.6-6.8-28.2c-1.1-10.3-0.8-20.7,0-31c0-0.5,0.1-1.1,0.1-1.6c0.2-0.4,0.3-0.8,0.5-1.2c0.3-0.8,0.7-1.6,1-2.4
                c0.4-0.9,0.9-1.8,1.4-2.7c0.5-0.8,1-1.6,1.5-2.4c5.9-8.8,15.5-14.7,26.4-15.2c3.2-0.2,6.3,0.2,9.3,1.1c4.6,1.4,8.7,4.1,12.2,7.3
                c4.8,4.3,8.6,9.4,11.5,15c0.8,1.5,1.5,3.1,2.2,4.7c0.9,2.1,1.6,4.3,2.2,6.5C690,417.1,690.2,417.6,690.3,418.1z"
            ></path>
          </g>
          <g
            className="shaper"
            style={{ visibility: 'hidden' }}
          >
            <path
              className="st44"
              d="M678.038 412.934C678.407 415.324 676.587 417.493 674.168 417.543L638.718 418.285C636.301 418.336 634.392 416.246 634.659 413.843L639.059 374.327C639.282 372.327 640.956 370.803 642.968 370.77L667.964 370.355C669.963 370.321 671.679 371.768 671.984 373.743L678.038 412.934Z"
            ></path>
          </g>
          <g
            style={{ visibility: (tooth15?.status == 'implant') ? 'inherit' : 'hidden' }}
          >
            <path
              className="st18"
              d="M675.7,372l-42.1,1c-0.4-22.3-0.3-44.6,0.4-66.9c0.6-21.6,1.7-43.2,3.3-64.7c3.3-4,8-6.4,13.1-6.5
                c5.4-0.2,10.7,2.1,14.7,6.3c2.3,22.5,4.4,45.1,6.2,67.6C673,329.9,674.5,351,675.7,372z"
            ></path>
            <line
              className="st19"
              x1="678.8"
              y1="353.7"
              x2="630.2"
              y2="361.1"
            ></line>
            <line
              className="st19"
              x1="678.3"
              y1="328.1"
              x2="629.6"
              y2="335.5"
            ></line>
            <line
              className="st19"
              x1="676.6"
              y1="302.5"
              x2="628"
              y2="309.9"
            ></line>
            <line
              className="st19"
              x1="676"
              y1="276.9"
              x2="627.4"
              y2="284.3"
            ></line>
            <line
              className="st19"
              x1="675.5"
              y1="251.3"
              x2="626.8"
              y2="258.8"
            ></line>
          </g>
          <g className="toutline" style={{ visibility: 'inherit' }}>
            <path
              className="st46"
              d="M694.8,440.6c-0.7-4.7-1.9-9.3-2.9-13.9c-0.5-2.1-0.9-4.3-1.4-6.4
                c-0.3-1.2-0.6-2.5-0.9-3.7c-2.8-10-8-19.2-15.9-26.2c-3.5-3.2-7.6-5.9-12.2-7.3c-3-0.9-6.2-1.3-9.3-1.1
                c-11.8,0.6-22.2,7.6-27.9,17.7c-2.4,4.2-3.8,8.9-5.5,13.4c-0.4,1-0.8,2.1-1.2,3.1c-2.4,6-5.5,11.7-7.5,17.9
                c-2.2,6.9-2.7,14.3-1.5,21.4c1.8,4.9,4,9.6,6.8,14c3.8,6.1,8.5,11.6,12.7,17.4c0.1,0.1,0.2,0.3,0.3,0.4c3.6,5,7.1,10.3,12.9,12.9
                c4.8,2.2,10.4,2,15.2-0.1c6.5-2.9,10.7-8.8,15.6-13.7c0.5-0.5,1-0.9,1.5-1.4c4.7-4.3,10-8,14.2-12.7c2.8-3.1,5-6.7,6.6-10.5
                C695.7,454.8,695.9,447.6,694.8,440.6z"
            ></path>
          </g>
          <g
            className="wedge-shaped"
            style={{ visibility: 'inherit' }}
          >
            <path
              className="st7 st59"
              d="M614.953 422.955C613.277 426.605 611.599 430.256 610.421 434.1C608.221 441 607.721 448.3 608.921 455.4C610.621 460.3 612.921 465 615.721 469.4C618.194 473.369 621.048 477.085 623.897 480.794C625.426 482.785 626.954 484.774 628.421 486.8C628.471 486.85 628.521 486.925 628.571 487C628.621 487.075 628.671 487.15 628.721 487.2C628.97 487.546 629.219 487.893 629.468 488.241C632.817 492.92 636.223 497.68 641.621 500.1C646.421 502.3 652.021 502.1 656.821 500C661.574 497.846 665.113 494.039 668.667 490.215C669.9 488.889 671.134 487.561 672.421 486.3C672.671 486.05 672.921 485.825 673.171 485.6C673.421 485.375 673.671 485.15 673.921 484.9C675.635 483.332 677.429 481.843 679.22 480.357C682.34 477.768 685.453 475.186 688.121 472.2C690.921 469.1 693.121 465.5 694.721 461.7C696.021 454.7 696.121 447.6 695.121 440.6C694.615 437.2 693.847 433.853 693.082 430.52C692.79 429.245 692.498 427.972 692.221 426.7C691.971 425.65 691.746 424.575 691.521 423.5C691.296 422.425 691.071 421.35 690.821 420.3C690.681 419.456 690.441 418.563 690.207 417.691C690.108 417.322 690.01 416.956 689.921 416.6C687.121 406.7 681.821 397.4 674.021 390.4C670.521 387.2 666.421 384.5 661.821 383.1C658.821 382.2 655.621 381.8 652.521 382C640.621 382.6 630.321 389.6 624.621 399.7C622.432 403.531 620.992 407.695 619.541 411.888C619.402 412.292 619.262 412.696 619.121 413.1C618.722 414.198 618.322 415.196 617.923 416.195L617.921 416.2C617.009 418.48 615.981 420.717 614.953 422.955ZM631.823 402.366C636.171 394.761 644.027 389.49 653.104 389.038C655.468 388.887 657.909 389.189 660.198 389.866C663.706 390.921 666.834 392.954 669.503 395.363C675.453 400.634 679.495 407.637 681.631 415.092C681.983 416.482 682.301 417.877 682.613 419.273C682.912 420.611 681.807 421.85 680.444 421.706L628.92 416.249C627.58 416.107 626.755 414.706 627.229 413.445C627.544 412.61 627.847 411.769 628.15 410.928C629.203 407.999 630.257 405.071 631.823 402.366Z"
            ></path>
            <path
              className="st7 target"
              d="M652.885 389.038C643.808 389.49 635.952 394.761 631.604 402.366C629.589 405.848 628.422 409.7 627.011 413.445C626.536 414.706 627.362 416.107 628.701 416.249L680.226 421.706C681.589 421.85 682.693 420.611 682.394 419.273C682.082 417.877 681.764 416.482 681.412 415.092C679.277 407.637 675.234 400.634 669.284 395.363C666.615 392.954 663.487 390.921 659.979 389.866C657.691 389.189 655.25 388.887 652.885 389.038Z"
            ></path>
            <path
              className="st60 target stroke"
              d="M652.885 389.038C643.808 389.49 635.952 394.761 631.604 402.366C629.589 405.848 628.422 409.7 627.011 413.445C626.536 414.706 627.362 416.107 628.701 416.249L680.226 421.706C681.589 421.85 682.693 420.611 682.394 419.273C682.082 417.877 681.764 416.482 681.412 415.092C679.277 407.637 675.234 400.634 669.284 395.363C666.615 392.954 663.487 390.921 659.979 389.866C657.691 389.189 655.25 388.887 652.885 389.038Z"
            ></path>
          </g>
          <g
            className="tartar"
            style={{ visibility: 'inherit', opacity: 0 }}
          >
            <path
              className="st61 level2"
              d="M694 435.999L692 434.499L690.5 431.499L689 428.999V424.999L687.5 422.499L686.5 418.499V416.499L685 414.999L684 410.999L682.5 407.999L681 405.999V403.999L679 399.999L676.5 397.999L675 395.499L671 392.499L668.5 389.999L665 388.499L662 386.999H657.5L655.5 385.499H650.5L648 386.999H645.5L641 388.499L638 389.999L636.5 392.499L633.5 393.499L631 395.499L628 399.999L626.5 401.499L624 406.999L622.5 411.999L620.5 416.499L619.5 420.499L618 422.499L616.5 424.999L612.5 427.499V425.999L613.5 422.999V420.499L614.5 418.499L616.5 414.999V411.999L618 408.999L619 405.499V402.999L619.5 401.499L620 397.499L620.5 395.499V392.499L621.5 389.999L622.5 386.999V383.999L624 382.499L626.5 379.999L630 375.999L633.5 373.999L636.5 370.499L639.5 369.499H642.5L645.5 366.999L650.5 365.499L654 366.999L657.5 365.499L662 366.999H665L668.5 369.499L672.5 370.499L676.5 372.499L679 375.999L682.5 379.999H684L686.5 382.499L689 385.499V389.999L690.5 393.499L691 395.999V398.999L692 401.499V404.499L691 407.999L692 409.999V413.499L693 416.499V420.499L694 424.999L694.5 427.999V431.499L694 435.999Z"
            ></path>
            <path
              className="st61 level1"
              d="M694 436L692 434.5L690.5 431.5L689 429V425L687.5 422.5L686.5 418.5V416.5L685 415L684 411L682.5 408L681 406V404L679 400L676.5 398L675 395.5L671 392.5L668.5 390L665 388.5L662 387H657.5L655.5 385.5H650.5L648 387H645.5L641 388.5L638 390L636.5 392.5L633.5 393.5L631 395.5L628 400L626.5 401.5L624 407L622.5 412L620.5 416.5L619.5 420.5L618 422.5L616.5 425L612.5 427.5L613.5 425L614.5 422.5V420.5L616.5 418.5L617 414.5L618 412V410L619.5 408V406L620.5 404V401.5V399L621.5 396.5L622.5 395.5L625.5 394.5L626.5 392.5L629.5 391L631 389L636.5 385.5L638 384.5L639.5 383L642 381.5H646.5L649.5 379.5H655.5L660 381.5H663.5L667 383L672.5 384.5L675 387L681 391L682.5 393.5L686.5 395.5L690 399L691 401.5V404V406.5L690.5 408V411L692 415V418.5L693 421.5V423.5L694 426L694.5 428.5L694 431.5V433.5V436Z"
            ></path>
          </g>
          <g
            className="header caries-filling"
            style={{ visibility: 'inherit' }}
          >
            <g className="caries-filling" data-position="15_5">
              <path
                className="st58"
                d="M628.5,487.3c3.6,5,7.1,10.3,12.9,12.9c4.8,2.2,10.4,2,15.2-0.1c6.5-2.9,10.7-8.8,15.6-13.7
                c0.5-0.5,1-0.9,1.5-1.4c0.5-10.9,1.3-27.5,2.3-38.2c-5.1-2.3-14.9-6.4-22.1-7.1c-9.7-0.9-19.3,2.1-24.4,4.1
                C629.4,457,628.8,476.3,628.5,487.3z"
              ></path>
              <path
                className="st8 target"
                d="M628.5,487.3c3.6,5,7.1,10.3,12.9,12.9c4.8,2.2,10.4,2,15.2-0.1c6.5-2.9,10.7-8.8,15.6-13.7
                c0.5-0.5,1-0.9,1.5-1.4c0.5-10.9,1.3-27.5,2.3-38.2c-5.1-2.3-14.9-6.4-22.1-7.1c-9.7-0.9-19.3,2.1-24.4,4.1
                C629.4,457,628.8,476.3,628.5,487.3z"
              ></path>
            </g>
            <g className="caries-filling" data-position="15_4">
              <path
                className="st58"
                d="M608.7,455.5c1.8,4.9,4,9.6,6.8,14c3.8,6.1,8.5,11.6,12.7,17.4c0.1,0.1,0.2,0.3,0.3,0.4
                c0.3-11,0.9-30.3,1-43.5c0.1-7.7,0-13.4-0.3-14.2c-0.8-2-6.7-11.1-10.3-16.5c-0.4,1-0.8,2.1-1.2,3.1c-2.4,6-5.5,11.7-7.5,17.9
                C608.1,441,607.5,448.3,608.7,455.5z"
              ></path>
              <path
                className="st8 target"
                d="M608.7,455.5c1.8,4.9,4,9.6,6.8,14c3.8,6.1,8.5,11.6,12.7,17.4c0.1,0.1,0.2,0.3,0.3,0.4
                c0.3-11,0.9-30.3,1-43.5c0.1-7.7,0-13.4-0.3-14.2c-0.8-2-6.7-11.1-10.3-16.5c-0.4,1-0.8,2.1-1.2,3.1c-2.4,6-5.5,11.7-7.5,17.9
                C608.1,441,607.5,448.3,608.7,455.5z"
              ></path>
            </g>
            <g className="caries-filling" data-position="15_2">
              <path
                className="st8"
                d="M673.7,485c4.7-4.3,10-8,14.2-12.7c2.8-3.1,5-6.7,6.6-10.5c1.3-7,1.4-14.1,0.4-21.1
                c-0.7-4.7-1.9-9.3-2.9-13.9c-0.5-2.1-0.9-4.3-1.4-6.4c-4.2,4-11.3,11.4-13.1,16.6c-0.5,1.6-1,5.2-1.5,9.8
                C675,457.5,674.1,474.1,673.7,485z"
              ></path>
              <path
                className="st8 target"
                d="M673.7,485c4.7-4.3,10-8,14.2-12.7c2.8-3.1,5-6.7,6.6-10.5c1.3-7,1.4-14.1,0.4-21.1
                c-0.7-4.7-1.9-9.3-2.9-13.9c-0.5-2.1-0.9-4.3-1.4-6.4c-4.2,4-11.3,11.4-13.1,16.6c-0.5,1.6-1,5.2-1.5,9.8
                C675,457.5,674.1,474.1,673.7,485z"
              ></path>
            </g>
            <g className="caries-filling" data-position="15_1">
              <path
                className="st58"
                d="M629.2,429.6c0.3,0.8,0.4,6.5,0.3,14.2c5.1-2,14.7-5,24.4-4.1c7.2,0.7,17,4.8,22.1,7.1c0.5-4.6,1-8.2,1.5-9.8
                c1.7-5.2,8.9-12.6,13.1-16.6c-0.3-1.2-0.6-2.5-0.9-3.7c-2.8-10-8-19.2-15.9-26.2c-3.5-3.2-7.6-5.9-12.2-7.3
                c-3-0.9-6.2-1.3-9.3-1.1c-11.8,0.6-22.2,7.6-27.9,17.7c-2.4,4.2-3.8,8.9-5.5,13.4C622.5,418.5,628.4,427.6,629.2,429.6z"
              ></path>
              <path
                className="st8 target"
                d="M629.2,429.6c0.3,0.8,0.4,6.5,0.3,14.2c5.1-2,14.7-5,24.4-4.1c7.2,0.7,17,4.8,22.1,7.1c0.5-4.6,1-8.2,1.5-9.8
                c1.7-5.2,8.9-12.6,13.1-16.6c-0.3-1.2-0.6-2.5-0.9-3.7c-2.8-10-8-19.2-15.9-26.2c-3.5-3.2-7.6-5.9-12.2-7.3
                c-3-0.9-6.2-1.3-9.3-1.1c-11.8,0.6-22.2,7.6-27.9,17.7c-2.4,4.2-3.8,8.9-5.5,13.4C622.5,418.5,628.4,427.6,629.2,429.6z"
              ></path>
            </g>
            <g className="with">
              <path
                className="st54"
                d="M629.5 443.999L629 479.999"
              ></path>
              <path
                className="st54"
                d="M629.5 443.999C629.5 430.999 629.6 424.699 622 417.499"
              ></path>
              <path
                className="st54"
                d="M629.5 443.999C637 439.833 656.8 434.499 676 446.499"
              ></path>
              <path
                className="st54"
                d="M676 446.499C677 430.499 679.4 426.799 687 423.999"
              ></path>
              <path
                className="st54"
                d="M676 446.999L674 477.499"
              ></path>
            </g>
          </g>
          <g
            style={{ visibility: 'inherit' }}
          >
            <g
              className="vinir"
              style={{ visibility: 'hidden', opacity: 0 }}
            >
              <path
                className="st55"
                d="M694.8 440.6C694.1 435.9 692.9 431.3 691.9 426.7C691.4 424.6 691 422.4 690.5 420.3C690.2 419.1 689.9 417.8 689.6 416.6C686.8 406.6 681.6 397.4 673.7 390.4C670.2 387.2 666.1 384.5 661.5 383.1C658.5 382.2 655.3 381.8 652.2 382C640.4 382.6 630 389.6 624.3 399.7C621.9 403.9 620.5 408.6 618.8 413.1C618.4 414.1 618 415.2 617.6 416.2C615.2 422.2 612.1 427.9 610.1 434.1C607.9 441 607.4 448.4 608.6 455.5C610.4 460.4 612.6 465.1 615.4 469.5C619.2 475.6 623.9 481.1 628.1 486.9C628.2 487 628.3 487.2 628.4 487.3C632 492.3 635.5 497.6 641.3 500.2C646.1 502.4 651.7 502.2 656.5 500.1C663 497.2 667.2 491.3 672.1 486.4C672.6 485.9 673.1 485.5 673.6 485C678.3 480.7 683.6 477 687.8 472.3C690.6 469.2 692.8 465.6 694.4 461.8C695.7 454.8 695.9 447.6 694.8 440.6Z"
              ></path>
            </g>
          </g>
          <g className="crown" style={{ visibility: tooth15.status !== 'exist' && tooth15.status  ? 'inherit' : 'hidden', opacity: (tooth15.status !== 'exist') ? 1 : 0 }}>
            <path
              className={`st46 target temporary-crown crown-fill blue`}
              d="M694.8,440.6c-0.7-4.7-1.9-9.3-2.9-13.9c-0.5-2.1-0.9-4.3-1.4-6.4
                c-0.3-1.2-0.6-2.5-0.9-3.7c-2.8-10-8-19.2-15.9-26.2c-3.5-3.2-7.6-5.9-12.2-7.3c-3-0.9-6.2-1.3-9.3-1.1
                c-11.8,0.6-22.2,7.6-27.9,17.7c-2.4,4.2-3.8,8.9-5.5,13.4c-0.4,1-0.8,2.1-1.2,3.1c-2.4,6-5.5,11.7-7.5,17.9
                c-2.2,6.9-2.7,14.3-1.5,21.4c1.8,4.9,4,9.6,6.8,14c3.8,6.1,8.5,11.6,12.7,17.4c0.1,0.1,0.2,0.3,0.3,0.4c3.6,5,7.1,10.3,12.9,12.9
                c4.8,2.2,10.4,2,15.2-0.1c6.5-2.9,10.7-8.8,15.6-13.7c0.5-0.5,1-0.9,1.5-1.4c4.7-4.3,10-8,14.2-12.7c2.8-3.1,5-6.7,6.6-10.5
                C695.7,454.8,695.9,447.6,694.8,440.6z"
            ></path>
          </g>
        </g>
      </g>
    </>
  );
}
