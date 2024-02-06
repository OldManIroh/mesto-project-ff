import { data } from "autoprefixer";
import {  uninstallCard, likeCard, deleteLike } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(deleteCard, cardData, likeButtonActive, openImage, profileId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.dataset.id = cardData._id;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  const countLike = cardElement.querySelector(".card__count-like")

  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = cardData.name;
 
  countLike.textContent = cardData.likes.length;

  const cardImage = cardElement.querySelector(".card__image");
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  
  likeButton.addEventListener("click", likeButtonActive);
  cardImage.addEventListener("click", openImage);


  if (profileId != cardData.owner._id){
    deleteButton.remove()
  }else{
    deleteButton.addEventListener("click", deleteCard);
  }

  if(cardData.likes.some(element => element._id === profileId)){ 
    likeButton.classList.add("card__like-button_is-active"); 
  }

  return cardElement;
}

// @todo: Функция удаления карточки
/*export function deleteCard(evt) {
  const card = evt.target.closest(".card");

  uninstallCard(card.dataset.id).then((data) => {
    if(data.message == 'Пост удалён'){
      card.remove();
    }
  })
  .catch(err => console.log(err));
}*/

//Установка/убрать лайк
export function likeButtonActive(evt) {
   const cardId = evt.target.closest(".card").dataset.id;
   const likeMethod = evt.target.classList.contains("card__like-button_is-active") ? deleteLike : likeCard;
   likeMethod(cardId) 
           .then((data) => {
              evt.target.nextElementSibling.textContent = data.likes.length 
             evt.target.classList.toggle("card__like-button_is-active"); 
           })
   .catch(err => console.log(err));
}


