const Contact = () => {
  return (
    <section id="contact" className="py-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-text-primary mb-16 relative font-sora inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
          Contact
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <p className="text-text-secondary mb-2">
              아래 메일로 연락해 주시면 빠른 시일 내에 답변 드리도록 하겠습니다.
            </p>
            <a
              href="mailto:lhy.it.0118@gmail.com"
              className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-all"
            >
              <img
                src="https://www.google.com/gmail/about/static/images/logo-gmail.png?cache=1adba63"
                alt="Gmail Logo"
                className="w-8 h-8 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-medium text-lg">이메일로 연락하기</span>
                <span className="text-text-secondary">lhy.it.0118@gmail.com</span>
              </div>
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-text-secondary mb-2">더 자세한 프로필이 궁금하시다면 GitHub을 방문해 주세요.</p>
            <a
              href="https://github.com/HY0118"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-all"
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Logo"
                className="w-8 h-8 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-medium text-lg">GitHub 방문하기</span>
                <span className="text-text-secondary">@HY0118</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
