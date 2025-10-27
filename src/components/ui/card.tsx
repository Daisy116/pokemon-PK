import React from 'react'
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div {...props} className={`card ${className}`} />
)
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div {...props} className={`p-3 ${className}`} />
)
export const CardTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div {...props} className={`card-title ${className}`} />
)
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div {...props} className={`p-3 pt-0 space-y-2 ${className}`} />
)
