
import React from 'react'


interface Props {
  className? : string;
}

function InboxIcon({className} : Props) {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={className ?? 'stroke-black'}>
<path d="M8 1.83331V6.49998L9.33333 5.16665"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.99984 6.50002L6.6665 5.16669"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M1.31982 9.16669H4.25982C4.51316 9.16669 4.73982 9.30669 4.85316 9.53335L5.63316 11.0934C5.85982 11.5467 6.31982 11.8334 6.82649 11.8334H9.17983C9.68649 11.8334 10.1465 11.5467 10.3732 11.0934L11.1532 9.53335C11.2665 9.30669 11.4998 9.16669 11.7465 9.16669H14.6532"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.66683 3.25336C2.30683 3.60002 1.3335 4.98669 1.3335 7.83336V10.5C1.3335 13.8334 2.66683 15.1667 6.00016 15.1667H10.0002C13.3335 15.1667 14.6668 13.8334 14.6668 10.5V7.83336C14.6668 4.98669 13.6935 3.60002 11.3335 3.25336"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


  )
}

export default InboxIcon