// Валидация
function showError(input, errorElement, config){
    input.classList.add(config.inputErrorClass);

    //класс добавить
    errorElement.classList.add(config.errorElementClass);
    //текст ошибки
    errorElement.textContent = input.validationMessage;
    
}

function hideError(input, errorElement, config){
    input.classList.remove(config.inputErrorClass);
    
    errorElement.classList.remove(config.errorElementClass);
    //текст ошибки
    errorElement.textContent = '';
}

function checkInputValidity(input, form, config){
    const spanIdSelector = `#${input.name}--error`;
    const errorElement = form.querySelector(spanIdSelector);
    
    if(input.validity.patternMismatch) {
        input.setCustomValidity(input.dataset.errorMessage);
    }else{
        input.setCustomValidity('');
    }
    if (input.validity.valid){
        hideError(input, errorElement, config)
    } else {
        showError(input, errorElement, config)
    }
}


function hasInvalidInput(inputList){
    return inputList.some((input)=>{
        return !input.validity.valid;
    });
}

function toggleButtomState(buttonElement, inputList){
    buttonElement.disabled = hasInvalidInput(inputList)
}
//Слушатели
function setEventListener(formElement, config) {
    //кнопка
    const buttonElement = formElement.querySelector(config.buttonSelector);
    //поля ввода
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    // toggleButtomState(buttonElement, inputList); УБРАТЬ КОМЕНТАРИЙ И ПОЧИНИТЬ
    inputList.forEach((input)=>{
        input.addEventListener('input', ()=>{
            checkInputValidity(input, formElement, config);
            // toggleButtomState(buttonElement, inputList); УБРАТЬ КОМЕНТАРИЙ И ПОЧИНИТЬ
        });
        
    })
}
//Функции
export function enableValidation(config){
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    
    forms.forEach((formElement) =>{
        setEventListener(formElement, config)
    });
}