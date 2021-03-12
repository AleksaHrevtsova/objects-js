// затягиваем доступ к форме
import refs from "./refs.js";
// деструктуризируем доступ к форме из файла доступов
const { form } = refs;

// затягиваем функции для обработки данных формы
// import x from "../index.js";
// деструктуризируем нужные функции из файла, который затянули
// const { createObject, getInputValues, getNames, createTemplateObject } = x;

// объявляем массивы для хранения объектов из данных заполнения формы
const users = [];
const templateUsers = [];

// вспомогательный массив значений
const keys = [
  "userName",
  "userPhone",
  "userEmail",
  "userPass",
  "userConfirmPass",
];

// "слушаем" событие отправки формы для получения данных из нее
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(e); //- объект события
  //   ПОЛУЧАЕМ ЗНАЧЕНИЯ ИЗ ИНПУТОВ
  let name = e.target.elements.name.value;
  //   console.log(name);
  let phone = e.target.elements.phone.value;
  //   console.log(phone);
  let email = e.target.elements.email.value;
  //   console.log(email);
  let pass = e.target.elements.pass.value;
  //   console.log(pass);
  let confirmPass = e.target.elements.confirmPass.value;
  //   console.log(confirmPass);
  //   ========================================
  //   const user = createObject(name, phone, email, pass, confirmPass); // передаем отдельные аргументы
  //   или создадим массив аргументов для передачи в вызов функции
  const values = [name, phone, email, pass, confirmPass];
  // снова вызываем эту же функцию
  //   const user = createObject(...values); // распыляем через SPREAD массив аргументов values
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  //   getInputValues(name, phone, email, pass, confirmPass);
  //   getNames(...values); // распыляем через SPREAD массив аргументов values

  //   const templateUser = createTemplateObject(keys, values);
  templateUsers.push(templateUser);
  localStorage.setItem("templateUsers", JSON.stringify(templateUsers));

  return users, templateUser;
});
