import React from 'react'


interface Props {
  className? : string;
}
function LessonIcon({className} : Props) {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M14.4468 10.0334L14.1802 13.3667C14.0802 14.3867 14.0002 15.1667 12.1935 15.1667H3.80684C2.00017 15.1667 1.92017 14.3867 1.82017 13.3667L1.5535 10.0334C1.50017 9.48004 1.6735 8.96671 1.98684 8.57337C1.9935 8.56671 1.9935 8.56671 2.00017 8.56004C2.36684 8.11337 2.92017 7.83337 3.54017 7.83337H12.4602C13.0802 7.83337 13.6268 8.11337 13.9868 8.54671C13.9935 8.55337 14.0002 8.56004 14.0002 8.56671C14.3268 8.96004 14.5068 9.47337 14.4468 10.0334Z" strokeWidth="1.5" strokeMiterlimit="10"/>
        <path d="M2.3335 8.12V4.68667C2.3335 2.42 2.90016 1.85333 5.16683 1.85333H6.0135C6.86016 1.85333 7.0535 2.10667 7.3735 2.53333L8.22016 3.66667C8.4335 3.94667 8.56016 4.12 9.12683 4.12H10.8268C13.0935 4.12 13.6602 4.68667 13.6602 6.95333V8.14667" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.28662 11.8334H9.71329"  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  )
}

export default LessonIcon