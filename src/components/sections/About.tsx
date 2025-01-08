import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="py-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl text-text-primary mb-8 relative inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-[200px] h-[200px] relative mb-6">
              <Image
                src="/images/hayoung.jpg"
                alt="Profile"
                width={200}
                height={200}
                priority
                className="rounded-full object-cover"
              />
            </div>
            <div className="text-center mt-16">
              <h3 className="text-2xl text-text-primary mb-2">프론트엔드 개발자</h3>
              <p className="text-text-secondary">사용자 경험을 중요시하는 개발자</p>
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="mb-4 leading-relaxed text-text-secondary">안녕하세요! 프론트엔드 개발자입니다.</p>
            <p className="mb-4 leading-relaxed text-text-secondary">
              사용자 중심의 인터페이스 설계와 최신 웹 기술을 활용한 개발에 관심이 많습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
