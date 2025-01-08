const Contact = () => {
  return (
    <section id="contact" className="py-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl text-text-primary mb-8 relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
          Contact
        </h2>
        <div className="grid md:grid-cols-3 gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <i className="fas fa-envelope text-2xl text-primary" />
              <a
                href="mailto:lhy.it.0118@gmail.com"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                lhy.it.0118@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <i className="fab fa-github text-2xl text-primary" />
              <a
                href="https://github.com/HY0118"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
          <form className="md:col-span-2 flex flex-col gap-4">
            <input
              type="text"
              placeholder="이름"
              required
              className="p-4 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-primary text-text-primary"
            />
            <input
              type="email"
              placeholder="이메일"
              required
              className="p-4 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-primary text-text-primary"
            />
            <textarea
              placeholder="메시지"
              required
              className="p-4 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-primary text-text-primary min-h-[150px] resize-y"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-primary text-white rounded hover:bg-primary-dark transition-colors self-start"
            >
              보내기
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
