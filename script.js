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
    loadLikeStatus(); // 👈 [추가] 좋아요 상태 확인
    initScrollAnimation(); // 👈 [추가] 애니메이션 감시 시작
    loadComments();    // 👈 [추가] 저장된 댓글 불러오기
    loadIngredients(); // 👈 [추가] 장바구니 상태 복원
};

// 랜덤 메뉴 추천 함수
function pickMenu() {
    const menus = ["김치찌개", "불고기", "비빔밥", "팟타이", "똠양꿍", "그린 커리", "파스타", "피자", "리조또"];
    const randomIndex = Math.floor(Math.random() * menus.length);
    const resultBox = document.getElementById("menu-result");
    
    // 심심하니까 '두구두구...' 효과 내기
    resultBox.innerText = "추첨 중...";
    
    setTimeout(() => {
        resultBox.innerText = menus[randomIndex];
    }, 500); // 0.5초 뒤에 보여줌
}
// --- 💬 댓글 기능 (localStorage 연동) ---

// 1. 페이지별 고유 ID 생성 (파일 이름으로 구분)
const PAGE_ID = window.location.pathname; // 예: '/kimchi.html'

// 2. 댓글 불러오기 (페이지 열릴 때 실행)
function loadComments() {
    const list = document.getElementById("comment-list");
    // 저장된 댓글 가져오기 (없으면 빈 배열)
    const savedComments = JSON.parse(localStorage.getItem("comments_" + PAGE_ID)) || [];

    if (savedComments.length > 0) {
        // 댓글이 있으면 "작성된 댓글이 없습니다" 안내문 삭제
        list.innerHTML = "";
        
        // 저장된 댓글 하나씩 화면에 그리기
        savedComments.forEach(comment => {
            displayComment(comment.text, comment.date);
        });
    }
}

// 3. 댓글 화면에 그리기 (단순 표시용 함수)
function displayComment(text, date) {
    const list = document.getElementById("comment-list");
    const commentBox = document.createElement("div");
    commentBox.style.padding = "10px 0";
    commentBox.style.borderBottom = "1px solid #eee";

    commentBox.innerHTML = `
        <p style="margin: 0 0 5px;"><b>익명</b> 
        <span style="color:#aaa; font-size:0.8rem;">(${date})</span></p>
        <p style="margin: 0;">${text}</p>
    `;
    list.appendChild(commentBox);
}

// 4. 댓글 작성 함수 (버튼 클릭 시 실행)
function addComment() {
    const input = document.getElementById("comment-input");
    const list = document.getElementById("comment-list");
    const text = input.value.trim();

    if (text === "") {
        alert("댓글을 입력해주세요!");
        return;
    }

    // "작성된 댓글이 없습니다" 안내문 삭제 (첫 댓글일 때)
    if (list.children.length === 1 && list.children[0].tagName === "P") {
        list.innerHTML = "";
    }

    // 날짜 생성
    const date = new Date().toLocaleString("ko-KR");

    // 1) 화면에 보여주기
    displayComment(text, date);

    // 2) 로컬 스토리지에 저장하기 (핵심!)
    saveCommentToStorage(text, date);

    // 입력창 비우기
    input.value = "";
}

// 5. 저장소에 진짜로 저장하는 함수
function saveCommentToStorage(text, date) {
    // 기존 댓글 목록 가져오기
    const savedComments = JSON.parse(localStorage.getItem("comments_" + PAGE_ID)) || [];
    
    // 새 댓글 추가
    savedComments.push({ text: text, date: date });
    
    // 다시 저장 (문자열로 변환)
    localStorage.setItem("comments_" + PAGE_ID, JSON.stringify(savedComments));
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
        btn.innerHTML = `❤️<span id="like-count">${newCount}</span>`;
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
        btn.innerHTML = `❤️<span id="like-count">${parseInt(countSpan.innerText) + 1}</span>`;
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
        btn.innerHTML = `❤️<span id="like-count">${parseInt(countSpan.innerText) + 1}</span>`;
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

// --- ⬆️ 맨 위로 가기 버튼 기능 ---

// 1. 스크롤 감지 (조금 내리면 버튼 등장)
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    const topBtn = document.getElementById("top-btn");
    if (topBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.style.display = "block"; // 300px 이상 내리면 보임
        } else {
            topBtn.style.display = "none";  // 아니면 숨김
        }
    }
}

// 2. 버튼 누르면 위로 슝~
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// --- 🛒 장보기 기능 (저장 기능 포함) ---

// 1. 저장된 인분 & 체크리스트 불러오기 (페이지 열릴 때 실행)
function loadIngredients() {
    // A. 인분 수 복원
    const savedServings = localStorage.getItem("servings_" + window.location.pathname);
    if (savedServings) {
        const currentServings = parseInt(savedServings);
        // 화면 숫자 업데이트
        document.getElementById("servings-num").innerText = currentServings;
        // 재료 양(g) 업데이트 (1인분 기준값 * 저장된 인분)
        const ingredients = document.querySelectorAll(".amt");
        ingredients.forEach(item => {
            const baseAmount = parseFloat(item.getAttribute("data-base"));
            const newAmount = baseAmount * currentServings;
            item.innerText = Number.isInteger(newAmount) ? newAmount : newAmount.toFixed(1);
        });
    }

    // B. 체크리스트 복원
    const savedChecks = JSON.parse(localStorage.getItem("checks_" + window.location.pathname)) || [];
    const listItems = document.querySelectorAll(".ingredient-list li");
    
    // 저장된 번호(index)에 해당하는 항목에 .checked 클래스 붙이기
    savedChecks.forEach(index => {
        if (listItems[index]) {
            listItems[index].classList.add("checked");
        }
    });
}

// 2. 인분 변경 함수 (+, - 버튼)
function changeServings(change) {
    const servingsSpan = document.getElementById("servings-num");
    let currentServings = parseInt(servingsSpan.innerText);

    let newServings = currentServings + change;
    if (newServings < 1) return;

    // A. 화면 업데이트
    servingsSpan.innerText = newServings;
    const ingredients = document.querySelectorAll(".amt");
    ingredients.forEach(item => {
        const baseAmount = parseFloat(item.getAttribute("data-base"));
        const newAmount = baseAmount * newServings;
        item.innerText = Number.isInteger(newAmount) ? newAmount : newAmount.toFixed(1);
    });

    // B. 저장 (페이지별로 따로 저장)
    localStorage.setItem("servings_" + window.location.pathname, newServings);
}

// 3. 재료 체크 함수 (클릭 시 줄 긋기 & 저장)
function toggleCheck(element) {
    // A. 화면 스타일 변경
    element.classList.toggle("checked");

    // B. 현재 체크된 항목들의 번호(index)를 모두 수집해서 저장
    const listItems = document.querySelectorAll(".ingredient-list li");
    const checkedIndices = [];

    listItems.forEach((item, index) => {
        if (item.classList.contains("checked")) {
            checkedIndices.push(index); // 체크된 녀석의 번호를 저장 (예: 0번, 2번...)
        }
    });

    // 배열을 문자열로 바꿔서 저장
    localStorage.setItem("checks_" + window.location.pathname, JSON.stringify(checkedIndices));
}