interface ModeSwitchProps {
  value: 'and' | 'or';
  onChange: (v: 'and' | 'or') => void;
}
export default function ModeSwitch({ value, onChange }: ModeSwitchProps) {
  return (
    <div
      role="switch"
      aria-checked={value === 'or'}
      className="relative inline-flex w-[120px] h-9 items-center rounded-full border border-border bg-surface p-0.5 overflow-hidden select-none"
    >
      <div
        className={`absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-primary shadow transition-transform duration-300 ease-out ${
          value === 'or' ? 'translate-x-[100%]' : 'translate-x-0'
        }`}
      />
      <button
        type="button"
        onClick={() => onChange('and')}
        className={`relative z-10 flex-1 text-[11px] font-semibold uppercase tracking-wide font-sora transition-colors ${
          value === 'and' ? 'text-white' : 'text-text-secondary hover:text-primary'
        }`}
      >
        AND
      </button>
      <button
        type="button"
        onClick={() => onChange('or')}
        className={`relative z-10 flex-1 text-[11px] font-semibold uppercase tracking-wide font-sora transition-colors ${
          value === 'or' ? 'text-white' : 'text-text-secondary hover:text-primary'
        }`}
      >
        OR
      </button>
    </div>
  );
}
