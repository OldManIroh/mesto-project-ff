import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeButtonActive } from "./components/card.js";
import { popupVisible } from "./components/modal.js";

const cardList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
function renderCard(callback, listWhereFrom, listWhere) {
  listWhereFrom.forEach(function (item) {
    listWhere.prepend(createCard(callback, item));
  });
}

renderCard(deleteCard, initialCards, cardList);

//кнопка редактирования профиля
const buttonEdit = document.querySelector(".profile__edit-button");
//модульное окно редактирования профиля
const popupEdit = document.querySelector(".popup_type_edit");

//кнопка создания новой карточки
const buttonNewCard = document.querySelector(".profile__add-button");
//модульное окно создания новой карточки
const popupNewCard = document.querySelector(".popup_type_new-card");

//модульное окно открытия картинки
const popupImage = document.querySelector(".popup_type_image");

//Добавление к попапам класс для закрытия т.к. при добавления через функцию первое открытие нормально не работает
popupEdit.classList.add("popup_is-animated");
popupNewCard.classList.add("popup_is-animated");
popupImage.classList.add("popup_is-animated");

//при клике на на кнопку редактирования профиля, открытие модального окна
buttonEdit.addEventListener("click", function () {
  //добавление в модульное окно редактирования профиля нынешних значения
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  popupVisible(popupEdit);
});
//Закрытие модального окна редактирования профиля
popupEdit.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    popupVisible(popupEdit);
  }
});
popupEdit.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    popupVisible(popupEdit);
  }
});

////при клике на на кнопку создания карточки, открытие модального окна
buttonNewCard.addEventListener("click", function () {
  popupVisible(popupNewCard);
});
//Закрытие модального окна созадния карточки
popupNewCard.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    popupVisible(popupNewCard);
  }
});
popupNewCard.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    popupVisible(popupNewCard);
  }
});

//При клике на картинку, открытие модального для просмотра картинка
cardList.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__image")) {
    popupVisible(popupImage);
  }
});
//Закрытие модального окна просмотра картинки
popupImage.addEventListener("click", function (evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    popupVisible(popupImage);
  }
});
popupImage.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    popupVisible(popupImage);
  }
});

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//форма редактирования профиля
const formElement = document.forms["edit-profile"];
//новое имя
const nameInput = formElement.querySelector(".popup__input_type_name");
//новая работа
const jobInput = formElement.querySelector(".popup__input_type_description");
//нынешнее имя профиля
const profileTitle = document.querySelector(".profile__title");
//нынешняя работа
const profileDescription = document.querySelector(".profile__description");

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const valueName = nameInput.value;
  const valueJob = jobInput.value;

  profileTitle.textContent = valueName;
  profileDescription.textContent = valueJob;
  popupVisible(popupEdit);
}

formElement.addEventListener("submit", handleFormSubmit);

//форма для новой крточки
const formCard = document.forms["new-place"];
//имя карточки
const nameCard = formCard.querySelector(".popup__input_type_card-name");
//ссылка на карточку
const linkCard = formCard.querySelector(".popup__input_type_url");

function cardFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newCard = [
    {
      name: nameCard.value,
      link: linkCard.value,
    },
  ];
  renderCard(deleteCard, newCard, cardList);
  popupVisible(popupNewCard);
  nameCard.value = "";
  linkCard.value = "";
}

//добавление карточки
formCard.addEventListener("submit", cardFormSubmit);

//ПОСТАВИТЬ ЛАЙК

cardList.addEventListener("click", likeButtonActive);

//ОТКРЫТИЕ КАРТИНКИ

function openImage(evt) {
  const image = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");
  image.src = evt.target.src;
  caption.textContent = evt.target.alt;
}

cardList.addEventListener("click", openImage);
