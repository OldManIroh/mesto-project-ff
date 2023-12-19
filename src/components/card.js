
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(deleteCard, cardData, likeButtonActive, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");

  const likeButton = cardElement.querySelector(".card__like-button");

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  
  likeButton.addEventListener("click", likeButtonActive);
  cardImage.addEventListener("click", openImage);
  deleteButton.addEventListener("click", deleteCard);


  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

//Установка/убрать лайк
export function likeButtonActive(evt) {
  
  evt.target.classList.toggle("card__like-button_is-active");
}


// function getCardTemplate(){
//   const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
// }