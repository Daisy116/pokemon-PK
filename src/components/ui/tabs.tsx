import React from 'react'
type TabsProps = { defaultValue: string, className?: string, children: React.ReactNode }
export const Tabs: React.FC<TabsProps> = ({ children, className='' }) => <div className={className}>{children}</div>
export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div {...props} className={`tabs-list ${className}`} />
)
type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
export const TabsTrigger: React.FC<TriggerProps> = ({ className='', value, ...props }) => {
  return <button data-active={document.body.dataset.tab===value} data-tab={value}
    onClick={() => { document.body.dataset.tab=value; window.dispatchEvent(new CustomEvent('tab-change')); }}
    className={`tabs-trigger ${className}`} {...props} />
}
type ContentProps = React.HTMLAttributes<HTMLDivElement> & { value: string }
export const TabsContent: React.FC<ContentProps> = ({ className='', value, ...props }) => {
  const [_, setTick] = React.useState(0)
  React.useEffect(()=>{
    const h = () => setTick(x=>x+1)
    window.addEventListener('tab-change', h)
    return () => window.removeEventListener('tab-change', h)
  },[])
  const show = (document.body.dataset.tab ?? 'enemy') === value
  return <div {...props} className={`${className}`} style={{ display: show ? 'block':'none' }} />
}
