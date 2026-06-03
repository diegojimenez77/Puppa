import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'filled' | 'glass';
  children: ReactNode;
}

const variantClasses = {
  elevated: 'bg-surface-container-lowest shadow-card rounded-xl',
  filled: 'bg-surface-container rounded-xl',
  glass: 'bg-surface-container-lowest/80 backdrop-blur-[8px] rounded-xl border border-outline-variant/50',
};

export default function Card({
  variant = 'elevated',
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div className={[variantClasses[variant], className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}
