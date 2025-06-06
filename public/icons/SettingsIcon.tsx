import React from 'react'

interface Props {
  className? : string;
}

function SettingsIcon({ className } : Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  className={className} width="16" height="17" fill="none"><path d="M 8 10.5 C 9.105 10.5 10 9.605 10 8.5 C 10 7.395 9.105 6.5 8 6.5 C 6.895 6.5 6 7.395 6 8.5 C 6 9.605 6.895 10.5 8 10.5 Z" fill="transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray=""></path><path d="M 1.333 9.087 L 1.333 7.913 C 1.333 7.22 1.9 6.647 2.6 6.647 C 3.807 6.647 4.3 5.793 3.693 4.747 C 3.347 4.147 3.554 3.367 4.16 3.02 L 5.314 2.36 C 5.84 2.047 6.52 2.233 6.833 2.76 L 6.907 2.887 C 7.507 3.933 8.493 3.933 9.1 2.887 L 9.174 2.76 C 9.487 2.233 10.167 2.047 10.694 2.36 L 11.847 3.02 C 12.454 3.367 12.66 4.147 12.314 4.747 C 11.707 5.793 12.2 6.647 13.407 6.647 C 14.1 6.647 14.674 7.213 14.674 7.913 L 14.674 9.087 C 14.674 9.78 14.107 10.353 13.407 10.353 C 12.2 10.353 11.707 11.207 12.314 12.253 C 12.66 12.86 12.454 13.633 11.847 13.98 L 10.694 14.64 C 10.167 14.953 9.487 14.767 9.174 14.24 L 9.1 14.113 C 8.5 13.067 7.513 13.067 6.907 14.113 L 6.833 14.24 C 6.52 14.767 5.84 14.953 5.314 14.64 L 4.16 13.98 C 3.554 13.633 3.347 12.853 3.693 12.253 C 4.3 11.207 3.807 10.353 2.6 10.353 C 1.9 10.353 1.333 9.78 1.333 9.087 Z" fill="transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray=""></path></svg>
  )
}

export default SettingsIcon