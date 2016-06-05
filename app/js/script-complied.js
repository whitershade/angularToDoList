'use strict';

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
    statistic: false, // показывать / скрывать статистику
    tasks: [// массив для хранения задач
      //    { description: '1', deleted: false, done: false, hide: false, onchange: false } --> так выглядит объект типа "задача", хранящийся в массиве
    ]
  }) // глобальные переменные
  /* Контроллер для инициализации глобальных переменных приложения */
  .controller('MainController', ['saveFactory', function (saveFactory) {
    saveFactory.loadFromLocalStorage();
  }])
  /* сервис для сохранения и загрузки данных в/из local storage, 
  также при каждой манипуляции посылает broadcast о том, что было совершено изменение в tasks */
  .service('saveFactory', ['appValues', 'TasksChanged', function (appValues, tasksChanged) {
    // сохраняем всё в local storage
    this.saveInLocalStorage = function () {
      // сохраняем необходимые данные в local storage
      localStorage.setItem('tasks', JSON.stringify(appValues.tasks));
      localStorage.setItem('hideToggle', appValues.hideToggle);
      localStorage.setItem('inBasket', appValues.inBasket);
      localStorage.setItem('statistic', appValues.statistic);
      // посылает broadcast о том, что было совершено изменение в tasks
      tasksChanged.broadcast();
    };
    // загружаем все данные из local storage
    this.loadFromLocalStorage = function () {
      // загружаем все задачи из local storage
      if (localStorage.getItem('tasks')) {
        // если в local storage есть ключ tasks
        appValues.tasks = JSON.parse(localStorage.getItem('tasks')); // получаем по ключу массив
        appValues.tasks.forEach(function (item) {
          // для каждого элемента в массиве tasks
          item.$$hashKey = undefined; // устанавливаем hashKey = undefined (необходимо для избежание конфликтов при выводе задач)
        });
      }
      // устанавливаем глобальные значения
      appValues.hideToggle = this.getBool('hideToggle');
      appValues.inBasket = this.getBool('inBasket');
      appValues.statistic = this.getBool('statistic');
      // посылает broadcast о том, что было совершено изменение в tasks
      tasksChanged.broadcast();
    };
    // вспомогательная функция, получает на вход строку с именем ключа в local storage, возвращает true или false
    this.getBool = function (property) {
      var value = localStorage.getItem(property); // пытаемся считать значение Local Storage
      if (!value) return false; // по умолчанию зададим ему false (значит, на него ещё не нажимали)
      return value === 'true' ? true : false; // если записана строка 'true', то преобразуем её в bool true, иначе в bool false
    };
  }])
  /* сервис, функция broadcast которого апускает извещение о том, что в tasks было произведено изменение */
  .service('TasksChanged', ['$rootScope', function ($rootScope) {
    this.broadcast = function () {
      $rootScope.$broadcast('TasksChanged');
    };
  }])
  /* Директива для вывода текущей даты */
  .directive('currentDate', function () {
    return {
      restrict: 'E', // only matches element name
      templateUrl: 'current-date.html', // где хранится html
      controller: function controller() {
        // задаем контроллер
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
      controller: function controller() {
        // задаем контроллер
        saveFactory.loadFromLocalStorage();
        this.inBasket = appValues.inBasket; // задаем текущее значение inBasket
        this.hideToggle = appValues.hideToggle; // задаем текущее значение hideToggle
        this.addNewTask = function (descr) {
          // добавляем новую задачу, на вход подается содержаение задачи
          appValues.tasks.push({ // в массив задач добавляется новый объект с
            description: descr, //полученным при вызове функции описанием
            deleted: false, // задача не удалена
            done: false, // не выполнена
            hide: false, // не скрыта
            onchange: false // не изменяется в текущий момент
          });
          saveFactory.saveInLocalStorage(); // сохранить изменения в local storage
        };
        this.toggleDone = function () {
          // функция для переключения done/undone задачи
          this.hideToggle = appValues.hideToggle = !appValues.hideToggle; // переключаем done/undone, глобальную и внутри котроллера
          appValues.tasks.forEach(function (item) {
            // для каждой задачи
            item.done && appValues.hideToggle && (item.hide = true); // если задача сделана, и выбрано скрывать сделанные задачи, то скрываем
            item.done && !appValues.hideToggle && (item.hide = false); // есил задача сделана, и выбрано показывать сделанные задачи, то показываем
          });
          saveFactory.saveInLocalStorage(); // сохранить изменения в local storage
        };
        this.toggleDeletedTasks = function () {
          this.inBasket = appValues.inBasket = !appValues.inBasket; // переключаем в корзине/не в корзине, глобальную и внутри котроллера
          appValues.tasks.forEach(function (item) {
            // для каждой задачи
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
      controller: function controller() {
        this.tasks = appValues.tasks; // получаем список задач
        this.changeTask = function (task, description) {
          // функция для изменения текущего содержания задачи
          task.onchange = !task.onchange; // переключаем onchange для задачи
          description && (task.description = description); // если в функцию передано содеражаение для записи в задачу, то записываем его
          saveFactory.saveInLocalStorage(); // сохраняем изменения в local storage
        };
        this.toggleDone = function (task) {
          // функция для изменения done/undone задачи
          task.done = !task.done; // переключаем done/undone для задачи
          appValues.hideToggle && (task.hide = true); // если выбрано скрывать сделанные задачи, то скрываем только что отмеченную задачу
          saveFactory.saveInLocalStorage(); // сохраняем изменения в local storage
        };
        this.deleteTask = function (task) {
          // функция для перемещения задачи в корзину
          task.deleted = true; // задача является удаленной
          task.hide = true; // скрытой
          task.done = false; // и не выполненной
          saveFactory.saveInLocalStorage(); // сохраняем изменения в local storage
        };
        this.returnTask = function (task) {
          // функция для возвращени задачи из корзины
          task.deleted = false; // задача является не удаленной
          task.hide = true; // скрываем её из корзины
          saveFactory.saveInLocalStorage(); // сохраняем изменения в local storage
        };
        this.finallyDeleteTask = function (task) {
          // функция для окончательного удаления задачи
          if (confirm('Точно удалить задачу?')) {
            // запрос пользователю точно ли он хочет удалить задачу, если да, то переходим к удалению
            var index = void 0; // переменная для хранения индекса
            var i = appValues.tasks.length - 1; // переменная для хранения длины массива -1
            while (i >= 0) {
              // пока в массиве ещё есть элементы
              if (appValues.tasks[i].$$hashKey === task.$$hashKey) {
                // если hashKey элемента равен haskKey удаляемой задачи
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
  /* Контроллер для pie статистики */
  .controller('PieCtrl', ['$scope', '$rootScope', 'appValues', 'saveFactory', function ($scope, $rootScope, appValues, saveFactory) {
    // инициализируем стартовые значения
    $scope.showCanvas = appValues.statistic; // cкрываем / показываем canvas c pie statistic
    $scope.hideShowButtonContent = $scope.showCanvas === false ? 'show statistics' : 'hide statistics'; // получаем содержание для button
    $scope.pieTaskkButtonHide = appValues.tasks.length > 0 ? false : true; // если нет задач, то не показываем button
    // при клике на button
    $scope.showHideClick = function () {
      appValues.statistic = $scope.showCanvas = !$scope.showCanvas; // тогглим значение для appValues.statistic
      $scope.hideShowButtonContent = $scope.showCanvas === false ? 'show statistics' : 'hide statistics'; // меняем содержание для button
      saveFactory.saveInLocalStorage(); // сохраняем изменения в local storage
    };
    // если пришло оповещение о том, что в tasks произошли изменения
    $rootScope.$on('TasksChanged', function () {
      // функция обновления статистики
      // переменные для хранения задач:
      var doneTasks = 0; // выполненных
      var deletedTasks = 0; // удаленных
      var undoneTasks = 0; // ещё не сделанных
      if (appValues.tasks.length === 0) {
        // если нет задач
        appValues.statistic = false; // меняем значение в appValues
        $scope.hideShowButtonContent = 'show statistics'; // меняем значение контента для button
      }
      $scope.pieTaskkButtonHide = appValues.tasks.length > 0 ? false : true; // если нет задач, то не показываем button
      $scope.showCanvas = !$scope.pieTaskkButtonHide && appValues.statistic;
      appValues.tasks.forEach(function (item) {
        // считаем количество различных задач в списке задач
        item.done && (doneTasks += 1); // если задача сделана, то увеличиваем количество сделанных задач
        item.deleted && (deletedTasks += 1); // если задача удалена, то увеличиваем количество удаленных задач
        !item.deleted && !item.done && (undoneTasks += 1); // если задача не сделана, и не удалена, то увеичиваем количество ещё не сделанных задач
      });
      // задаем значения для pie statistic
      $scope.data = {
        datasets: [{
          label: "My dataset",
          data: [deletedTasks, doneTasks, undoneTasks],
          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"]
        }],
        labels: ["Deleted tasks", "Done tasks", "Undone tasks"]
      };
      // задаем настройки для pie statistic
      $scope.options = {
        legend: {
          display: true
        },
        legendCallback: function legendCallback(chart) {
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
        responsive: true
      };
    });
  }]);
})();
//# sourceMappingURL=data:application/json;base64,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RUFBZ0IsSUFBSSxNQUFNLElBQU4sQ0FBVyxRQUFYLENBQW9CLE1BQXhDLEVBQWdELEdBQWhELEVBQXFEO0FBQ25ELGdCQUFJLFVBQVUsTUFBTSxJQUFOLENBQVcsUUFBWCxDQUFvQixDQUFwQixDQUFkO0FBQ0EsaUJBQUssSUFBTCxDQUFVLEVBQVY7QUFDQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFFBQVEsSUFBUixDQUFhLE1BQWpDLEVBQXlDLEdBQXpDLEVBQThDO0FBQzVDLG1CQUFLLElBQUwsQ0FBVSxFQUFWO0FBQ0EsbUJBQUssSUFBTCxDQUFVLE1BQU0sSUFBTixDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsQ0FBVjtBQUNBLG1CQUFLLElBQUwsQ0FBVSxFQUFWO0FBQ0Q7QUFDRCxpQkFBSyxJQUFMLENBQVUsRUFBVjtBQUNEO0FBQ0QsaUJBQU8sS0FBSyxJQUFMLENBQVUsRUFBVixDQUFQO0FBQ0QsU0FqQmM7QUFrQmYsb0JBQVk7QUFsQkcsT0FBakI7QUFvQkQsS0ExREQ7QUEyREQsR0F2RXNCLENBMUp6QjtBQWtPRCxDQXBPQSxHQUFEIiwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCAyMDBdICovXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cbi8qIGVzbGludCBuby11bnVzZWQtZXhwcmVzc2lvbnM6IFtcImVycm9yXCIsIHsgXCJhbGxvd1Nob3J0Q2lyY3VpdFwiOiB0cnVlLCBcImFsbG93VGVybmFyeVwiOiB0cnVlIH1dICovXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIGFuZ3VsYXIubW9kdWxlKCd0b0RvTGlzdCcsIFsndGMuY2hhcnRqcyddKSAvLyDQuNC90LjRhtC40LDQu9C40LfQuNGA0YPQtdC8IGFuZ3VsYXIt0L/RgNC40LvQvtC20LXQvdC40LVcbiAgICAudmFsdWUoJ2FwcFZhbHVlcycsIHtcbiAgICAgIGhpZGVUb2dnbGU6IGZhbHNlLCAvLyDRgdC60YDRi9Cy0LDRgtGMIC8g0L/QvtC60LDQt9GL0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C1INC30LDQtNCw0YfQuFxuICAgICAgaW5CYXNrZXQ6IGZhbHNlLCAvLyDQv9C+0LrQsNC30YvQstCw0YLRjCAvINGB0LrRgNGL0LLQsNGC0Ywg0YPQtNCw0LvQtdC90L3Ri9C1INC30LDQtNCw0YfQuFxuICAgICAgc3RhdGlzdGljOiBmYWxzZSwgLy8g0L/QvtC60LDQt9GL0LLQsNGC0YwgLyDRgdC60YDRi9Cy0LDRgtGMINGB0YLQsNGC0LjRgdGC0LjQutGDXG4gICAgICB0YXNrczogWyAvLyDQvNCw0YHRgdC40LIg0LTQu9GPINGF0YDQsNC90LXQvdC40Y8g0LfQsNC00LDRh1xuICAgICAgICAvLyAgICB7IGRlc2NyaXB0aW9uOiAnMScsIGRlbGV0ZWQ6IGZhbHNlLCBkb25lOiBmYWxzZSwgaGlkZTogZmFsc2UsIG9uY2hhbmdlOiBmYWxzZSB9IC0tPiDRgtCw0Log0LLRi9Cz0LvRj9C00LjRgiDQvtCx0YrQtdC60YIg0YLQuNC/0LAgXCLQt9Cw0LTQsNGH0LBcIiwg0YXRgNCw0L3Rj9GJ0LjQudGB0Y8g0LIg0LzQsNGB0YHQuNCy0LVcbiAgICAgIF1cbiAgICB9KSAvLyDQs9C70L7QsdCw0LvRjNC90YvQtSDQv9C10YDQtdC80LXQvdC90YvQtVxuICAgIC8qINCa0L7QvdGC0YDQvtC70LvQtdGAINC00LvRjyDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQs9C70L7QsdCw0LvRjNC90YvRhSDQv9C10YDQtdC80LXQvdC90YvRhSDQv9GA0LjQu9C+0LbQtdC90LjRjyAqL1xuICAgIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIFsnc2F2ZUZhY3RvcnknLCBmdW5jdGlvbiAoc2F2ZUZhY3RvcnkpIHtcbiAgICAgIHNhdmVGYWN0b3J5LmxvYWRGcm9tTG9jYWxTdG9yYWdlKCk7XG4gICAgfV0pXG4gICAgLyog0YHQtdGA0LLQuNGBINC00LvRjyDRgdC+0YXRgNCw0L3QtdC90LjRjyDQuCDQt9Cw0LPRgNGD0LfQutC4INC00LDQvdC90YvRhSDQsi/QuNC3IGxvY2FsIHN0b3JhZ2UsIFxuICAgINGC0LDQutC20LUg0L/RgNC4INC60LDQttC00L7QuSDQvNCw0L3QuNC/0YPQu9GP0YbQuNC4INC/0L7RgdGL0LvQsNC10YIgYnJvYWRjYXN0INC+INGC0L7QvCwg0YfRgtC+INCx0YvQu9C+INGB0L7QstC10YDRiNC10L3QviDQuNC30LzQtdC90LXQvdC40LUg0LIgdGFza3MgKi9cbiAgICAuc2VydmljZSgnc2F2ZUZhY3RvcnknLCBbJ2FwcFZhbHVlcycsICdUYXNrc0NoYW5nZWQnLCBmdW5jdGlvbiAoYXBwVmFsdWVzLCB0YXNrc0NoYW5nZWQpIHtcbiAgICAgIC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQstGB0ZEg0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgdGhpcy5zYXZlSW5Mb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC90LXQvtCx0YXQvtC00LjQvNGL0LUg0LTQsNC90L3Ri9C1INCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza3MnLCBKU09OLnN0cmluZ2lmeShhcHBWYWx1ZXMudGFza3MpKTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlkZVRvZ2dsZScsIGFwcFZhbHVlcy5oaWRlVG9nZ2xlKTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5CYXNrZXQnLCBhcHBWYWx1ZXMuaW5CYXNrZXQpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdGF0aXN0aWMnLCBhcHBWYWx1ZXMuc3RhdGlzdGljKTtcbiAgICAgICAgICAvLyDQv9C+0YHRi9C70LDQtdGCIGJyb2FkY2FzdCDQviDRgtC+0LwsINGH0YLQviDQsdGL0LvQviDRgdC+0LLQtdGA0YjQtdC90L4g0LjQt9C80LXQvdC10L3QuNC1INCyIHRhc2tzXG4gICAgICAgICAgdGFza3NDaGFuZ2VkLmJyb2FkY2FzdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vINC30LDQs9GA0YPQttCw0LXQvCDQstGB0LUg0LTQsNC90L3Ri9C1INC40LcgbG9jYWwgc3RvcmFnZSBcbiAgICAgIHRoaXMubG9hZEZyb21Mb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8g0LfQsNCz0YDRg9C20LDQtdC8INCy0YHQtSDQt9Cw0LTQsNGH0Lgg0LjQtyBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKSB7IC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0LXRgdGC0Ywg0LrQu9GO0YcgdGFza3NcbiAgICAgICAgICAgIGFwcFZhbHVlcy50YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpOyAvLyDQv9C+0LvRg9GH0LDQtdC8INC/0L4g0LrQu9GO0YfRgyDQvNCw0YHRgdC40LJcbiAgICAgICAgICAgIGFwcFZhbHVlcy50YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vINC00LvRjyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINCyINC80LDRgdGB0LjQstC1IHRhc2tzXG4gICAgICAgICAgICAgIGl0ZW0uJCRoYXNoS2V5ID0gdW5kZWZpbmVkOyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCBoYXNoS2V5ID0gdW5kZWZpbmVkICjQvdC10L7QsdGF0L7QtNC40LzQviDQtNC70Y8g0LjQt9Cx0LXQttCw0L3QuNC1INC60L7QvdGE0LvQuNC60YLQvtCyINC/0YDQuCDQstGL0LLQvtC00LUg0LfQsNC00LDRhylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDQs9C70L7QsdCw0LvRjNC90YvQtSDQt9C90LDRh9C10L3QuNGPXG4gICAgICAgICAgYXBwVmFsdWVzLmhpZGVUb2dnbGUgPSB0aGlzLmdldEJvb2woJ2hpZGVUb2dnbGUnKTtcbiAgICAgICAgICBhcHBWYWx1ZXMuaW5CYXNrZXQgPSB0aGlzLmdldEJvb2woJ2luQmFza2V0Jyk7XG4gICAgICAgICAgYXBwVmFsdWVzLnN0YXRpc3RpYyA9IHRoaXMuZ2V0Qm9vbCgnc3RhdGlzdGljJyk7XG4gICAgICAgICAgLy8g0L/QvtGB0YvQu9Cw0LXRgiBicm9hZGNhc3Qg0L4g0YLQvtC8LCDRh9GC0L4g0LHRi9C70L4g0YHQvtCy0LXRgNGI0LXQvdC+INC40LfQvNC10L3QtdC90LjQtSDQsiB0YXNrc1xuICAgICAgICAgIHRhc2tzQ2hhbmdlZC5icm9hZGNhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyDQstGB0L/QvtC80L7Qs9Cw0YLQtdC70YzQvdCw0Y8g0YTRg9C90LrRhtC40Y8sINC/0L7Qu9GD0YfQsNC10YIg0L3QsCDQstGF0L7QtCDRgdGC0YDQvtC60YMg0YEg0LjQvNC10L3QtdC8INC60LvRjtGH0LAg0LIgbG9jYWwgc3RvcmFnZSwg0LLQvtC30LLRgNCw0YnQsNC10YIgdHJ1ZSDQuNC70LggZmFsc2VcbiAgICAgIHRoaXMuZ2V0Qm9vbCA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShwcm9wZXJ0eSk7IC8vINC/0YvRgtCw0LXQvNGB0Y8g0YHRh9C40YLQsNGC0Ywg0LfQvdCw0YfQtdC90LjQtSBMb2NhbCBTdG9yYWdlXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTsgLy8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LfQsNC00LDQtNC40Lwg0LXQvNGDIGZhbHNlICjQt9C90LDRh9C40YIsINC90LAg0L3QtdCz0L4g0LXRidGRINC90LUg0L3QsNC20LjQvNCw0LvQuClcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7IC8vINC10YHQu9C4INC30LDQv9C40YHQsNC90LAg0YHRgtGA0L7QutCwICd0cnVlJywg0YLQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10ZEg0LIgYm9vbCB0cnVlLCDQuNC90LDRh9C1INCyIGJvb2wgZmFsc2VcbiAgICAgIH1cbiAgfV0pXG4gICAgLyog0YHQtdGA0LLQuNGBLCDRhNGD0L3QutGG0LjRjyBicm9hZGNhc3Qg0LrQvtGC0L7RgNC+0LPQviDQsNC/0YPRgdC60LDQtdGCINC40LfQstC10YnQtdC90LjQtSDQviDRgtC+0LwsINGH0YLQviDQsiB0YXNrcyDQsdGL0LvQviDQv9GA0L7QuNC30LLQtdC00LXQvdC+INC40LfQvNC10L3QtdC90LjQtSAqL1xuICAgIC5zZXJ2aWNlKCdUYXNrc0NoYW5nZWQnLCBbJyRyb290U2NvcGUnLCBmdW5jdGlvbiAoJHJvb3RTY29wZSkge1xuICAgICAgdGhpcy5icm9hZGNhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnVGFza3NDaGFuZ2VkJyk7XG4gICAgICB9O1xuICAgIH1dKVxuICAgIC8qINCU0LjRgNC10LrRgtC40LLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwINGC0LXQutGD0YnQtdC5INC00LDRgtGLICovXG4gICAgLmRpcmVjdGl2ZSgnY3VycmVudERhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnY3VycmVudC1kYXRlLmh0bWwnLCAvLyDQs9C00LUg0YXRgNCw0L3QuNGC0YHRjyBodG1sXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHsgLy8g0LfQsNC00LDQtdC8INC60L7QvdGC0YDQvtC70LvQtdGAXG4gICAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgtC10LrRg9GJ0YPRjiDQtNCw0YLRg1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyQXM6ICdkYXRlQ3RybCcgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0L/RgdC10LLQtNC+0L3QuNC8INC00LvRjyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG4gICAgICB9O1xuICAgIH0pXG4gICAgLyog0JTQuNGA0LXQutGC0LjQstCwINC00LvRjyDQutC90L7Qv9C+0Log0YPQv9GA0LLQu9C10L3QuNGPICovXG4gICAgLmRpcmVjdGl2ZSgnY29udHJvbEJ1dHRvbnMnLCBbJ3NhdmVGYWN0b3J5JywgJ2FwcFZhbHVlcycsIGZ1bmN0aW9uIChzYXZlRmFjdG9yeSwgYXBwVmFsdWVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnY29udHJvbC1idXR0b25zLmh0bWwnLCAvLyDQs9C00LUg0YXRgNCw0L3QuNGC0YHRjyBodG1sXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHsgLy8g0LfQsNC00LDQtdC8INC60L7QvdGC0YDQvtC70LvQtdGAXG4gICAgICAgICAgc2F2ZUZhY3RvcnkubG9hZEZyb21Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgICB0aGlzLmluQmFza2V0ID0gYXBwVmFsdWVzLmluQmFza2V0OyAvLyDQt9Cw0LTQsNC10Lwg0YLQtdC60YPRidC10LUg0LfQvdCw0YfQtdC90LjQtSBpbkJhc2tldFxuICAgICAgICAgIHRoaXMuaGlkZVRvZ2dsZSA9IGFwcFZhbHVlcy5oaWRlVG9nZ2xlOyAvLyDQt9Cw0LTQsNC10Lwg0YLQtdC60YPRidC10LUg0LfQvdCw0YfQtdC90LjQtSBoaWRlVG9nZ2xlXG4gICAgICAgICAgdGhpcy5hZGROZXdUYXNrID0gZnVuY3Rpb24gKGRlc2NyKSB7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQtNCw0YfRgywg0L3QsCDQstGF0L7QtCDQv9C+0LTQsNC10YLRgdGPINGB0L7QtNC10YDQttCw0LXQvdC40LUg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICBhcHBWYWx1ZXMudGFza3MucHVzaCh7IC8vINCyINC80LDRgdGB0LjQsiDQt9Cw0LTQsNGHINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0L3QvtCy0YvQuSDQvtCx0YrQtdC60YIg0YFcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyLCAvL9C/0L7Qu9GD0YfQtdC90L3Ri9C8INC/0YDQuCDQstGL0LfQvtCy0LUg0YTRg9C90LrRhtC40Lgg0L7Qv9C40YHQsNC90LjQtdC8XG4gICAgICAgICAgICAgIGRlbGV0ZWQ6IGZhbHNlLCAvLyDQt9Cw0LTQsNGH0LAg0L3QtSDRg9C00LDQu9C10L3QsFxuICAgICAgICAgICAgICBkb25lOiBmYWxzZSwgLy8g0L3QtSDQstGL0L/QvtC70L3QtdC90LBcbiAgICAgICAgICAgICAgaGlkZTogZmFsc2UsIC8vINC90LUg0YHQutGA0YvRgtCwXG4gICAgICAgICAgICAgIG9uY2hhbmdlOiBmYWxzZSAvLyDQvdC1INC40LfQvNC10L3Rj9C10YLRgdGPINCyINGC0LXQutGD0YnQuNC5INC80L7QvNC10L3RglxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90LjRgtGMINC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZURvbmUgPSBmdW5jdGlvbiAoKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9C10YDQtdC60LvRjtGH0LXQvdC40Y8gZG9uZS91bmRvbmUg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICB0aGlzLmhpZGVUb2dnbGUgPSBhcHBWYWx1ZXMuaGlkZVRvZ2dsZSA9ICFhcHBWYWx1ZXMuaGlkZVRvZ2dsZTsgLy8g0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvCBkb25lL3VuZG9uZSwg0LPQu9C+0LHQsNC70YzQvdGD0Y4g0Lgg0LLQvdGD0YLRgNC4INC60L7RgtGA0L7Qu9C70LXRgNCwXG4gICAgICAgICAgICBhcHBWYWx1ZXMudGFza3MuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAvLyDQtNC70Y8g0LrQsNC20LTQvtC5INC30LDQtNCw0YfQuFxuICAgICAgICAgICAgICBpdGVtLmRvbmUgJiYgYXBwVmFsdWVzLmhpZGVUb2dnbGUgJiYgKGl0ZW0uaGlkZSA9IHRydWUpOyAvLyDQtdGB0LvQuCDQt9Cw0LTQsNGH0LAg0YHQtNC10LvQsNC90LAsINC4INCy0YvQsdGA0LDQvdC+INGB0LrRgNGL0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C1INC30LDQtNCw0YfQuCwg0YLQviDRgdC60YDRi9Cy0LDQtdC8XG4gICAgICAgICAgICAgIGl0ZW0uZG9uZSAmJiAhYXBwVmFsdWVzLmhpZGVUb2dnbGUgJiYgKGl0ZW0uaGlkZSA9IGZhbHNlKTsgLy8g0LXRgdC40Lsg0LfQsNC00LDRh9CwINGB0LTQtdC70LDQvdCwLCDQuCDQstGL0LHRgNCw0L3QviDQv9C+0LrQsNC30YvQstCw0YLRjCDRgdC00LXQu9Cw0L3QvdGL0LUg0LfQsNC00LDRh9C4LCDRgtC+INC/0L7QutCw0LfRi9Cy0LDQtdC8XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3QuNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2UgXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZURlbGV0ZWRUYXNrcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5CYXNrZXQgPSBhcHBWYWx1ZXMuaW5CYXNrZXQgPSAhYXBwVmFsdWVzLmluQmFza2V0OyAvLyDQv9C10YDQtdC60LvRjtGH0LDQtdC8INCyINC60L7RgNC30LjQvdC1L9C90LUg0LIg0LrQvtGA0LfQuNC90LUsINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC4INCy0L3Rg9GC0YDQuCDQutC+0YLRgNC+0LvQu9C10YDQsFxuICAgICAgICAgICAgYXBwVmFsdWVzLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy8g0LTQu9GPINC60LDQttC00L7QuSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgICAgaXRlbS5oaWRlID0gdHJ1ZTsgLy8g0YHQutGA0YvQstCw0LXQvCDQutCw0LbQtNGD0Y4g0LfQsNC00LDRh9GDXG4gICAgICAgICAgICAgIGFwcFZhbHVlcy5pbkJhc2tldCAmJiBpdGVtLmRlbGV0ZWQgJiYgKGl0ZW0uaGlkZSA9IGZhbHNlKTsgLy8g0LXRgdC70Lgg0LIg0LTQsNC90L3Ri9C5INC80L7QvNC10L3RgiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0L3QsNGF0L7QtNC40YLRgdGPINCyINC60L7RgNC30LjQvdC1LCDQuCDQt9Cw0LTQsNGH0LAg0YPQtNCw0LvQtdC90LAsINGC0L4g0L/QvtC60LDQt9GL0LLQsNC10Lwg0LfQsNC00LDRh9GDXG4gICAgICAgICAgICAgICFhcHBWYWx1ZXMuaW5CYXNrZXQgJiYgIWl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpOyAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0L3QtSDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0LrQvtGA0LfQuNC90LUsINC4INC30LDQtNCw0YfQsCDQvdC1INGD0LTQsNC70LXQvdCwLCDRgtC+INC/0L7QutCw0LfRi9Cy0LDQtdC8INC10ZFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ2J0bkN0cmwnIC8vINC/0YHQtdCy0LTQvtC90LjQvCDQtNC70Y8g0LrQvtC90YLRgNC+0LvQu9C10YDQsFxuICAgICAgfTtcbiAgfV0pXG4gICAgLyog0JTQuNGA0LXQutGC0LjQstCwINC00LvRjyDRgdC/0LjRgdC60LAg0LfQsNC00LDRhyAqL1xuICAgIC5kaXJlY3RpdmUoJ3Rhc2tzTGlzdCcsIFsnc2F2ZUZhY3RvcnknLCAnYXBwVmFsdWVzJywgZnVuY3Rpb24gKHNhdmVGYWN0b3J5LCBhcHBWYWx1ZXMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsIC8vIG9ubHkgbWF0Y2hlcyBlbGVtZW50IG5hbWVcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0YXNrcy1saXN0Lmh0bWwnLCAvLyDQs9C00LUg0YXRgNCw0L3QuNGC0YHRjyBodG1sXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnRhc2tzID0gYXBwVmFsdWVzLnRhc2tzOyAvLyDQv9C+0LvRg9GH0LDQtdC8INGB0L/QuNGB0L7QuiDQt9Cw0LTQsNGHXG4gICAgICAgICAgdGhpcy5jaGFuZ2VUYXNrID0gZnVuY3Rpb24gKHRhc2ssIGRlc2NyaXB0aW9uKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQuNC30LzQtdC90LXQvdC40Y8g0YLQtdC60YPRidC10LPQviDRgdC+0LTQtdGA0LbQsNC90LjRjyDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgIHRhc2sub25jaGFuZ2UgPSAhdGFzay5vbmNoYW5nZTsgLy8g0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvCBvbmNoYW5nZSDQtNC70Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgICBkZXNjcmlwdGlvbiAmJiAodGFzay5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uKTsgLy8g0LXRgdC70Lgg0LIg0YTRg9C90LrRhtC40Y4g0L/QtdGA0LXQtNCw0L3QviDRgdC+0LTQtdGA0LDQttCw0LXQvdC40LUg0LTQu9GPINC30LDQv9C40YHQuCDQsiDQt9Cw0LTQsNGH0YMsINGC0L4g0LfQsNC/0LjRgdGL0LLQsNC10Lwg0LXQs9C+XG4gICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnRvZ2dsZURvbmUgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPIGRvbmUvdW5kb25lINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgdGFzay5kb25lID0gIXRhc2suZG9uZTsgLy8g0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvCBkb25lL3VuZG9uZSDQtNC70Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgICBhcHBWYWx1ZXMuaGlkZVRvZ2dsZSAmJiAodGFzay5oaWRlID0gdHJ1ZSk7IC8vINC10YHQu9C4INCy0YvQsdGA0LDQvdC+INGB0LrRgNGL0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C1INC30LDQtNCw0YfQuCwg0YLQviDRgdC60YDRi9Cy0LDQtdC8INGC0L7Qu9GM0LrQviDRh9GC0L4g0L7RgtC80LXRh9C10L3QvdGD0Y4g0LfQsNC00LDRh9GDXG4gICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLmRlbGV0ZVRhc2sgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QtdGA0LXQvNC10YnQtdC90LjRjyDQt9Cw0LTQsNGH0Lgg0LIg0LrQvtGA0LfQuNC90YNcbiAgICAgICAgICAgIHRhc2suZGVsZXRlZCA9IHRydWU7IC8vINC30LDQtNCw0YfQsCDRj9Cy0LvRj9C10YLRgdGPINGD0LTQsNC70LXQvdC90L7QuVxuICAgICAgICAgICAgdGFzay5oaWRlID0gdHJ1ZTsgLy8g0YHQutGA0YvRgtC+0LlcbiAgICAgICAgICAgIHRhc2suZG9uZSA9IGZhbHNlOyAvLyDQuCDQvdC1INCy0YvQv9C+0LvQvdC10L3QvdC+0LlcbiAgICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMucmV0dXJuVGFzayA9IGZ1bmN0aW9uICh0YXNrKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQstC+0LfQstGA0LDRidC10L3QuCDQt9Cw0LTQsNGH0Lgg0LjQtyDQutC+0YDQt9C40L3Ri1xuICAgICAgICAgICAgdGFzay5kZWxldGVkID0gZmFsc2U7IC8vINC30LDQtNCw0YfQsCDRj9Cy0LvRj9C10YLRgdGPINC90LUg0YPQtNCw0LvQtdC90L3QvtC5XG4gICAgICAgICAgICB0YXNrLmhpZGUgPSB0cnVlOyAvLyDRgdC60YDRi9Cy0LDQtdC8INC10ZEg0LjQtyDQutC+0YDQt9C40L3Ri1xuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5maW5hbGx5RGVsZXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQvtC60L7QvdGH0LDRgtC10LvRjNC90L7Qs9C+INGD0LTQsNC70LXQvdC40Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgICBpZiAoY29uZmlybSgn0KLQvtGH0L3QviDRg9C00LDQu9C40YLRjCDQt9Cw0LTQsNGH0YM/JykpIHsgLy8g0LfQsNC/0YDQvtGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjiDRgtC+0YfQvdC+INC70Lgg0L7QvSDRhdC+0YfQtdGCINGD0LTQsNC70LjRgtGMINC30LDQtNCw0YfRgywg0LXRgdC70Lgg0LTQsCwg0YLQviDQv9C10YDQtdGF0L7QtNC40Lwg0Log0YPQtNCw0LvQtdC90LjRjlxuICAgICAgICAgICAgICBsZXQgaW5kZXg7IC8vINC/0LXRgNC10LzQtdC90L3QsNGPINC00LvRjyDRhdGA0LDQvdC10L3QuNGPINC40L3QtNC10LrRgdCwXG4gICAgICAgICAgICAgIGxldCBpID0gYXBwVmFsdWVzLnRhc2tzLmxlbmd0aCAtIDE7IC8vINC/0LXRgNC10LzQtdC90L3QsNGPINC00LvRjyDRhdGA0LDQvdC10L3QuNGPINC00LvQuNC90Ysg0LzQsNGB0YHQuNCy0LAgLTFcbiAgICAgICAgICAgICAgd2hpbGUgKGkgPj0gMCkgeyAvLyDQv9C+0LrQsCDQsiDQvNCw0YHRgdC40LLQtSDQtdGJ0ZEg0LXRgdGC0Ywg0Y3Qu9C10LzQtdC90YLRi1xuICAgICAgICAgICAgICAgIGlmIChhcHBWYWx1ZXMudGFza3NbaV0uJCRoYXNoS2V5ID09PSB0YXNrLiQkaGFzaEtleSkgeyAvLyDQtdGB0LvQuCBoYXNoS2V5INGN0LvQtdC80LXQvdGC0LAg0YDQsNCy0LXQvSBoYXNrS2V5INGD0LTQsNC70Y/QtdC80L7QuSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTsgLy8g0YLQviDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQvdC00LXQutGBINC30LDQtNCw0YfQuCDQsiDQvNCw0YHRgdC40LLQtVxuICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vINC/0YDQtdC60YDQsNGJ0LDQtdC8INCy0YvQv9C+0LvQvdC10L3QuNC1INGG0LjQutC70LBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaS0tOyAvLyDQtNC10LvQsNC10Lwg0YHQu9C10LTRg9GO0YnQuNC5INGI0LDQs1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGFwcFZhbHVlcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpOyAvLyDRg9C00LDQu9GP0LXQvCDQt9Cw0LTQsNGH0YMg0LjQtyDQvNCw0YHRgdC40LLQsCDQt9Cw0LTQsNGHXG4gICAgICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlckFzOiAndGFza0N0cmwnIC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INC/0YHQtdCy0LTQvtC90LjQvCDQtNC70Y8g0LrQvtC90YLRgNC+0LvQu9C10YDQsFxuICAgICAgfTtcbiAgfV0pXG4gICAgLyog0JrQvtC90YLRgNC+0LvQu9C10YAg0LTQu9GPIHBpZSDRgdGC0LDRgtC40YHRgtC40LrQuCAqL1xuICAgIC5jb250cm9sbGVyKCdQaWVDdHJsJywgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICdhcHBWYWx1ZXMnLCAnc2F2ZUZhY3RvcnknLCBmdW5jdGlvbiAoJHNjb3BlLCAkcm9vdFNjb3BlLCBhcHBWYWx1ZXMsIHNhdmVGYWN0b3J5KSB7XG4gICAgICAvLyDQuNC90LjRhtC40LDQu9C40LfQuNGA0YPQtdC8INGB0YLQsNGA0YLQvtCy0YvQtSDQt9C90LDRh9C10L3QuNGPXG4gICAgICAkc2NvcGUuc2hvd0NhbnZhcyA9IGFwcFZhbHVlcy5zdGF0aXN0aWM7IC8vIGPQutGA0YvQstCw0LXQvCAvINC/0L7QutCw0LfRi9Cy0LDQtdC8IGNhbnZhcyBjIHBpZSBzdGF0aXN0aWNcbiAgICAgICRzY29wZS5oaWRlU2hvd0J1dHRvbkNvbnRlbnQgPSAkc2NvcGUuc2hvd0NhbnZhcyA9PT0gZmFsc2UgPyAnc2hvdyBzdGF0aXN0aWNzJyA6ICdoaWRlIHN0YXRpc3RpY3MnOyAvLyDQv9C+0LvRg9GH0LDQtdC8INGB0L7QtNC10YDQttCw0L3QuNC1INC00LvRjyBidXR0b25cbiAgICAgICRzY29wZS5waWVUYXNra0J1dHRvbkhpZGUgPSAoYXBwVmFsdWVzLnRhc2tzLmxlbmd0aCA+IDApID8gZmFsc2UgOiB0cnVlOyAvLyDQtdGB0LvQuCDQvdC10YIg0LfQsNC00LDRhywg0YLQviDQvdC1INC/0L7QutCw0LfRi9Cy0LDQtdC8IGJ1dHRvblxuICAgICAgLy8g0L/RgNC4INC60LvQuNC60LUg0L3QsCBidXR0b25cbiAgICAgICRzY29wZS5zaG93SGlkZUNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBhcHBWYWx1ZXMuc3RhdGlzdGljID0gJHNjb3BlLnNob3dDYW52YXMgPSAhJHNjb3BlLnNob3dDYW52YXM7IC8vINGC0L7Qs9Cz0LvQuNC8INC30L3QsNGH0LXQvdC40LUg0LTQu9GPIGFwcFZhbHVlcy5zdGF0aXN0aWNcbiAgICAgICAgJHNjb3BlLmhpZGVTaG93QnV0dG9uQ29udGVudCA9ICRzY29wZS5zaG93Q2FudmFzID09PSBmYWxzZSA/ICdzaG93IHN0YXRpc3RpY3MnIDogJ2hpZGUgc3RhdGlzdGljcyc7IC8vINC80LXQvdGP0LXQvCDRgdC+0LTQtdGA0LbQsNC90LjQtSDQtNC70Y8gYnV0dG9uXG4gICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgIH07XG4gICAgICAvLyDQtdGB0LvQuCDQv9GA0LjRiNC70L4g0L7Qv9C+0LLQtdGJ0LXQvdC40LUg0L4g0YLQvtC8LCDRh9GC0L4g0LIgdGFza3Mg0L/RgNC+0LjQt9C+0YjQu9C4INC40LfQvNC10L3QtdC90LjRj1xuICAgICAgJHJvb3RTY29wZS4kb24oJ1Rhc2tzQ2hhbmdlZCcsIGZ1bmN0aW9uICgpIHsgLy8g0YTRg9C90LrRhtC40Y8g0L7QsdC90L7QstC70LXQvdC40Y8g0YHRgtCw0YLQuNGB0YLQuNC60LhcbiAgICAgICAgLy8g0L/QtdGA0LXQvNC10L3QvdGL0LUg0LTQu9GPINGF0YDQsNC90LXQvdC40Y8g0LfQsNC00LDRhzpcbiAgICAgICAgbGV0IGRvbmVUYXNrcyA9IDA7IC8vINCy0YvQv9C+0LvQvdC10L3QvdGL0YVcbiAgICAgICAgbGV0IGRlbGV0ZWRUYXNrcyA9IDA7IC8vINGD0LTQsNC70LXQvdC90YvRhVxuICAgICAgICBsZXQgdW5kb25lVGFza3MgPSAwOyAvLyDQtdGJ0ZEg0L3QtSDRgdC00LXQu9Cw0L3QvdGL0YVcbiAgICAgICAgaWYgKGFwcFZhbHVlcy50YXNrcy5sZW5ndGggPT09IDApIHsgLy8g0LXRgdC70Lgg0L3QtdGCINC30LDQtNCw0YdcbiAgICAgICAgICBhcHBWYWx1ZXMuc3RhdGlzdGljID0gZmFsc2U7IC8vINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNC1INCyIGFwcFZhbHVlc1xuICAgICAgICAgICRzY29wZS5oaWRlU2hvd0J1dHRvbkNvbnRlbnQgPSAnc2hvdyBzdGF0aXN0aWNzJzsgLy8g0LzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40LUg0LrQvtC90YLQtdC90YLQsCDQtNC70Y8gYnV0dG9uXG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnBpZVRhc2trQnV0dG9uSGlkZSA9IChhcHBWYWx1ZXMudGFza3MubGVuZ3RoID4gMCkgPyBmYWxzZSA6IHRydWU7IC8vINC10YHQu9C4INC90LXRgiDQt9Cw0LTQsNGHLCDRgtC+INC90LUg0L/QvtC60LDQt9GL0LLQsNC10LwgYnV0dG9uXG4gICAgICAgICRzY29wZS5zaG93Q2FudmFzID0gISRzY29wZS5waWVUYXNra0J1dHRvbkhpZGUgJiYgYXBwVmFsdWVzLnN0YXRpc3RpYztcbiAgICAgICAgYXBwVmFsdWVzLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy8g0YHRh9C40YLQsNC10Lwg0LrQvtC70LjRh9C10YHRgtCy0L4g0YDQsNC30LvQuNGH0L3Ri9GFINC30LDQtNCw0Ycg0LIg0YHQv9C40YHQutC1INC30LDQtNCw0YdcbiAgICAgICAgICBpdGVtLmRvbmUgJiYgKGRvbmVUYXNrcyArPSAxKTsgLy8g0LXRgdC70Lgg0LfQsNC00LDRh9CwINGB0LTQtdC70LDQvdCwLCDRgtC+INGD0LLQtdC70LjRh9C40LLQsNC10Lwg0LrQvtC70LjRh9C10YHRgtCy0L4g0YHQtNC10LvQsNC90L3Ri9GFINC30LDQtNCw0YdcbiAgICAgICAgICBpdGVtLmRlbGV0ZWQgJiYgKGRlbGV0ZWRUYXNrcyArPSAxKTsgLy8g0LXRgdC70Lgg0LfQsNC00LDRh9CwINGD0LTQsNC70LXQvdCwLCDRgtC+INGD0LLQtdC70LjRh9C40LLQsNC10Lwg0LrQvtC70LjRh9C10YHRgtCy0L4g0YPQtNCw0LvQtdC90L3Ri9GFINC30LDQtNCw0YdcbiAgICAgICAgICAhaXRlbS5kZWxldGVkICYmICFpdGVtLmRvbmUgJiYgKHVuZG9uZVRhc2tzICs9IDEpOyAvLyDQtdGB0LvQuCDQt9Cw0LTQsNGH0LAg0L3QtSDRgdC00LXQu9Cw0L3QsCwg0Lgg0L3QtSDRg9C00LDQu9C10L3QsCwg0YLQviDRg9Cy0LXQuNGH0LjQstCw0LXQvCDQutC+0LvQuNGH0LXRgdGC0LLQviDQtdGJ0ZEg0L3QtSDRgdC00LXQu9Cw0L3QvdGL0YUg0LfQsNC00LDRh1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g0LfQsNC00LDQtdC8INC30L3QsNGH0LXQvdC40Y8g0LTQu9GPIHBpZSBzdGF0aXN0aWNcbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgICAgICBsYWJlbDogXCJNeSBkYXRhc2V0XCIsXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgZGVsZXRlZFRhc2tzLFxuICAgICAgICAgIGRvbmVUYXNrcyxcbiAgICAgICAgICB1bmRvbmVUYXNrc1xuICAgICAgICBdLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBbXG4gICAgICAgICAgXCIjRjc0NjRBXCIsXG4gICAgICAgICAgXCIjNDZCRkJEXCIsXG4gICAgICAgICAgXCIjRkRCNDVDXCJcbiAgICAgICAgXVxuICAgICAgfV0sXG4gICAgICAgICAgbGFiZWxzOiBbXG4gICAgICAgIFwiRGVsZXRlZCB0YXNrc1wiLFxuICAgICAgICBcIkRvbmUgdGFza3NcIixcbiAgICAgICAgXCJVbmRvbmUgdGFza3NcIlxuICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICAvLyDQt9Cw0LTQsNC10Lwg0L3QsNGB0YLRgNC+0LnQutC4INC00LvRjyBwaWUgc3RhdGlzdGljXG4gICAgICAgICRzY29wZS5vcHRpb25zID0ge1xuICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgZGlzcGxheTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGVnZW5kQ2FsbGJhY2s6IGZ1bmN0aW9uIChjaGFydCkge1xuICAgICAgICAgICAgdmFyIHRleHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnQuZGF0YS5kYXRhc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgZGF0YXNldCA9IGNoYXJ0LmRhdGEuZGF0YXNldHNbaV07XG4gICAgICAgICAgICAgIHRleHQucHVzaCgnJyk7XG4gICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YXNldC5kYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdGV4dC5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICB0ZXh0LnB1c2goY2hhcnQuZGF0YS5sYWJlbHNbal0pO1xuICAgICAgICAgICAgICAgIHRleHQucHVzaCgnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGV4dC5wdXNoKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZXh0LmpvaW4oXCJcIik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXNwb25zaXZlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XSlcbn0oKSk7Il19
