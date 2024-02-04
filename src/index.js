import "./pages/index.css";
// import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeButtonActive } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import {enableValidation} from "./components/validate.js";
import {getAllCard, downloadProfile, uploadProfile, uploadCard, uploadAvatar} from "./components/api.js";
const cardList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
function renderInitialCards(deleteCard, listWhereFrom, listWhere, profileId) {
  listWhereFrom.forEach(function (item) {
    listWhere.append(createCard(deleteCard, item, likeButtonActive, openImage, profileId));
  });
}
const profileImage = document.querySelector('.profile__image');

Promise.all([getAllCard(), downloadProfile()])
    .then(([dataCard, dataProfile]) => {
      console.log(dataProfile);
      renderInitialCards(deleteCard, dataCard, cardList, dataProfile._id);
      profileImage.style = `background-image: url('${dataProfile.avatar}');`;
      profileTitle.textContent = dataProfile.name;
      profileDescription.textContent = dataProfile.about;
      
      
    })





const buttonOpenEditProfilePopup = document.querySelector(".profile__edit-button");
//модульное окно редактирования профиля
const popupEditProfile = document.querySelector(".popup_type_edit");

//кнопка создания новой карточки
const buttonNewCard = document.querySelector(".profile__add-button");
//модульное окно создания новой карточки
const popupNewCard = document.querySelector(".popup_type_new-card");

//модульное окно открытия картинки
const popupImage = document.querySelector(".popup_type_image");
//Кнопка-аватар

//при клике на на кнопку редактирования профиля, открытие модального окна
buttonOpenEditProfilePopup.addEventListener("click", function () {
  //добавление в модульное окно редактирования профиля нынешних значения
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
  
});

//ИЗМЕНЕНИЕ АВАТАРА
const buttonProfileImage = document.querySelector(".profile__image");
//попап изменеие аватара
const popupProfileImage = document.querySelector(".popup_type_new-avatar")
//форма изменение аватара
const formEditAvatar = document.forms["new-avatar"];
//Инпут в форме изменения аватара
const urlInput = formEditAvatar.querySelector(".popup__input_type_url");
//открытие попап на изменение аватара
buttonProfileImage.addEventListener("click", function(){
  openPopup(popupProfileImage)
});
function submitEditAvatarForm(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const urlImage = urlInput.value;
  profileImage.style = `background-image: url('${urlImage}');`;
  uploadAvatar({avatar: urlImage});
  closePopup(popupProfileImage)
}
formEditAvatar.addEventListener('submit', submitEditAvatarForm);

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
  uploadProfile({name:valueName, about: valueJob})

  closePopup(popupEditProfile)
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

//форма для новой крточки
const formCard = document.forms["new-place"];
//имя карточки
const nameCard = formCard.querySelector(".popup__input_type_card-name");
//ссылка на карточку
const linkCard = formCard.querySelector(".popup__input_type_url");

function renderCard (deleteCard, listWhereFrom, listWhere, profileId){
  listWhere.prepend(createCard(deleteCard, listWhereFrom, likeButtonActive, openImage, profileId));
}

function submitAddCardForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newCard = 
    {
      name: nameCard.value,
      link: linkCard.value,
    };
  
  uploadCard(newCard).then((data)=>{
    renderCard (deleteCard, data, cardList, data.owner._id)
  });
  
  closePopup(popupNewCard);
  formCard.reset();
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
const formConfiguration = {
  formSelector: '.popup__form',
  buttonSelector: '.popup__button',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorElementClass: 'message-error_active',
  disbledButtonClass:'popup__btn_disabled'
}
enableValidation(formConfiguration)

