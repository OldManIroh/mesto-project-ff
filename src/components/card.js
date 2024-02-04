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
  deleteButton.addEventListener("click", deleteCard);

  if (profileId != cardData.owner._id){
    deleteButton.remove()
  }
  cardData.likes.forEach(element => {
    if(element._id === profileId){
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  const card = evt.target.closest(".card");
  uninstallCard(card.dataset.id)
  
  card.remove();

}

//Установка/убрать лайк
export function likeButtonActive(evt) {
   const cardId = evt.target.closest(".card").dataset.id;
  if (evt.target.classList.contains("card__like-button_is-active")) {
    evt.target.classList.remove("card__like-button_is-active");
    deleteLike(cardId).then((data)=>{
      evt.target.nextElementSibling.textContent = data.likes.length

    });
  }else{
    evt.target.classList.add("card__like-button_is-active");
    likeCard(cardId).then((data)=>{
      evt.target.nextElementSibling.textContent = data.likes.length

    });;
  }
}


