let size = window.innerWidth;
const bar = window.document.querySelector(".toggle-bar");
const links = window.document.querySelector('.nav-links');
bar.style.display = 'none';

if (size < 900) {
  bar.style.display = 'block';
 

  bar.addEventListener('click',()=>{
      links.classList.toggle('toggle');
  })
}else{
  links.style.display='flex';
}