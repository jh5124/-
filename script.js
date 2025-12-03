//1. 데이터 (나라별 카드)
const posts = [
    {
        id: 1,
        category: "이탈리아 (Italy)",
        title: "예술과 낭만의 이탈리아 요리",
        desc: "파스타, 리조또, 피자 등 전 세계인이 사랑하는 이탈리아의 3대 진미를 소개합니다.",
        image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "italy.html" // 이동할 페이지
    },
    {
        id: 2,
        category: "한국 (Korea)",
        title: "건강과 맛의 조화, 한식",
        desc: "김치찌개부터 비빔밥까지. 한국인의 소울푸드 3가지를 만나보세요.",
        image: "https://static.wtable.co.kr/image/production/service/recipe/291/a2421dff-e56c-40bd-8b40-06a91fc000a9.jpg",
        link: "korea.html" // 이동할 페이지
    },
    {
        id: 3,
        category: "태국 (Thailand)",
        title: "오감을 자극하는 미식의 천국",
        desc: "새콤달콤함과 매콤함의 조화. 팟타이부터 똠양꿍까지 잊을 수 없는 태국의 향기를 느껴보세요.",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "thailand.html"
    }
];

//2. 카드 만들기 함수
function renderPosts() {
    const grid = document.getElementById('post-grid');
    if (!grid) return;

    grid.innerHTML = "";

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        // href="#" 대신 실제 링크(post.link)를 넣습니다.
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="card-content">
                <span class="category">${post.category}</span>
                <h4 class="card-title">${post.title}</h4>
                <p class="card-desc">${post.desc}</p>
                <a href="${post.link}" class="read-more" style="color: #ff6b6b; font-weight: bold;">보러 가기 →</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

//3. 스크롤 이동 함수
function scrollToContent() {
    const mainSection = document.getElementById('main-content');
    if(mainSection) {
        mainSection.scrollIntoView({ behavior: 'smooth' });
    }
}

//4. 시계 함수
function updateClock() {
    const now = new Date();
    const dateString = now.toLocaleDateString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short'
    });
    const timeString = now.toLocaleTimeString('ko-KR', {
        hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');

    if (dateElement && timeElement) {
        dateElement.innerText = dateString;
        timeElement.innerText = timeString;
    }
}

//5. 통합 실행
window.onload = function() {
    renderPosts();       // 카드 그리기
    updateClock();       // 시계 초기화
    setInterval(updateClock, 1000); // 시계 작동

    loadTheme();         // 👈 [추가] 저장된 다크 모드 불러오기
    loadLikeStatus(); // 👈 [추가] 좋아요 상태 확인!
    initScrollAnimation(); // 👈 [추가] 애니메이션 감시 시작
};

// 랜덤 메뉴 추천 함수
function pickMenu() {
    const menus = ["김치찌개", "된장찌개", "파스타", "피자", "타코", "팟타이", "쌀국수", "치킨", "삼겹살"];
    const randomIndex = Math.floor(Math.random() * menus.length);
    const resultBox = document.getElementById("menu-result");
    
    // 심심하니까 '두구두구...' 효과 내기
    resultBox.innerText = "추첨 중...";
    
    setTimeout(() => {
        resultBox.innerText = menus[randomIndex];
    }, 500); // 0.5초 뒤에 보여줌
}
function addComment() {
    const input = document.getElementById("comment-input");
    const list = document.getElementById("comment-list");

    const text = input.value.trim();
    if (text === "") {
        alert("댓글을 입력해주세요!");
        return;
    }

    // 첫 댓글일 경우 안내문 삭제
    if (list.children.length === 1 && list.children[0].tagName === "P") {
        list.innerHTML = "";
    }

    // 댓글 요소 생성
    const commentBox = document.createElement("div");
    commentBox.style.padding = "10px 0";
    commentBox.style.borderBottom = "1px solid #eee";

    const date = new Date().toLocaleString("ko-KR");

    commentBox.innerHTML = `
        <p style="margin: 0 0 5px;"><b>익명</b> 
        <span style="color:#aaa; font-size:0.8rem;">(${date})</span></p>
        <p style="margin: 0;">${text}</p>
    `;

    list.appendChild(commentBox);

    input.value = "";
}


// 좋아요 버튼 기능
function toggleLike() {
    const btn = document.getElementById('like-btn');
    const countSpan = document.getElementById('like-count');
    
    if (btn.classList.contains('liked')) {
        // 이미 좋아요 누른 상태면 -> 취소
        btn.classList.remove('liked');
        btn.innerHTML = `🤍 맛있겠어요! <span id="like-count">${parseInt(countSpan.innerText) - 1}</span>`;
        btn.style.background = 'white';
        btn.style.color = '#ff6b6b';
    } else {
        // 좋아요 누름!
        btn.classList.add('liked');
        // 숫자 1 증가
        const newCount = parseInt(countSpan.innerText) + 1;
        btn.innerHTML = `❤️ 맛있어요! <span id="like-count">${newCount}</span>`;
        btn.style.background = '#ff6b6b';
        btn.style.color = 'white';
        
        // 귀여운 알림창 띄우기 (alert 대신 사용)
        alert("😍 저도 먹고 싶네요!"); 
    }
}

// 공유하기 기능
function shareLink() {
    // 1. 현재 주소 복사
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        // 2. 토스트 메시지 띄우기
        const toast = document.getElementById("toast-msg");
        toast.style.visibility = "visible";
        toast.style.opacity = "1";
        
        // 3. 2초 뒤에 사라지게 하기
        setTimeout(() => {
            toast.style.visibility = "hidden";
        }, 2000);
    });
}

