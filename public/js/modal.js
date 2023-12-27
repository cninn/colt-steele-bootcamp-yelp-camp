const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('close-modal');
const modalForm = document.getElementById('modal-form');
const body = document.body;

modalForm.style.display='none';

openModal.addEventListener('click',()=>{
  modalForm.style.display='block';
 /*  body.style.overflow = 'hidden'; */
})
closeModal.addEventListener('click',()=>{
  modalForm.style.display='none';
 /*  body.style.overflow = 'auto'; */
})