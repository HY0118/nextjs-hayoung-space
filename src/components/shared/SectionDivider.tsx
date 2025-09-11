interface SectionDividerProps {
  className?: string;
}

const SectionDivider = ({ className = '' }: SectionDividerProps) => {
  return (
    <div
      className={`w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-12 ${className}`}
      aria-hidden="true"
    />
  );
};

export default SectionDivider;
