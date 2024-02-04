import { data } from "autoprefixer"

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-5',
    headers: {
      authorization: '7421b7ff-3150-48f1-a246-4be3eb3d36d3',
      'Content-Type': 'application/json'
    }
  }


export const getAllCard = () =>{
    return fetch(`${config.baseUrl}/cards`, {
        method:'GET',
        headers: config.headers
    })
    .then(res => res.json())
}

export const downloadProfile = () =>{
    return fetch(`${config.baseUrl}/users/me`, {
        method:'GET',
        headers: config.headers
    })
    .then(res => res.json())
    .then((data)=>{
        return data
    })
}

export const uploadProfile = (data) =>{
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
}); 
}

export const uploadAvatar = (data) =>{
    return fetch(`${config.baseUrl}/users/me/avatarm`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
}); 
}

export const uploadCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data)
    }) 
    .then(res => res.json())
}
 export const uninstallCard = (cardId) =>{
    fetch(`${config.baseUrl}/cards/${cardId}`,{
        method: 'DELETE',
        headers: config.headers
    })
 }


export const likeCard = (cardId) =>{
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
})
    .then((res) => res.json())
}

export const deleteLike = (cardId) =>{
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
})
    .then((res) => res.json())
}

