/* eslint max-len: ["error", 200] */
/* eslint-env browser */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
/* global angular */

(function () {
  'use strict';
  let hideToggle; // скрывать / показывать сделанные задачи
  let inBasket; // показывать / скрывать удаленные задачи
  let tasks = [ // массив для хранения задач
//    { description: '1', deleted: false, done: false, hide: false, onchange: false } --> так выглядит объект типа "задача", хранящийся в массиве
  ];

  const app = angular.module('toDoList', []); // инициализируем angular-приложение

  /* Директива для вывода текущей даты */
  app.directive('currentDate', function () {
    return {
      restrict: 'E', // only matches element name
      templateUrl: 'current-date.html', // где хранится html
      controller: function () { // задаем контроллер
        this.date = new Date(); // получаем текущую дату
      },
      controllerAs: 'dateCtrl' // устанавливаем псевдоним для контроллера
    };
  });

  /* Директива для кнопок упрвления */
  app.directive('controlButtons', function () {
    return {
      restrict: 'E', // only matches element name
      templateUrl: 'control-buttons.html', // где хранится html
      controller: function () { // задаем контроллер
        this.hideToggle = hideToggle; // задаем текущее значение hideToggle
        this.inBasket = inBasket; // задаем текущее значение inBasket
        this.addNewTask = function (descr) { // добавляем новую задачу, на вход подается содержаение задачи 
          tasks.push({ // в массив задач добавляется новый объект с
            description: descr, //полученным при вызове функции описанием
            deleted: false, // задача не удалена
            done: false, // не выполнена
            hide: false, // не скрыта
            onchange: false // не изменяется в текущий момент
          });
          saveInLocalStorage(); // сохранить изменения в local storage
        };
        this.toggleDone = function () { // функция для переключения done/undone задачи
          this.hideToggle = hideToggle = !hideToggle; // переключаем done/undone, глобальную и внутри котроллера
          tasks.forEach(function (item) { // для каждой задачи
            item.done && hideToggle && (item.hide = true); // если задача сделана, и выбрано скрывать сделанные задачи, то скрываем
            item.done && !hideToggle && (item.hide = false); // есил задача сделана, и выбрано показывать сделанные задачи, то показываем
          });
          saveInLocalStorage(); // сохранить изменения в local storage 
        };
        this.toggleDeletedTasks = function () {
          this.inBasket = inBasket = !inBasket; // переключаем в корзине/не в корзине, глобальную и внутри котроллера
          tasks.forEach(function (item) { // для каждой задачи
            item.hide = true; // скрываем каждую задачу
            inBasket && item.deleted && (item.hide = false); // если в данный момент пользователь находится в корзине, и задача удалена, то показываем задачу
            !inBasket && !item.deleted && (item.hide = false); // если пользователь не находится в корзине, и задача не удалена, то показываем её
          });
          saveInLocalStorage(); // сохраняем изменения в local storage
        };
      },
      controllerAs: 'btnCtrl' // псевдоним для контроллера
    };
  });

  /* Директива для списка задач */
  app.directive('tasksList', function () {
    return {
      restrict: 'E', // only matches element name
      templateUrl: 'tasks-list.html', // где хранится html
      controller: function () {
        this.tasks = tasks; // получаем список задач
        this.changeTask = function (task, description) { // функция для изменения текущего содержания задачи
          task.onchange = !task.onchange; // переключаем onchange для задачи
          description && (task.description = description); // если в функцию передано содеражаение для записи в задачу, то записываем его
          saveInLocalStorage(); // сохраняем изменения в local storage
        }
        this.toggleDone = function (task) { // функция для изменения done/undone задачи
          task.done = !task.done; // переключаем done/undone для задачи
          hideToggle && (task.hide = true); // если выбрано скрывать сделанные задачи, то скрываем только что отмеченную задачу
          saveInLocalStorage(); // сохраняем изменения в local storage
        };
        this.deleteTask = function (task) { // функция для перемещения задачи в корзину
          task.deleted = true; // задача является удаленной
          task.hide = true; // скрытой
          task.done = false; // и не выполненной
          saveInLocalStorage(); // сохраняем изменения в local storage
        };
        this.returnTask = function (task) { // функция для возвращени задачи из корзины
          task.deleted = false; // задача является не удаленной
          task.hide = true; // скрываем её из корзины
          saveInLocalStorage(); // сохраняем изменения в local storage
        }
        this.finallyDeleteTask = function (task) { // функция для окончательного удаления задачи
          if (confirm("Точно удалить задачу?")) { // запрос пользователю точно ли он хочет удалить задачу, если да, то переходим к удалению
            let index; // переменная для хранения индекса
            let i = tasks.length - 1; // переменная для хранения длины массива -1
            while (i >= 0) { // пока в массиве ещё есть элементы
              if (tasks[i].$$hashKey === task.$$hashKey) { // если hashKey элемента равен haskKey удаляемой задачи
                index = i; // то сохраняем индекс задачи в массиве
                break; // прекращаем выполнение цикла
              }
              i--; // делаем следующий шаг
            }
            tasks.splice(index, 1); // удаляем задачу из массива задач
            saveInLocalStorage(); // сохраняем измнения в local storage
          }
        };
      },
      controllerAs: 'taskCtrl' // устанавливаем псевдоним для контроллера
    };
  });

  /* Функция для сохрнанения изменений в local storage */
  function saveInLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('hideToggle', hideToggle);
    localStorage.setItem('inBasket', inBasket);
  }

  /* Функция для загрузки данных из local storage */
  function loadFromLocalStorage() {
    if (localStorage.getItem('tasks')) { // если в local storage есть ключ tasks
      tasks = JSON.parse(localStorage.getItem('tasks')); // получаем по ключу массив
      tasks.forEach(function (item) { // для каждого элемента в массиве tasks 
        item.$$hashKey = undefined; // устанавливаем hashKey = undefined (необходимо для избежание конфликтов при выводе задач)
      });
    }
    hideToggle = localStorage.getItem('hideToggle'); // пытаемся считать значение для hide Toggle из Local Storage
    if (!hideToggle) {
      // если в local storage нет hideToggle (страница открыта впервые), то
      hideToggle = false; // по умолчанию зададим ему false (значит, на него ещё не нажимали)
    } else {
      // если в local storage есть такой элемент, то
      hideToggle = hideToggle === 'true' ? true : false; // если записана строка true, то преобразуем её в bool true, иначе в bool false
    }
    inBasket = localStorage.getItem('inBasket');
    if (!inBasket) {
      // если в local storage нет hideToggle (страница открыта впервые), то
      inBasket = false; // по умолчанию зададим ему false (значит, на него ещё не нажимали)
    } else {
      // если в local storage есть такой элемент, то
      inBasket = inBasket === 'true' ? true : false; // если записана строка true, то преобразуем её в bool true, иначе в bool false
    }
  }

  /* При запуске получаем данные из local storage */
  loadFromLocalStorage();
}());