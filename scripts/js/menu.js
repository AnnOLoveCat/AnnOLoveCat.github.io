const menu = [
    {
      id: 1,
      title: "python",
      html:"python.html",
      category: "code",
      date: '2021/06/21',
      img: "/pics/python.png",
      desc: `python and some jupyter basic notes `,
    },
    {
      id: 2,
      title: "java",
      html:"java.html",
      category: "code",
      date: '2022/06/27',
      img: "/pics/Java.jpg",
      desc: `java's notes, with some basic information`,
    },
    {
      id: 3,
      title: "html, css",
      category: "code",
      date:' 2021/07/23',
      img: "/pics/html_css.png",
      desc: `html with css basic samples`,
    },
    {
      id: 4,
      title: "mysql",
      category: "code",
      date: '2022/07/03',
      img: "/pics/MySQL.png",
      desc: `only super simple code,so here's notes just pretty less`,
    },
    {
        id: 5,
        title: "unfunny didn't laugh",
        category: "funny",
        date:' 2021/07/24',
        img: "/pics/doll.png",
        desc: `funny go haha`,
      },
];
const sectionCenter = document.querySelector(".section-center");
const container = document.querySelector(".btn-container");

// add buttons
window.addEventListener("DOMContentLoaded",function(){
    displayMenuItems(menu);
    displayMenuButtons();
});

//load items
function displayMenuItems(menuItems){
    let displayMenu = menuItems.map(function(item){
        // return '<h1>' + item.title + '</h1>';

        return `<article class="menu-item">
                    <a href= ${item.html}>
                    <img src=${item.img} class = "photo" alt=${item.title} />
                    </a>
                </article>
                <div class="item-info">
                    <header>
                        <h4>${item.title}</h4>
                        <h4 class="date">${item.date}</h4>
                    </header>
                    <p class = "item-text">${item.desc}</p>
                </div>`
    });
    displayMenu = displayMenu.join("");
    sectionCenter.innerHTML = displayMenu;
};

function displayMenuButtons(){
    
    const categories = menu.reduce(function(values,item){
        if (!values.includes(item.category)) {
            values.push(item.category);
        }
        return values;
    },['all']);
    const categoryBtns = categories.map(function(category){
        return `<button class = "filter-btn" type ="button" data-id="${category}">${category}</button>`;
    }).join("");
    container.innerHTML = categoryBtns;
    
    const filterBtns = container.querySelectorAll(".filter-btn");

    //filter items by category
    filterBtns.forEach(function (btn){
        btn.addEventListener('click',function(e){
            const category = e.currentTarget.dataset.id;
            const menuCategory = menu.filter(function(menuItem){
                if (menuItem.category === category) {
                    return menuItem;
                }
            });
            if (category === "all") {
                displayMenuItems(menu);
            }else{
                displayMenuItems(menuCategory);
            }
        });
    });
};