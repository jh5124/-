// --- 1. 데이터 (나라별 카드) ---
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
        category: "미정",
        title: "미정",
        desc: "미정",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        link: "mexico.html" // 이동할 페이지
    }
];

// --- 2. 카드 만들기 함수 ---
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

// --- 3. 스크롤 이동 함수 ---
function scrollToContent() {
    const mainSection = document.getElementById('main-content');
    if(mainSection) {
        mainSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- 4. 시계 함수 ---
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

// --- 5. 통합 실행 ---
window.onload = function() {
    renderPosts();       // 카드 그리기
    updateClock();       // 시계 초기화
    setInterval(updateClock, 1000); // 시계 작동
};