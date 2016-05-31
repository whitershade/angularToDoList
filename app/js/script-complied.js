'use strict';

/* eslint max-len: ["error", 200] */
/* eslint-env browser */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
/* global angular */

(function () {
  'use strict';

  var hideToggle = void 0; // скрывать / показывать сделанные задачи
  var inBasket = void 0; // показывать / скрывать удаленные задачи
  var tasks = [// массив для хранения задач
    //    { description: '1', deleted: false, done: false, hide: false, onchange: false } --> так выглядит объект типа "задача", хранящийся в массиве
  ];

  var app = angular.module('toDoList', []); // инициализируем angular-приложение

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
  app.directive('controlButtons', function () {
    return {
      restrict: 'E', // only matches element name
      templateUrl: 'control-buttons.html', // где хранится html
      controller: function controller() {
        // задаем контроллер
        this.hideToggle = hideToggle; // задаем текущее значение hideToggle
        this.inBasket = inBasket; // задаем текущее значение inBasket
        this.addNewTask = function (descr) {
          // добавляем новую задачу, на вход подается содержаение задачи
          tasks.push({ // в массив задач добавляется новый объект с
            description: descr, //полученным при вызове функции описанием
            deleted: false, // задача не удалена
            done: false, // не выполнена
            hide: false, // не скрыта
            onchange: false // не изменяется в текущий момент
          });
          saveInLocalStorage(); // сохранить изменения в local storage
        };
        this.toggleDone = function () {
          // функция для переключения done/undone задачи
          this.hideToggle = hideToggle = !hideToggle; // переключаем done/undone, глобальную и внутри котроллера
          tasks.forEach(function (item) {
            // для каждой задачи
            item.done && hideToggle && (item.hide = true); // если задача сделана, и выбрано скрывать сделанные задачи, то скрываем
            item.done && !hideToggle && (item.hide = false); // есил задача сделана, и выбрано показывать сделанные задачи, то показываем
          });
          saveInLocalStorage(); // сохранить изменения в local storage
        };
        this.toggleDeletedTasks = function () {
          this.inBasket = inBasket = !inBasket; // переключаем в корзине/не в корзине, глобальную и внутри котроллера
          tasks.forEach(function (item) {
            // для каждой задачи
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
      controller: function controller() {
        this.tasks = tasks; // получаем список задач
        this.changeTask = function (task, description) {
          // функция для изменения текущего содержания задачи
          task.onchange = !task.onchange; // переключаем onchange для задачи
          description && (task.description = description); // если в функцию передано содеражаение для записи в задачу, то записываем его
          saveInLocalStorage(); // сохраняем изменения в local storage
        };
        this.toggleDone = function (task) {
          // функция для изменения done/undone задачи
          task.done = !task.done; // переключаем done/undone для задачи
          hideToggle && (task.hide = true); // если выбрано скрывать сделанные задачи, то скрываем только что отмеченную задачу
          saveInLocalStorage(); // сохраняем изменения в local storage
        };
        this.deleteTask = function (task) {
          // функция для перемещения задачи в корзину
          task.deleted = true; // задача является удаленной
          task.hide = true; // скрытой
          task.done = false; // и не выполненной
          saveInLocalStorage(); // сохраняем изменения в local storage
        };
        this.returnTask = function (task) {
          // функция для возвращени задачи из корзины
          task.deleted = false; // задача является не удаленной
          task.hide = true; // скрываем её из корзины
          saveInLocalStorage(); // сохраняем изменения в local storage
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
    if (localStorage.getItem('tasks')) {
      // если в local storage есть ключ tasks
      tasks = JSON.parse(localStorage.getItem('tasks')); // получаем по ключу массив
      tasks.forEach(function (item) {
        // для каждого элемента в массиве tasks
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
})();
//# sourceMappingURL=data:application/json;base64,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O0FBR0Q7QUFDRCxpQkFBYSxhQUFhLE9BQWIsQ0FBcUIsWUFBckIsQ0FBYixDO0FBQ0EsUUFBSSxDQUFDLFVBQUwsRUFBaUI7O0FBRWYsbUJBQWEsS0FBYixDO0FBQ0QsS0FIRCxNQUdPOztBQUVMLHFCQUFhLGVBQWUsTUFBZixHQUF3QixJQUF4QixHQUErQixLQUE1QyxDO0FBQ0Q7QUFDRCxlQUFXLGFBQWEsT0FBYixDQUFxQixVQUFyQixDQUFYO0FBQ0EsUUFBSSxDQUFDLFFBQUwsRUFBZTs7QUFFYixpQkFBVyxLQUFYLEM7QUFDRCxLQUhELE1BR087O0FBRUwsbUJBQVcsYUFBYSxNQUFiLEdBQXNCLElBQXRCLEdBQTZCLEtBQXhDLEM7QUFDRDtBQUNGOzs7QUFHRDtBQUNELENBakpBLEdBQUQiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIDIwMF0gKi9cbi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuLyogZXNsaW50IG5vLXVudXNlZC1leHByZXNzaW9uczogW1wiZXJyb3JcIiwgeyBcImFsbG93U2hvcnRDaXJjdWl0XCI6IHRydWUsIFwiYWxsb3dUZXJuYXJ5XCI6IHRydWUgfV0gKi9cbi8qIGdsb2JhbCBhbmd1bGFyICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgbGV0IGhpZGVUb2dnbGU7IC8vINGB0LrRgNGL0LLQsNGC0YwgLyDQv9C+0LrQsNC30YvQstCw0YLRjCDRgdC00LXQu9Cw0L3QvdGL0LUg0LfQsNC00LDRh9C4XG4gIGxldCBpbkJhc2tldDsgLy8g0L/QvtC60LDQt9GL0LLQsNGC0YwgLyDRgdC60YDRi9Cy0LDRgtGMINGD0LTQsNC70LXQvdC90YvQtSDQt9Cw0LTQsNGH0LhcbiAgbGV0IHRhc2tzID0gWyAvLyDQvNCw0YHRgdC40LIg0LTQu9GPINGF0YDQsNC90LXQvdC40Y8g0LfQsNC00LDRh1xuLy8gICAgeyBkZXNjcmlwdGlvbjogJzEnLCBkZWxldGVkOiBmYWxzZSwgZG9uZTogZmFsc2UsIGhpZGU6IGZhbHNlLCBvbmNoYW5nZTogZmFsc2UgfSAtLT4g0YLQsNC6INCy0YvQs9C70Y/QtNC40YIg0L7QsdGK0LXQutGCINGC0LjQv9CwIFwi0LfQsNC00LDRh9CwXCIsINGF0YDQsNC90Y/RidC40LnRgdGPINCyINC80LDRgdGB0LjQstC1XG4gIF07XG5cbiAgY29uc3QgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3RvRG9MaXN0JywgW10pOyAvLyDQuNC90LjRhtC40LDQu9C40LfQuNGA0YPQtdC8IGFuZ3VsYXIt0L/RgNC40LvQvtC20LXQvdC40LVcblxuICAvKiDQlNC40YDQtdC60YLQuNCy0LAg0LTQu9GPINCy0YvQstC+0LTQsCDRgtC10LrRg9GJ0LXQuSDQtNCw0YLRiyAqL1xuICBhcHAuZGlyZWN0aXZlKCdjdXJyZW50RGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJywgLy8gb25seSBtYXRjaGVzIGVsZW1lbnQgbmFtZVxuICAgICAgdGVtcGxhdGVVcmw6ICdjdXJyZW50LWRhdGUuaHRtbCcsIC8vINCz0LTQtSDRhdGA0LDQvdC40YLRgdGPIGh0bWxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHsgLy8g0LfQsNC00LDQtdC8INC60L7QvdGC0YDQvtC70LvQtdGAXG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7IC8vINC/0L7Qu9GD0YfQsNC10Lwg0YLQtdC60YPRidGD0Y4g0LTQsNGC0YNcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyQXM6ICdkYXRlQ3RybCcgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0L/RgdC10LLQtNC+0L3QuNC8INC00LvRjyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG4gICAgfTtcbiAgfSk7XG5cbiAgLyog0JTQuNGA0LXQutGC0LjQstCwINC00LvRjyDQutC90L7Qv9C+0Log0YPQv9GA0LLQu9C10L3QuNGPICovXG4gIGFwcC5kaXJlY3RpdmUoJ2NvbnRyb2xCdXR0b25zJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbnRyb2wtYnV0dG9ucy5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkgeyAvLyDQt9Cw0LTQsNC10Lwg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAgICAgICAgdGhpcy5oaWRlVG9nZ2xlID0gaGlkZVRvZ2dsZTsgLy8g0LfQsNC00LDQtdC8INGC0LXQutGD0YnQtdC1INC30L3QsNGH0LXQvdC40LUgaGlkZVRvZ2dsZVxuICAgICAgICB0aGlzLmluQmFza2V0ID0gaW5CYXNrZXQ7IC8vINC30LDQtNCw0LXQvCDRgtC10LrRg9GJ0LXQtSDQt9C90LDRh9C10L3QuNC1IGluQmFza2V0XG4gICAgICAgIHRoaXMuYWRkTmV3VGFzayA9IGZ1bmN0aW9uIChkZXNjcikgeyAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0LTQsNGH0YMsINC90LAg0LLRhdC+0LQg0L/QvtC00LDQtdGC0YHRjyDRgdC+0LTQtdGA0LbQsNC10L3QuNC1INC30LDQtNCw0YfQuCBcbiAgICAgICAgICB0YXNrcy5wdXNoKHsgLy8g0LIg0LzQsNGB0YHQuNCyINC30LDQtNCw0Ycg0LTQvtCx0LDQstC70Y/QtdGC0YHRjyDQvdC+0LLRi9C5INC+0LHRitC10LrRgiDRgVxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyLCAvL9C/0L7Qu9GD0YfQtdC90L3Ri9C8INC/0YDQuCDQstGL0LfQvtCy0LUg0YTRg9C90LrRhtC40Lgg0L7Qv9C40YHQsNC90LjQtdC8XG4gICAgICAgICAgICBkZWxldGVkOiBmYWxzZSwgLy8g0LfQsNC00LDRh9CwINC90LUg0YPQtNCw0LvQtdC90LBcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlLCAvLyDQvdC1INCy0YvQv9C+0LvQvdC10L3QsFxuICAgICAgICAgICAgaGlkZTogZmFsc2UsIC8vINC90LUg0YHQutGA0YvRgtCwXG4gICAgICAgICAgICBvbmNoYW5nZTogZmFsc2UgLy8g0L3QtSDQuNC30LzQtdC90Y/QtdGC0YHRjyDQsiDRgtC10LrRg9GJ0LjQuSDQvNC+0LzQtdC90YJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90LjRgtGMINC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG9nZ2xlRG9uZSA9IGZ1bmN0aW9uICgpIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10LrQu9GO0YfQtdC90LjRjyBkb25lL3VuZG9uZSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICB0aGlzLmhpZGVUb2dnbGUgPSBoaWRlVG9nZ2xlID0gIWhpZGVUb2dnbGU7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10LwgZG9uZS91bmRvbmUsINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC4INCy0L3Rg9GC0YDQuCDQutC+0YLRgNC+0LvQu9C10YDQsFxuICAgICAgICAgIHRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy8g0LTQu9GPINC60LDQttC00L7QuSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgIGl0ZW0uZG9uZSAmJiBoaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSB0cnVlKTsgLy8g0LXRgdC70Lgg0LfQsNC00LDRh9CwINGB0LTQtdC70LDQvdCwLCDQuCDQstGL0LHRgNCw0L3QviDRgdC60YDRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LgsINGC0L4g0YHQutGA0YvQstCw0LXQvFxuICAgICAgICAgICAgaXRlbS5kb25lICYmICFoaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7IC8vINC10YHQuNC7INC30LDQtNCw0YfQsCDRgdC00LXQu9Cw0L3QsCwg0Lgg0LLRi9Cx0YDQsNC90L4g0L/QvtC60LDQt9GL0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C1INC30LDQtNCw0YfQuCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3QuNGC0Ywg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2UgXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG9nZ2xlRGVsZXRlZFRhc2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuaW5CYXNrZXQgPSBpbkJhc2tldCA9ICFpbkJhc2tldDsgLy8g0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvCDQsiDQutC+0YDQt9C40L3QtS/QvdC1INCyINC60L7RgNC30LjQvdC1LCDQs9C70L7QsdCw0LvRjNC90YPRjiDQuCDQstC90YPRgtGA0Lgg0LrQvtGC0YDQvtC70LvQtdGA0LBcbiAgICAgICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vINC00LvRjyDQutCw0LbQtNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICBpdGVtLmhpZGUgPSB0cnVlOyAvLyDRgdC60YDRi9Cy0LDQtdC8INC60LDQttC00YPRjiDQt9Cw0LTQsNGH0YNcbiAgICAgICAgICAgIGluQmFza2V0ICYmIGl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpOyAvLyDQtdGB0LvQuCDQsiDQtNCw0L3QvdGL0Lkg0LzQvtC80LXQvdGCINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0LrQvtGA0LfQuNC90LUsINC4INC30LDQtNCw0YfQsCDRg9C00LDQu9C10L3QsCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvCDQt9Cw0LTQsNGH0YNcbiAgICAgICAgICAgICFpbkJhc2tldCAmJiAhaXRlbS5kZWxldGVkICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7IC8vINC10YHQu9C4INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDQvdC1INC90LDRhdC+0LTQuNGC0YHRjyDQsiDQutC+0YDQt9C40L3QtSwg0Lgg0LfQsNC00LDRh9CwINC90LUg0YPQtNCw0LvQtdC90LAsINGC0L4g0L/QvtC60LDQt9GL0LLQsNC10Lwg0LXRkVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyQXM6ICdidG5DdHJsJyAvLyDQv9GB0LXQstC00L7QvdC40Lwg0LTQu9GPINC60L7QvdGC0YDQvtC70LvQtdGA0LBcbiAgICB9O1xuICB9KTtcblxuICAvKiDQlNC40YDQtdC60YLQuNCy0LAg0LTQu9GPINGB0L/QuNGB0LrQsCDQt9Cw0LTQsNGHICovXG4gIGFwcC5kaXJlY3RpdmUoJ3Rhc2tzTGlzdCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJywgLy8gb25seSBtYXRjaGVzIGVsZW1lbnQgbmFtZVxuICAgICAgdGVtcGxhdGVVcmw6ICd0YXNrcy1saXN0Lmh0bWwnLCAvLyDQs9C00LUg0YXRgNCw0L3QuNGC0YHRjyBodG1sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGFza3MgPSB0YXNrczsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgdC/0LjRgdC+0Log0LfQsNC00LDRh1xuICAgICAgICB0aGlzLmNoYW5nZVRhc2sgPSBmdW5jdGlvbiAodGFzaywgZGVzY3JpcHRpb24pIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC40LfQvNC10L3QtdC90LjRjyDRgtC10LrRg9GJ0LXQs9C+INGB0L7QtNC10YDQttCw0L3QuNGPINC30LDQtNCw0YfQuFxuICAgICAgICAgIHRhc2sub25jaGFuZ2UgPSAhdGFzay5vbmNoYW5nZTsgLy8g0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvCBvbmNoYW5nZSDQtNC70Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgZGVzY3JpcHRpb24gJiYgKHRhc2suZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbik7IC8vINC10YHQu9C4INCyINGE0YPQvdC60YbQuNGOINC/0LXRgNC10LTQsNC90L4g0YHQvtC00LXRgNCw0LbQsNC10L3QuNC1INC00LvRjyDQt9Cw0L/QuNGB0Lgg0LIg0LfQsNC00LDRh9GDLCDRgtC+INC30LDQv9C40YHRi9Cy0LDQtdC8INC10LPQvlxuICAgICAgICAgIHNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZURvbmUgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPIGRvbmUvdW5kb25lINC30LDQtNCw0YfQuFxuICAgICAgICAgIHRhc2suZG9uZSA9ICF0YXNrLmRvbmU7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10LwgZG9uZS91bmRvbmUg0LTQu9GPINC30LDQtNCw0YfQuFxuICAgICAgICAgIGhpZGVUb2dnbGUgJiYgKHRhc2suaGlkZSA9IHRydWUpOyAvLyDQtdGB0LvQuCDQstGL0LHRgNCw0L3QviDRgdC60YDRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LgsINGC0L4g0YHQutGA0YvQstCw0LXQvCDRgtC+0LvRjNC60L4g0YfRgtC+INC+0YLQvNC10YfQtdC90L3Rg9GOINC30LDQtNCw0YfRg1xuICAgICAgICAgIHNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWxldGVUYXNrID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10LzQtdGJ0LXQvdC40Y8g0LfQsNC00LDRh9C4INCyINC60L7RgNC30LjQvdGDXG4gICAgICAgICAgdGFzay5kZWxldGVkID0gdHJ1ZTsgLy8g0LfQsNC00LDRh9CwINGP0LLQu9GP0LXRgtGB0Y8g0YPQtNCw0LvQtdC90L3QvtC5XG4gICAgICAgICAgdGFzay5oaWRlID0gdHJ1ZTsgLy8g0YHQutGA0YvRgtC+0LlcbiAgICAgICAgICB0YXNrLmRvbmUgPSBmYWxzZTsgLy8g0Lgg0L3QtSDQstGL0L/QvtC70L3QtdC90L3QvtC5XG4gICAgICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJldHVyblRhc2sgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LLQvtC30LLRgNCw0YnQtdC90Lgg0LfQsNC00LDRh9C4INC40Lcg0LrQvtGA0LfQuNC90YtcbiAgICAgICAgICB0YXNrLmRlbGV0ZWQgPSBmYWxzZTsgLy8g0LfQsNC00LDRh9CwINGP0LLQu9GP0LXRgtGB0Y8g0L3QtSDRg9C00LDQu9C10L3QvdC+0LlcbiAgICAgICAgICB0YXNrLmhpZGUgPSB0cnVlOyAvLyDRgdC60YDRi9Cy0LDQtdC8INC10ZEg0LjQtyDQutC+0YDQt9C40L3Ri1xuICAgICAgICAgIHNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpbmFsbHlEZWxldGVUYXNrID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3QvtCz0L4g0YPQtNCw0LvQtdC90LjRjyDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICBpZiAoY29uZmlybShcItCi0L7Rh9C90L4g0YPQtNCw0LvQuNGC0Ywg0LfQsNC00LDRh9GDP1wiKSkgeyAvLyDQt9Cw0L/RgNC+0YEg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GOINGC0L7Rh9C90L4g0LvQuCDQvtC9INGF0L7Rh9C10YIg0YPQtNCw0LvQuNGC0Ywg0LfQsNC00LDRh9GDLCDQtdGB0LvQuCDQtNCwLCDRgtC+INC/0LXRgNC10YXQvtC00LjQvCDQuiDRg9C00LDQu9C10L3QuNGOXG4gICAgICAgICAgICBsZXQgaW5kZXg7IC8vINC/0LXRgNC10LzQtdC90L3QsNGPINC00LvRjyDRhdGA0LDQvdC10L3QuNGPINC40L3QtNC10LrRgdCwXG4gICAgICAgICAgICBsZXQgaSA9IHRhc2tzLmxlbmd0aCAtIDE7IC8vINC/0LXRgNC10LzQtdC90L3QsNGPINC00LvRjyDRhdGA0LDQvdC10L3QuNGPINC00LvQuNC90Ysg0LzQsNGB0YHQuNCy0LAgLTFcbiAgICAgICAgICAgIHdoaWxlIChpID49IDApIHsgLy8g0L/QvtC60LAg0LIg0LzQsNGB0YHQuNCy0LUg0LXRidGRINC10YHRgtGMINGN0LvQtdC80LXQvdGC0YtcbiAgICAgICAgICAgICAgaWYgKHRhc2tzW2ldLiQkaGFzaEtleSA9PT0gdGFzay4kJGhhc2hLZXkpIHsgLy8g0LXRgdC70LggaGFzaEtleSDRjdC70LXQvNC10L3RgtCwINGA0LDQstC10L0gaGFza0tleSDRg9C00LDQu9GP0LXQvNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpOyAvLyDRgtC+INGB0L7RhdGA0LDQvdGP0LXQvCDQuNC90LTQtdC60YEg0LfQsNC00LDRh9C4INCyINC80LDRgdGB0LjQstC1XG4gICAgICAgICAgICAgICAgYnJlYWs7IC8vINC/0YDQtdC60YDQsNGJ0LDQtdC8INCy0YvQv9C+0LvQvdC10L3QuNC1INGG0LjQutC70LBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpLS07IC8vINC00LXQu9Cw0LXQvCDRgdC70LXQtNGD0Y7RidC40Lkg0YjQsNCzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsIDEpOyAvLyDRg9C00LDQu9GP0LXQvCDQt9Cw0LTQsNGH0YMg0LjQtyDQvNCw0YHRgdC40LLQsCDQt9Cw0LTQsNGHXG4gICAgICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyQXM6ICd0YXNrQ3RybCcgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0L/RgdC10LLQtNC+0L3QuNC8INC00LvRjyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG4gICAgfTtcbiAgfSk7XG5cbiAgLyog0KTRg9C90LrRhtC40Y8g0LTQu9GPINGB0L7RhdGA0L3QsNC90LXQvdC40Y8g0LjQt9C80LXQvdC10L3QuNC5INCyIGxvY2FsIHN0b3JhZ2UgKi9cbiAgZnVuY3Rpb24gc2F2ZUluTG9jYWxTdG9yYWdlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZGVUb2dnbGUnLCBoaWRlVG9nZ2xlKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5CYXNrZXQnLCBpbkJhc2tldCk7XG4gIH1cblxuICAvKiDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0LfQsNCz0YDRg9C30LrQuCDQtNCw0L3QvdGL0YUg0LjQtyBsb2NhbCBzdG9yYWdlICovXG4gIGZ1bmN0aW9uIGxvYWRGcm9tTG9jYWxTdG9yYWdlKCkge1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSkgeyAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC10YHRgtGMINC60LvRjtGHIHRhc2tzXG4gICAgICB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpOyAvLyDQv9C+0LvRg9GH0LDQtdC8INC/0L4g0LrQu9GO0YfRgyDQvNCw0YHRgdC40LJcbiAgICAgIHRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy8g0LTQu9GPINC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LIg0LzQsNGB0YHQuNCy0LUgdGFza3MgXG4gICAgICAgIGl0ZW0uJCRoYXNoS2V5ID0gdW5kZWZpbmVkOyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCBoYXNoS2V5ID0gdW5kZWZpbmVkICjQvdC10L7QsdGF0L7QtNC40LzQviDQtNC70Y8g0LjQt9Cx0LXQttCw0L3QuNC1INC60L7QvdGE0LvQuNC60YLQvtCyINC/0YDQuCDQstGL0LLQvtC00LUg0LfQsNC00LDRhylcbiAgICAgIH0pO1xuICAgIH1cbiAgICBoaWRlVG9nZ2xlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpZGVUb2dnbGUnKTsgLy8g0L/Ri9GC0LDQtdC80YHRjyDRgdGH0LjRgtCw0YLRjCDQt9C90LDRh9C10L3QuNC1INC00LvRjyBoaWRlIFRvZ2dsZSDQuNC3IExvY2FsIFN0b3JhZ2VcbiAgICBpZiAoIWhpZGVUb2dnbGUpIHtcbiAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0L3QtdGCIGhpZGVUb2dnbGUgKNGB0YLRgNCw0L3QuNGG0LAg0L7RgtC60YDRi9GC0LAg0LLQv9C10YDQstGL0LUpLCDRgtC+XG4gICAgICBoaWRlVG9nZ2xlID0gZmFsc2U7IC8vINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC30LDQtNCw0LTQuNC8INC10LzRgyBmYWxzZSAo0LfQvdCw0YfQuNGCLCDQvdCwINC90LXQs9C+INC10YnRkSDQvdC1INC90LDQttC40LzQsNC70LgpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0LXRgdGC0Ywg0YLQsNC60L7QuSDRjdC70LXQvNC10L3Rgiwg0YLQvlxuICAgICAgaGlkZVRvZ2dsZSA9IGhpZGVUb2dnbGUgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTsgLy8g0LXRgdC70Lgg0LfQsNC/0LjRgdCw0L3QsCDRgdGC0YDQvtC60LAgdHJ1ZSwg0YLQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10ZEg0LIgYm9vbCB0cnVlLCDQuNC90LDRh9C1INCyIGJvb2wgZmFsc2VcbiAgICB9XG4gICAgaW5CYXNrZXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5CYXNrZXQnKTtcbiAgICBpZiAoIWluQmFza2V0KSB7XG4gICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC90LXRgiBoaWRlVG9nZ2xlICjRgdGC0YDQsNC90LjRhtCwINC+0YLQutGA0YvRgtCwINCy0L/QtdGA0LLRi9C1KSwg0YLQvlxuICAgICAgaW5CYXNrZXQgPSBmYWxzZTsgLy8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LfQsNC00LDQtNC40Lwg0LXQvNGDIGZhbHNlICjQt9C90LDRh9C40YIsINC90LAg0L3QtdCz0L4g0LXRidGRINC90LUg0L3QsNC20LjQvNCw0LvQuClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDRgtCw0LrQvtC5INGN0LvQtdC80LXQvdGCLCDRgtC+XG4gICAgICBpbkJhc2tldCA9IGluQmFza2V0ID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7IC8vINC10YHQu9C4INC30LDQv9C40YHQsNC90LAg0YHRgtGA0L7QutCwIHRydWUsINGC0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdGRINCyIGJvb2wgdHJ1ZSwg0LjQvdCw0YfQtSDQsiBib29sIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgLyog0J/RgNC4INC30LDQv9GD0YHQutC1INC/0L7Qu9GD0YfQsNC10Lwg0LTQsNC90L3Ri9C1INC40LcgbG9jYWwgc3RvcmFnZSAqL1xuICBsb2FkRnJvbUxvY2FsU3RvcmFnZSgpO1xufSgpKTsiXX0=
