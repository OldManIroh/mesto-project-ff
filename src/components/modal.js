

export function openPopup(popup){
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click',closeByOverlay)
  popup.addEventListener('keydown',closeByEsc)
}

export function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click',closeByOverlay);
  popup.removeEventListener('keydown',closeByOverlay);
}

function closeByOverlay(evt){
  
  if (evt.target.classList.contains("popup__close") ||
  evt.target.classList.contains("popup")){
   evt.currentTarget.classList.remove('popup_is-opened');
   evt.currentTarget.removeEventListener('click',closeByOverlay);
  } 

}

function closeByEsc(evt){
  evt.preventDefault()
  if(evt.key === 'Escape'){
    evt.currentTarget.classList.remove('popup_is-opened');
    evt.currentTarget.removeEventListener('keydown',closeByOverlay);
  }
}