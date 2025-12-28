const reviews = [
    {
        id: 1,
        name: "Annu",
        job: "backend programmer",
        img:
            "pics/Me.jpg",
        info:
        "具備整理和撰寫文件的專長，並且熟練於Python程式語言，目前也在積極學習Java程式碼,在Linebot聊天機器人、JavaScript、SQL資料庫、網頁前後端、人工智慧和資料爬蟲等領域有一定涉獵，對這些技術有一定的了解,工作上具有積極主動的態度，處事冷靜且深思熟慮，熱愛與團隊協作，並且樂於學習新知識和技能"
    },
];


// select items
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

// footer year（support #year or old #date）
const yearSpan = document.getElementById("year") || document.getElementById("date");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

//close links
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

if (navToggle && linksContainer && links) {
    navToggle.addEventListener("click", function (){
        // linkContainer.classList.toggle("show-links");
        const linksHeight = links.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;

        if (containerHeight === 0) {
            linksContainer.style.height = `${linksHeight}px`;
        } 
        else {
            linksContainer.style.height = 0;
        }
    });
}

//fix navbar
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener('scroll', function(){
    if(!navbar || !topLink) return;

    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;

    if (scrollHeight > navHeight) {
        navbar.classList.add('fixed-nav');
    }
    else{
        navbar.classList.remove('fixed-nav');
    }

    if(scrollHeight > 500){
        topLink.classList.add("show-link");
    }else{
        topLink.classList.remove("show-link");
    }
});

//select links
const scrolllinks = document.querySelectorAll(".scroll-link, .scroll-link");

scrolllinks.forEach(function(link){
    link.addEventListener("click", function(e){
        const href = e.currentTarget.getAttribute("href")
        if (!href || !href.startsWith("#")) return;

        //prevent Default
        e.preventDefault();

        //nagative to specific spot
        const id = e.currentTarget.getAttribute(".href").slice(1);
        const element = document.getElementById(id);

        //calculate heights
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;

        const fixedNav = navbar.classList.contains("fixed-nav");
        let position = element.offsetTop - navHeight;

        if (!fixedNav) {
            position = position - navHeight;
        }
        if (navHeight > 82) {
            position = position + containerHeight;
        }

        window.scrollTo({
            left: 0,
            top: position,
            behavior: "smooth"
        });
        
        linksContainer.style.height = 0;
    });
});

//preloder
const preloader = document.querySelector('.preloader');

window.addEventListener('load', function(){
    preloader.classList.add("hide-preloader");
});

//set starting item
let currentItem = 0;

function showPerson() {
    const item = reviews[currentItem];
    img.src = item.img; 
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.info; 
}

//load intial item
if (img && author && job && info) {
    window.addEventListener("DOMContentLoaded", function () {
    showPerson();
  });
}