/* eslint max-len: ["error", 200] */
/* eslint-env browser */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
/* global angular */
(function () {
  'use strict';
  angular.module('toDoList', ['tc.chartjs']) // инициализируем angular-приложение
    .value('appValues', {
      hideToggle: false, // скрывать / показывать сделанные задачи
      inBasket: false, // показывать / скрывать удаленные задачи
      statistic: false,
      tasks: [ // массив для хранения задач
        //    { description: '1', deleted: false, done: false, hide: false, onchange: false } --> так выглядит объект типа "задача", хранящийся в массиве
      ]
    })
    .factory('saveFactory', ['appValues', 'test', function (appValues, test) {
      return {
        saveInLocalStorage: function () {
          localStorage.setItem('tasks', JSON.stringify(appValues.tasks));
          localStorage.setItem('hideToggle', appValues.hideToggle);
          localStorage.setItem('inBasket', appValues.inBasket);
          localStorage.setItem('statistic', appValues.statistic);
          test.broadcast();
        },
        loadFromLocalStorage: function () {
          if (localStorage.getItem('tasks')) { // если в local storage есть ключ tasks
            appValues.tasks = JSON.parse(localStorage.getItem('tasks')); // получаем по ключу массив
            appValues.tasks.forEach(function (item) { // для каждого элемента в массиве tasks
              item.$$hashKey = undefined; // устанавливаем hashKey = undefined (необходимо для избежание конфликтов при выводе задач)
            });
          }
          appValues.hideToggle = localStorage.getItem('hideToggle'); // пытаемся считать значение для hide Toggle из Local Storage
          if (!appValues.hideToggle) {
            // если в local storage нет hideToggle (страница открыта впервые), то
            appValues.hideToggle = false; // по умолчанию зададим ему false (значит, на него ещё не нажимали)
          } else {
            // если в local storage есть такой элемент, то
            appValues.hideToggle = appValues.hideToggle === 'true' ? true : false; // если записана строка true, то преобразуем её в bool true, иначе в bool false
          }
          appValues.inBasket = localStorage.getItem('inBasket');
          if (!appValues.inBasket) {
            // если в local storage нет hideToggle (страница открыта впервые), то
            appValues.inBasket = false; // по умолчанию зададим ему false (значит, на него ещё не нажимали)
          } else {
            // если в local storage есть такой элемент, то
            appValues.inBasket = appValues.inBasket === 'true' ? true : false; // если записана строка true, то преобразуем её в bool true, иначе в bool false
          }
          test.broadcast();
        },
        getStatisticValue: function(){
          appValues.statistic = localStorage.getItem('statistic');
          if (!appValues.statistic) {
            // если в local storage нет hideToggle (страница открыта впервые), то
            appValues.statistic  = false; // по умолчанию зададим ему false (значит, на него ещё не нажимали)
          } else {
            // если в local storage есть такой элемент, то
            appValues.statistic  = appValues.statistic  === 'true' ? true : false; // если записана строка true, то преобразуем её в bool true, иначе в bool false
          }
          return appValues.statistic;
        }
      };
  }])
    .service('test', function ($rootScope) {
      this.broadcast = function () {
        $rootScope.$broadcast("SendDown", "some data");
      };
    })
    /* Директива для вывода текущей даты */
    .directive('currentDate', function () {
      return {
        restrict: 'E', // only matches element name
        templateUrl: 'current-date.html', // где хранится html
        controller: function () { // задаем контроллер
          this.date = new Date(); // получаем текущую дату
        },
        controllerAs: 'dateCtrl' // устанавливаем псевдоним для контроллера
      };
    })
    /* Директива для кнопок упрвления */
    .directive('controlButtons', ['saveFactory', 'appValues', function (saveFactory, appValues) {
      return {
        restrict: 'E', // only matches element name
        templateUrl: 'control-buttons.html', // где хранится html
        controller: function () { // задаем контроллер
          saveFactory.loadFromLocalStorage();
          this.inBasket = appValues.inBasket; // задаем текущее значение inBasket
          this.hideToggle = appValues.hideToggle; // задаем текущее значение hideToggle
          this.addNewTask = function (descr) { // добавляем новую задачу, на вход подается содержаение задачи
            appValues.tasks.push({ // в массив задач добавляется новый объект с
              description: descr, //полученным при вызове функции описанием
              deleted: false, // задача не удалена
              done: false, // не выполнена
              hide: false, // не скрыта
              onchange: false // не изменяется в текущий момент
            });
            saveFactory.saveInLocalStorage(); // сохранить изменения в local storage
          };
          this.toggleDone = function () { // функция для переключения done/undone задачи
            this.hideToggle = appValues.hideToggle = !appValues.hideToggle; // переключаем done/undone, глобальную и внутри котроллера
            appValues.tasks.forEach(function (item) { // для каждой задачи
              item.done && appValues.hideToggle && (item.hide = true); // если задача сделана, и выбрано скрывать сделанные задачи, то скрываем
              item.done && !appValues.hideToggle && (item.hide = false); // есил задача сделана, и выбрано показывать сделанные задачи, то показываем
            });
            saveFactory.saveInLocalStorage(); // сохранить изменения в local storage 
          };
          this.toggleDeletedTasks = function () {
            this.inBasket = appValues.inBasket = !appValues.inBasket; // переключаем в корзине/не в корзине, глобальную и внутри котроллера
            appValues.tasks.forEach(function (item) { // для каждой задачи
              item.hide = true; // скрываем каждую задачу
              appValues.inBasket && item.deleted && (item.hide = false); // если в данный момент пользователь находится в корзине, и задача удалена, то показываем задачу
              !appValues.inBasket && !item.deleted && (item.hide = false); // если пользователь не находится в корзине, и задача не удалена, то показываем её
            });
            saveFactory.saveInLocalStorage(); // сохраняем изменения в local storage
          };
        },
        controllerAs: 'btnCtrl' // псевдоним для контроллера
      };
  }])
    /* Директива для списка задач */
    .directive('tasksList', ['saveFactory', 'appValues', function (saveFactory, appValues) {
      return {
        restrict: 'E', // only matches element name
        templateUrl: 'tasks-list.html', // где хранится html
        controller: function () {
          this.tasks = appValues.tasks; // получаем список задач
          this.changeTask = function (task, description) { // функция для изменения текущего содержания задачи
            task.onchange = !task.onchange; // переключаем onchange для задачи
            description && (task.description = description); // если в функцию передано содеражаение для записи в задачу, то записываем его
            saveFactory.saveInLocalStorage(); // сохраняем изменения в local storage
          };
          this.toggleDone = function (task) { // функция для изменения done/undone задачи
            task.done = !task.done; // переключаем done/undone для задачи
            appValues.hideToggle && (task.hide = true); // если выбрано скрывать сделанные задачи, то скрываем только что отмеченную задачу
            saveFactory.saveInLocalStorage(); // сохраняем изменения в local storage
          };
          this.deleteTask = function (task) { // функция для перемещения задачи в корзину
            task.deleted = true; // задача является удаленной
            task.hide = true; // скрытой
            task.done = false; // и не выполненной
            saveFactory.saveInLocalStorage(); // сохраняем изменения в local storage
          };
          this.returnTask = function (task) { // функция для возвращени задачи из корзины
            task.deleted = false; // задача является не удаленной
            task.hide = true; // скрываем её из корзины
            saveFactory.saveInLocalStorage(); // сохраняем изменения в local storage
          };
          this.finallyDeleteTask = function (task) { // функция для окончательного удаления задачи
            if (confirm('Точно удалить задачу?')) { // запрос пользователю точно ли он хочет удалить задачу, если да, то переходим к удалению
              let index; // переменная для хранения индекса
              let i = appValues.tasks.length - 1; // переменная для хранения длины массива -1
              while (i >= 0) { // пока в массиве ещё есть элементы
                if (appValues.tasks[i].$$hashKey === task.$$hashKey) { // если hashKey элемента равен haskKey удаляемой задачи
                  index = i; // то сохраняем индекс задачи в массиве
                  break; // прекращаем выполнение цикла
                }
                i--; // делаем следующий шаг
              }
              appValues.tasks.splice(index, 1); // удаляем задачу из массива задач
              saveFactory.saveInLocalStorage(); // сохраняем измнения в local storage
            }
          };
        },
        controllerAs: 'taskCtrl' // устанавливаем псевдоним для контроллера
      };
  }])
   /* .directive('pieTasks', ['$scope', 'appValues', '$rootScope', function ($scope, appValues, $rootScope) {
      return {
        restruct: 'E',
        templateUrl: 'pie-tasks.html',
        controller: function () {
          $rootScope.$on("SendDown", function (evt, data) {
            $scope.updatePie();
          });
          $scope.show = true;
          $scope.updatePie = function () {
            let doneTasks = 0;
            let deletedTasks = 0;
            let undoneTasks = 0;
            appValues.tasks.forEach(function (item) {
              item.done && (doneTasks += 1);
              item.deleted && (deletedTasks += 1);
              !item.deleted && !item.done && (undoneTasks += 1);
            });
            $scope.data = {
              datasets: [{
                label: "My First dataset",
                data: [
                  deletedTasks,
                  doneTasks,
                  undoneTasks
                  ],
                backgroundColor: [
                  "#F7464A",
                  "#46BFBD",
                  "#FDB45C"
                  ]
                  }],
              labels: [
                  "Deleted tasks",
                  "Done tasks",
                  "Undone tasks"
                ]
            };
            $scope.options = {
              legend: {
                display: true
              },
              legendCallback: function (chart) {
                var text = [];
                for (var i = 0; i < chart.data.datasets.length; i++) {
                  var dataset = chart.data.datasets[i];
                  text.push('');
                  for (var j = 0; j < dataset.data.length; j++) {
                    text.push('');
                    text.push(chart.data.labels[j]);
                    text.push('');
                  }
                  text.push('');
                }
                return text.join("");
              },
              responsive: false
            };
          };
        }
      }
    }]) */
    .controller('PieCtrl', ['$scope', 'appValues', '$rootScope', 'saveFactory', function ($scope, appValues, $rootScope, saveFactory) {
      saveFactory.loadFromLocalStorage();
      $scope.show = saveFactory.getStatisticValue();
      $scope.buttonShow = appValues.tasks.length > 0;
      $scope.hideShow= $scope.show === false ? 'show statistics' : 'hide statistics';
      $scope.showHideClick = function() {
        appValues.statistic = $scope.show = !$scope.show;
        $scope.hideShow= $scope.show === false ? 'show statistics' : 'hide statistics';
        saveFactory.saveInLocalStorage();
      }
      $rootScope.$on("SendDown", function (evt, data) {
        $scope.updatePie();
      });
      $scope.updatePie = function () {
        let doneTasks = 0;
        let deletedTasks = 0;
        let undoneTasks = 0;
        appValues.tasks.forEach(function (item) {
          item.done && (doneTasks += 1);
          item.deleted && (deletedTasks += 1);
          !item.deleted && !item.done && (undoneTasks += 1);
        });
        $scope.data = {
          datasets: [{
            label: "My First dataset",
            data: [
          deletedTasks,
          doneTasks,
          undoneTasks
        ],
            backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C"
        ]
      }],
          labels: [
        "Deleted tasks",
        "Done tasks",
        "Undone tasks"
      ]
        };
        $scope.options = {
          legend: {
            display: true
          },
          legendCallback: function (chart) {
            var text = [];
            for (var i = 0; i < chart.data.datasets.length; i++) {
              var dataset = chart.data.datasets[i];
              text.push('');
              for (var j = 0; j < dataset.data.length; j++) {
                text.push('');
                text.push(chart.data.labels[j]);
                text.push('');
              }
              text.push('');
            }
            return text.join("");
          },
          responsive: false
        };
      };
    }]);
}());