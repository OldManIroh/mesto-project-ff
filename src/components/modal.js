export function popupVisible(popup) {
  if (popup.classList.contains("popup_is-opened")) {
    popup.classList.replace("popup_is-opened", "popup_is-animated");
  } else {
    popup.classList.replace("popup_is-animated", "popup_is-opened");
  }
}
