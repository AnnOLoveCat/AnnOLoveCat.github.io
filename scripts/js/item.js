
const btns = document.querySelectorAll(".tab-btn");
const aboutTabs = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

if (aboutTabs && btns.length > 0 && articles.length > 0) {
aboutTabs.addEventListener("click", function(e){
    // console.log(e.target.dataset.id);

    const id = e.target.dataset.id;

    if(id){
        //remove active from other buttons
        btns.forEach(function(btn){
            btn.classList.remove("active");
            e.target.classList.add("active");
        });
        //hide other article
        articles.forEach(function(article){
            article.classList.remove("active");
        });

        const element = document.getElementById(id);
        element.classList.add("active");
    }
    });
}

