/* eslint max-len: ["error", 200] */
/* eslint-env browser */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
/* global angular */

(function () {
  'use strict';
  let hideToggle;
  let inBasket;
  let tasks = [
//    { description: '1', deleted: false, done: true, hide: false, onchange: false }
  ];
  const app = angular.module('toDoList', []);
  app.directive('currentDate', function () {
    return {
      restrict: 'E',
      templateUrl: 'current-date.html',
      controller: function () {
        this.date = new Date();
      },
      controllerAs: 'dateCtrl'
    };
  });
  app.directive('controlButtons', function () {
    return {
      restrict: 'E',
      templateUrl: 'control-buttons.html',
      controller: function () {
        this.hideToggle = hideToggle;
        this.inBasket = inBasket;
        this.addNewTask = function (descr) {
          tasks.push({
            description: descr,
            deleted: false,
            done: false,
            hide: false
          });
          saveInLocalStorage();
        };
        this.toggleDone = function () {
          this.hideToggle = hideToggle = !hideToggle;
          tasks.forEach(function (item) {
            item.done && hideToggle && (item.hide = true);
            item.done && !hideToggle && (item.hide = false);
          });
          saveInLocalStorage();
        };
        this.toggleDeletedTasks = function () {
          this.inBasket = inBasket = !inBasket;
          tasks.forEach(function (item) {
            item.hide = true;
            inBasket && item.deleted && (item.hide = false);
            !inBasket && !item.deleted && (item.hide = false);
          });
          saveInLocalStorage();
        };
      },
      controllerAs: 'btnCtrl'
    };
  });
  app.directive('tasksList', function () {
    return {
      restrict: 'E',
      templateUrl: 'tasks-list.html',
      controller: function () {
        this.tasks = tasks;
        this.changeTask = function (task, description) {
          task.onchange = !task.onchange;
          description && (task.description = description);
          saveInLocalStorage();
        }
        this.toggleDone = function (task) {
          task.done = !task.done;
          hideToggle && (task.hide = true);
          saveInLocalStorage();
        };
        this.deleteTask = function (task) {
          task.deleted = true;
          task.hide = true;
          task.done = false;
          saveInLocalStorage();
        };
        this.returnTask = function (task) {
          task.deleted = false;
          task.hide = true;
          saveInLocalStorage();
        }
        this.finallyDeleteTask = function (task) {
          let index;
          let i = tasks.length - 1;
          while (i >= 0) {
            if (tasks[i].$$hashKey === task.$$hashKey) {
              index = i;
              break;
            }
            i--;
          }
          tasks.splice(index, 1);
          saveInLocalStorage();
        };
      },
      controllerAs: 'taskCtrl'
    };
  });
  function saveInLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('hideToggle', hideToggle);
    localStorage.setItem('inBasket', inBasket);
  }
  function loadFromLocalStorage() {
    if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.forEach(function (item) {
        item.$$hashKey = undefined;
      });
    }
    hideToggle = localStorage.getItem('hideToggle'); // пытаемся считать значение для hide Toggle из Local Storage
    if (!hideToggle) {
      // если в local storage нет hideToggle (страница открыта впервые), то
      hideToggle = false; // по умолчанию зададим ему false (значит, на него ещё не нажимали)
    } else {
      // если в local storage есть такой элемент, то
      hideToggle = hideToggle === 'true' ? true : false;
    }
    inBasket = localStorage.getItem('inBasket');
    if (!inBasket) {
      // если в local storage нет hideToggle (страница открыта впервые), то
      inBasket = false; // по умолчанию зададим ему false (значит, на него ещё не нажимали)
    } else {
      // если в local storage есть такой элемент, то
      inBasket = inBasket === 'true' ? true : false;
    }
  }
  loadFromLocalStorage();
}());