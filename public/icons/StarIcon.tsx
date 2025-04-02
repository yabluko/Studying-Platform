import React from 'react'

interface Props {
  className?: string;
  width? : number;
  height?: number;
  fillOpacity?: number;
}


function StarIcon({ className, width, height, fillOpacity } : Props) {
  return (
    <svg width={width ?? 80} height={height ?? 80} viewBox="0 0 80 80" fill="white" xmlns="http://www.w3.org/2000/svg" className={className}>
<path d="M40 0C40 0 42.207 20.5997 50.8036 29.1964C59.4003 37.793 80 40 80 40C80 40 59.4003 42.207 50.8036 50.8036C42.207 59.4003 40 80 40 80C40 80 37.793 59.4003 29.1964 50.8036C20.5997 42.207 0 40 0 40C0 40 20.5997 37.793 29.1964 29.1964C37.793 20.5997 40 0 40 0Z" fill="white" fillOpacity={fillOpacity ?? "0.25"}/>
</svg>

  )
}

export default StarIcon