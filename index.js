// экспортируем по дефолту из текущего файла фукнкции для использования в других файлах
export default { createObject, getInputValues, getNames, createTemplateObject };

// === 1 СОЗДАНИЕ ОБЪЕКТА

// == 1.1 через литерал {}
const user = {
  name: "Sandra",
  phone: "000 000 00 00",
  email: "sandra@gmail.com",
  pass: "111",
  confirmPass: "111",
};
// console.log("user", user);
// console.log({});

// == 1.2 через литерал {} + SPREAD
const student = { status: "active", ...user };
// console.log("student", student);

// === 2 СВОЙСТВА И МЕТОДЫ

// == 2.1 через .key
// console.log("name: ", user.name); // Sandra
// console.log("age: ", user.age); // undefined - свойство отсутствует у объекта

user.age = 30;
// console.log(user.age); // 30

delete user.age;
// console.log(user.age); // undefined - свойство удалено

// == 2.2 через ['key']
// console.log(user["name"]); // Sandra
// console.log(user["age"]); // undefined - свойство отсутствует у объекта

user["age"] = 18;
// console.log(user["age"]); // 18

delete user["age"];
// console.log(user["age"]); // undefined - свойство удалено

// == 2.3 короткие свойства
// function createObject(name, phone, email, pass, confirmPass) {
//   const obj = {
//     name: name,
//     phone: phone,
//     email: email,
//     pass: pass,
//     confirmPass: confirmPass,
//   };
//   return obj;
// }

function createObject(name, phone, email, pass, confirmPass) {
  const obj = {
    name,
    phone,
    email,
    pass,
    confirmPass,
  };
  return obj;
}

const users = JSON.parse(localStorage.getItem("users")); // достанем из хранилища созданные формой объекты
// console.log("users", users);

// переберу свою базу юзеров и вытащу только их номера в отдельный массив. Могу? Могу!
// и почты для спам-рассылки тоже могу собрать

const phoneDB = [];
const mailDB = [];
const namesDB = [];

for (let user of users) {
  //   console.log(user);
  //   деструктуризирую свойство phone из каждого объекта, чтобы добавить в базу холодных звонков,
  // а свойство email вытащу из каждого объекта и переименую его в просто mail
  const { phone, email: mail } = user;
  phoneDB.push(phone);
  mailDB.push(mail);
}

// console.log("phoneDB", phoneDB);
// console.log("mailDB", mailDB);

// а теперь соберем все параметры из инпутов через REST

function getInputValues(...args) {
  //   console.log("НОРМАЛЬНЫЙ ПОЛНОЦЕННЫЙ МАССИВ args: ", args); // ES6

  //   console.log("НЕДОМАССИВ arguments: ", arguments); // ES5
  //   псевдомассив (коллекция) arguments надо преобразовать в массив для дальнейшей работы
  // распыляем через SPREAD псевдомассив arguments и тут же собираем через REST его останки в новый полноценный массив
  const normalArrayBySPREAD = [...arguments];
  //   console.log("normalArrayBySPREAD", normalArrayBySPREAD);
  //   или
  const normalArray = Array.from(arguments);
  //   console.log("normalArray", normalArray);

  //   деструктуризирую мои оба нормальных массива, чтобы проанализировать имена пользователей
  const [name] = args;
  //   console.log("DESTRUCNURING NAME: ", name);

  const [, , mail] = args;
  //   console.log("DESTRUCNURING eMAIL: ", mail);
  namesDB.push(name);
  //   console.log("namesDB by destructuring", namesDB);
}

// а теперь не все, первый отдельно заведем
// а теперь соберем все параметры из инпутов через REST

function getNames(name, ...args) {
  //   console.log("НОРМАЛЬНЫЙ ПОЛНОЦЕННЫЙ МАССИВ args: ", args); // ES6
  //   console.log(name);
  namesDB.push(name);
  //   console.log("namesDB by first param", namesDB);
}

// == 2.4 вычисляемые свойства (если не знаем при создании объекта, какое должно быть имя ключа)

function createTemplateObject(keys, values) {
  const obj = {};
  for (let i = 0; i < keys.length; i++) {
    // console.log(i);
    let key = keys[i];
    // console.log(key);
    let value = values[i];
    // console.log(value);
    obj[key] = value;

    // 1 итерация: obj['userName'] = name
    // 2 итерация: obj['userPhone'] = phone
    // 3 итерация: obj['userEmail'] = email
    // 4 итерация: obj['userPass'] = pass
    // 5 итерация: obj['userConfirmPass'] = confirmPass
  }
  return obj;
}

const templateUsers = JSON.parse(localStorage.getItem("templateUsers")); // достанем из хранилища созданные формой объекты
// console.log("templateUsers", templateUsers);

for (let user of templateUsers) {
  //   console.log("user", user);
  for (let key in user) {
    // console.log("key: value BY FOR...IN", `${key}: ${user[key]}`);
  }

  const keys = Object.keys(user);
  //   console.log("keys", keys);

  for (let key of keys) {
    //   console.log("keys", keys);
    // console.log("key: value BY Object.KEYS", `${key}: ${user[key]}`);
  }

  const values = Object.values(user);
  //   console.log(values);
  for (let value of values) {
    //   console.log("values", values);
    // console.log("value: ", value);
  }

  const entries = Object.entries(user);
  //   console.log("entries", entries);

  for (let entry of entries) {
    //   console.log("entries", entries);
    // console.log(entry);
    let key = entry[0];
    let val = entry[1];
    // console.log(`${key}: ${val}`);
  }
}

// 2.5 МЕТОДЫ объекта - функции - свойства, отвечающие на вопрос: Что делать?
// служат для работы со свойствами объекта

// == можно объявить сразу в объекте
// по-старому ES5
const productsList = {
  productsList: ["green apples", "dark chocolate", "coffee"],
  mapProducts: function () {
    for (let product of this.productsList) {
      console.log("product: ", product);
    }
  },
};

// console.log(productsList);
// productsList.mapProducts();

// по-нормальному ES6
const moviesList = {
  moviesList: ["Inception", "Up in the Air"],
  showMovies() {
    console.log("массив moviesList: ", this.moviesList);
    console.log("moviesList: ", ...this.moviesList);
  },
};

moviesList.showMovies(); // вызываем метод объекта!

// == метод можно добавить, как обычное свойство
productsList.showProducts = function () {
  console.log("массив product: ", this.productsList);
  console.log("product: ", ...this.productsList);
};
console.log(productsList);
productsList.showProducts(); // вызываем метод объекта!

moviesList.mapMovies = function () {
  for (let movie of this.moviesList) {
    console.log("movie: ", movie);
  }
};
console.log(moviesList);
moviesList.mapMovies(); // вызываем метод объекта!

// == метод можно удалить, также, как и обычное свойство, через delete
