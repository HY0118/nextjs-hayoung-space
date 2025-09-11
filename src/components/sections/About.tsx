import { useEffect } from 'react';

import Image from 'next/image';

import LocaleLink from '@/components/shared/LocaleLink';
import SectionTitle from '@/components/shared/SectionTitle';
import ExternalLinkIcon from '@/components/ui/icons/ExternalLinkIcon';

const About = () => {
  // 이미지 프리로딩을 위한 useEffect
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/images/hayoung.webp';
    link.type = 'image/webp';

    // 중복 preload 링크 방지
    const existingLink = document.querySelector('link[href="/images/hayoung.webp"]');
    if (!existingLink) {
      document.head.appendChild(link);
    }

    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="py-16 min-h-screen flex flex-col justify-center bg-background"
    >
      <div className="max-w-7xl mx-auto px-8">
        <SectionTitle>About Me</SectionTitle>
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-[200px] h-[250px] relative mb-6 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <Image
                src="/images/hayoung.webp"
                alt="Frontend Developer Profile - Hayoung Lee"
                fill
                sizes="(max-width: 768px) 150px, 200px"
                priority
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
                quality={90}
                unoptimized={false}
                className="rounded-full object-cover transition-opacity duration-300 hover:scale-105 transform transition-transform"
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-2xl font-semibold text-text-primary mb-2 font-sora">
                프론트엔드 개발자
              </h3>
              <p className="text-text-secondary font-pret">
                사용자 경험을 중요시하는 개발자
              </p>
            </div>
          </div>
          <div className="md:w-[1000px]">
            <p className="mb-4 leading-relaxed text-text-primary text-lg font-pret font-medium">
              사용자 중심의 웹 서비스를 만들어가는 프론트엔드 개발자 이하영입니다.
            </p>
            <p className="mb-4 leading-relaxed text-text-primary font-pret">
              사용자 경험 향상에 대한 열정을 가지고 있으며, React와 TypeScript를 활용한 웹
              개발에 전문성을 보유하고 있습니다.
            </p>
            <p className="mb-4 leading-relaxed text-text-primary font-pret">
              업무하면서 동료들과의 적극적인 소통을 즐기며, 팀 분위기를 긍정적으로 이끌어
              함께 성장하는 문화를 만들어가는 것을 추구합니다.
            </p>
            <p className="mb-4 leading-relaxed text-text-primary font-pret">
              지속적인 학습과 성장을 통해 사용자들에게 가치 있는 경험을 전달하는 개발자가
              되고자 합니다.
            </p>
            <div className="mt-6 text-sm text-text-secondary font-pret italic text-right">
              <span className="font-medium">TMI</span> 🔍 직업병처럼 화면의 작은 결함도
              빠르게 찾아내는 눈을 가졌습니다.
            </div>
            <div className="mt-20 flex justify-end">
              <LocaleLink
                to="/quick-portfolio"
                className="mt-3 inline-flex items-center gap-2 text-primary font-sora text-base md:text-lg font-medium group"
              >
                <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-current after:origin-left after:w-full after:scale-x-0 after:transform after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
                  한장으로 정리된 간단 포트폴리오 보기
                </span>
                <ExternalLinkIcon className="w-4 h-4" />
              </LocaleLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
