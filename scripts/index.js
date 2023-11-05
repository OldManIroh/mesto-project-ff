const cardList = document.querySelector(".places__list");
// @todo: Темплейт карточки
function addCard(nameCard, srcCard) {
  const cardTimplate = document.querySelector("#card-template").content;
  const cardElement = cardTimplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = srcCard;
  cardElement.querySelector(".card__title").textContent = nameCard;
  cardList.append(cardElement);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.parentElement.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});
