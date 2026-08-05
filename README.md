<div align="center">

# Teaching

**당신이 수집한 자료를 분석해 하나뿐인 맞춤형 학습 로드맵을 설계합니다.**

AI분석&자동 폴더 추천</br>
지능형 티칭맵 설계</br>
내 자료 내 출처 기반 챗봇</br>

</div>

---

# 👥 팀원 및 프론트엔드 역할 분담

김범수 : PL 및 메인페이지, 보관함 UI 작업, 모바일 UI 작업
</br>김수빈 : 로그인 및 회원가입 페이지, 챗봇 UI 작업, 모바일 UI 작업
</br>남윤서 : 티칭맵, 휴지통 UI 작업, 모바일 UI 작업

---

## 🛠️ 기술 스택

<div align="center">

![React](https://img.shields.io/badge/React_19.2.7-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_6.0.2-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8.1.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4.3.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7.18.1-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios_1.18.1-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI_1.1.19-161618?style=flat-square&logo=radixui&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React_1.23.0-F56565?style=flat-square)

</div>

---

## 📁 폴더 구조

```
src/
├── components    # 공통 컴포넌트 및 기능별 컴포넌트
├── layouts       # 공통 레이아웃 컴포넌트
├── pages         # 페이지 컴포넌트
├── apis          # API 요청 및 관련 함수
├── App.tsx       # 애플리케이션 진입점
├── index.css     # 전역 스타일
└── App.css       # App 컴포넌트 스타일
```

---

## 🎨 프론트엔드 개발 컨벤션

---

### 🌳 깃 브랜치 전략

- **main 브랜치**
  👑 서비스 배포용 브랜치
  👑 팀장만 직접 관리하고 머지 가능
- **develop 브랜치**
  🛠️ 개발 기능 통합 브랜치
  새로운 기능은 항상 이 브랜치를 기준으로 브랜치 생성

### 🔖 브랜치 명명 규칙

| 유형                     | 형식                  | 설명                                                  | 예시          |
| ------------------------ | --------------------- | ----------------------------------------------------- | ------------- |
| ✨ 기능 추가             | `feat-[이슈번호]`     | 새로운 UI/기능 개발                                   | `feat-100`    |
| ♻️ 리팩토링              | `refactor-[이슈번호]` | 코드 구조 개선                                        | `refactor-28` |
| 🐛 버그 수정             | `bug-[이슈번호]`      | UI/UX 버그 수정                                       | `bug-23`      |
| 🎨 코드 포맷팅, CSS 수정 | `style-[이슈번호]`    | 코드 포맷팅, CSS 수정 등 기능에 영향 없는 스타일 변경 | `style-123`   |
| 🔨 잡무성 작업           | `chore-[이슈번호]`    | 주석, 콘솔 제거, 의존성 관리                          | `chore-102`   |
| 📝 문서 수정             | `docs-[이슈번호]`     | 문서 수정 (README 등)                                 | `docs-23`     |
| 🚀 빌드 설정             | `build-[이슈번호]`    | 빌드 설정, 의존성 패키지                              | `build-12`    |
| ✅ 테스트 코드 추가/수정 | `test-[이슈번호]`     | 테스트 코드 추가 / 수정                               | `test-12`     |

---

### 📝 커밋/PR 컨벤션

| 타입          | 설명                                       | 예시                                  |
| ------------- | ------------------------------------------ | ------------------------------------- |
| ✨ `feat`     | 새로운 기능 추가                           | `feat: 검색 기능 추가`                |
| ♻️ `refactor` | 리팩토링                                   | `refactor: header 컴포넌트 구조 개선` |
| 🐛 `bug`      | 버그 수정                                  | `bug: 모바일 메뉴 토글 오류 수정`     |
| 🎨 `style`    | 스타일, 포맷, 세미콜론 등 코드 비동작 변경 | `style: 코드 정렬 및 들여쓰기 수정`   |
| 📝 `docs`     | 문서 수정                                  | `docs: README 배포 방법 추가`         |
| ✅ `test`     | 테스트 코드 추가/수정                      | `test: 로그인 테스트 케이스 추가`     |
| 📦 `build`    | 빌드 시스템, 의존성 설정                   | `build: Vite 설정 파일 수정`          |
| 🚀 `ci`       | CI 설정 변경                               | `ci: GitHub Actions 수정`             |
| 🔨 `chore`    | 그 외 잡무 (예: 콘솔 제거)                 | `chore: 불필요한 주석 제거`           |

---

### 🤝 PR (Pull Request) 전략

- **main 브랜치 PR**:
  👑 팀장 승인 → 머지 가능
- **그 외 브랜치 PR**:
  👥 최소 1명 이상 리뷰어 승인 → 머지

---

### 💻 코드 컨벤션 (JavaScript / React 기준)

| 항목                | 규칙                 | 예시                           |
| ------------------- | -------------------- | ------------------------------ |
| **컴포넌트명**      | `PascalCase`         | `UserCard`, `MainLayout`       |
| **변수/함수명**     | `camelCase`          | `handleClick`, `userName`      |
| **상수**            | `UPPER_SNAKE_CASE`   | `DEFAULT_LIMIT`, `API_URL`     |
| **파일명**          | `PascalCase`         | `ProfilePage.tsx`              |
| **스타일 클래스명** | `camelCase` or `BEM` | `buttonPrimary`, `card__title` |
| **CSS 파일**        | - 상의 필요          |                                |

---

### ⚛️ React 컴포넌트 규칙

- **props 구조 분해**
  ✅ `const Button = ({ text, onClick }) => {}`
- **조건부 렌더링**
  ✅ `isLoading && <Spinner />`
- **커스텀 훅**
  ✅ `use` 접두사 필수: `useFetch`, `useToggle`
- **useEffect**
  ✅ 의존성 배열 명시: `useEffect(() => { ... }, [value])`

---

### 🧹 스타일링 (CSS/SCSS)

- **방식**: TailwindCSS 사용
- **공통 변수**: `:root`, `variables.css`로 색상, 여백 등 관리
- **클래스명**: 역할 기반 명명 (`searchInput`, `formWrapper` 등)
- **스타일 관리**: Utility Class 기반으로 컴포넌트별 스타일을 작성
- **공통 디자인**: Figma 디자인 시스템을 기준으로 색상과 간격을 일관되게 적용

---

### 🧰 Lint & Formatter

- Prettier 사용

---

## 🚀 실행 방법

### 1. 프로젝트 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
pnpm run dev
```

### 3. 브라우저에서 확인

```
http://localhost:5173
```

### 4. 프로덕션 빌드

```bash
pnpm run build
```

### 5. 빌드 결과 미리보기 (선택)

```bash
pnpm run preview
```

---

## 💻 화면 목록 및 플로우

```
1.	URL Input : URL 링크 하나만으로 학습자료 자동 수집 및 크롤링 시작
2.	AI Analysis : 자료를 핵심요약과 의미론적 분석을 통한 시멘틱 태그 생성
3.	Catagorization : 기존 보관함 데이터와 비교하여 폴더 위치 제안 및 자동 분류 정리
4.	Interactive Tech : 핵심 문장 하이라이트와 클릭시 나타나는 AI 과외 선생님의 맞춤형 보충 해설
```