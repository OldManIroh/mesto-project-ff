const cardTimplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(callback, cardData, likeButtonActive, openImage) {
  const cardElement = cardTimplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;

  deleteButton.addEventListener("click", callback);
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

//ЭТО СОЗДАНИЕ КАРТОЧКИ

// Находим форму в DOM

// Находим поля формы в DOM
