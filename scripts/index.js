const cardList = document.querySelector(".places__list");

// @todo: Темплейт карточки
const cardTimplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(callback, ...cardData) {
  const cardElement = cardTimplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = cardData[0];
  cardElement.querySelector(".card__image").src = cardData[1];

  deleteButton.addEventListener("click", callback);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу
function renderCard(callback, listWhereFrom, listWhere) {
  listWhereFrom.forEach(function (item) {
    listWhere.prepend(createCard(callback, item.name, item.link));
  });
}

renderCard(deleteCard, initialCards, cardList);
