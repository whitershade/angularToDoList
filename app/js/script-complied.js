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
    tasks: [// массив для хранения задач
      //    { description: '1', deleted: false, done: false, hide: false, onchange: false } --> так выглядит объект типа "задача", хранящийся в массиве
    ]
  }).factory('saveFactory', ['appValues', function (appValues) {
    return {
      saveInLocalStorage: function saveInLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(appValues.tasks));
        localStorage.setItem('hideToggle', appValues.hideToggle);
        localStorage.setItem('inBasket', appValues.inBasket);
      },
      loadFromLocalStorage: function loadFromLocalStorage() {
        if (localStorage.getItem('tasks')) {
          // если в local storage есть ключ tasks
          appValues.tasks = JSON.parse(localStorage.getItem('tasks')); // получаем по ключу массив
          appValues.tasks.forEach(function (item) {
            // для каждого элемента в массиве tasks
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
      }
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
  .directive('controlButtons', ['saveFactory', 'appValues', function (saveFactory, appValues, test) {
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
  }]).controller('PieCtrl', ['$scope', 'appValues', function ($scope, appValues) {
    $scope.updatePie = function () {
      var doneTasks = 0;
      var deletedTasks = 0;
      var undoneTasks = 0;
      appValues.tasks.forEach(function (item) {
        item.done && (doneTasks += 1);
        item.deleted && (deletedTasks += 1);
        !item.deleted && !item.done && (undoneTasks += 1);
      });
      $scope.data = {
        datasets: [{
          label: "My First dataset",
          data: [deletedTasks, doneTasks, undoneTasks],
          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"]
        }],
        labels: ["Deleted tasks", "Done tasks", "Undone tasks"]
      };
      $scope.options = {
        defaultFontColor: '#000',
        legend: {
          display: false
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
        }
      };
    };
  }]);
})();
//# sourceMappingURL=data:application/json;base64,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LE1BQU0sSUFBTixDQUFXLFFBQVgsQ0FBb0IsQ0FBcEIsQ0FBZDtBQUNBLGlCQUFLLElBQUwsQ0FBVSxFQUFWO0FBQ0EsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxRQUFRLElBQVIsQ0FBYSxNQUFqQyxFQUF5QyxHQUF6QyxFQUE4QztBQUM1QyxtQkFBSyxJQUFMLENBQVUsRUFBVjtBQUNBLG1CQUFLLElBQUwsQ0FBVSxNQUFNLElBQU4sQ0FBVyxNQUFYLENBQWtCLENBQWxCLENBQVY7QUFDQSxtQkFBSyxJQUFMLENBQVUsRUFBVjtBQUNEO0FBQ0QsaUJBQUssSUFBTCxDQUFVLEVBQVY7QUFDRDtBQUNELGlCQUFPLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBUDtBQUNEO0FBbEJjLE9BQWpCO0FBb0JELEtBakREO0FBa0RELEdBbkRzQixDQTNJekI7QUErTEQsQ0FqTUEsR0FBRCIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQgbWF4LWxlbjogW1wiZXJyb3JcIiwgMjAwXSAqL1xuLyogZXNsaW50LWVudiBicm93c2VyICovXG4vKiBlc2xpbnQgbm8tdW51c2VkLWV4cHJlc3Npb25zOiBbXCJlcnJvclwiLCB7IFwiYWxsb3dTaG9ydENpcmN1aXRcIjogdHJ1ZSwgXCJhbGxvd1Rlcm5hcnlcIjogdHJ1ZSB9XSAqL1xuLyogZ2xvYmFsIGFuZ3VsYXIgKi9cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgYW5ndWxhci5tb2R1bGUoJ3RvRG9MaXN0JywgWyd0Yy5jaGFydGpzJ10pIC8vINC40L3QuNGG0LjQsNC70LjQt9C40YDRg9C10LwgYW5ndWxhci3Qv9GA0LjQu9C+0LbQtdC90LjQtVxuICAgIC52YWx1ZSgnYXBwVmFsdWVzJywge1xuICAgICAgaGlkZVRvZ2dsZTogZmFsc2UsIC8vINGB0LrRgNGL0LLQsNGC0YwgLyDQv9C+0LrQsNC30YvQstCw0YLRjCDRgdC00LXQu9Cw0L3QvdGL0LUg0LfQsNC00LDRh9C4XG4gICAgICBpbkJhc2tldDogZmFsc2UsIC8vINC/0L7QutCw0LfRi9Cy0LDRgtGMIC8g0YHQutGA0YvQstCw0YLRjCDRg9C00LDQu9C10L3QvdGL0LUg0LfQsNC00LDRh9C4XG4gICAgICB0YXNrczogWyAvLyDQvNCw0YHRgdC40LIg0LTQu9GPINGF0YDQsNC90LXQvdC40Y8g0LfQsNC00LDRh1xuICAgICAgICAvLyAgICB7IGRlc2NyaXB0aW9uOiAnMScsIGRlbGV0ZWQ6IGZhbHNlLCBkb25lOiBmYWxzZSwgaGlkZTogZmFsc2UsIG9uY2hhbmdlOiBmYWxzZSB9IC0tPiDRgtCw0Log0LLRi9Cz0LvRj9C00LjRgiDQvtCx0YrQtdC60YIg0YLQuNC/0LAgXCLQt9Cw0LTQsNGH0LBcIiwg0YXRgNCw0L3Rj9GJ0LjQudGB0Y8g0LIg0LzQsNGB0YHQuNCy0LVcbiAgICAgIF1cbiAgICB9KVxuICAgIC5mYWN0b3J5KCdzYXZlRmFjdG9yeScsIFsnYXBwVmFsdWVzJywgZnVuY3Rpb24gKGFwcFZhbHVlcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkoYXBwVmFsdWVzLnRhc2tzKSk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZGVUb2dnbGUnLCBhcHBWYWx1ZXMuaGlkZVRvZ2dsZSk7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luQmFza2V0JywgYXBwVmFsdWVzLmluQmFza2V0KTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZEZyb21Mb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpIHsgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDQutC70Y7RhyB0YXNrc1xuICAgICAgICAgICAgYXBwVmFsdWVzLnRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSk7IC8vINC/0L7Qu9GD0YfQsNC10Lwg0L/QviDQutC70Y7Rh9GDINC80LDRgdGB0LjQslxuICAgICAgICAgICAgYXBwVmFsdWVzLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy8g0LTQu9GPINC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LIg0LzQsNGB0YHQuNCy0LUgdGFza3NcbiAgICAgICAgICAgICAgaXRlbS4kJGhhc2hLZXkgPSB1bmRlZmluZWQ7IC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8IGhhc2hLZXkgPSB1bmRlZmluZWQgKNC90LXQvtCx0YXQvtC00LjQvNC+INC00LvRjyDQuNC30LHQtdC20LDQvdC40LUg0LrQvtC90YTQu9C40LrRgtC+0LIg0L/RgNC4INCy0YvQstC+0LTQtSDQt9Cw0LTQsNGHKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFwcFZhbHVlcy5oaWRlVG9nZ2xlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpZGVUb2dnbGUnKTsgLy8g0L/Ri9GC0LDQtdC80YHRjyDRgdGH0LjRgtCw0YLRjCDQt9C90LDRh9C10L3QuNC1INC00LvRjyBoaWRlIFRvZ2dsZSDQuNC3IExvY2FsIFN0b3JhZ2VcbiAgICAgICAgICBpZiAoIWFwcFZhbHVlcy5oaWRlVG9nZ2xlKSB7XG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC90LXRgiBoaWRlVG9nZ2xlICjRgdGC0YDQsNC90LjRhtCwINC+0YLQutGA0YvRgtCwINCy0L/QtdGA0LLRi9C1KSwg0YLQvlxuICAgICAgICAgICAgYXBwVmFsdWVzLmhpZGVUb2dnbGUgPSBmYWxzZTsgLy8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LfQsNC00LDQtNC40Lwg0LXQvNGDIGZhbHNlICjQt9C90LDRh9C40YIsINC90LAg0L3QtdCz0L4g0LXRidGRINC90LUg0L3QsNC20LjQvNCw0LvQuClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDRgtCw0LrQvtC5INGN0LvQtdC80LXQvdGCLCDRgtC+XG4gICAgICAgICAgICBhcHBWYWx1ZXMuaGlkZVRvZ2dsZSA9IGFwcFZhbHVlcy5oaWRlVG9nZ2xlID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7IC8vINC10YHQu9C4INC30LDQv9C40YHQsNC90LAg0YHRgtGA0L7QutCwIHRydWUsINGC0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdGRINCyIGJvb2wgdHJ1ZSwg0LjQvdCw0YfQtSDQsiBib29sIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGFwcFZhbHVlcy5pbkJhc2tldCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbkJhc2tldCcpO1xuICAgICAgICAgIGlmICghYXBwVmFsdWVzLmluQmFza2V0KSB7XG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC90LXRgiBoaWRlVG9nZ2xlICjRgdGC0YDQsNC90LjRhtCwINC+0YLQutGA0YvRgtCwINCy0L/QtdGA0LLRi9C1KSwg0YLQvlxuICAgICAgICAgICAgYXBwVmFsdWVzLmluQmFza2V0ID0gZmFsc2U7IC8vINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC30LDQtNCw0LTQuNC8INC10LzRgyBmYWxzZSAo0LfQvdCw0YfQuNGCLCDQvdCwINC90LXQs9C+INC10YnRkSDQvdC1INC90LDQttC40LzQsNC70LgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0LXRgdGC0Ywg0YLQsNC60L7QuSDRjdC70LXQvNC10L3Rgiwg0YLQvlxuICAgICAgICAgICAgYXBwVmFsdWVzLmluQmFza2V0ID0gYXBwVmFsdWVzLmluQmFza2V0ID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7IC8vINC10YHQu9C4INC30LDQv9C40YHQsNC90LAg0YHRgtGA0L7QutCwIHRydWUsINGC0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdGRINCyIGJvb2wgdHJ1ZSwg0LjQvdCw0YfQtSDQsiBib29sIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICB9XSlcbiAgICAvKiDQlNC40YDQtdC60YLQuNCy0LAg0LTQu9GPINCy0YvQstC+0LTQsCDRgtC10LrRg9GJ0LXQuSDQtNCw0YLRiyAqL1xuICAgIC5kaXJlY3RpdmUoJ2N1cnJlbnREYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJywgLy8gb25seSBtYXRjaGVzIGVsZW1lbnQgbmFtZVxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2N1cnJlbnQtZGF0ZS5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7IC8vINC30LDQtNCw0LXQvCDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7IC8vINC/0L7Qu9GD0YfQsNC10Lwg0YLQtdC60YPRidGD0Y4g0LTQsNGC0YNcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlckFzOiAnZGF0ZUN0cmwnIC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INC/0YHQtdCy0LTQvtC90LjQvCDQtNC70Y8g0LrQvtC90YLRgNC+0LvQu9C10YDQsFxuICAgICAgfTtcbiAgICB9KVxuICAgIC8qINCU0LjRgNC10LrRgtC40LLQsCDQtNC70Y8g0LrQvdC+0L/QvtC6INGD0L/RgNCy0LvQtdC90LjRjyAqL1xuICAgIC5kaXJlY3RpdmUoJ2NvbnRyb2xCdXR0b25zJywgWydzYXZlRmFjdG9yeScsICdhcHBWYWx1ZXMnLCBmdW5jdGlvbiAoc2F2ZUZhY3RvcnksIGFwcFZhbHVlcywgdGVzdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJywgLy8gb25seSBtYXRjaGVzIGVsZW1lbnQgbmFtZVxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbnRyb2wtYnV0dG9ucy5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7IC8vINC30LDQtNCw0LXQvCDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICAgICAgICAgIHNhdmVGYWN0b3J5LmxvYWRGcm9tTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgICAgdGhpcy5pbkJhc2tldCA9IGFwcFZhbHVlcy5pbkJhc2tldDsgLy8g0LfQsNC00LDQtdC8INGC0LXQutGD0YnQtdC1INC30L3QsNGH0LXQvdC40LUgaW5CYXNrZXRcbiAgICAgICAgICB0aGlzLmhpZGVUb2dnbGUgPSBhcHBWYWx1ZXMuaGlkZVRvZ2dsZTsgLy8g0LfQsNC00LDQtdC8INGC0LXQutGD0YnQtdC1INC30L3QsNGH0LXQvdC40LUgaGlkZVRvZ2dsZVxuICAgICAgICAgIHRoaXMuYWRkTmV3VGFzayA9IGZ1bmN0aW9uIChkZXNjcikgeyAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0LTQsNGH0YMsINC90LAg0LLRhdC+0LQg0L/QvtC00LDQtdGC0YHRjyDRgdC+0LTQtdGA0LbQsNC10L3QuNC1INC30LDQtNCw0YfQuFxuICAgICAgICAgICAgYXBwVmFsdWVzLnRhc2tzLnB1c2goeyAvLyDQsiDQvNCw0YHRgdC40LIg0LfQsNC00LDRhyDQtNC+0LHQsNCy0LvRj9C10YLRgdGPINC90L7QstGL0Lkg0L7QsdGK0LXQutGCINGBXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjciwgLy/Qv9C+0LvRg9GH0LXQvdC90YvQvCDQv9GA0Lgg0LLRi9C30L7QstC1INGE0YPQvdC60YbQuNC4INC+0L/QuNGB0LDQvdC40LXQvFxuICAgICAgICAgICAgICBkZWxldGVkOiBmYWxzZSwgLy8g0LfQsNC00LDRh9CwINC90LUg0YPQtNCw0LvQtdC90LBcbiAgICAgICAgICAgICAgZG9uZTogZmFsc2UsIC8vINC90LUg0LLRi9C/0L7Qu9C90LXQvdCwXG4gICAgICAgICAgICAgIGhpZGU6IGZhbHNlLCAvLyDQvdC1INGB0LrRgNGL0YLQsFxuICAgICAgICAgICAgICBvbmNoYW5nZTogZmFsc2UgLy8g0L3QtSDQuNC30LzQtdC90Y/QtdGC0YHRjyDQsiDRgtC10LrRg9GJ0LjQuSDQvNC+0LzQtdC90YJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdC40YLRjCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy50b2dnbGVEb25lID0gZnVuY3Rpb24gKCkgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPIGRvbmUvdW5kb25lINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgdGhpcy5oaWRlVG9nZ2xlID0gYXBwVmFsdWVzLmhpZGVUb2dnbGUgPSAhYXBwVmFsdWVzLmhpZGVUb2dnbGU7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10LwgZG9uZS91bmRvbmUsINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC4INCy0L3Rg9GC0YDQuCDQutC+0YLRgNC+0LvQu9C10YDQsFxuICAgICAgICAgICAgYXBwVmFsdWVzLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy8g0LTQu9GPINC60LDQttC00L7QuSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgICAgaXRlbS5kb25lICYmIGFwcFZhbHVlcy5oaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSB0cnVlKTsgLy8g0LXRgdC70Lgg0LfQsNC00LDRh9CwINGB0LTQtdC70LDQvdCwLCDQuCDQstGL0LHRgNCw0L3QviDRgdC60YDRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LgsINGC0L4g0YHQutGA0YvQstCw0LXQvFxuICAgICAgICAgICAgICBpdGVtLmRvbmUgJiYgIWFwcFZhbHVlcy5oaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7IC8vINC10YHQuNC7INC30LDQtNCw0YfQsCDRgdC00LXQu9Cw0L3QsCwg0Lgg0LLRi9Cx0YDQsNC90L4g0L/QvtC60LDQt9GL0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C1INC30LDQtNCw0YfQuCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90LjRgtGMINC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlIFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy50b2dnbGVEZWxldGVkVGFza3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmluQmFza2V0ID0gYXBwVmFsdWVzLmluQmFza2V0ID0gIWFwcFZhbHVlcy5pbkJhc2tldDsgLy8g0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvCDQsiDQutC+0YDQt9C40L3QtS/QvdC1INCyINC60L7RgNC30LjQvdC1LCDQs9C70L7QsdCw0LvRjNC90YPRjiDQuCDQstC90YPRgtGA0Lgg0LrQvtGC0YDQvtC70LvQtdGA0LBcbiAgICAgICAgICAgIGFwcFZhbHVlcy50YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vINC00LvRjyDQutCw0LbQtNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICAgIGl0ZW0uaGlkZSA9IHRydWU7IC8vINGB0LrRgNGL0LLQsNC10Lwg0LrQsNC20LTRg9GOINC30LDQtNCw0YfRg1xuICAgICAgICAgICAgICBhcHBWYWx1ZXMuaW5CYXNrZXQgJiYgaXRlbS5kZWxldGVkICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7IC8vINC10YHQu9C4INCyINC00LDQvdC90YvQuSDQvNC+0LzQtdC90YIg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQutC+0YDQt9C40L3QtSwg0Lgg0LfQsNC00LDRh9CwINGD0LTQsNC70LXQvdCwLCDRgtC+INC/0L7QutCw0LfRi9Cy0LDQtdC8INC30LDQtNCw0YfRg1xuICAgICAgICAgICAgICAhYXBwVmFsdWVzLmluQmFza2V0ICYmICFpdGVtLmRlbGV0ZWQgJiYgKGl0ZW0uaGlkZSA9IGZhbHNlKTsgLy8g0LXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINC90LUg0L3QsNGF0L7QtNC40YLRgdGPINCyINC60L7RgNC30LjQvdC1LCDQuCDQt9Cw0LTQsNGH0LAg0L3QtSDRg9C00LDQu9C10L3QsCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvCDQtdGRXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyQXM6ICdidG5DdHJsJyAvLyDQv9GB0LXQstC00L7QvdC40Lwg0LTQu9GPINC60L7QvdGC0YDQvtC70LvQtdGA0LBcbiAgICAgIH07XG4gIH1dKVxuICAgIC8qINCU0LjRgNC10LrRgtC40LLQsCDQtNC70Y8g0YHQv9C40YHQutCwINC30LDQtNCw0YcgKi9cbiAgICAuZGlyZWN0aXZlKCd0YXNrc0xpc3QnLCBbJ3NhdmVGYWN0b3J5JywgJ2FwcFZhbHVlcycsIGZ1bmN0aW9uIChzYXZlRmFjdG9yeSwgYXBwVmFsdWVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGFza3MtbGlzdC5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy50YXNrcyA9IGFwcFZhbHVlcy50YXNrczsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgdC/0LjRgdC+0Log0LfQsNC00LDRh1xuICAgICAgICAgIHRoaXMuY2hhbmdlVGFzayA9IGZ1bmN0aW9uICh0YXNrLCBkZXNjcmlwdGlvbikgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPINGC0LXQutGD0YnQtdCz0L4g0YHQvtC00LXRgNC20LDQvdC40Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgICB0YXNrLm9uY2hhbmdlID0gIXRhc2sub25jaGFuZ2U7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10Lwgb25jaGFuZ2Ug0LTQu9GPINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gJiYgKHRhc2suZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbik7IC8vINC10YHQu9C4INCyINGE0YPQvdC60YbQuNGOINC/0LXRgNC10LTQsNC90L4g0YHQvtC00LXRgNCw0LbQsNC10L3QuNC1INC00LvRjyDQt9Cw0L/QuNGB0Lgg0LIg0LfQsNC00LDRh9GDLCDRgtC+INC30LDQv9C40YHRi9Cy0LDQtdC8INC10LPQvlxuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy50b2dnbGVEb25lID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC40LfQvNC10L3QtdC90LjRjyBkb25lL3VuZG9uZSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgIHRhc2suZG9uZSA9ICF0YXNrLmRvbmU7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10LwgZG9uZS91bmRvbmUg0LTQu9GPINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgYXBwVmFsdWVzLmhpZGVUb2dnbGUgJiYgKHRhc2suaGlkZSA9IHRydWUpOyAvLyDQtdGB0LvQuCDQstGL0LHRgNCw0L3QviDRgdC60YDRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LgsINGC0L4g0YHQutGA0YvQstCw0LXQvCDRgtC+0LvRjNC60L4g0YfRgtC+INC+0YLQvNC10YfQtdC90L3Rg9GOINC30LDQtNCw0YfRg1xuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5kZWxldGVUYXNrID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10LzQtdGJ0LXQvdC40Y8g0LfQsNC00LDRh9C4INCyINC60L7RgNC30LjQvdGDXG4gICAgICAgICAgICB0YXNrLmRlbGV0ZWQgPSB0cnVlOyAvLyDQt9Cw0LTQsNGH0LAg0Y/QstC70Y/QtdGC0YHRjyDRg9C00LDQu9C10L3QvdC+0LlcbiAgICAgICAgICAgIHRhc2suaGlkZSA9IHRydWU7IC8vINGB0LrRgNGL0YLQvtC5XG4gICAgICAgICAgICB0YXNrLmRvbmUgPSBmYWxzZTsgLy8g0Lgg0L3QtSDQstGL0L/QvtC70L3QtdC90L3QvtC5XG4gICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnJldHVyblRhc2sgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LLQvtC30LLRgNCw0YnQtdC90Lgg0LfQsNC00LDRh9C4INC40Lcg0LrQvtGA0LfQuNC90YtcbiAgICAgICAgICAgIHRhc2suZGVsZXRlZCA9IGZhbHNlOyAvLyDQt9Cw0LTQsNGH0LAg0Y/QstC70Y/QtdGC0YHRjyDQvdC1INGD0LTQsNC70LXQvdC90L7QuVxuICAgICAgICAgICAgdGFzay5oaWRlID0gdHJ1ZTsgLy8g0YHQutGA0YvQstCw0LXQvCDQtdGRINC40Lcg0LrQvtGA0LfQuNC90YtcbiAgICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuZmluYWxseURlbGV0ZVRhc2sgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L7QutC+0L3Rh9Cw0YLQtdC70YzQvdC+0LPQviDRg9C00LDQu9C10L3QuNGPINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oJ9Ci0L7Rh9C90L4g0YPQtNCw0LvQuNGC0Ywg0LfQsNC00LDRh9GDPycpKSB7IC8vINC30LDQv9GA0L7RgSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y4g0YLQvtGH0L3QviDQu9C4INC+0L0g0YXQvtGH0LXRgiDRg9C00LDQu9C40YLRjCDQt9Cw0LTQsNGH0YMsINC10YHQu9C4INC00LAsINGC0L4g0L/QtdGA0LXRhdC+0LTQuNC8INC6INGD0LTQsNC70LXQvdC40Y5cbiAgICAgICAgICAgICAgbGV0IGluZGV4OyAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQuNC90LTQtdC60YHQsFxuICAgICAgICAgICAgICBsZXQgaSA9IGFwcFZhbHVlcy50YXNrcy5sZW5ndGggLSAxOyAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQtNC70LjQvdGLINC80LDRgdGB0LjQstCwIC0xXG4gICAgICAgICAgICAgIHdoaWxlIChpID49IDApIHsgLy8g0L/QvtC60LAg0LIg0LzQsNGB0YHQuNCy0LUg0LXRidGRINC10YHRgtGMINGN0LvQtdC80LXQvdGC0YtcbiAgICAgICAgICAgICAgICBpZiAoYXBwVmFsdWVzLnRhc2tzW2ldLiQkaGFzaEtleSA9PT0gdGFzay4kJGhhc2hLZXkpIHsgLy8g0LXRgdC70LggaGFzaEtleSDRjdC70LXQvNC10L3RgtCwINGA0LDQstC10L0gaGFza0tleSDRg9C00LDQu9GP0LXQvNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICAgICAgICBpbmRleCA9IGk7IC8vINGC0L4g0YHQvtGF0YDQsNC90Y/QtdC8INC40L3QtNC10LrRgSDQt9Cw0LTQsNGH0Lgg0LIg0LzQsNGB0YHQuNCy0LVcbiAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyDQv9GA0LXQutGA0LDRidCw0LXQvCDQstGL0L/QvtC70L3QtdC90LjQtSDRhtC40LrQu9CwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGktLTsgLy8g0LTQtdC70LDQtdC8INGB0LvQtdC00YPRjtGJ0LjQuSDRiNCw0LNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhcHBWYWx1ZXMudGFza3Muc3BsaWNlKGluZGV4LCAxKTsgLy8g0YPQtNCw0LvRj9C10Lwg0LfQsNC00LDRh9GDINC40Lcg0LzQsNGB0YHQuNCy0LAg0LfQsNC00LDRh1xuICAgICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3Rhc2tDdHJsJyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDQv9GB0LXQstC00L7QvdC40Lwg0LTQu9GPINC60L7QvdGC0YDQvtC70LvQtdGA0LBcbiAgICAgIH07XG4gIH1dKVxuICAgIC5jb250cm9sbGVyKCdQaWVDdHJsJywgWyckc2NvcGUnLCAnYXBwVmFsdWVzJywgZnVuY3Rpb24gKCRzY29wZSwgYXBwVmFsdWVzKSB7XG4gICAgICAkc2NvcGUudXBkYXRlUGllID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZG9uZVRhc2tzID0gMDtcbiAgICAgICAgbGV0IGRlbGV0ZWRUYXNrcyA9IDA7XG4gICAgICAgIGxldCB1bmRvbmVUYXNrcyA9IDA7XG4gICAgICAgIGFwcFZhbHVlcy50YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgaXRlbS5kb25lICYmIChkb25lVGFza3MgKz0gMSk7XG4gICAgICAgICAgaXRlbS5kZWxldGVkICYmIChkZWxldGVkVGFza3MgKz0gMSk7XG4gICAgICAgICAgIWl0ZW0uZGVsZXRlZCAmJiAhaXRlbS5kb25lICYmICh1bmRvbmVUYXNrcyArPSAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS5kYXRhID0ge1xuICAgICAgICAgIGRhdGFzZXRzOiBbe1xuICAgICAgICAgICAgbGFiZWw6IFwiTXkgRmlyc3QgZGF0YXNldFwiLFxuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgIGRlbGV0ZWRUYXNrcyxcbiAgICAgICAgICBkb25lVGFza3MsXG4gICAgICAgICAgdW5kb25lVGFza3NcbiAgICAgICAgXSxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogW1xuICAgICAgICAgIFwiI0Y3NDY0QVwiLFxuICAgICAgICAgIFwiIzQ2QkZCRFwiLFxuICAgICAgICAgIFwiI0ZEQjQ1Q1wiXG4gICAgICAgIF1cbiAgICAgIH1dLFxuICAgICAgICAgIGxhYmVsczogW1xuICAgICAgICBcIkRlbGV0ZWQgdGFza3NcIixcbiAgICAgICAgXCJEb25lIHRhc2tzXCIsXG4gICAgICAgIFwiVW5kb25lIHRhc2tzXCJcbiAgICAgIF1cbiAgICAgICAgfTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMgPSB7XG4gICAgICAgICAgZGVmYXVsdEZvbnRDb2xvcjogJyMwMDAnLFxuICAgICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgICAgZGlzcGxheTogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBmdW5jdGlvbiAoY2hhcnQpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJ0LmRhdGEuZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGFzZXQgPSBjaGFydC5kYXRhLmRhdGFzZXRzW2ldO1xuICAgICAgICAgICAgICB0ZXh0LnB1c2goJycpO1xuICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFzZXQuZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHRleHQucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgdGV4dC5wdXNoKGNoYXJ0LmRhdGEubGFiZWxzW2pdKTtcbiAgICAgICAgICAgICAgICB0ZXh0LnB1c2goJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRleHQucHVzaCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGV4dC5qb2luKFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XSk7XG59KCkpOyJdfQ==
