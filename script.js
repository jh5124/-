// 1. 여기에 보여주고 싶은 요리 카드 데이터를 넣으세요.
const posts = [
    {
        id: 1,
        category: "이탈리아 요리", // HTML 메뉴와 통일
        title: "정통 까르보나라",
        desc: "생크림 없이 계란 노른자와 치즈로만 만드는 이탈리아 정통 방식입니다.",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        category: "한국 요리",
        title: "소울 푸드, 김치찌개",
        desc: "돼지고기와 묵은지의 환상적인 조화. 밥 두 공기 뚝딱하는 레시피.",
        image: "https://static.wtable.co.kr/image/production/service/recipe/291/a2421dff-e56c-40bd-8b40-06a91fc000a9.jpg"
    },
    {
        id: 3,
        category: "(미정) 요리", // 나중에 정해지면 수정
        title: "아직 메뉴를 고르는 중",
        desc: "어떤 나라의 맛있는 요리가 올라올까요? 기대해주세요!",
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=60" // 임시 타코 사진
    }
];

// 2. HTML에서 'post-grid'라는 아이디를 가진 박스를 찾아옵니다.
const grid = document.getElementById('post-grid');

// 3. 카드를 만들어서 화면에 뿌려주는 함수
function renderPosts() {
    // 로딩 문구("불러오는 중...")를 지우고 시작
    grid.innerHTML = ""; 

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card'; // CSS에서 .card 스타일을 적용받음
        
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="card-content">
                <span class="category">${post.category}</span>
                <h4 class="card-title">${post.title}</h4>
                <p class="card-desc">${post.desc}</p>
                <a href="#" style="color: #ff6b6b; font-weight: bold;">더 읽기 →</a>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// 4. [요리 구경하기] 버튼 누르면 아래로 부드럽게 내려가는 함수
function scrollToContent() {
    const mainSection = document.getElementById('main-content');
    if(mainSection) {
        mainSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// 5. 사이트가 켜지면 renderPosts 함수를 바로 실행해라!
window.onload = renderPosts;
// script.js 맨 아래에 추가하세요

function updateClock() {
    const now = new Date();
    
    // 날짜 포맷 (예: 2024.11.17 (일))
    const dateString = now.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short'
    });

    // 시간 포맷 (예: 14:30:45)
    const timeString = now.toLocaleTimeString('ko-KR', {
        hour12: false, // 24시간제 (오후 2시 -> 14시)
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // 화면에 찍어주기 (요소가 있을 때만 실행)
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');

    if (dateElement && timeElement) {
        dateElement.innerText = dateString;
        timeElement.innerText = timeString;
    }
}

// 1초(1000ms)마다 updateClock 함수 실행
setInterval(updateClock, 1000);

// 페이지 켜지자마자 한 번 실행 (안 하면 1초 기다렸다 뜸)
updateClock();