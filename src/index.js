import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeButtonActive } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const cardList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
function renderInitialCards(deleteCard, listWhereFrom, listWhere) {
  listWhereFrom.forEach(function (item) {
    listWhere.prepend(createCard(deleteCard, item, likeButtonActive, openImage));
  });
}

renderInitialCards(deleteCard, initialCards, cardList);

//кнопка редактирования профиля
const buttonOpenEditProfilePopup = document.querySelector(".profile__edit-button");
//модульное окно редактирования профиля
const popupEditProfile = document.querySelector(".popup_type_edit");

//кнопка создания новой карточки
const buttonNewCard = document.querySelector(".profile__add-button");
//модульное окно создания новой карточки
const popupNewCard = document.querySelector(".popup_type_new-card");

//модульное окно открытия картинки
const popupImage = document.querySelector(".popup_type_image");


//при клике на на кнопку редактирования профиля, открытие модального окна
buttonOpenEditProfilePopup.addEventListener("click", function () {
  //добавление в модульное окно редактирования профиля нынешних значения
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
  
});

////при клике на на кнопку создания карточки, открытие модального окна
buttonNewCard.addEventListener("click", function(){
  openPopup(popupNewCard);
});



//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//форма редактирования профиля
const formEditProfile = document.forms["edit-profile"];
//новое имя
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
//новая работа
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
//нынешнее имя профиля
const profileTitle = document.querySelector(".profile__title");
//нынешняя работа
const profileDescription = document.querySelector(".profile__description");

function submitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const valueName = nameInput.value;
  const valueJob = jobInput.value;

  profileTitle.textContent = valueName;
  profileDescription.textContent = valueJob;
  openPopup(popupEditProfile);
  closePopup(popupEditProfile)
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

//форма для новой крточки
const formCard = document.forms["new-place"];
//имя карточки
const nameCard = formCard.querySelector(".popup__input_type_card-name");
//ссылка на карточку
const linkCard = formCard.querySelector(".popup__input_type_url");

function renderCard (deleteCard, listWhereFrom, listWhere ){
  listWhere.prepend(createCard(deleteCard, listWhereFrom, likeButtonActive, openImage));
}

function submitAddCardForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newCard = [
    {
      name: nameCard.value,
      link: linkCard.value,
    },
  ];
  
  renderCard (deleteCard, newCard[0], cardList )
  closePopup(popupNewCard);
  formCard.reset();
}

//добавление карточки
formCard.addEventListener("submit", submitAddCardForm);
// renderCard(deleteCard, newCard, cardList);
//ПОСТАВИТЬ ЛАЙК



//ОТКРЫТИЕ КАРТИНКИ
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

export function openImage(evt) {

  image.src = evt.target.src;
  caption.textContent = evt.target.alt;
  image.alt = evt.target.alt;
  //При клике на картинку, открытие модального для просмотра картинка
cardList.addEventListener("click", openPopup(popupImage));
}


