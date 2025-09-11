interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle = ({ children, className = '' }: SectionTitleProps) => {
  return (
    <h2
      className={`text-4xl font-bold text-text-primary mb-12 font-sora text-center ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
