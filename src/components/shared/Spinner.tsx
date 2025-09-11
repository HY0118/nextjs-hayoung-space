interface SpinnerProps {
  size?: number; // px
  full?: boolean; // min-h-screen 적용 여부
  className?: string;
}

export default function Spinner({
  size = 80,
  full = true,
  className = '',
}: SpinnerProps) {
  const containerClass =
    `${full ? 'min-h-screen' : ''} flex items-center justify-center ${className}`.trim();
  const innerSize = Math.max(Math.floor(size / 2), 10);
  return (
    <div className={containerClass}>
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* 외부 원 */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full" />
        {/* 회전하는 그라데이션 원 */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary border-r-primary/40 border-b-primary/10 border-l-primary/70 rounded-full animate-spin-slow" />
        {/* 내부 원 - 반대 방향으로 회전하는 그라데이션 */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ width: innerSize, height: innerSize }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary via-primary/50 to-transparent rounded-full animate-spin-reverse blur-[2px]" />
        </div>
      </div>
    </div>
  );
}
