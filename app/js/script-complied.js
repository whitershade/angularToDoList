'use strict';

/* eslint max-len: ["error", 200] */
/* eslint-env browser */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
/* global angular */

(function () {
  'use strict';

  var tasks = [// массив для хранения задач
    //    { description: '1', deleted: false, done: false, hide: false, onchange: false } --> так выглядит объект типа "задача", хранящийся в массиве
  ];

  angular.module('toDoList', []) // инициализируем angular-приложение
  .value('appValues', {
    hideToggle: false, // скрывать / показывать сделанные задачи
    inBasket: false // показывать / скрывать удаленные задачи
  }).factory('saveFactory', ['appValues', function (appValues) {
    return {
      saveInLocalStorage: function saveInLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('hideToggle', appValues.hideToggle);
        localStorage.setItem('inBasket', appValues.inBasket);
      },
      loadFromLocalStorage: function loadFromLocalStorage() {
        if (localStorage.getItem('tasks')) {
          // если в local storage есть ключ tasks
          tasks = JSON.parse(localStorage.getItem('tasks')); // получаем по ключу массив
          tasks.forEach(function (item) {
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
          tasks.push({ // в массив задач добавляется новый объект с
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
          tasks.forEach(function (item) {
            // для каждой задачи
            item.done && appValues.hideToggle && (item.hide = true); // если задача сделана, и выбрано скрывать сделанные задачи, то скрываем
            item.done && !appValues.hideToggle && (item.hide = false); // есил задача сделана, и выбрано показывать сделанные задачи, то показываем
          });
          saveFactory.saveInLocalStorage(); // сохранить изменения в local storage
        };
        this.toggleDeletedTasks = function () {
          this.inBasket = appValues.inBasket = !appValues.inBasket; // переключаем в корзине/не в корзине, глобальную и внутри котроллера
          tasks.forEach(function (item) {
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
        this.tasks = tasks; // получаем список задач
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
          if (confirm("Точно удалить задачу?")) {
            // запрос пользователю точно ли он хочет удалить задачу, если да, то переходим к удалению
            var index = void 0; // переменная для хранения индекса
            var i = tasks.length - 1; // переменная для хранения длины массива -1
            while (i >= 0) {
              // пока в массиве ещё есть элементы
              if (tasks[i].$$hashKey === task.$$hashKey) {
                // если hashKey элемента равен haskKey удаляемой задачи
                index = i; // то сохраняем индекс задачи в массиве
                break; // прекращаем выполнение цикла
              }
              i--; // делаем следующий шаг
            }
            tasks.splice(index, 1); // удаляем задачу из массива задач
            saveFactory.saveInLocalStorage(); // сохраняем измнения в local storage
          }
        };
      },
      controllerAs: 'taskCtrl' // устанавливаем псевдоним для контроллера
    };
  }]);
})();
//# sourceMappingURL=data:application/json;base64,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anMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQgbWF4LWxlbjogW1wiZXJyb3JcIiwgMjAwXSAqL1xuLyogZXNsaW50LWVudiBicm93c2VyICovXG4vKiBlc2xpbnQgbm8tdW51c2VkLWV4cHJlc3Npb25zOiBbXCJlcnJvclwiLCB7IFwiYWxsb3dTaG9ydENpcmN1aXRcIjogdHJ1ZSwgXCJhbGxvd1Rlcm5hcnlcIjogdHJ1ZSB9XSAqL1xuLyogZ2xvYmFsIGFuZ3VsYXIgKi9cblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBsZXQgdGFza3MgPSBbIC8vINC80LDRgdGB0LjQsiDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQt9Cw0LTQsNGHXG4vLyAgICB7IGRlc2NyaXB0aW9uOiAnMScsIGRlbGV0ZWQ6IGZhbHNlLCBkb25lOiBmYWxzZSwgaGlkZTogZmFsc2UsIG9uY2hhbmdlOiBmYWxzZSB9IC0tPiDRgtCw0Log0LLRi9Cz0LvRj9C00LjRgiDQvtCx0YrQtdC60YIg0YLQuNC/0LAgXCLQt9Cw0LTQsNGH0LBcIiwg0YXRgNCw0L3Rj9GJ0LjQudGB0Y8g0LIg0LzQsNGB0YHQuNCy0LVcbiAgXTtcblxuICBhbmd1bGFyLm1vZHVsZSgndG9Eb0xpc3QnLCBbXSkgLy8g0LjQvdC40YbQuNCw0LvQuNC30LjRgNGD0LXQvCBhbmd1bGFyLdC/0YDQuNC70L7QttC10L3QuNC1XG4gICAgLnZhbHVlKCdhcHBWYWx1ZXMnLCB7XG4gICAgICBoaWRlVG9nZ2xlOiBmYWxzZSwgLy8g0YHQutGA0YvQstCw0YLRjCAvINC/0L7QutCw0LfRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LhcbiAgICAgIGluQmFza2V0OiBmYWxzZSAvLyDQv9C+0LrQsNC30YvQstCw0YLRjCAvINGB0LrRgNGL0LLQsNGC0Ywg0YPQtNCw0LvQtdC90L3Ri9C1INC30LDQtNCw0YfQuFxuICAgIH0pXG4gICAgLmZhY3RvcnkoJ3NhdmVGYWN0b3J5JywgWydhcHBWYWx1ZXMnLCBmdW5jdGlvbiAoYXBwVmFsdWVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza3MnLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWRlVG9nZ2xlJywgYXBwVmFsdWVzLmhpZGVUb2dnbGUpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbkJhc2tldCcsIGFwcFZhbHVlcy5pbkJhc2tldCk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRGcm9tTG9jYWxTdG9yYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKSB7IC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0LXRgdGC0Ywg0LrQu9GO0YcgdGFza3NcbiAgICAgICAgICAgIHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSk7IC8vINC/0L7Qu9GD0YfQsNC10Lwg0L/QviDQutC70Y7Rh9GDINC80LDRgdGB0LjQslxuICAgICAgICAgICAgdGFza3MuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAvLyDQtNC70Y8g0LrQsNC20LTQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQsiDQvNCw0YHRgdC40LLQtSB0YXNrcyBcbiAgICAgICAgICAgICAgaXRlbS4kJGhhc2hLZXkgPSB1bmRlZmluZWQ7IC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8IGhhc2hLZXkgPSB1bmRlZmluZWQgKNC90LXQvtCx0YXQvtC00LjQvNC+INC00LvRjyDQuNC30LHQtdC20LDQvdC40LUg0LrQvtC90YTQu9C40LrRgtC+0LIg0L/RgNC4INCy0YvQstC+0LTQtSDQt9Cw0LTQsNGHKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFwcFZhbHVlcy5oaWRlVG9nZ2xlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpZGVUb2dnbGUnKTsgLy8g0L/Ri9GC0LDQtdC80YHRjyDRgdGH0LjRgtCw0YLRjCDQt9C90LDRh9C10L3QuNC1INC00LvRjyBoaWRlIFRvZ2dsZSDQuNC3IExvY2FsIFN0b3JhZ2VcbiAgICAgICAgICBpZiAoIWFwcFZhbHVlcy5oaWRlVG9nZ2xlKSB7XG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC90LXRgiBoaWRlVG9nZ2xlICjRgdGC0YDQsNC90LjRhtCwINC+0YLQutGA0YvRgtCwINCy0L/QtdGA0LLRi9C1KSwg0YLQvlxuICAgICAgICAgICAgYXBwVmFsdWVzLmhpZGVUb2dnbGUgPSBmYWxzZTsgLy8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LfQsNC00LDQtNC40Lwg0LXQvNGDIGZhbHNlICjQt9C90LDRh9C40YIsINC90LAg0L3QtdCz0L4g0LXRidGRINC90LUg0L3QsNC20LjQvNCw0LvQuClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDRgtCw0LrQvtC5INGN0LvQtdC80LXQvdGCLCDRgtC+XG4gICAgICAgICAgICBhcHBWYWx1ZXMuaGlkZVRvZ2dsZSA9IGFwcFZhbHVlcy5oaWRlVG9nZ2xlID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7IC8vINC10YHQu9C4INC30LDQv9C40YHQsNC90LAg0YHRgtGA0L7QutCwIHRydWUsINGC0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdGRINCyIGJvb2wgdHJ1ZSwg0LjQvdCw0YfQtSDQsiBib29sIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGFwcFZhbHVlcy5pbkJhc2tldCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbkJhc2tldCcpO1xuICAgICAgICAgIGlmICghYXBwVmFsdWVzLmluQmFza2V0KSB7XG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC90LXRgiBoaWRlVG9nZ2xlICjRgdGC0YDQsNC90LjRhtCwINC+0YLQutGA0YvRgtCwINCy0L/QtdGA0LLRi9C1KSwg0YLQvlxuICAgICAgICAgICAgYXBwVmFsdWVzLmluQmFza2V0ID0gZmFsc2U7IC8vINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC30LDQtNCw0LTQuNC8INC10LzRgyBmYWxzZSAo0LfQvdCw0YfQuNGCLCDQvdCwINC90LXQs9C+INC10YnRkSDQvdC1INC90LDQttC40LzQsNC70LgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0LXRgdGC0Ywg0YLQsNC60L7QuSDRjdC70LXQvNC10L3Rgiwg0YLQvlxuICAgICAgICAgICAgYXBwVmFsdWVzLmluQmFza2V0ID0gYXBwVmFsdWVzLmluQmFza2V0ID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7IC8vINC10YHQu9C4INC30LDQv9C40YHQsNC90LAg0YHRgtGA0L7QutCwIHRydWUsINGC0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdGRINCyIGJvb2wgdHJ1ZSwg0LjQvdCw0YfQtSDQsiBib29sIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gIH1dKVxuXG4gICAgLyog0JTQuNGA0LXQutGC0LjQstCwINC00LvRjyDQstGL0LLQvtC00LAg0YLQtdC60YPRidC10Lkg0LTQsNGC0YsgKi9cbiAgICAuZGlyZWN0aXZlKCdjdXJyZW50RGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJywgLy8gb25seSBtYXRjaGVzIGVsZW1lbnQgbmFtZVxuICAgICAgdGVtcGxhdGVVcmw6ICdjdXJyZW50LWRhdGUuaHRtbCcsIC8vINCz0LTQtSDRhdGA0LDQvdC40YLRgdGPIGh0bWxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHsgLy8g0LfQsNC00LDQtdC8INC60L7QvdGC0YDQvtC70LvQtdGAXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7IC8vINC/0L7Qu9GD0YfQsNC10Lwg0YLQtdC60YPRidGD0Y4g0LTQsNGC0YNcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyQXM6ICdkYXRlQ3RybCcgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0L/RgdC10LLQtNC+0L3QuNC8INC00LvRjyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG4gICAgfTtcbiAgfSlcblxuICAgIC8qINCU0LjRgNC10LrRgtC40LLQsCDQtNC70Y8g0LrQvdC+0L/QvtC6INGD0L/RgNCy0LvQtdC90LjRjyAqL1xuICAgIC5kaXJlY3RpdmUoJ2NvbnRyb2xCdXR0b25zJywgWydzYXZlRmFjdG9yeScsICdhcHBWYWx1ZXMnLCBmdW5jdGlvbiAoc2F2ZUZhY3RvcnksIGFwcFZhbHVlcykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbnRyb2wtYnV0dG9ucy5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkgeyAvLyDQt9Cw0LTQsNC10Lwg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAgICAgICAgc2F2ZUZhY3RvcnkubG9hZEZyb21Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5pbkJhc2tldCA9IGFwcFZhbHVlcy5pbkJhc2tldDsgLy8g0LfQsNC00LDQtdC8INGC0LXQutGD0YnQtdC1INC30L3QsNGH0LXQvdC40LUgaW5CYXNrZXRcbiAgICAgICAgdGhpcy5oaWRlVG9nZ2xlID0gYXBwVmFsdWVzLmhpZGVUb2dnbGU7IC8vINC30LDQtNCw0LXQvCDRgtC10LrRg9GJ0LXQtSDQt9C90LDRh9C10L3QuNC1IGhpZGVUb2dnbGVcbiAgICAgICAgdGhpcy5hZGROZXdUYXNrID0gZnVuY3Rpb24gKGRlc2NyKSB7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQtNCw0YfRgywg0L3QsCDQstGF0L7QtCDQv9C+0LTQsNC10YLRgdGPINGB0L7QtNC10YDQttCw0LXQvdC40LUg0LfQsNC00LDRh9C4IFxuICAgICAgICAgIHRhc2tzLnB1c2goeyAvLyDQsiDQvNCw0YHRgdC40LIg0LfQsNC00LDRhyDQtNC+0LHQsNCy0LvRj9C10YLRgdGPINC90L7QstGL0Lkg0L7QsdGK0LXQutGCINGBXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3IsIC8v0L/QvtC70YPRh9C10L3QvdGL0Lwg0L/RgNC4INCy0YvQt9C+0LLQtSDRhNGD0L3QutGG0LjQuCDQvtC/0LjRgdCw0L3QuNC10LxcbiAgICAgICAgICAgIGRlbGV0ZWQ6IGZhbHNlLCAvLyDQt9Cw0LTQsNGH0LAg0L3QtSDRg9C00LDQu9C10L3QsFxuICAgICAgICAgICAgZG9uZTogZmFsc2UsIC8vINC90LUg0LLRi9C/0L7Qu9C90LXQvdCwXG4gICAgICAgICAgICBoaWRlOiBmYWxzZSwgLy8g0L3QtSDRgdC60YDRi9GC0LBcbiAgICAgICAgICAgIG9uY2hhbmdlOiBmYWxzZSAvLyDQvdC1INC40LfQvNC10L3Rj9C10YLRgdGPINCyINGC0LXQutGD0YnQuNC5INC80L7QvNC10L3RglxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3QuNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50b2dnbGVEb25lID0gZnVuY3Rpb24gKCkgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPIGRvbmUvdW5kb25lINC30LDQtNCw0YfQuFxuICAgICAgICAgIHRoaXMuaGlkZVRvZ2dsZSA9IGFwcFZhbHVlcy5oaWRlVG9nZ2xlID0gIWFwcFZhbHVlcy5oaWRlVG9nZ2xlOyAvLyDQv9C10YDQtdC60LvRjtGH0LDQtdC8IGRvbmUvdW5kb25lLCDQs9C70L7QsdCw0LvRjNC90YPRjiDQuCDQstC90YPRgtGA0Lgg0LrQvtGC0YDQvtC70LvQtdGA0LBcbiAgICAgICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vINC00LvRjyDQutCw0LbQtNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICBpdGVtLmRvbmUgJiYgYXBwVmFsdWVzLmhpZGVUb2dnbGUgJiYgKGl0ZW0uaGlkZSA9IHRydWUpOyAvLyDQtdGB0LvQuCDQt9Cw0LTQsNGH0LAg0YHQtNC10LvQsNC90LAsINC4INCy0YvQsdGA0LDQvdC+INGB0LrRgNGL0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C1INC30LDQtNCw0YfQuCwg0YLQviDRgdC60YDRi9Cy0LDQtdC8XG4gICAgICAgICAgICBpdGVtLmRvbmUgJiYgIWFwcFZhbHVlcy5oaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7IC8vINC10YHQuNC7INC30LDQtNCw0YfQsCDRgdC00LXQu9Cw0L3QsCwg0Lgg0LLRi9Cx0YDQsNC90L4g0L/QvtC60LDQt9GL0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C1INC30LDQtNCw0YfQuCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3QuNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2UgXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG9nZ2xlRGVsZXRlZFRhc2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuaW5CYXNrZXQgPSBhcHBWYWx1ZXMuaW5CYXNrZXQgPSAhYXBwVmFsdWVzLmluQmFza2V0OyAvLyDQv9C10YDQtdC60LvRjtGH0LDQtdC8INCyINC60L7RgNC30LjQvdC1L9C90LUg0LIg0LrQvtGA0LfQuNC90LUsINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC4INCy0L3Rg9GC0YDQuCDQutC+0YLRgNC+0LvQu9C10YDQsFxuICAgICAgICAgIHRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy8g0LTQu9GPINC60LDQttC00L7QuSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgIGl0ZW0uaGlkZSA9IHRydWU7IC8vINGB0LrRgNGL0LLQsNC10Lwg0LrQsNC20LTRg9GOINC30LDQtNCw0YfRg1xuICAgICAgICAgICAgYXBwVmFsdWVzLmluQmFza2V0ICYmIGl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpOyAvLyDQtdGB0LvQuCDQsiDQtNCw0L3QvdGL0Lkg0LzQvtC80LXQvdGCINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0LrQvtGA0LfQuNC90LUsINC4INC30LDQtNCw0YfQsCDRg9C00LDQu9C10L3QsCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvCDQt9Cw0LTQsNGH0YNcbiAgICAgICAgICAgICFhcHBWYWx1ZXMuaW5CYXNrZXQgJiYgIWl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpOyAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0L3QtSDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0LrQvtGA0LfQuNC90LUsINC4INC30LDQtNCw0YfQsCDQvdC1INGD0LTQsNC70LXQvdCwLCDRgtC+INC/0L7QutCw0LfRi9Cy0LDQtdC8INC10ZFcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY29udHJvbGxlckFzOiAnYnRuQ3RybCcgLy8g0L/RgdC10LLQtNC+0L3QuNC8INC00LvRjyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG4gICAgfTtcbiAgfV0pXG5cbiAgICAvKiDQlNC40YDQtdC60YLQuNCy0LAg0LTQu9GPINGB0L/QuNGB0LrQsCDQt9Cw0LTQsNGHICovXG4gICAgLmRpcmVjdGl2ZSgndGFza3NMaXN0JywgWydzYXZlRmFjdG9yeScsICdhcHBWYWx1ZXMnLCBmdW5jdGlvbiAoc2F2ZUZhY3RvcnksIGFwcFZhbHVlcykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICB0ZW1wbGF0ZVVybDogJ3Rhc2tzLWxpc3QuaHRtbCcsIC8vINCz0LTQtSDRhdGA0LDQvdC40YLRgdGPIGh0bWxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzOyAvLyDQv9C+0LvRg9GH0LDQtdC8INGB0L/QuNGB0L7QuiDQt9Cw0LTQsNGHXG4gICAgICAgIHRoaXMuY2hhbmdlVGFzayA9IGZ1bmN0aW9uICh0YXNrLCBkZXNjcmlwdGlvbikgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPINGC0LXQutGD0YnQtdCz0L4g0YHQvtC00LXRgNC20LDQvdC40Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgdGFzay5vbmNoYW5nZSA9ICF0YXNrLm9uY2hhbmdlOyAvLyDQv9C10YDQtdC60LvRjtGH0LDQtdC8IG9uY2hhbmdlINC00LvRjyDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICBkZXNjcmlwdGlvbiAmJiAodGFzay5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uKTsgLy8g0LXRgdC70Lgg0LIg0YTRg9C90LrRhtC40Y4g0L/QtdGA0LXQtNCw0L3QviDRgdC+0LTQtdGA0LDQttCw0LXQvdC40LUg0LTQu9GPINC30LDQv9C40YHQuCDQsiDQt9Cw0LTQsNGH0YMsINGC0L4g0LfQsNC/0LjRgdGL0LLQsNC10Lwg0LXQs9C+XG4gICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9nZ2xlRG9uZSA9IGZ1bmN0aW9uICh0YXNrKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQuNC30LzQtdC90LXQvdC40Y8gZG9uZS91bmRvbmUg0LfQsNC00LDRh9C4XG4gICAgICAgICAgdGFzay5kb25lID0gIXRhc2suZG9uZTsgLy8g0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvCBkb25lL3VuZG9uZSDQtNC70Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgYXBwVmFsdWVzLmhpZGVUb2dnbGUgJiYgKHRhc2suaGlkZSA9IHRydWUpOyAvLyDQtdGB0LvQuCDQstGL0LHRgNCw0L3QviDRgdC60YDRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LgsINGC0L4g0YHQutGA0YvQstCw0LXQvCDRgtC+0LvRjNC60L4g0YfRgtC+INC+0YLQvNC10YfQtdC90L3Rg9GOINC30LDQtNCw0YfRg1xuICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWxldGVUYXNrID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10LzQtdGJ0LXQvdC40Y8g0LfQsNC00LDRh9C4INCyINC60L7RgNC30LjQvdGDXG4gICAgICAgICAgdGFzay5kZWxldGVkID0gdHJ1ZTsgLy8g0LfQsNC00LDRh9CwINGP0LLQu9GP0LXRgtGB0Y8g0YPQtNCw0LvQtdC90L3QvtC5XG4gICAgICAgICAgdGFzay5oaWRlID0gdHJ1ZTsgLy8g0YHQutGA0YvRgtC+0LlcbiAgICAgICAgICB0YXNrLmRvbmUgPSBmYWxzZTsgLy8g0Lgg0L3QtSDQstGL0L/QvtC70L3QtdC90L3QvtC5XG4gICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJldHVyblRhc2sgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LLQvtC30LLRgNCw0YnQtdC90Lgg0LfQsNC00LDRh9C4INC40Lcg0LrQvtGA0LfQuNC90YtcbiAgICAgICAgICB0YXNrLmRlbGV0ZWQgPSBmYWxzZTsgLy8g0LfQsNC00LDRh9CwINGP0LLQu9GP0LXRgtGB0Y8g0L3QtSDRg9C00LDQu9C10L3QvdC+0LlcbiAgICAgICAgICB0YXNrLmhpZGUgPSB0cnVlOyAvLyDRgdC60YDRi9Cy0LDQtdC8INC10ZEg0LjQtyDQutC+0YDQt9C40L3Ri1xuICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbmFsbHlEZWxldGVUYXNrID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3QvtCz0L4g0YPQtNCw0LvQtdC90LjRjyDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICBpZiAoY29uZmlybShcItCi0L7Rh9C90L4g0YPQtNCw0LvQuNGC0Ywg0LfQsNC00LDRh9GDP1wiKSkgeyAvLyDQt9Cw0L/RgNC+0YEg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GOINGC0L7Rh9C90L4g0LvQuCDQvtC9INGF0L7Rh9C10YIg0YPQtNCw0LvQuNGC0Ywg0LfQsNC00LDRh9GDLCDQtdGB0LvQuCDQtNCwLCDRgtC+INC/0LXRgNC10YXQvtC00LjQvCDQuiDRg9C00LDQu9C10L3QuNGOXG4gICAgICAgICAgICBsZXQgaW5kZXg7IC8vINC/0LXRgNC10LzQtdC90L3QsNGPINC00LvRjyDRhdGA0LDQvdC10L3QuNGPINC40L3QtNC10LrRgdCwXG4gICAgICAgICAgICBsZXQgaSA9IHRhc2tzLmxlbmd0aCAtIDE7IC8vINC/0LXRgNC10LzQtdC90L3QsNGPINC00LvRjyDRhdGA0LDQvdC10L3QuNGPINC00LvQuNC90Ysg0LzQsNGB0YHQuNCy0LAgLTFcbiAgICAgICAgICAgIHdoaWxlIChpID49IDApIHsgLy8g0L/QvtC60LAg0LIg0LzQsNGB0YHQuNCy0LUg0LXRidGRINC10YHRgtGMINGN0LvQtdC80LXQvdGC0YtcbiAgICAgICAgICAgICAgaWYgKHRhc2tzW2ldLiQkaGFzaEtleSA9PT0gdGFzay4kJGhhc2hLZXkpIHsgLy8g0LXRgdC70LggaGFzaEtleSDRjdC70LXQvNC10L3RgtCwINGA0LDQstC10L0gaGFza0tleSDRg9C00LDQu9GP0LXQvNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpOyAvLyDRgtC+INGB0L7RhdGA0LDQvdGP0LXQvCDQuNC90LTQtdC60YEg0LfQsNC00LDRh9C4INCyINC80LDRgdGB0LjQstC1XG4gICAgICAgICAgICAgICAgYnJlYWs7IC8vINC/0YDQtdC60YDQsNGJ0LDQtdC8INCy0YvQv9C+0LvQvdC10L3QuNC1INGG0LjQutC70LBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpLS07IC8vINC00LXQu9Cw0LXQvCDRgdC70LXQtNGD0Y7RidC40Lkg0YjQsNCzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsIDEpOyAvLyDRg9C00LDQu9GP0LXQvCDQt9Cw0LTQsNGH0YMg0LjQtyDQvNCw0YHRgdC40LLQsCDQt9Cw0LTQsNGHXG4gICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyQXM6ICd0YXNrQ3RybCcgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0L/RgdC10LLQtNC+0L3QuNC8INC00LvRjyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG4gICAgfTtcbiAgfV0pO1xufSgpKTsiXX0=
