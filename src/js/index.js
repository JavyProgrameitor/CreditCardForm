const numberCard = document.getElementById("number-card");
const usernameInput = document.getElementById("username");
const dateExpiries = document.getElementById("date");
const cvcInput = document.getElementById("CVC");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const returnButton = document.getElementById("returnButton");

// View of the card
const cardDisplayFront = document.getElementById("flip-card-front");
const cardDisplayBack = document.getElementById("flip-card-back");
const cardImg = document.getElementById("cardImg");
const cardImgBack = document.getElementById("cardImgBack");
const tarjetName = document.getElementById("display-tarjet-name");
const displayNumber = document.getElementById("display-number");
const displayName = document.getElementById("display-name");
const displayDate = document.getElementById("display-date");
const displayCVC = document.getElementById("display-cvc");

// Errors
const numberCardError = document.getElementById("number-card-error");
const usernameError = document.getElementById("username-error");
const dateError = document.getElementById("date-error");
const cvcError = document.getElementById("cvc-error");


// Regular expressions
const regexVisa = /^4\d{12}(\d{3})?$/; // Visa: 13 or 16 digits
const regexMasterCard = /^5[1-5]\d{14}$/; // MasterCard: 16 digits
const regexAmex = /^3[47][0-9]{13}$/; // American Express: 15 digits
const regexUsername = /^[a-zA-Z\s]{1,20}$/; // Name with letters and spaces
const regexDate = /^(0[1-9]|1[0-2])\/\d{2}$/; // Date in format MM/AA
const regexCVC = /^[0-9]{3}$/; // CVC of 3 digits

let numberValidate = false;
let usernameValidate = false;
let dateValidate = false;
let cvcValidate = false;

// Check tarjet number
numberCard.addEventListener("blur", () => {

  const cardNumber = numberCard.value.replace(/\s+/g, ''); // Remove spaces

  if (cardNumber.length >= 13 && (regexVisa.test(cardNumber) || regexMasterCard.test(cardNumber) || regexAmex.test(cardNumber))) {
    numberCard.style.borderColor = "green";
    numberCardError.innerText = "";
    displayNumber.innerText = "Nº :" + formatCardNumber(cardNumber);
    displayNumber.classList.add("display-number");
    numberValidate = true;

    if (regexVisa.test(cardNumber)) {
      cardDisplayFront.style.background = "linear-gradient(to bottom, rgba(72, 72, 218, 0.521), rgb(49, 69, 85))";
      cardDisplayBack.style.background = "linear-gradient(to bottom, rgba(72, 72, 218, 0.521), rgb(49, 69, 85))";
      cardImg.innerHTML = '<img src="./src/img/visa.png" style="width:200px;height:80px;">';
      cardImgBack.innerHTML = '<img src="./src/img/visa.png" style="width:60px;height:60px;">';
      tarjetName.innerText = "Visa Premium";
      tarjetName.classList.add("nameTarjet");
    }
    if (regexMasterCard.test(cardNumber)) {
      cardDisplayFront.style.background = "linear-gradient(to left, rgba(235, 6, 44, 0.973), rgb(224, 77, 8))";
      cardDisplayBack.style.background = "linear-gradient(to left, rgba(235, 6, 44, 0.973), rgb(224, 77, 8))";
      cardImg.innerHTML = '<img src="./src/img/redondo.png"  style="width:200px;height:80px;">';
      cardImgBack.innerHTML = '<img src="./src/img/redondo.png"  style="width:60px;height:60px;">';
      tarjetName.innerText = "";
      tarjetName.classList.add("nameTarjet");
    }
    if (regexAmex.test(cardNumber)) {
      cardDisplayFront.style.background = "linear-gradient(to bottom, rgb(236, 167, 17), rgb(252, 152, 2))";
      cardDisplayBack.style.background = "linear-gradient(to bottom, rgb(236, 167, 17), rgb(252, 152, 2))";
      cardImg.innerHTML = '<img src="./src/img/american-express.png"  style="width:200px;height:80px;">';
      cardImgBack.innerHTML = '<img src="./src/img/american-express.png" style="width:60px;height:60px;">';
      tarjetName.innerText = "";
      tarjetName.classList.add("nameTarjet");
    }
  } else {
    numberCard.style.borderColor = "red"; 5
    numberCardError.innerText = "Número de tarjeta no válido";
    displayNumber.innerText = "";
    numberValidate = false;
  }
  checkFormValidate();
});

// Check user name
usernameInput.addEventListener("blur", () => {

  if (regexUsername.test(usernameInput.value)) {
    usernameInput.style.borderColor = "green";
    usernameError.innerText = "";
    displayName.innerText = "Name : " + usernameInput.value;
    displayName.classList.add("nameUser");
    usernameValidate = true;
    checkFormValidate();
  } else {
    usernameInput.style.borderColor = "red";
    usernameError.innerText = "Nombre no válido (máx 20 letras)";
    displayName.innerText = "Nombre Completo";
    usernameValidate = false;
  }

});

// Expiries of the date
dateExpiries.addEventListener("blur", () => {

  if (regexDate.test(dateExpiries.value)) {
    dateExpiries.style.borderColor = "green";
    dateError.innerText = "";
    displayDate.innerText = "Expires : " + dateExpiries.value;
    displayDate.classList.add("expires")
    dateValidate = true;
    checkFormValidate();
  } else {
    dateExpiries.style.borderColor = "red";
    dateError.innerText = "Fecha no válida (MM/AA)";
    displayDate.innerText = "MM/AA";
    dateValidate = false;
  }

});

// Check CVC
cvcInput.addEventListener("blur", () => {
  if (regexCVC.test(cvcInput.value)) {
    cvcInput.style.borderColor = "green";
    cvcError.innerText = "";
    displayCVC.innerText = " CVC : " + cvcInput.value;
    displayCVC.classList.add("displayCVC")
    cvcValidate = true;
    checkFormValidate();
  } else {
    cvcInput.style.borderColor = "red";
    cvcError.innerText = "CVC no válido (3 dígitos)";
    displayCVC.innerText = "CVC";
    cvcValidate = false;
  }

});

// Check full form
function checkFormValidate() {
  if (numberValidate && usernameValidate && dateValidate && cvcValidate) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// Format card number to display with spaces
function formatCardNumber(number) {
  return number.replace(/(\d{4})(?=\d)/g, "$1 ");
}

// Reset the card when the reset button is clicked
resetButton.addEventListener("click", () => {
  cardDisplay.innerText = "Introduce tus datos correctamente";
  displayNumber.innerText = "";
  displayName.innerText = "";
  displayDate.innerText = " ";
  numberCard.style.borderColor = "yellow";
  usernameInput.style.borderColor = "";
  dateExpiries.style.borderColor = "";
  cvcInput.style.borderColor = "";
  numberCardError.innerText = "";
  usernameError.innerText = "";
  dateError.innerText = "";
  cvcError.innerText = "";
  submitButton.disabled = true;
});

returnButton.addEventListener("click", () => {

  window.location.href = 'https://javyprogrameitor.github.io/Portfolio/';

});

