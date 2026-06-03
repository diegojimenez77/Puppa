'use client';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export default function Toggle({ checked, onChange, label, id }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => onChange(!checked)}
      aria-label={label}
      className={[
        'relative w-12 h-6 rounded-full p-1 transition-colors duration-200',
        'focus-visible:outline-2 focus-visible:outline-primary',
        checked ? 'bg-primary' : 'bg-surface-container-high',
      ].join(' ')}
    >
      <div
        className={[
          'w-4 h-4 rounded-full transition-transform duration-200',
          checked ? 'translate-x-6 bg-surface-container-lowest' : 'translate-x-0 bg-primary',
        ].join(' ')}
      />
    </button>
  );
}
