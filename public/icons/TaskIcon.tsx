import React from 'react'

interface Props {
  className? : string;
}

function TaskIcon({className} : Props) {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={className ?? 'stroke-black'}>
        <path d="M8.24658 6.41998H11.7466"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.25342 6.41998L4.75342 6.91998L6.25342 5.41998"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.24658 11.0867H11.7466"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.25342 11.0867L4.75342 11.5867L6.25342 10.0867"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.00016 15.1666H10.0002C13.3335 15.1666 14.6668 13.8333 14.6668 10.5V6.49998C14.6668 3.16665 13.3335 1.83331 10.0002 1.83331H6.00016C2.66683 1.83331 1.3335 3.16665 1.3335 6.49998V10.5C1.3335 13.8333 2.66683 15.1666 6.00016 15.1666Z"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default TaskIcon