// --- 🌙 다크 모드 (업그레이드: 저장 기능 추가) ---

// 1. 다크 모드 켜고 끄기 (버튼 누를 때 실행)
function toggleDarkMode() {
    const body = document.body;
    const btn = document.getElementById("dark-mode-btn");
    
    // 클래스 토글
    body.classList.toggle("dark-mode");

    // ⭐ 핵심: 현재 상태를 브라우저에 '저장'하기
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark"); // "테마는 다크다"라고 적어둠
        if(btn) btn.innerText = "☀️";
    } else {
        localStorage.setItem("theme", "light"); // "테마는 라이트다"라고 적어둠
        if(btn) btn.innerText = "🌙";
    }
}

// 2. 저장된 테마 불러오기 (페이지 열리자마자 실행)
function loadTheme() {
    const theme = localStorage.getItem("theme"); // 쪽지 확인
    const btn = document.getElementById("dark-mode-btn");
    const body = document.body;

    if (theme === "dark") {
        body.classList.add("dark-mode"); // 다크 모드 강제 적용
        if(btn) btn.innerText = "☀️";
    } else {
        body.classList.remove("dark-mode");
        if(btn) btn.innerText = "🌙";
    }
}

// --- ❤️ 좋아요 버튼 (저장 기능 포함) ---

// 1. 좋아요 상태 불러오기 (페이지 열릴 때 실행)
function loadLikeStatus() {
    const btn = document.getElementById('like-btn');
    // 상세 페이지가 아니면(버튼이 없으면) 실행 안 함
    if (!btn) return;

    const countSpan = document.getElementById('like-count');
    const foodName = btn.getAttribute('data-name'); // 이름표(kimchi 등) 확인
    const isLiked = localStorage.getItem('like_' + foodName); // 저장된 기록 확인

    if (isLiked === 'yes') {
        // 저장된 게 있으면 '좋아요' 상태로 변경
        btn.classList.add('liked');
        btn.innerHTML = `❤️ 맛있어요! <span id="like-count">${parseInt(countSpan.innerText) + 1}</span>`;
        btn.style.background = '#ff6b6b';
        btn.style.color = 'white';
    }
}

// 2. 좋아요 버튼 누를 때 (토글 + 저장)
function toggleLike() {
    const btn = document.getElementById('like-btn');
    const countSpan = document.getElementById('like-count');
    const foodName = btn.getAttribute('data-name'); // 이름표 확인
    
    if (btn.classList.contains('liked')) {
        // [취소]
        btn.classList.remove('liked');
        btn.innerHTML = `🤍 맛있겠어요! <span id="like-count">${parseInt(countSpan.innerText) - 1}</span>`;
        btn.style.background = 'white';
        btn.style.color = '#ff6b6b';
        
        // 저장소에서 삭제
        localStorage.removeItem('like_' + foodName);
    } else {
        // [좋아요]
        btn.classList.add('liked');
        btn.innerHTML = `❤️ 맛있어요! <span id="like-count">${parseInt(countSpan.innerText) + 1}</span>`;
        btn.style.background = '#ff6b6b';
        btn.style.color = 'white';
        
        // 저장소에 "이 음식 좋아요 눌렀음" 기록
        localStorage.setItem('like_' + foodName, 'yes');
        
        alert("😍 저도 먹고 싶네요!");
    }
}

// --- ✨ 스크롤 애니메이션 (Intersection Observer) ---
function initScrollAnimation() {
    // 1. 감시자(Observer) 생성
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 화면에 요소가 10% 정도 보이면 실행
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // .active 클래스 추가 (나타남!)
            }
        });
    }, { threshold: 0.1 }); 

    // 2. 애니메이션 적용할 모든 요소 찾아서 감시 시작
    const targetElements = document.querySelectorAll('.scroll-animate');
    targetElements.forEach(el => observer.observe(el));
}