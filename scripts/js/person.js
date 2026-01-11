const reviews = [
    {
        id: 1,
        name: "Annu",
        job: "backend programmer",
        img:
            "pics/Me.jpg",
        info:
            "gmail:gordon.kao118@gmail.com github:AnnOLoveCat",
    },
];


// select items
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

//set starting item
let currentItem = 0;


//load intial item
window.addEventListener("DOMContentLoaded",function(){
    showPerson();
});

function showPerson() {
    const item = reviews[currentItem];
    img.src = item.img; 
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.info; 
}

// show next person
nextBtn.addEventListener("click", function () {
    currentItem++;
    if (currentItem > reviews.length - 1) {
      currentItem = 0;
    }
    showPerson(currentItem);
});

// show prev person
prevBtn.addEventListener("click", function () {
    currentItem--;
    if (currentItem < 0) {
        currentItem = reviews.length - 1;
    }
    showPerson(currentItem);    
});

//show random person
randomBtn.addEventListener("click", function () {
    currentItem = Math.floor(Math.random() * reviews.length);
    showPerson(currentItem);
});