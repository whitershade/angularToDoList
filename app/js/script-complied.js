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

  var app = angular.module('toDoList', []); // инициализируем angular-приложение
  app.value('appValues', {
    hideToggle: false, // скрывать / показывать сделанные задачи
    inBasket: false // показывать / скрывать удаленные задачи
  });

  app.factory('saveFactory', function (appValues) {
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
  });

  /* Директива для вывода текущей даты */
  app.directive('currentDate', function () {
    return {
      restrict: 'E', // only matches element name
      templateUrl: 'current-date.html', // где хранится html
      controller: function controller() {
        // задаем контроллер
        this.date = new Date(); // получаем текущую дату
      },
      controllerAs: 'dateCtrl' // устанавливаем псевдоним для контроллера
    };
  });

  /* Директива для кнопок упрвления */
  app.directive('controlButtons', function (saveFactory, appValues) {
    return {
      restrict: 'E', // only matches element name
      templateUrl: 'control-buttons.html', // где хранится html
      controller: function controller(appValues) {
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
  });

  /* Директива для списка задач */
  app.directive('tasksList', function (saveFactory) {
    return {
      restrict: 'E', // only matches element name
      templateUrl: 'tasks-list.html', // где хранится html
      controller: function controller(appValues) {
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
  });
})();
//# sourceMappingURL=data:application/json;base64,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QUwsR0FBa0IsVUFBVSxJQUFWLEVBQWdCOztBQUNoQyxlQUFLLElBQUwsR0FBWSxDQUFDLEtBQUssSUFBbEIsQztBQUNBLG9CQUFVLFVBQVYsS0FBeUIsS0FBSyxJQUFMLEdBQVksSUFBckMsRTtBQUNBLHNCQUFZLGtCQUFaLEc7QUFDRCxTQUpEO0FBS0EsYUFBSyxVQUFMLEdBQWtCLFVBQVUsSUFBVixFQUFnQjs7QUFDaEMsZUFBSyxPQUFMLEdBQWUsSUFBZixDO0FBQ0EsZUFBSyxJQUFMLEdBQVksSUFBWixDO0FBQ0EsZUFBSyxJQUFMLEdBQVksS0FBWixDO0FBQ0Esc0JBQVksa0JBQVosRztBQUNELFNBTEQ7QUFNQSxhQUFLLFVBQUwsR0FBa0IsVUFBVSxJQUFWLEVBQWdCOztBQUNoQyxlQUFLLE9BQUwsR0FBZSxLQUFmLEM7QUFDQSxlQUFLLElBQUwsR0FBWSxJQUFaLEM7QUFDQSxzQkFBWSxrQkFBWixHO0FBQ0QsU0FKRDtBQUtBLGFBQUssaUJBQUwsR0FBeUIsVUFBVSxJQUFWLEVBQWdCOztBQUN2QyxjQUFJLFFBQVEsdUJBQVIsQ0FBSixFQUFzQzs7QUFDcEMsZ0JBQUksY0FBSixDO0FBQ0EsZ0JBQUksSUFBSSxNQUFNLE1BQU4sR0FBZSxDQUF2QixDO0FBQ0EsbUJBQU8sS0FBSyxDQUFaLEVBQWU7O0FBQ2Isa0JBQUksTUFBTSxDQUFOLEVBQVMsU0FBVCxLQUF1QixLQUFLLFNBQWhDLEVBQTJDOztBQUN6Qyx3QkFBUSxDQUFSLEM7QUFDQSxzQjtBQUNEO0FBQ0Qsa0I7QUFDRDtBQUNELGtCQUFNLE1BQU4sQ0FBYSxLQUFiLEVBQW9CLENBQXBCLEU7QUFDQSx3QkFBWSxrQkFBWixHO0FBQ0Q7QUFDRixTQWREO0FBZUQsT0F6Q0k7QUEwQ0wsb0JBQWMsVTtBQTFDVCxLQUFQO0FBNENELEdBN0NEO0FBOENELENBbEpBLEdBQUQiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIDIwMF0gKi9cbi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuLyogZXNsaW50IG5vLXVudXNlZC1leHByZXNzaW9uczogW1wiZXJyb3JcIiwgeyBcImFsbG93U2hvcnRDaXJjdWl0XCI6IHRydWUsIFwiYWxsb3dUZXJuYXJ5XCI6IHRydWUgfV0gKi9cbi8qIGdsb2JhbCBhbmd1bGFyICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgbGV0IHRhc2tzID0gWyAvLyDQvNCw0YHRgdC40LIg0LTQu9GPINGF0YDQsNC90LXQvdC40Y8g0LfQsNC00LDRh1xuLy8gICAgeyBkZXNjcmlwdGlvbjogJzEnLCBkZWxldGVkOiBmYWxzZSwgZG9uZTogZmFsc2UsIGhpZGU6IGZhbHNlLCBvbmNoYW5nZTogZmFsc2UgfSAtLT4g0YLQsNC6INCy0YvQs9C70Y/QtNC40YIg0L7QsdGK0LXQutGCINGC0LjQv9CwIFwi0LfQsNC00LDRh9CwXCIsINGF0YDQsNC90Y/RidC40LnRgdGPINCyINC80LDRgdGB0LjQstC1XG4gIF07XG5cbiAgY29uc3QgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3RvRG9MaXN0JywgW10pOyAvLyDQuNC90LjRhtC40LDQu9C40LfQuNGA0YPQtdC8IGFuZ3VsYXIt0L/RgNC40LvQvtC20LXQvdC40LVcbiAgYXBwLnZhbHVlKCdhcHBWYWx1ZXMnLCB7XG4gICAgaGlkZVRvZ2dsZTogZmFsc2UsIC8vINGB0LrRgNGL0LLQsNGC0YwgLyDQv9C+0LrQsNC30YvQstCw0YLRjCDRgdC00LXQu9Cw0L3QvdGL0LUg0LfQsNC00LDRh9C4XG4gICAgaW5CYXNrZXQ6IGZhbHNlIC8vINC/0L7QutCw0LfRi9Cy0LDRgtGMIC8g0YHQutGA0YvQstCw0YLRjCDRg9C00LDQu9C10L3QvdGL0LUg0LfQsNC00LDRh9C4XG4gIH0pO1xuXG4gIGFwcC5mYWN0b3J5KCdzYXZlRmFjdG9yeScsIGZ1bmN0aW9uIChhcHBWYWx1ZXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWRlVG9nZ2xlJywgYXBwVmFsdWVzLmhpZGVUb2dnbGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5CYXNrZXQnLCBhcHBWYWx1ZXMuaW5CYXNrZXQpO1xuICAgICAgfSxcbiAgICAgIGxvYWRGcm9tTG9jYWxTdG9yYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSkgeyAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC10YHRgtGMINC60LvRjtGHIHRhc2tzXG4gICAgICAgICAgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKTsgLy8g0L/QvtC70YPRh9Cw0LXQvCDQv9C+INC60LvRjtGH0YMg0LzQsNGB0YHQuNCyXG4gICAgICAgICAgdGFza3MuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAvLyDQtNC70Y8g0LrQsNC20LTQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQsiDQvNCw0YHRgdC40LLQtSB0YXNrcyBcbiAgICAgICAgICAgIGl0ZW0uJCRoYXNoS2V5ID0gdW5kZWZpbmVkOyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCBoYXNoS2V5ID0gdW5kZWZpbmVkICjQvdC10L7QsdGF0L7QtNC40LzQviDQtNC70Y8g0LjQt9Cx0LXQttCw0L3QuNC1INC60L7QvdGE0LvQuNC60YLQvtCyINC/0YDQuCDQstGL0LLQvtC00LUg0LfQsNC00LDRhylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBhcHBWYWx1ZXMuaGlkZVRvZ2dsZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWRlVG9nZ2xlJyk7IC8vINC/0YvRgtCw0LXQvNGB0Y8g0YHRh9C40YLQsNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQtNC70Y8gaGlkZSBUb2dnbGUg0LjQtyBMb2NhbCBTdG9yYWdlXG4gICAgICAgIGlmICghYXBwVmFsdWVzLmhpZGVUb2dnbGUpIHtcbiAgICAgICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC90LXRgiBoaWRlVG9nZ2xlICjRgdGC0YDQsNC90LjRhtCwINC+0YLQutGA0YvRgtCwINCy0L/QtdGA0LLRi9C1KSwg0YLQvlxuICAgICAgICAgIGFwcFZhbHVlcy5oaWRlVG9nZ2xlID0gZmFsc2U7IC8vINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC30LDQtNCw0LTQuNC8INC10LzRgyBmYWxzZSAo0LfQvdCw0YfQuNGCLCDQvdCwINC90LXQs9C+INC10YnRkSDQvdC1INC90LDQttC40LzQsNC70LgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDRgtCw0LrQvtC5INGN0LvQtdC80LXQvdGCLCDRgtC+XG4gICAgICAgICAgYXBwVmFsdWVzLmhpZGVUb2dnbGUgPSBhcHBWYWx1ZXMuaGlkZVRvZ2dsZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlOyAvLyDQtdGB0LvQuCDQt9Cw0L/QuNGB0LDQvdCwINGB0YLRgNC+0LrQsCB0cnVlLCDRgtC+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXRkSDQsiBib29sIHRydWUsINC40L3QsNGH0LUg0LIgYm9vbCBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGFwcFZhbHVlcy5pbkJhc2tldCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbkJhc2tldCcpO1xuICAgICAgICBpZiAoIWFwcFZhbHVlcy5pbkJhc2tldCkge1xuICAgICAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0L3QtdGCIGhpZGVUb2dnbGUgKNGB0YLRgNCw0L3QuNGG0LAg0L7RgtC60YDRi9GC0LAg0LLQv9C10YDQstGL0LUpLCDRgtC+XG4gICAgICAgICAgYXBwVmFsdWVzLmluQmFza2V0ID0gZmFsc2U7IC8vINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC30LDQtNCw0LTQuNC8INC10LzRgyBmYWxzZSAo0LfQvdCw0YfQuNGCLCDQvdCwINC90LXQs9C+INC10YnRkSDQvdC1INC90LDQttC40LzQsNC70LgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDRgtCw0LrQvtC5INGN0LvQtdC80LXQvdGCLCDRgtC+XG4gICAgICAgICAgYXBwVmFsdWVzLmluQmFza2V0ID0gYXBwVmFsdWVzLmluQmFza2V0ID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7IC8vINC10YHQu9C4INC30LDQv9C40YHQsNC90LAg0YHRgtGA0L7QutCwIHRydWUsINGC0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdGRINCyIGJvb2wgdHJ1ZSwg0LjQvdCw0YfQtSDQsiBib29sIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8qINCU0LjRgNC10LrRgtC40LLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwINGC0LXQutGD0YnQtdC5INC00LDRgtGLICovXG4gIGFwcC5kaXJlY3RpdmUoJ2N1cnJlbnREYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICB0ZW1wbGF0ZVVybDogJ2N1cnJlbnQtZGF0ZS5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkgeyAvLyDQt9Cw0LTQsNC10Lwg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgtC10LrRg9GJ0YPRjiDQtNCw0YLRg1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXJBczogJ2RhdGVDdHJsJyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDQv9GB0LXQstC00L7QvdC40Lwg0LTQu9GPINC60L7QvdGC0YDQvtC70LvQtdGA0LBcbiAgICB9O1xuICB9KTtcblxuICAvKiDQlNC40YDQtdC60YLQuNCy0LAg0LTQu9GPINC60L3QvtC/0L7QuiDRg9C/0YDQstC70LXQvdC40Y8gKi9cbiAgYXBwLmRpcmVjdGl2ZSgnY29udHJvbEJ1dHRvbnMnLCBmdW5jdGlvbiAoc2F2ZUZhY3RvcnksIGFwcFZhbHVlcykge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbnRyb2wtYnV0dG9ucy5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKGFwcFZhbHVlcykgeyAvLyDQt9Cw0LTQsNC10Lwg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAgICAgICAgc2F2ZUZhY3RvcnkubG9hZEZyb21Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5pbkJhc2tldCA9IGFwcFZhbHVlcy5pbkJhc2tldDsgLy8g0LfQsNC00LDQtdC8INGC0LXQutGD0YnQtdC1INC30L3QsNGH0LXQvdC40LUgaW5CYXNrZXRcbiAgICAgICAgdGhpcy5oaWRlVG9nZ2xlID0gYXBwVmFsdWVzLmhpZGVUb2dnbGU7IC8vINC30LDQtNCw0LXQvCDRgtC10LrRg9GJ0LXQtSDQt9C90LDRh9C10L3QuNC1IGhpZGVUb2dnbGVcbiAgICAgICAgdGhpcy5hZGROZXdUYXNrID0gZnVuY3Rpb24gKGRlc2NyKSB7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQtNCw0YfRgywg0L3QsCDQstGF0L7QtCDQv9C+0LTQsNC10YLRgdGPINGB0L7QtNC10YDQttCw0LXQvdC40LUg0LfQsNC00LDRh9C4IFxuICAgICAgICAgIHRhc2tzLnB1c2goeyAvLyDQsiDQvNCw0YHRgdC40LIg0LfQsNC00LDRhyDQtNC+0LHQsNCy0LvRj9C10YLRgdGPINC90L7QstGL0Lkg0L7QsdGK0LXQutGCINGBXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3IsIC8v0L/QvtC70YPRh9C10L3QvdGL0Lwg0L/RgNC4INCy0YvQt9C+0LLQtSDRhNGD0L3QutGG0LjQuCDQvtC/0LjRgdCw0L3QuNC10LxcbiAgICAgICAgICAgIGRlbGV0ZWQ6IGZhbHNlLCAvLyDQt9Cw0LTQsNGH0LAg0L3QtSDRg9C00LDQu9C10L3QsFxuICAgICAgICAgICAgZG9uZTogZmFsc2UsIC8vINC90LUg0LLRi9C/0L7Qu9C90LXQvdCwXG4gICAgICAgICAgICBoaWRlOiBmYWxzZSwgLy8g0L3QtSDRgdC60YDRi9GC0LBcbiAgICAgICAgICAgIG9uY2hhbmdlOiBmYWxzZSAvLyDQvdC1INC40LfQvNC10L3Rj9C10YLRgdGPINCyINGC0LXQutGD0YnQuNC5INC80L7QvNC10L3RglxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3QuNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50b2dnbGVEb25lID0gZnVuY3Rpb24gKCkgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPIGRvbmUvdW5kb25lINC30LDQtNCw0YfQuFxuICAgICAgICAgIHRoaXMuaGlkZVRvZ2dsZSA9IGFwcFZhbHVlcy5oaWRlVG9nZ2xlID0gIWFwcFZhbHVlcy5oaWRlVG9nZ2xlOyAvLyDQv9C10YDQtdC60LvRjtGH0LDQtdC8IGRvbmUvdW5kb25lLCDQs9C70L7QsdCw0LvRjNC90YPRjiDQuCDQstC90YPRgtGA0Lgg0LrQvtGC0YDQvtC70LvQtdGA0LBcbiAgICAgICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vINC00LvRjyDQutCw0LbQtNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICBpdGVtLmRvbmUgJiYgYXBwVmFsdWVzLmhpZGVUb2dnbGUgJiYgKGl0ZW0uaGlkZSA9IHRydWUpOyAvLyDQtdGB0LvQuCDQt9Cw0LTQsNGH0LAg0YHQtNC10LvQsNC90LAsINC4INCy0YvQsdGA0LDQvdC+INGB0LrRgNGL0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C1INC30LDQtNCw0YfQuCwg0YLQviDRgdC60YDRi9Cy0LDQtdC8XG4gICAgICAgICAgICBpdGVtLmRvbmUgJiYgIWFwcFZhbHVlcy5oaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7IC8vINC10YHQuNC7INC30LDQtNCw0YfQsCDRgdC00LXQu9Cw0L3QsCwg0Lgg0LLRi9Cx0YDQsNC90L4g0L/QvtC60LDQt9GL0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C1INC30LDQtNCw0YfQuCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3QuNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2UgXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG9nZ2xlRGVsZXRlZFRhc2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuaW5CYXNrZXQgPSBhcHBWYWx1ZXMuaW5CYXNrZXQgPSAhYXBwVmFsdWVzLmluQmFza2V0OyAvLyDQv9C10YDQtdC60LvRjtGH0LDQtdC8INCyINC60L7RgNC30LjQvdC1L9C90LUg0LIg0LrQvtGA0LfQuNC90LUsINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC4INCy0L3Rg9GC0YDQuCDQutC+0YLRgNC+0LvQu9C10YDQsFxuICAgICAgICAgIHRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy8g0LTQu9GPINC60LDQttC00L7QuSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgIGl0ZW0uaGlkZSA9IHRydWU7IC8vINGB0LrRgNGL0LLQsNC10Lwg0LrQsNC20LTRg9GOINC30LDQtNCw0YfRg1xuICAgICAgICAgICAgYXBwVmFsdWVzLmluQmFza2V0ICYmIGl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpOyAvLyDQtdGB0LvQuCDQsiDQtNCw0L3QvdGL0Lkg0LzQvtC80LXQvdGCINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0LrQvtGA0LfQuNC90LUsINC4INC30LDQtNCw0YfQsCDRg9C00LDQu9C10L3QsCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvCDQt9Cw0LTQsNGH0YNcbiAgICAgICAgICAgICFhcHBWYWx1ZXMuaW5CYXNrZXQgJiYgIWl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpOyAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0L3QtSDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0LrQvtGA0LfQuNC90LUsINC4INC30LDQtNCw0YfQsCDQvdC1INGD0LTQsNC70LXQvdCwLCDRgtC+INC/0L7QutCw0LfRi9Cy0LDQtdC8INC10ZFcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY29udHJvbGxlckFzOiAnYnRuQ3RybCcgLy8g0L/RgdC10LLQtNC+0L3QuNC8INC00LvRjyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG4gICAgfTtcbiAgfSk7XG5cbiAgLyog0JTQuNGA0LXQutGC0LjQstCwINC00LvRjyDRgdC/0LjRgdC60LAg0LfQsNC00LDRhyAqL1xuICBhcHAuZGlyZWN0aXZlKCd0YXNrc0xpc3QnLCBmdW5jdGlvbiAoc2F2ZUZhY3RvcnkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJywgLy8gb25seSBtYXRjaGVzIGVsZW1lbnQgbmFtZVxuICAgICAgdGVtcGxhdGVVcmw6ICd0YXNrcy1saXN0Lmh0bWwnLCAvLyDQs9C00LUg0YXRgNCw0L3QuNGC0YHRjyBodG1sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoYXBwVmFsdWVzKSB7XG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrczsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgdC/0LjRgdC+0Log0LfQsNC00LDRh1xuICAgICAgICB0aGlzLmNoYW5nZVRhc2sgPSBmdW5jdGlvbiAodGFzaywgZGVzY3JpcHRpb24pIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC40LfQvNC10L3QtdC90LjRjyDRgtC10LrRg9GJ0LXQs9C+INGB0L7QtNC10YDQttCw0L3QuNGPINC30LDQtNCw0YfQuFxuICAgICAgICAgIHRhc2sub25jaGFuZ2UgPSAhdGFzay5vbmNoYW5nZTsgLy8g0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvCBvbmNoYW5nZSDQtNC70Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgZGVzY3JpcHRpb24gJiYgKHRhc2suZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbik7IC8vINC10YHQu9C4INCyINGE0YPQvdC60YbQuNGOINC/0LXRgNC10LTQsNC90L4g0YHQvtC00LXRgNCw0LbQsNC10L3QuNC1INC00LvRjyDQt9Cw0L/QuNGB0Lgg0LIg0LfQsNC00LDRh9GDLCDRgtC+INC30LDQv9C40YHRi9Cy0LDQtdC8INC10LPQvlxuICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZURvbmUgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPIGRvbmUvdW5kb25lINC30LDQtNCw0YfQuFxuICAgICAgICAgIHRhc2suZG9uZSA9ICF0YXNrLmRvbmU7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10LwgZG9uZS91bmRvbmUg0LTQu9GPINC30LDQtNCw0YfQuFxuICAgICAgICAgIGFwcFZhbHVlcy5oaWRlVG9nZ2xlICYmICh0YXNrLmhpZGUgPSB0cnVlKTsgLy8g0LXRgdC70Lgg0LLRi9Cx0YDQsNC90L4g0YHQutGA0YvQstCw0YLRjCDRgdC00LXQu9Cw0L3QvdGL0LUg0LfQsNC00LDRh9C4LCDRgtC+INGB0LrRgNGL0LLQsNC10Lwg0YLQvtC70YzQutC+INGH0YLQviDQvtGC0LzQtdGH0LXQvdC90YPRjiDQt9Cw0LTQsNGH0YNcbiAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVsZXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9C10YDQtdC80LXRidC10L3QuNGPINC30LDQtNCw0YfQuCDQsiDQutC+0YDQt9C40L3Rg1xuICAgICAgICAgIHRhc2suZGVsZXRlZCA9IHRydWU7IC8vINC30LDQtNCw0YfQsCDRj9Cy0LvRj9C10YLRgdGPINGD0LTQsNC70LXQvdC90L7QuVxuICAgICAgICAgIHRhc2suaGlkZSA9IHRydWU7IC8vINGB0LrRgNGL0YLQvtC5XG4gICAgICAgICAgdGFzay5kb25lID0gZmFsc2U7IC8vINC4INC90LUg0LLRi9C/0L7Qu9C90LXQvdC90L7QuVxuICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXR1cm5UYXNrID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINCy0L7Qt9Cy0YDQsNGJ0LXQvdC4INC30LDQtNCw0YfQuCDQuNC3INC60L7RgNC30LjQvdGLXG4gICAgICAgICAgdGFzay5kZWxldGVkID0gZmFsc2U7IC8vINC30LDQtNCw0YfQsCDRj9Cy0LvRj9C10YLRgdGPINC90LUg0YPQtNCw0LvQtdC90L3QvtC5XG4gICAgICAgICAgdGFzay5oaWRlID0gdHJ1ZTsgLy8g0YHQutGA0YvQstCw0LXQvCDQtdGRINC40Lcg0LrQvtGA0LfQuNC90YtcbiAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maW5hbGx5RGVsZXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQvtC60L7QvdGH0LDRgtC10LvRjNC90L7Qs9C+INGD0LTQsNC70LXQvdC40Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgaWYgKGNvbmZpcm0oXCLQotC+0YfQvdC+INGD0LTQsNC70LjRgtGMINC30LDQtNCw0YfRgz9cIikpIHsgLy8g0LfQsNC/0YDQvtGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjiDRgtC+0YfQvdC+INC70Lgg0L7QvSDRhdC+0YfQtdGCINGD0LTQsNC70LjRgtGMINC30LDQtNCw0YfRgywg0LXRgdC70Lgg0LTQsCwg0YLQviDQv9C10YDQtdGF0L7QtNC40Lwg0Log0YPQtNCw0LvQtdC90LjRjlxuICAgICAgICAgICAgbGV0IGluZGV4OyAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQuNC90LTQtdC60YHQsFxuICAgICAgICAgICAgbGV0IGkgPSB0YXNrcy5sZW5ndGggLSAxOyAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQtNC70LjQvdGLINC80LDRgdGB0LjQstCwIC0xXG4gICAgICAgICAgICB3aGlsZSAoaSA+PSAwKSB7IC8vINC/0L7QutCwINCyINC80LDRgdGB0LjQstC1INC10YnRkSDQtdGB0YLRjCDRjdC70LXQvNC10L3RgtGLXG4gICAgICAgICAgICAgIGlmICh0YXNrc1tpXS4kJGhhc2hLZXkgPT09IHRhc2suJCRoYXNoS2V5KSB7IC8vINC10YHQu9C4IGhhc2hLZXkg0Y3Qu9C10LzQtdC90YLQsCDRgNCw0LLQtdC9IGhhc2tLZXkg0YPQtNCw0LvRj9C10LzQvtC5INC30LDQtNCw0YfQuFxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTsgLy8g0YLQviDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQvdC00LXQutGBINC30LDQtNCw0YfQuCDQsiDQvNCw0YHRgdC40LLQtVxuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyDQv9GA0LXQutGA0LDRidCw0LXQvCDQstGL0L/QvtC70L3QtdC90LjQtSDRhtC40LrQu9CwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaS0tOyAvLyDQtNC10LvQsNC10Lwg0YHQu9C10LTRg9GO0YnQuNC5INGI0LDQs1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKTsgLy8g0YPQtNCw0LvRj9C10Lwg0LfQsNC00LDRh9GDINC40Lcg0LzQsNGB0YHQuNCy0LAg0LfQsNC00LDRh1xuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY29udHJvbGxlckFzOiAndGFza0N0cmwnIC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INC/0YHQtdCy0LTQvtC90LjQvCDQtNC70Y8g0LrQvtC90YLRgNC+0LvQu9C10YDQsFxuICAgIH07XG4gIH0pO1xufSgpKTsiXX0=
