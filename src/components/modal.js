const page = document.querySelector('.page');

export function openPopup(popup){
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click',closeByOverlay)
  page.addEventListener('keydown',closeByEsc)
}

export function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click',closeByOverlay);
  page.removeEventListener('keydown',closeByEsc);
}

function closeByOverlay(evt){
  
  if (evt.target.classList.contains("popup__close") ||
  evt.target.classList.contains("popup")){
   closePopup(evt.currentTarget)
  } 

}

function closeByEsc(evt){
  console.log(evt.key)
  if(evt.key === 'Escape'){
      const popup = document.querySelector('.popup_is-opened');
       closePopup(popup);
  }
}