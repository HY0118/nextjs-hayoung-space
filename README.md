# 🌐 HaYoung's Space

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/HY0118/nextjs-hayoung-space&count_bg=%2379C83D&title_bg=%23555555&icon=counter.svg&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
[![GitHub stars](https://img.shields.io/github/stars/HY0118/nextjs-hayoung-space?color=yellow)](https://github.com/HY0118/nextjs-hayoung-space/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/HY0118/nextjs-hayoung-space?color=blue)](https://github.com/HY0118/nextjs-hayoung-space/network)
[![License](https://img.shields.io/github/license/HY0118/nextjs-hayoung-space?color=important)](LICENSE)

> **프론트엔드 개발자 이하영의 개인 포트폴리오 웹사이트**  
> Next.js 15 + TypeScript + Tailwind CSS로 구현한 반응형 포트폴리오

## **프로젝트 개요**

이 프로젝트는 **모듈화된 아키텍처**와 **타입 안전성**을 중시하여 개발한 개인 포트폴리오 웹사이트입니다.

### **핵심 구현 내용**

- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- 🎨 **인터랙티브 UI**: Framer Motion 기반 애니메이션
- 🔧 **모듈화 구조**: 역할별 분리된 깨끗한 코드베이스
- 🌍 **다국어 지원**: i18n 기반 한국어/영어 지원
- ⚡ **성능 최적화**: SSR, 이미지 최적화, 코드 스플릿

---

## **아키텍처 & 폴더 구조**

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── [locale]/          # 다국어 라우팅
│   └── quick-portfolio/   # 간편 포트폴리오
├── components/            # React 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   ├── sections/         # 섹션별 컴포넌트
│   ├── projects/         # 프로젝트 관련
├── utils/                # 유틸리티 함수들
│   ├── handlers/         # 이벤트 핸들러
│   ├── imageViewer/      # 이미지 뷰어 로직
│   └── paginator/        # 페이지네이터 로직
├── interfaces/           # TypeScript 타입 정의
├── constants/            # 상수 데이터
├── store/               # 상태 관리 (Zustand)
└── hooks/               # 커스텀 훅
```

### **🎨 설계 철학**

- **단일 책임 원칙**: 각 모듈은 하나의 명확한 책임
- **타입 우선 개발**: TypeScript 엄격 모드 활용
- **성능 중심**: Lazy Loading, 메모이제이션 활용

### **📁 주요 디렉토리 설명**

| 디렉토리              | 설명                      | 주요 파일                                 |
| --------------------- | ------------------------- | ----------------------------------------- |
| **`src/app/`**        | Next.js App Router 페이지 | `page.tsx`, `layout.tsx`                  |
| **`src/components/`** | React 컴포넌트 모음       | `sections/`, `common/`, `projects/`       |
| **`src/utils/`**      | 유틸리티 함수 및 헬퍼     | `handlers/`, `notion/`, `imageViewer/`    |
| **`src/interfaces/`** | TypeScript 타입 정의      | `project.ts`, `skills.ts`                 |
| **`src/constants/`**  | 정적 데이터 및 설정       | `projects/`, `skills.ts`, `techColors.ts` |
| **`src/store/`**      | Zustand 상태 관리         | `projectStore.ts`, `introStore.ts`        |
| **`src/hooks/`**      | 커스텀 React 훅           | `useModalVisibility.ts`                   |

---

## **기술 스택**

### **Core**

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Framer Motion
- **State**: Zustand (가벼운 상태 관리)

### **Integration**

- **Deploy**: Vercel (CI/CD 자동화)
- **Analytics**: Vercel Analytics

### **Development**

- **Linting**: ESLint + Prettier
- **Package Manager**: npm
- **Git Strategy**: Feature 브랜치 기반 개발

---

## **주요 기능 구현 상세**

### **1. 모듈화된 컴포넌트 아키텍처**

```typescript
// 예시: ./src/components/projects/ProjectDetail.tsx
// 단일 책임 원칙을 적용하여 프로젝트 상세 정보만 담당
const ProjectDetail = ({ variant }: ProjectDetailProps) => {
  const closeHandler = createCloseProjectDetailHandler();
  // 핸들러 로직은 별도 유틸리티로 분리
};
```

### **2. TypeScript 타입 안전성 확보**

```typescript
// 예시: ./src/interfaces/project.ts
// 엄격한 타입 정의로 런타임 에러 방지
export interface Project {
  id: string;
  title: { ko: string; en: string };
  images: ProjectImage[];
  techStack: TechStackItem[];
}
```

### **3. 성능 최적화 전략**

```typescript
// 예시: ./src/components/client/MainContent.tsx
// 조건부 Lazy Loading으로 초기 로드 시간 단축
const Skills = lazy(() => import('@components/sections/Skills'));
const Projects = lazy(() => import('@components/sections/Projects'));
```

### **4. 커스텀 훅을 통한 로직 재사용**

```typescript
// 예시: ./src/hooks/useModalVisibility.ts
// 모달 상태 관리 로직을 재사용 가능한 훅으로 분리
export const useModalVisibility = (initialState = false) => {
  // 모달 열기/닫기 로직과 키보드 이벤트 처리
};
```

### **5. 유틸리티 함수의 모듈화**

```typescript
// 예시: ./src/utils/handlers/project.ts
// 프로젝트 관련 이벤트 처리를 별도 모듈로 분리
export const handleProjectSelect = (projectId: string) => {
  // 프로젝트 선택 시 스크롤 애니메이션과 상태 업데이트
};
```

---

## **배포 & 접속 가이드**

### **라이브 사이트**

- **URL**: [https://nextjs-hayoung-space.vercel.app](https://nextjs-hayoung-space.vercel.app)
- **상태**: ✅ 활성화
- **업데이트**: 자동 배포 (GitHub push 시)

### **로컬 개발 환경 설정**

```bash
# 1. 저장소 클론
git clone https://github.com/HY0118/nextjs-hayoung-space.git

# 2. 의존성 설치
cd nextjs-hayoung-space
npm install

# 3. 환경 변수 설정
cp .env.example .env.local
# NOTION_API_KEY와 NOTION_DATABASE_ID 설정

# 4. 개발 서버 실행
npm run dev
```

### **빌드 & 배포**

```bash
# 프로덕션 빌드
npm run build

# 로컬에서 프로덕션 모드 테스트
npm start
```

---

## **성능 지표**

- **Lighthouse 점수**: 95+ (Performance)
- **First Contentful Paint**: < 1.5s
- **모바일 최적화**: 100% 반응형
- **SEO 점수**: 95+

---

## **개발 및 협업 전략**

### **커밋 컨벤션**

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
style: 스타일 변경
docs: 문서 업데이트
```

### **코드 품질 관리**

- **ESLint**: 코드 스타일 일관성
- **TypeScript**: 컴파일 타임 에러 방지
- **자동 빌드 검증**: Vercel CI/CD

---

## **프로젝트 통계**

[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=HY0118&show_icons=true&theme=dracula)](https://github.com/anuraghazra/github-readme-stats)

[![GitHub Streak](https://streak-stats.demolab.com/?user=HY0118)](https://git.io/streak-stats)

---

## **기술적 의사결정 기록**

### **왜 Next.js 15를 선택했나?**

- App Router의 향상된 성능
- 서버 컴포넌트를 통한 SEO 최적화
- Vercel과의 완벽한 통합

### **상태 관리에 Zustand를 선택한 이유**

- Redux보다 가벼운 번들 사이즈
- 타입스크립트와의 우수한 호환성
- 보일러플레이트 코드 최소화

### **모듈화 전략**

- 기능별 디렉토리 구조
- 단일 책임 원칙 적용
- 재사용 가능한 컴포넌트 설계

---

## **Contact**

- **Email**: [lhy.it.0118@gmail.com](mailto:lhy.it.0118@gmail.com)
- **LinkedIn**: [linkedin.com/in/hayoung-lee-756b72332](https://linkedin.com/in/hayoung-lee-756b72332)
- **GitHub**: [github.com/HY0118](https://github.com/HY0118)

---

## **프로젝트 문서**

### **핵심 문서**

- **[기술적 의사결정 가이드](TECHNICAL_DECISIONS.md)** - 구체적인 코드 예시와 함께하는 기술 선택 이유
- **[코드 품질 가이드](CODE_QUALITY.md)** - 모듈화 전략과 코드 품질 향상 사례
- **[배포 가이드](DEPLOYMENT.md)** - 프로덕션 배포 및 접속 방법
- **[협업 가이드](COLLABORATION.md)** - 커밋 컨벤션과 PR 전략

### **빠른 시작 링크**

- **[포트폴리오 사이트 접속](https://nextjs-hayoung-space.vercel.app)**
- **[이력서 확인](https://nextjs-hayoung-space.vercel.app/quick-portfolio)**

---

## **License**

이 프로젝트는 MIT 라이선스 하에 있습니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
