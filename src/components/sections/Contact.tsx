import Image from 'next/image';

import SectionTitle from '@/components/common/SectionTitle';

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 min-h-screen flex flex-col justify-center bg-background"
    >
      <div className="max-w-7xl mx-auto px-8">
        <SectionTitle>Contact</SectionTitle>

        <div className="grid md:grid-cols-2 gap-12 font-pretendard">
          <div className="flex flex-col gap-4">
            <p className="text-text-secondary mb-2">
              아래 메일로 연락해 주시면 빠른 시일 내에 답변 드리도록 하겠습니다.
            </p>
            <a
              href="mailto:lhy.it.0118@gmail.com"
              className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:border-primary dark:hover:border-primary hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              <Image
                src="https://www.google.com/gmail/about/static/images/logo-gmail.png?cache=1adba63"
                alt="Gmail Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="font-medium text-lg">이메일로 연락하기</span>
                <span className="text-text-secondary">lhy.it.0118@gmail.com</span>
              </div>
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-text-secondary mb-2">
              더 자세한 프로필이 궁금하시다면 아래 링크를 방문해 주세요.
            </p>
            <a
              href="https://github.com/HY0118"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:border-primary dark:hover:border-primary hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              <Image
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="font-medium text-lg">GitHub 방문하기</span>
                <span className="text-text-secondary">@HY0118</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/hayoung-lee-756b72332/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:border-primary dark:hover:border-primary hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              <Image
                src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                alt="LinkedIn Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="font-medium text-lg">LinkedIn 방문하기</span>
                <span className="text-text-secondary">HAYOUNG LEE</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
