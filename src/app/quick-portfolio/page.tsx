import QuickPortfolioBlocks from '@/components/quick-portfolio/QuickPortfolioBlocks';
import QuickPortfolioClient from '@/components/quick-portfolio/QuickPortfolioClient';

export const revalidate = false;

export default function QuickPortfolioPage() {
  return (
    <main className="h-dvh w-full overflow-hidden bg-background">
      <QuickPortfolioClient sectionClassName="relative h-full w-full">
        <QuickPortfolioBlocks />
      </QuickPortfolioClient>
    </main>
  );
}
