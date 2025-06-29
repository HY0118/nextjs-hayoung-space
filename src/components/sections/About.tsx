import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="py-20 min-h-screen flex flex-col justify-center bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-text-primary mb-16 relative font-sora inline-block after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-1 after:bg-primary">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-[200px] h-[250px] relative mb-6">
              <Image
                src="/images/hayoung.jpg"
                alt="Profile"
                fill
                sizes="250px"
                className="rounded-full object-cover"
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-2xl font-semibold text-text-primary mb-2 font-sora">프론트엔드 개발자</h3>
              <p className="text-text-secondary font-pret">사용자 경험을 중요시하는 개발자</p>
            </div>
          </div>
          <div className="md:w-[1000px]">
            <p className="mb-4 leading-relaxed text-text-primary text-lg font-pret font-medium">사용자 중심의 웹 서비스를 만들어가는 프론트엔드 개발자 이하영입니다.</p>
            <p className="mb-4 leading-relaxed text-text-primary font-pret">
              사용자 경험 향상에 대한 열정을 가지고 있으며, React와 TypeScript를 활용한 웹 개발에 전문성을 보유하고 있습니다.
            </p>
            <p className="mb-4 leading-relaxed text-text-primary font-pret">
              업무하면서 동료들과의 적극적인 소통을 즐기며, 팀 분위기를 긍정적으로 이끌어 함께 성장하는 문화를 만들어가는 것을 추구합니다.
              
            </p>
            <p className="mb-4 leading-relaxed text-text-primary font-pret">
              지속적인 학습과 성장을 통해 사용자들에게 가치 있는 경험을 전달하는 개발자가 되고자 합니다.
            </p>
            <div className="mt-6 text-sm text-text-secondary font-pret italic text-right">
              <span className="font-medium">TMI</span> 🔍 직업병처럼 화면의 작은 결함도 빠르게 찾아내는 눈을 가졌습니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
