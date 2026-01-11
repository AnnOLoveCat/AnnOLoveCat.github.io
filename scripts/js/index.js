// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

const questionbtns = document.querySelectorAll('.question-btn');
const questions = document.querySelectorAll('.question');

navToggle.addEventListener("click", function () {

    // if (links.classList.contains("show-links")) {
    //   links.classList.remove("show-links");
    // } else {
    //   links.classList.add("show-links");
    // }
    
    links.classList.toggle("show-links");
});
questions.forEach(function(question){
    const btn = question.querySelector('.question-btn');

    btn.addEventListener('click',function(){
        questions.forEach(function(item){
            if (item !== question) {
                item.classList.remove('show-item');
            };
        });
        question.classList.toggle('show-text');
    });
});