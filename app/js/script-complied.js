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
            !appValues.inBasket && appValues.hideToggle && item.done && (item.hide = true); // если пользователь не в корзине, неоходимо скрывать сделанные задачи, а задача сделана, то скрываем её
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
//# sourceMappingURL=data:application/json;base64,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REgsU0FETztBQUlmLHdCQUFnQix3QkFBVSxLQUFWLEVBQWlCO0FBQy9CLGNBQUksT0FBTyxFQUFYO0FBQ0EsZUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQU0sSUFBTixDQUFXLFFBQVgsQ0FBb0IsTUFBeEMsRUFBZ0QsR0FBaEQsRUFBcUQ7QUFDbkQsZ0JBQUksVUFBVSxNQUFNLElBQU4sQ0FBVyxRQUFYLENBQW9CLENBQXBCLENBQWQ7QUFDQSxpQkFBSyxJQUFMLENBQVUsRUFBVjtBQUNBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksUUFBUSxJQUFSLENBQWEsTUFBakMsRUFBeUMsR0FBekMsRUFBOEM7QUFDNUMsbUJBQUssSUFBTCxDQUFVLEVBQVY7QUFDQSxtQkFBSyxJQUFMLENBQVUsTUFBTSxJQUFOLENBQVcsTUFBWCxDQUFrQixDQUFsQixDQUFWO0FBQ0EsbUJBQUssSUFBTCxDQUFVLEVBQVY7QUFDRDtBQUNELGlCQUFLLElBQUwsQ0FBVSxFQUFWO0FBQ0Q7QUFDRCxpQkFBTyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQVA7QUFDRCxTQWpCYztBQWtCZixvQkFBWTtBQWxCRyxPQUFqQjtBQW9CRCxLQTFERDtBQTJERCxHQXZFc0IsQ0EzSnpCO0FBbU9ELENBck9BLEdBQUQiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIDIwMF0gKi9cbi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuLyogZXNsaW50IG5vLXVudXNlZC1leHByZXNzaW9uczogW1wiZXJyb3JcIiwgeyBcImFsbG93U2hvcnRDaXJjdWl0XCI6IHRydWUsIFwiYWxsb3dUZXJuYXJ5XCI6IHRydWUgfV0gKi9cbi8qIGdsb2JhbCBhbmd1bGFyICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgYW5ndWxhci5tb2R1bGUoJ3RvRG9MaXN0JywgWyd0Yy5jaGFydGpzJ10pIC8vINC40L3QuNGG0LjQsNC70LjQt9C40YDRg9C10LwgYW5ndWxhci3Qv9GA0LjQu9C+0LbQtdC90LjQtVxuICAgIC52YWx1ZSgnYXBwVmFsdWVzJywge1xuICAgICAgaGlkZVRvZ2dsZTogZmFsc2UsIC8vINGB0LrRgNGL0LLQsNGC0YwgLyDQv9C+0LrQsNC30YvQstCw0YLRjCDRgdC00LXQu9Cw0L3QvdGL0LUg0LfQsNC00LDRh9C4XG4gICAgICBpbkJhc2tldDogZmFsc2UsIC8vINC/0L7QutCw0LfRi9Cy0LDRgtGMIC8g0YHQutGA0YvQstCw0YLRjCDRg9C00LDQu9C10L3QvdGL0LUg0LfQsNC00LDRh9C4XG4gICAgICBzdGF0aXN0aWM6IGZhbHNlLCAvLyDQv9C+0LrQsNC30YvQstCw0YLRjCAvINGB0LrRgNGL0LLQsNGC0Ywg0YHRgtCw0YLQuNGB0YLQuNC60YNcbiAgICAgIHRhc2tzOiBbIC8vINC80LDRgdGB0LjQsiDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQt9Cw0LTQsNGHXG4gICAgICAgIC8vICAgIHsgZGVzY3JpcHRpb246ICcxJywgZGVsZXRlZDogZmFsc2UsIGRvbmU6IGZhbHNlLCBoaWRlOiBmYWxzZSwgb25jaGFuZ2U6IGZhbHNlIH0gLS0+INGC0LDQuiDQstGL0LPQu9GP0LTQuNGCINC+0LHRitC10LrRgiDRgtC40L/QsCBcItC30LDQtNCw0YfQsFwiLCDRhdGA0LDQvdGP0YnQuNC50YHRjyDQsiDQvNCw0YHRgdC40LLQtVxuICAgICAgXVxuICAgIH0pIC8vINCz0LvQvtCx0LDQu9GM0L3Ri9C1INC/0LXRgNC10LzQtdC90L3Ri9C1XG4gICAgLyog0JrQvtC90YLRgNC+0LvQu9C10YAg0LTQu9GPINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INCz0LvQvtCx0LDQu9GM0L3Ri9GFINC/0LXRgNC10LzQtdC90L3Ri9GFINC/0YDQuNC70L7QttC10L3QuNGPICovXG4gICAgLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgWydzYXZlRmFjdG9yeScsIGZ1bmN0aW9uIChzYXZlRmFjdG9yeSkge1xuICAgICAgc2F2ZUZhY3RvcnkubG9hZEZyb21Mb2NhbFN0b3JhZ2UoKTtcbiAgICB9XSlcbiAgICAvKiDRgdC10YDQstC40YEg0LTQu9GPINGB0L7RhdGA0LDQvdC10L3QuNGPINC4INC30LDQs9GA0YPQt9C60Lgg0LTQsNC90L3Ri9GFINCyL9C40LcgbG9jYWwgc3RvcmFnZSwgXG4gICAg0YLQsNC60LbQtSDQv9GA0Lgg0LrQsNC20LTQvtC5INC80LDQvdC40L/Rg9C70Y/RhtC40Lgg0L/QvtGB0YvQu9Cw0LXRgiBicm9hZGNhc3Qg0L4g0YLQvtC8LCDRh9GC0L4g0LHRi9C70L4g0YHQvtCy0LXRgNGI0LXQvdC+INC40LfQvNC10L3QtdC90LjQtSDQsiB0YXNrcyAqL1xuICAgIC5zZXJ2aWNlKCdzYXZlRmFjdG9yeScsIFsnYXBwVmFsdWVzJywgJ1Rhc2tzQ2hhbmdlZCcsIGZ1bmN0aW9uIChhcHBWYWx1ZXMsIHRhc2tzQ2hhbmdlZCkge1xuICAgICAgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INCy0YHRkSDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICB0aGlzLnNhdmVJbkxvY2FsU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0L3QtdC+0LHRhdC+0LTQuNC80YvQtSDQtNCw0L3QvdGL0LUg0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIEpTT04uc3RyaW5naWZ5KGFwcFZhbHVlcy50YXNrcykpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWRlVG9nZ2xlJywgYXBwVmFsdWVzLmhpZGVUb2dnbGUpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbkJhc2tldCcsIGFwcFZhbHVlcy5pbkJhc2tldCk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0YXRpc3RpYycsIGFwcFZhbHVlcy5zdGF0aXN0aWMpO1xuICAgICAgICAgIC8vINC/0L7RgdGL0LvQsNC10YIgYnJvYWRjYXN0INC+INGC0L7QvCwg0YfRgtC+INCx0YvQu9C+INGB0L7QstC10YDRiNC10L3QviDQuNC30LzQtdC90LXQvdC40LUg0LIgdGFza3NcbiAgICAgICAgICB0YXNrc0NoYW5nZWQuYnJvYWRjYXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g0LfQsNCz0YDRg9C20LDQtdC8INCy0YHQtSDQtNCw0L3QvdGL0LUg0LjQtyBsb2NhbCBzdG9yYWdlIFxuICAgICAgdGhpcy5sb2FkRnJvbUxvY2FsU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyDQt9Cw0LPRgNGD0LbQsNC10Lwg0LLRgdC1INC30LDQtNCw0YfQuCDQuNC3IGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpIHsgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDQutC70Y7RhyB0YXNrc1xuICAgICAgICAgICAgYXBwVmFsdWVzLnRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSk7IC8vINC/0L7Qu9GD0YfQsNC10Lwg0L/QviDQutC70Y7Rh9GDINC80LDRgdGB0LjQslxuICAgICAgICAgICAgYXBwVmFsdWVzLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy8g0LTQu9GPINC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LIg0LzQsNGB0YHQuNCy0LUgdGFza3NcbiAgICAgICAgICAgICAgaXRlbS4kJGhhc2hLZXkgPSB1bmRlZmluZWQ7IC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8IGhhc2hLZXkgPSB1bmRlZmluZWQgKNC90LXQvtCx0YXQvtC00LjQvNC+INC00LvRjyDQuNC30LHQtdC20LDQvdC40LUg0LrQvtC90YTQu9C40LrRgtC+0LIg0L/RgNC4INCy0YvQstC+0LTQtSDQt9Cw0LTQsNGHKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INCz0LvQvtCx0LDQu9GM0L3Ri9C1INC30L3QsNGH0LXQvdC40Y9cbiAgICAgICAgICBhcHBWYWx1ZXMuaGlkZVRvZ2dsZSA9IHRoaXMuZ2V0Qm9vbCgnaGlkZVRvZ2dsZScpO1xuICAgICAgICAgIGFwcFZhbHVlcy5pbkJhc2tldCA9IHRoaXMuZ2V0Qm9vbCgnaW5CYXNrZXQnKTtcbiAgICAgICAgICBhcHBWYWx1ZXMuc3RhdGlzdGljID0gdGhpcy5nZXRCb29sKCdzdGF0aXN0aWMnKTtcbiAgICAgICAgICAvLyDQv9C+0YHRi9C70LDQtdGCIGJyb2FkY2FzdCDQviDRgtC+0LwsINGH0YLQviDQsdGL0LvQviDRgdC+0LLQtdGA0YjQtdC90L4g0LjQt9C80LXQvdC10L3QuNC1INCyIHRhc2tzXG4gICAgICAgICAgdGFza3NDaGFuZ2VkLmJyb2FkY2FzdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vINCy0YHQv9C+0LzQvtCz0LDRgtC10LvRjNC90LDRjyDRhNGD0L3QutGG0LjRjywg0L/QvtC70YPRh9Cw0LXRgiDQvdCwINCy0YXQvtC0INGB0YLRgNC+0LrRgyDRgSDQuNC80LXQvdC10Lwg0LrQu9GO0YfQsCDQsiBsb2NhbCBzdG9yYWdlLCDQstC+0LfQstGA0LDRidCw0LXRgiB0cnVlINC40LvQuCBmYWxzZVxuICAgICAgdGhpcy5nZXRCb29sID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHByb3BlcnR5KTsgLy8g0L/Ri9GC0LDQtdC80YHRjyDRgdGH0LjRgtCw0YLRjCDQt9C90LDRh9C10L3QuNC1IExvY2FsIFN0b3JhZ2VcbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlOyAvLyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQt9Cw0LTQsNC00LjQvCDQtdC80YMgZmFsc2UgKNC30L3QsNGH0LjRgiwg0L3QsCDQvdC10LPQviDQtdGJ0ZEg0L3QtSDQvdCw0LbQuNC80LDQu9C4KVxuICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTsgLy8g0LXRgdC70Lgg0LfQsNC/0LjRgdCw0L3QsCDRgdGC0YDQvtC60LAgJ3RydWUnLCDRgtC+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXRkSDQsiBib29sIHRydWUsINC40L3QsNGH0LUg0LIgYm9vbCBmYWxzZVxuICAgICAgfVxuICB9XSlcbiAgICAvKiDRgdC10YDQstC40YEsINGE0YPQvdC60YbQuNGPIGJyb2FkY2FzdCDQutC+0YLQvtGA0L7Qs9C+INCw0L/Rg9GB0LrQsNC10YIg0LjQt9Cy0LXRidC10L3QuNC1INC+INGC0L7QvCwg0YfRgtC+INCyIHRhc2tzINCx0YvQu9C+INC/0YDQvtC40LfQstC10LTQtdC90L4g0LjQt9C80LXQvdC10L3QuNC1ICovXG4gICAgLnNlcnZpY2UoJ1Rhc2tzQ2hhbmdlZCcsIFsnJHJvb3RTY29wZScsIGZ1bmN0aW9uICgkcm9vdFNjb3BlKSB7XG4gICAgICB0aGlzLmJyb2FkY2FzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdUYXNrc0NoYW5nZWQnKTtcbiAgICAgIH07XG4gICAgfV0pXG4gICAgLyog0JTQuNGA0LXQutGC0LjQstCwINC00LvRjyDQstGL0LLQvtC00LAg0YLQtdC60YPRidC10Lkg0LTQsNGC0YsgKi9cbiAgICAuZGlyZWN0aXZlKCdjdXJyZW50RGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsIC8vIG9ubHkgbWF0Y2hlcyBlbGVtZW50IG5hbWVcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdjdXJyZW50LWRhdGUuaHRtbCcsIC8vINCz0LTQtSDRhdGA0LDQvdC40YLRgdGPIGh0bWxcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkgeyAvLyDQt9Cw0LTQsNC10Lwg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAgICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpOyAvLyDQv9C+0LvRg9GH0LDQtdC8INGC0LXQutGD0YnRg9GOINC00LDRgtGDXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ2RhdGVDdHJsJyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDQv9GB0LXQstC00L7QvdC40Lwg0LTQu9GPINC60L7QvdGC0YDQvtC70LvQtdGA0LBcbiAgICAgIH07XG4gICAgfSlcbiAgICAvKiDQlNC40YDQtdC60YLQuNCy0LAg0LTQu9GPINC60L3QvtC/0L7QuiDRg9C/0YDQstC70LXQvdC40Y8gKi9cbiAgICAuZGlyZWN0aXZlKCdjb250cm9sQnV0dG9ucycsIFsnc2F2ZUZhY3RvcnknLCAnYXBwVmFsdWVzJywgZnVuY3Rpb24gKHNhdmVGYWN0b3J5LCBhcHBWYWx1ZXMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsIC8vIG9ubHkgbWF0Y2hlcyBlbGVtZW50IG5hbWVcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdjb250cm9sLWJ1dHRvbnMuaHRtbCcsIC8vINCz0LTQtSDRhdGA0LDQvdC40YLRgdGPIGh0bWxcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkgeyAvLyDQt9Cw0LTQsNC10Lwg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAgICAgICAgICBzYXZlRmFjdG9yeS5sb2FkRnJvbUxvY2FsU3RvcmFnZSgpO1xuICAgICAgICAgIHRoaXMuaW5CYXNrZXQgPSBhcHBWYWx1ZXMuaW5CYXNrZXQ7IC8vINC30LDQtNCw0LXQvCDRgtC10LrRg9GJ0LXQtSDQt9C90LDRh9C10L3QuNC1IGluQmFza2V0XG4gICAgICAgICAgdGhpcy5oaWRlVG9nZ2xlID0gYXBwVmFsdWVzLmhpZGVUb2dnbGU7IC8vINC30LDQtNCw0LXQvCDRgtC10LrRg9GJ0LXQtSDQt9C90LDRh9C10L3QuNC1IGhpZGVUb2dnbGVcbiAgICAgICAgICB0aGlzLmFkZE5ld1Rhc2sgPSBmdW5jdGlvbiAoZGVzY3IpIHsgLy8g0LTQvtCx0LDQstC70Y/QtdC8INC90L7QstGD0Y4g0LfQsNC00LDRh9GDLCDQvdCwINCy0YXQvtC0INC/0L7QtNCw0LXRgtGB0Y8g0YHQvtC00LXRgNC20LDQtdC90LjQtSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgIGFwcFZhbHVlcy50YXNrcy5wdXNoKHsgLy8g0LIg0LzQsNGB0YHQuNCyINC30LDQtNCw0Ycg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDQvdC+0LLRi9C5INC+0LHRitC10LrRgiDRgVxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3IsIC8v0L/QvtC70YPRh9C10L3QvdGL0Lwg0L/RgNC4INCy0YvQt9C+0LLQtSDRhNGD0L3QutGG0LjQuCDQvtC/0LjRgdCw0L3QuNC10LxcbiAgICAgICAgICAgICAgZGVsZXRlZDogZmFsc2UsIC8vINC30LDQtNCw0YfQsCDQvdC1INGD0LTQsNC70LXQvdCwXG4gICAgICAgICAgICAgIGRvbmU6IGZhbHNlLCAvLyDQvdC1INCy0YvQv9C+0LvQvdC10L3QsFxuICAgICAgICAgICAgICBoaWRlOiBmYWxzZSwgLy8g0L3QtSDRgdC60YDRi9GC0LBcbiAgICAgICAgICAgICAgb25jaGFuZ2U6IGZhbHNlIC8vINC90LUg0LjQt9C80LXQvdGP0LXRgtGB0Y8g0LIg0YLQtdC60YPRidC40Lkg0LzQvtC80LXQvdGCXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3QuNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMudG9nZ2xlRG9uZSA9IGZ1bmN0aW9uICgpIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10LrQu9GO0YfQtdC90LjRjyBkb25lL3VuZG9uZSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgIHRoaXMuaGlkZVRvZ2dsZSA9IGFwcFZhbHVlcy5oaWRlVG9nZ2xlID0gIWFwcFZhbHVlcy5oaWRlVG9nZ2xlOyAvLyDQv9C10YDQtdC60LvRjtGH0LDQtdC8IGRvbmUvdW5kb25lLCDQs9C70L7QsdCw0LvRjNC90YPRjiDQuCDQstC90YPRgtGA0Lgg0LrQvtGC0YDQvtC70LvQtdGA0LBcbiAgICAgICAgICAgIGFwcFZhbHVlcy50YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vINC00LvRjyDQutCw0LbQtNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICAgIGl0ZW0uZG9uZSAmJiBhcHBWYWx1ZXMuaGlkZVRvZ2dsZSAmJiAoaXRlbS5oaWRlID0gdHJ1ZSk7IC8vINC10YHQu9C4INC30LDQtNCw0YfQsCDRgdC00LXQu9Cw0L3QsCwg0Lgg0LLRi9Cx0YDQsNC90L4g0YHQutGA0YvQstCw0YLRjCDRgdC00LXQu9Cw0L3QvdGL0LUg0LfQsNC00LDRh9C4LCDRgtC+INGB0LrRgNGL0LLQsNC10LxcbiAgICAgICAgICAgICAgaXRlbS5kb25lICYmICFhcHBWYWx1ZXMuaGlkZVRvZ2dsZSAmJiAoaXRlbS5oaWRlID0gZmFsc2UpOyAvLyDQtdGB0LjQuyDQt9Cw0LTQsNGH0LAg0YHQtNC10LvQsNC90LAsINC4INCy0YvQsdGA0LDQvdC+INC/0L7QutCw0LfRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LgsINGC0L4g0L/QvtC60LDQt9GL0LLQsNC10LxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdC40YLRjCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZSBcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMudG9nZ2xlRGVsZXRlZFRhc2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pbkJhc2tldCA9IGFwcFZhbHVlcy5pbkJhc2tldCA9ICFhcHBWYWx1ZXMuaW5CYXNrZXQ7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10Lwg0LIg0LrQvtGA0LfQuNC90LUv0L3QtSDQsiDQutC+0YDQt9C40L3QtSwg0LPQu9C+0LHQsNC70YzQvdGD0Y4g0Lgg0LLQvdGD0YLRgNC4INC60L7RgtGA0L7Qu9C70LXRgNCwXG4gICAgICAgICAgICBhcHBWYWx1ZXMudGFza3MuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAvLyDQtNC70Y8g0LrQsNC20LTQvtC5INC30LDQtNCw0YfQuFxuICAgICAgICAgICAgICBpdGVtLmhpZGUgPSB0cnVlOyAvLyDRgdC60YDRi9Cy0LDQtdC8INC60LDQttC00YPRjiDQt9Cw0LTQsNGH0YNcbiAgICAgICAgICAgICAgYXBwVmFsdWVzLmluQmFza2V0ICYmIGl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpOyAvLyDQtdGB0LvQuCDQsiDQtNCw0L3QvdGL0Lkg0LzQvtC80LXQvdGCINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0LrQvtGA0LfQuNC90LUsINC4INC30LDQtNCw0YfQsCDRg9C00LDQu9C10L3QsCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvCDQt9Cw0LTQsNGH0YNcbiAgICAgICAgICAgICAgIWFwcFZhbHVlcy5pbkJhc2tldCAmJiAhaXRlbS5kZWxldGVkICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7IC8vINC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQvdC1INC90LDRhdC+0LTQuNGC0YHRjyDQsiDQutC+0YDQt9C40L3QtSwg0Lgg0LfQsNC00LDRh9CwINC90LUg0YPQtNCw0LvQtdC90LAsINGC0L4g0L/QvtC60LDQt9GL0LLQsNC10Lwg0LXRkVxuICAgICAgICAgICAgICAhYXBwVmFsdWVzLmluQmFza2V0ICYmIGFwcFZhbHVlcy5oaWRlVG9nZ2xlICYmIGl0ZW0uZG9uZSAmJiAoaXRlbS5oaWRlID0gdHJ1ZSk7IC8vINC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQvdC1INCyINC60L7RgNC30LjQvdC1LCDQvdC10L7RhdC+0LTQuNC80L4g0YHQutGA0YvQstCw0YLRjCDRgdC00LXQu9Cw0L3QvdGL0LUg0LfQsNC00LDRh9C4LCDQsCDQt9Cw0LTQsNGH0LAg0YHQtNC10LvQsNC90LAsINGC0L4g0YHQutGA0YvQstCw0LXQvCDQtdGRXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyQXM6ICdidG5DdHJsJyAvLyDQv9GB0LXQstC00L7QvdC40Lwg0LTQu9GPINC60L7QvdGC0YDQvtC70LvQtdGA0LBcbiAgICAgIH07XG4gIH1dKVxuICAgIC8qINCU0LjRgNC10LrRgtC40LLQsCDQtNC70Y8g0YHQv9C40YHQutCwINC30LDQtNCw0YcgKi9cbiAgICAuZGlyZWN0aXZlKCd0YXNrc0xpc3QnLCBbJ3NhdmVGYWN0b3J5JywgJ2FwcFZhbHVlcycsIGZ1bmN0aW9uIChzYXZlRmFjdG9yeSwgYXBwVmFsdWVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGFza3MtbGlzdC5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy50YXNrcyA9IGFwcFZhbHVlcy50YXNrczsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgdC/0LjRgdC+0Log0LfQsNC00LDRh1xuICAgICAgICAgIHRoaXMuY2hhbmdlVGFzayA9IGZ1bmN0aW9uICh0YXNrLCBkZXNjcmlwdGlvbikgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPINGC0LXQutGD0YnQtdCz0L4g0YHQvtC00LXRgNC20LDQvdC40Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgICB0YXNrLm9uY2hhbmdlID0gIXRhc2sub25jaGFuZ2U7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10Lwgb25jaGFuZ2Ug0LTQu9GPINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gJiYgKHRhc2suZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbik7IC8vINC10YHQu9C4INCyINGE0YPQvdC60YbQuNGOINC/0LXRgNC10LTQsNC90L4g0YHQvtC00LXRgNCw0LbQsNC10L3QuNC1INC00LvRjyDQt9Cw0L/QuNGB0Lgg0LIg0LfQsNC00LDRh9GDLCDRgtC+INC30LDQv9C40YHRi9Cy0LDQtdC8INC10LPQvlxuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy50b2dnbGVEb25lID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC40LfQvNC10L3QtdC90LjRjyBkb25lL3VuZG9uZSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgIHRhc2suZG9uZSA9ICF0YXNrLmRvbmU7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10LwgZG9uZS91bmRvbmUg0LTQu9GPINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgYXBwVmFsdWVzLmhpZGVUb2dnbGUgJiYgKHRhc2suaGlkZSA9IHRydWUpOyAvLyDQtdGB0LvQuCDQstGL0LHRgNCw0L3QviDRgdC60YDRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LgsINGC0L4g0YHQutGA0YvQstCw0LXQvCDRgtC+0LvRjNC60L4g0YfRgtC+INC+0YLQvNC10YfQtdC90L3Rg9GOINC30LDQtNCw0YfRg1xuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5kZWxldGVUYXNrID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10LzQtdGJ0LXQvdC40Y8g0LfQsNC00LDRh9C4INCyINC60L7RgNC30LjQvdGDXG4gICAgICAgICAgICB0YXNrLmRlbGV0ZWQgPSB0cnVlOyAvLyDQt9Cw0LTQsNGH0LAg0Y/QstC70Y/QtdGC0YHRjyDRg9C00LDQu9C10L3QvdC+0LlcbiAgICAgICAgICAgIHRhc2suaGlkZSA9IHRydWU7IC8vINGB0LrRgNGL0YLQvtC5XG4gICAgICAgICAgICB0YXNrLmRvbmUgPSBmYWxzZTsgLy8g0Lgg0L3QtSDQstGL0L/QvtC70L3QtdC90L3QvtC5XG4gICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnJldHVyblRhc2sgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LLQvtC30LLRgNCw0YnQtdC90Lgg0LfQsNC00LDRh9C4INC40Lcg0LrQvtGA0LfQuNC90YtcbiAgICAgICAgICAgIHRhc2suZGVsZXRlZCA9IGZhbHNlOyAvLyDQt9Cw0LTQsNGH0LAg0Y/QstC70Y/QtdGC0YHRjyDQvdC1INGD0LTQsNC70LXQvdC90L7QuVxuICAgICAgICAgICAgdGFzay5oaWRlID0gdHJ1ZTsgLy8g0YHQutGA0YvQstCw0LXQvCDQtdGRINC40Lcg0LrQvtGA0LfQuNC90YtcbiAgICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuZmluYWxseURlbGV0ZVRhc2sgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L7QutC+0L3Rh9Cw0YLQtdC70YzQvdC+0LPQviDRg9C00LDQu9C10L3QuNGPINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oJ9Ci0L7Rh9C90L4g0YPQtNCw0LvQuNGC0Ywg0LfQsNC00LDRh9GDPycpKSB7IC8vINC30LDQv9GA0L7RgSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y4g0YLQvtGH0L3QviDQu9C4INC+0L0g0YXQvtGH0LXRgiDRg9C00LDQu9C40YLRjCDQt9Cw0LTQsNGH0YMsINC10YHQu9C4INC00LAsINGC0L4g0L/QtdGA0LXRhdC+0LTQuNC8INC6INGD0LTQsNC70LXQvdC40Y5cbiAgICAgICAgICAgICAgbGV0IGluZGV4OyAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQuNC90LTQtdC60YHQsFxuICAgICAgICAgICAgICBsZXQgaSA9IGFwcFZhbHVlcy50YXNrcy5sZW5ndGggLSAxOyAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQtNC70LjQvdGLINC80LDRgdGB0LjQstCwIC0xXG4gICAgICAgICAgICAgIHdoaWxlIChpID49IDApIHsgLy8g0L/QvtC60LAg0LIg0LzQsNGB0YHQuNCy0LUg0LXRidGRINC10YHRgtGMINGN0LvQtdC80LXQvdGC0YtcbiAgICAgICAgICAgICAgICBpZiAoYXBwVmFsdWVzLnRhc2tzW2ldLiQkaGFzaEtleSA9PT0gdGFzay4kJGhhc2hLZXkpIHsgLy8g0LXRgdC70LggaGFzaEtleSDRjdC70LXQvNC10L3RgtCwINGA0LDQstC10L0gaGFza0tleSDRg9C00LDQu9GP0LXQvNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICAgICAgICBpbmRleCA9IGk7IC8vINGC0L4g0YHQvtGF0YDQsNC90Y/QtdC8INC40L3QtNC10LrRgSDQt9Cw0LTQsNGH0Lgg0LIg0LzQsNGB0YHQuNCy0LVcbiAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyDQv9GA0LXQutGA0LDRidCw0LXQvCDQstGL0L/QvtC70L3QtdC90LjQtSDRhtC40LrQu9CwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGktLTsgLy8g0LTQtdC70LDQtdC8INGB0LvQtdC00YPRjtGJ0LjQuSDRiNCw0LNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhcHBWYWx1ZXMudGFza3Muc3BsaWNlKGluZGV4LCAxKTsgLy8g0YPQtNCw0LvRj9C10Lwg0LfQsNC00LDRh9GDINC40Lcg0LzQsNGB0YHQuNCy0LAg0LfQsNC00LDRh1xuICAgICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3Rhc2tDdHJsJyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDQv9GB0LXQstC00L7QvdC40Lwg0LTQu9GPINC60L7QvdGC0YDQvtC70LvQtdGA0LBcbiAgICAgIH07XG4gIH1dKVxuICAgIC8qINCa0L7QvdGC0YDQvtC70LvQtdGAINC00LvRjyBwaWUg0YHRgtCw0YLQuNGB0YLQuNC60LggKi9cbiAgICAuY29udHJvbGxlcignUGllQ3RybCcsIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnYXBwVmFsdWVzJywgJ3NhdmVGYWN0b3J5JywgZnVuY3Rpb24gKCRzY29wZSwgJHJvb3RTY29wZSwgYXBwVmFsdWVzLCBzYXZlRmFjdG9yeSkge1xuICAgICAgLy8g0LjQvdC40YbQuNCw0LvQuNC30LjRgNGD0LXQvCDRgdGC0LDRgNGC0L7QstGL0LUg0LfQvdCw0YfQtdC90LjRj1xuICAgICAgJHNjb3BlLnNob3dDYW52YXMgPSBhcHBWYWx1ZXMuc3RhdGlzdGljOyAvLyBj0LrRgNGL0LLQsNC10LwgLyDQv9C+0LrQsNC30YvQstCw0LXQvCBjYW52YXMgYyBwaWUgc3RhdGlzdGljXG4gICAgICAkc2NvcGUuaGlkZVNob3dCdXR0b25Db250ZW50ID0gJHNjb3BlLnNob3dDYW52YXMgPT09IGZhbHNlID8gJ3Nob3cgc3RhdGlzdGljcycgOiAnaGlkZSBzdGF0aXN0aWNzJzsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgdC+0LTQtdGA0LbQsNC90LjQtSDQtNC70Y8gYnV0dG9uXG4gICAgICAkc2NvcGUucGllVGFza2tCdXR0b25IaWRlID0gKGFwcFZhbHVlcy50YXNrcy5sZW5ndGggPiAwKSA/IGZhbHNlIDogdHJ1ZTsgLy8g0LXRgdC70Lgg0L3QtdGCINC30LDQtNCw0YcsINGC0L4g0L3QtSDQv9C+0LrQsNC30YvQstCw0LXQvCBidXR0b25cbiAgICAgIC8vINC/0YDQuCDQutC70LjQutC1INC90LAgYnV0dG9uXG4gICAgICAkc2NvcGUuc2hvd0hpZGVDbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXBwVmFsdWVzLnN0YXRpc3RpYyA9ICRzY29wZS5zaG93Q2FudmFzID0gISRzY29wZS5zaG93Q2FudmFzOyAvLyDRgtC+0LPQs9C70LjQvCDQt9C90LDRh9C10L3QuNC1INC00LvRjyBhcHBWYWx1ZXMuc3RhdGlzdGljXG4gICAgICAgICRzY29wZS5oaWRlU2hvd0J1dHRvbkNvbnRlbnQgPSAkc2NvcGUuc2hvd0NhbnZhcyA9PT0gZmFsc2UgPyAnc2hvdyBzdGF0aXN0aWNzJyA6ICdoaWRlIHN0YXRpc3RpY3MnOyAvLyDQvNC10L3Rj9C10Lwg0YHQvtC00LXRgNC20LDQvdC40LUg0LTQu9GPIGJ1dHRvblxuICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICB9O1xuICAgICAgLy8g0LXRgdC70Lgg0L/RgNC40YjQu9C+INC+0L/QvtCy0LXRidC10L3QuNC1INC+INGC0L7QvCwg0YfRgtC+INCyIHRhc2tzINC/0YDQvtC40LfQvtGI0LvQuCDQuNC30LzQtdC90LXQvdC40Y9cbiAgICAgICRyb290U2NvcGUuJG9uKCdUYXNrc0NoYW5nZWQnLCBmdW5jdGlvbiAoKSB7IC8vINGE0YPQvdC60YbQuNGPINC+0LHQvdC+0LLQu9C10L3QuNGPINGB0YLQsNGC0LjRgdGC0LjQutC4XG4gICAgICAgIC8vINC/0LXRgNC10LzQtdC90L3Ri9C1INC00LvRjyDRhdGA0LDQvdC10L3QuNGPINC30LDQtNCw0Yc6XG4gICAgICAgIGxldCBkb25lVGFza3MgPSAwOyAvLyDQstGL0L/QvtC70L3QtdC90L3Ri9GFXG4gICAgICAgIGxldCBkZWxldGVkVGFza3MgPSAwOyAvLyDRg9C00LDQu9C10L3QvdGL0YVcbiAgICAgICAgbGV0IHVuZG9uZVRhc2tzID0gMDsgLy8g0LXRidGRINC90LUg0YHQtNC10LvQsNC90L3Ri9GFXG4gICAgICAgIGlmIChhcHBWYWx1ZXMudGFza3MubGVuZ3RoID09PSAwKSB7IC8vINC10YHQu9C4INC90LXRgiDQt9Cw0LTQsNGHXG4gICAgICAgICAgYXBwVmFsdWVzLnN0YXRpc3RpYyA9IGZhbHNlOyAvLyDQvNC10L3Rj9C10Lwg0LfQvdCw0YfQtdC90LjQtSDQsiBhcHBWYWx1ZXNcbiAgICAgICAgICAkc2NvcGUuaGlkZVNob3dCdXR0b25Db250ZW50ID0gJ3Nob3cgc3RhdGlzdGljcyc7IC8vINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNC1INC60L7QvdGC0LXQvdGC0LAg0LTQu9GPIGJ1dHRvblxuICAgICAgICB9XG4gICAgICAgICRzY29wZS5waWVUYXNra0J1dHRvbkhpZGUgPSAoYXBwVmFsdWVzLnRhc2tzLmxlbmd0aCA+IDApID8gZmFsc2UgOiB0cnVlOyAvLyDQtdGB0LvQuCDQvdC10YIg0LfQsNC00LDRhywg0YLQviDQvdC1INC/0L7QutCw0LfRi9Cy0LDQtdC8IGJ1dHRvblxuICAgICAgICAkc2NvcGUuc2hvd0NhbnZhcyA9ICEkc2NvcGUucGllVGFza2tCdXR0b25IaWRlICYmIGFwcFZhbHVlcy5zdGF0aXN0aWM7XG4gICAgICAgIGFwcFZhbHVlcy50YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vINGB0YfQuNGC0LDQtdC8INC60L7Qu9C40YfQtdGB0YLQstC+INGA0LDQt9C70LjRh9C90YvRhSDQt9Cw0LTQsNGHINCyINGB0L/QuNGB0LrQtSDQt9Cw0LTQsNGHXG4gICAgICAgICAgaXRlbS5kb25lICYmIChkb25lVGFza3MgKz0gMSk7IC8vINC10YHQu9C4INC30LDQtNCw0YfQsCDRgdC00LXQu9Cw0L3QsCwg0YLQviDRg9Cy0LXQu9C40YfQuNCy0LDQtdC8INC60L7Qu9C40YfQtdGB0YLQstC+INGB0LTQtdC70LDQvdC90YvRhSDQt9Cw0LTQsNGHXG4gICAgICAgICAgaXRlbS5kZWxldGVkICYmIChkZWxldGVkVGFza3MgKz0gMSk7IC8vINC10YHQu9C4INC30LDQtNCw0YfQsCDRg9C00LDQu9C10L3QsCwg0YLQviDRg9Cy0LXQu9C40YfQuNCy0LDQtdC8INC60L7Qu9C40YfQtdGB0YLQstC+INGD0LTQsNC70LXQvdC90YvRhSDQt9Cw0LTQsNGHXG4gICAgICAgICAgIWl0ZW0uZGVsZXRlZCAmJiAhaXRlbS5kb25lICYmICh1bmRvbmVUYXNrcyArPSAxKTsgLy8g0LXRgdC70Lgg0LfQsNC00LDRh9CwINC90LUg0YHQtNC10LvQsNC90LAsINC4INC90LUg0YPQtNCw0LvQtdC90LAsINGC0L4g0YPQstC10LjRh9C40LLQsNC10Lwg0LrQvtC70LjRh9C10YHRgtCy0L4g0LXRidGRINC90LUg0YHQtNC10LvQsNC90L3Ri9GFINC30LDQtNCw0YdcbiAgICAgICAgfSk7XG4gICAgICAgIC8vINC30LDQtNCw0LXQvCDQt9C90LDRh9C10L3QuNGPINC00LvRjyBwaWUgc3RhdGlzdGljXG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgbGFiZWw6IFwiTXkgZGF0YXNldFwiLFxuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgIGRlbGV0ZWRUYXNrcyxcbiAgICAgICAgICBkb25lVGFza3MsXG4gICAgICAgICAgdW5kb25lVGFza3NcbiAgICAgICAgXSxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogW1xuICAgICAgICAgIFwiI0Y3NDY0QVwiLFxuICAgICAgICAgIFwiIzQ2QkZCRFwiLFxuICAgICAgICAgIFwiI0ZEQjQ1Q1wiXG4gICAgICAgIF1cbiAgICAgIH1dLFxuICAgICAgICAgIGxhYmVsczogW1xuICAgICAgICBcIkRlbGV0ZWQgdGFza3NcIixcbiAgICAgICAgXCJEb25lIHRhc2tzXCIsXG4gICAgICAgIFwiVW5kb25lIHRhc2tzXCJcbiAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgLy8g0LfQsNC00LDQtdC8INC90LDRgdGC0YDQvtC50LrQuCDQtNC70Y8gcGllIHN0YXRpc3RpY1xuICAgICAgICAkc2NvcGUub3B0aW9ucyA9IHtcbiAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBmdW5jdGlvbiAoY2hhcnQpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJ0LmRhdGEuZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGFzZXQgPSBjaGFydC5kYXRhLmRhdGFzZXRzW2ldO1xuICAgICAgICAgICAgICB0ZXh0LnB1c2goJycpO1xuICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFzZXQuZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHRleHQucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgdGV4dC5wdXNoKGNoYXJ0LmRhdGEubGFiZWxzW2pdKTtcbiAgICAgICAgICAgICAgICB0ZXh0LnB1c2goJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRleHQucHVzaCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGV4dC5qb2luKFwiXCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfV0pXG59KCkpOyJdfQ==
