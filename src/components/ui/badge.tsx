import React from 'react'
export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className='', ...props }) => (
  <span {...props} className={`badge ${className}`} />
)
