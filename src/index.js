import "./pages/index.css";
// import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeButtonActive } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validate.js";
import {
  getAllCard,
  downloadProfile,
  uploadProfile,
  uploadCard,
  uploadAvatar,
} from "./components/api.js";
const cardList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
function renderInitialCards(deleteCard, listWhereFrom, listWhere, profileId) {
  listWhereFrom.forEach(function (item) {
    listWhere.append(
      createCard(deleteCard, item, likeButtonActive, openImage, profileId)
    );
  });
}
const profileImage = document.querySelector(".profile__image");

Promise.all([getAllCard(), downloadProfile()])
  .then(([dataCard, dataProfile]) => {
    renderInitialCards(deleteCard, dataCard, cardList, dataProfile._id);
    profileImage.style = `background-image: url('${dataProfile.avatar}');`;
    profileTitle.textContent = dataProfile.name;
    profileDescription.textContent = dataProfile.about;
  })
  .catch((err) => console.log(err));

const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);
//модульное окно редактирования профиля
const popupEditProfile = document.querySelector(".popup_type_edit");
//кнопка создания новой карточки, открытие модального окна
const buttonNewCard = document.querySelector(".profile__add-button");
//модульное окно создания новой карточки
const popupNewCard = document.querySelector(".popup_type_new-card");

//модульное окно открытия картинки
const popupImage = document.querySelector(".popup_type_image");

//ИЗМЕНЕНИЕ АВАТАРА
const buttonProfileImage = document.querySelector(".profile__image");
//попап изменеие аватара
const popupProfileImage = document.querySelector(".popup_type_new-avatar");
//форма изменение аватара
const formEditAvatar = document.forms["new-avatar"];
//Инпут в форме изменения аватара
const urlInput = formEditAvatar.querySelector(".popup__input_type_url");
// кнопка сохранения на окне для аватара
const buttonSaveAvatar = formEditAvatar.querySelector(".button");
//открытие попап на изменение аватара
buttonProfileImage.addEventListener("click", function () {
  clearValidation(formEditAvatar, validationConfig);
  buttonSaveAvatar.textContent = "Сохранить";
  buttonSaveAvatar.classList.remove("blink-button");
  openPopup(popupProfileImage);
});

function submitEditAvatarForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const urlImage = urlInput.value;
  buttonSaveAvatar.textContent = "Сохранение...";
  buttonSaveAvatar.classList.add("blink-button");
  uploadAvatar({ avatar: urlImage })
    .then((data) => {
      profileImage.style = `background-image: url('${data.avatar}');`;
      closePopup(popupProfileImage);
    })
    .catch((err) => console.log(err));
}
formEditAvatar.addEventListener("submit", submitEditAvatarForm);

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
//форма редактирования профиля
const formEditProfile = document.forms["edit-profile"];
//новое имя
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
//новая работа
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
//нынешнее имя профиля
const profileTitle = document.querySelector(".profile__title");
//нынешняя работа
const profileDescription = document.querySelector(".profile__description");
// кнопка сохранения изменённого профиля
const buttonSaveProfile = formEditProfile.querySelector(".button");
//при клике на на кнопку редактирования профиля, открытие модального окна
buttonOpenEditProfilePopup.addEventListener("click", function () {
  //добавление в модульное окно редактирования профиля нынешних значения
  clearValidation(formEditProfile, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  buttonSaveProfile.textContent = "Сохранить";
  buttonSaveProfile.classList.remove("blink-button");
  openPopup(popupEditProfile);
});

function submitEditProfileForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const valueName = nameInput.value;
  const valueJob = jobInput.value;
  buttonSaveProfile.textContent = "Сохранение...";
  buttonSaveProfile.classList.add("blink-button");
  uploadProfile({ name: valueName, about: valueJob })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => console.log(err));
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

//НОВАЯ КАРТОЧКА
//форма для новой крточки
const formCard = document.forms["new-place"];
//имя карточки
const nameCard = formCard.querySelector(".popup__input_type_card-name");
//ссылка на карточку
const linkCard = formCard.querySelector(".popup__input_type_url");
// кнопка на форме для добавления карточки
const buttonSaveCard = formCard.querySelector(".button");
////при клике  на кнопку создания карточки, открытие модального окна
buttonNewCard.addEventListener("click", function () {
  clearValidation(formCard, validationConfig);
  buttonSaveCard.textContent = "Сохранить";
  buttonSaveCard.classList.remove("blink-button");
  openPopup(popupNewCard);
});

function renderCard(deleteCard, listWhereFrom, listWhere, profileId) {
  listWhere.prepend(
    createCard(
      deleteCard,
      listWhereFrom,
      likeButtonActive,
      openImage,
      profileId
    )
  );
}

function submitAddCardForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const newCard = {
    name: nameCard.value,
    link: linkCard.value,
  };
  buttonSaveCard.textContent = "Сохранение...";
  buttonSaveCard.classList.add("blink-button");
  uploadCard(newCard)
    .then((data) => {
      renderCard(deleteCard, data, cardList, data.owner._id);
      closePopup(popupNewCard);
    })
    .catch((err) => console.log(err));
}

//добавление карточки
formCard.addEventListener("submit", submitAddCardForm);

//ПОСТАВИТЬ ЛАЙК

//ОТКРЫТИЕ КАРТИНКИ
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

export function openImage(evt) {
  image.src = evt.target.src;
  caption.textContent = evt.target.alt;
  image.alt = evt.target.alt;
  //При клике на картинку, открытие модального для просмотра картинка
  openPopup(popupImage);
}

//валидация
const validationConfig = {
  formSelector: ".popup__form",
  buttonSelector: ".popup__button",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorElementClass: "message-error_active",
  disbledButtonClass: "popup__btn_disabled",
};
enableValidation(validationConfig);
