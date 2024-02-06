import { data } from "autoprefixer";

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-5",
  headers: {
    authorization: "7421b7ff-3150-48f1-a246-4be3eb3d36d3",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) =>{

        if (res.ok) {
          return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`);
      
}

export const getAllCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
  .then(res => handleResponse(res));
};

export const downloadProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
  .then(res => handleResponse(res));
};

export const uploadProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res));
};

export const uploadAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res));
};

export const uploadCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res));
};
export const uninstallCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleResponse(res));
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(res => handleResponse(res));
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(res => handleResponse(res));
};
