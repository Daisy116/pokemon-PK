import React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'secondary' | 'destructive' }
export const Button: React.FC<Props> = ({ className='', variant, ...props }) => {
  const base = 'btn'
  const variantCls = variant==='secondary'
    ? 'bg-zinc-200'
    : variant==='destructive'
      ? 'bg-red-500 text-white border-red-500'
      : 'bg-zinc-900 text-white border-zinc-900'
  return <button {...props} className={`${base} ${variantCls} ${className}`} />
}
export default Button
