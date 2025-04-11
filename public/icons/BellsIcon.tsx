import React from 'react'


interface Props {
  strokeColor? : string;
}
function BellsIcon({strokeColor} : Props) {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.6799 1.94C6.47323 1.94 4.6799 3.73334 4.6799 5.94V7.86667C4.6799 8.27334 4.50656 8.89334 4.2999 9.24L3.53323 10.5133C3.0599 11.3 3.38656 12.1733 4.25323 12.4667C7.12656 13.4267 10.2266 13.4267 13.0999 12.4667C13.9066 12.2 14.2599 11.2467 13.8199 10.5133L13.0532 9.24C12.8532 8.89334 12.6799 8.27334 12.6799 7.86667V5.94C12.6799 3.74 10.8799 1.94 8.6799 1.94Z" stroke={strokeColor ?? "black"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
<path d="M9.91296 2.13333C9.70629 2.07333 9.49296 2.02667 9.27296 2C8.63296 1.92 8.01962 1.96667 7.44629 2.13333C7.63962 1.64 8.11962 1.29333 8.67962 1.29333C9.23962 1.29333 9.71962 1.64 9.91296 2.13333Z" stroke={strokeColor ?? "black"} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.6797 12.7067C10.6797 13.8067 9.77969 14.7067 8.67969 14.7067C8.13302 14.7067 7.62635 14.48 7.26635 14.12C6.90635 13.76 6.67969 13.2533 6.67969 12.7067" stroke={strokeColor ?? "black"} strokeWidth="1.5" strokeMiterlimit="10"/>
</svg>

  )
}

export default BellsIcon