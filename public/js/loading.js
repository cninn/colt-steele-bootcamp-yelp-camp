
const body = document.body;
const loadingFunction = () =>{
    const loading = document.querySelector('.loading');
document.addEventListener('DOMContentLoaded', function(){
    loading.style.display='flex';
    body.style.overflow='hidden';
    setTimeout(() => {
        loading.style.display='none';
        body.style.overflow='auto';
    }, 2000);
});
}
loadingFunction();

module.exports = loadingFunction;