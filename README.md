[Uploading 리드미.docx…]()
🌏 Global Bites - 세계 요리 탐방 블로그 (4조)

> **"오늘 저녁, 세계 여행 어떠세요?"**
> 세계 각국의 대표 요리와 맛집 정보를 소개하는 반응형 웹사이트입니다.

<br>

## 👨‍💻 팀원 및 역할 분담 (Team)

| 이름 | 역할 | 담당 파트 |
|:---:|:---:|:---|
| 전원영 | 팀장 | 태국 요리 상세 페이지 구현, 댓글 페이지 구현 |
| 박찬빈 | 팀원 | 이탈리아 요리 상세 페이지 구현 |
| 송준호 | 팀원 | 메인 페이지, 한국 요리 상세 페이지 구현, 공통 UI/UX(다크모드, 사이드바) 구현 |


<br>

## 🛠️ 기술 스택 (Tech Stack)
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white"/>

<br>

## ✨ 주요 기능 (Key Features)

저희 프로젝트는 서버 없이 **HTML/CSS/JS**만으로 인터랙티브한 기능을 구현했습니다.

### 1. 사용자 경험(UX) 중심 UI
- **🌙 다크 모드 (Dark Mode):** `localStorage`를 활용하여 페이지를 이동하거나 브라우저를 껐다 켜도 사용자의 테마 설정이 유지됩니다.
- **📱 반응형 웹 (Responsive Design):** CSS Media Query를 사용하여 모바일과 PC 환경 모두에 최적화된 레이아웃을 제공합니다.
- **✨ 스크롤 애니메이션:** `Intersection Observer` API를 사용하여 스크롤 시 요소가 부드럽게 등장하는 효과를 구현했습니다.

### 2. 스마트한 요리 도구 (Smart Tools)
- **🛒 인분 계산기:** 버튼 클릭으로 인분 수에 따라 필요한 재료의 양(g)이 자동으로 계산됩니다.
- **✅ 장보기 체크리스트:** 재료를 클릭하면 체크선이 그어지며, 상태가 브라우저에 자동 저장됩니다.
- **🖨️ 레시피 인쇄 모드:** 불필요한 UI(사이드바 등)를 제외하고 오직 레시피만 깔끔하게 출력됩니다.

### 3. 소통 및 재미 요소
- **💬 댓글 시스템:** `localStorage`를 활용한 댓글 작성/저장/조회 기능을 구현했습니다. (새로고침 시 유지)
- **❤️ 좋아요 버튼:** 요리별 좋아요 상태가 저장되며, 하트 애니메이션을 제공합니다.
- **🎲 랜덤 메뉴 추천기:** 결정이 어려운 사용자를 위한 메뉴 뽑기 게임 위젯을 사이드바에 탑재했습니다.

<br>

## 📂 폴더 구조 (Directory Structure)

```bash
Global-Bites/
├── index.html          # 메인 페이지 (인트로 및 나라별 선택)
├── style.css           # 전체 공통 스타일 (다크모드, 애니메이션 포함)
├── script.js           # 전체 기능 스크립트 (UI, 로컬스토리지 관리)
├── .gitignore          # Git 설정 파일
├── README.md           # 프로젝트 설명서
│
├── [🇰🇷 한국 요리]
├── korea.html          # 한국 요리 메뉴판
├── kimchi.html         # 상세: 김치찌개
├── bulgogi.html        # 상세: 불고기
├── bibimbap.html       # 상세: 비빔밥
│
├── [🇮🇹 이탈리아 요리]
├── italy.html          # 이탈리아 요리 메뉴판
├── pasta.html          # 상세: 파스타
├── pizza.html          # 상세: 피자
├── risotto.html        # 상세: 리조또
│
├── [🇹🇭 태국 요리]
├── thailand.html       # 태국 요리 메뉴판
├── padthai.html        # 상세: 팟타이
├── tomyum.html         # 상세: 똠양꿍
└── greencurry.html     # 상세: 그린 커리
