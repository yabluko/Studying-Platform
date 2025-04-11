import React from 'react'


interface Props {
  fill?: string;
  strokeColor? : string;
}
function DotsIcon({ fill, strokeColor} : Props) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill={fill ?? 'none'} xmlns="http://www.w3.org/2000/svg">
<path d="M14.6665 5C14.6665 3.9 13.7665 3 12.6665 3C11.5665 3 10.6665 3.9 10.6665 5C10.6665 6.1 11.5665 7 12.6665 7C13.7665 7 14.6665 6.1 14.6665 5Z" stroke={strokeColor ?? '#7E7E7E'} strokeWidth="1.5"/>
<path d="M14.6665 19C14.6665 17.9 13.7665 17 12.6665 17C11.5665 17 10.6665 17.9 10.6665 19C10.6665 20.1 11.5665 21 12.6665 21C13.7665 21 14.6665 20.1 14.6665 19Z" stroke={strokeColor ?? '#7E7E7E'} strokeWidth="1.5"/>
<path d="M14.6665 12C14.6665 10.9 13.7665 10 12.6665 10C11.5665 10 10.6665 10.9 10.6665 12C10.6665 13.1 11.5665 14 12.6665 14C13.7665 14 14.6665 13.1 14.6665 12Z" stroke={strokeColor ?? '#7E7E7E'} strokeWidth="1.5"/>
</svg>

  )
}

export default DotsIcon