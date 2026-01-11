const modalBtn = document.querySelector('.modal-btn');
const modal = document.querySelector('.modal-overlay');

modalBtn.addEventListener('click',function(){
    modal.classList.add('open-modal');
});
modal.addEventListener('click',function(){
    modal.classList.remove('open-modal');
});
