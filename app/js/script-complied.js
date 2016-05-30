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
//# sourceMappingURL=data:application/json;base64,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O0FBR0Q7QUFDRCxpQkFBYSxhQUFhLE9BQWIsQ0FBcUIsWUFBckIsQ0FBYixDO0FBQ0EsUUFBSSxDQUFDLFVBQUwsRUFBaUI7O0FBRWYsbUJBQWEsS0FBYixDO0FBQ0QsS0FIRCxNQUdPOztBQUVMLHFCQUFhLGVBQWUsTUFBZixHQUF3QixJQUF4QixHQUErQixLQUE1QyxDO0FBQ0Q7QUFDRCxlQUFXLGFBQWEsT0FBYixDQUFxQixVQUFyQixDQUFYO0FBQ0EsUUFBSSxDQUFDLFFBQUwsRUFBZTs7QUFFYixpQkFBVyxLQUFYLEM7QUFDRCxLQUhELE1BR087O0FBRUwsbUJBQVcsYUFBYSxNQUFiLEdBQXNCLElBQXRCLEdBQTZCLEtBQXhDLEM7QUFDRDtBQUNGOzs7QUFHRDtBQUNELENBakpBLEdBQUQiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIDIwMF0gKi9cbi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuLyogZXNsaW50IG5vLXVudXNlZC1leHByZXNzaW9uczogW1wiZXJyb3JcIiwgeyBcImFsbG93U2hvcnRDaXJjdWl0XCI6IHRydWUsIFwiYWxsb3dUZXJuYXJ5XCI6IHRydWUgfV0gKi9cbi8qIGdsb2JhbCBhbmd1bGFyICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0J1xuICBsZXQgaGlkZVRvZ2dsZTsgLy8g0YHQutGA0YvQstCw0YLRjCAvINC/0L7QutCw0LfRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LhcbiAgbGV0IGluQmFza2V0OyAvLyDQv9C+0LrQsNC30YvQstCw0YLRjCAvINGB0LrRgNGL0LLQsNGC0Ywg0YPQtNCw0LvQtdC90L3Ri9C1INC30LDQtNCw0YfQuFxuICBsZXQgdGFza3MgPSBbIC8vINC80LDRgdGB0LjQsiDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQt9Cw0LTQsNGHXG4vLyAgICB7IGRlc2NyaXB0aW9uOiAnMScsIGRlbGV0ZWQ6IGZhbHNlLCBkb25lOiBmYWxzZSwgaGlkZTogZmFsc2UsIG9uY2hhbmdlOiBmYWxzZSB9IC0tPiDRgtCw0Log0LLRi9Cz0LvRj9C00LjRgiDQvtCx0YrQtdC60YIg0YLQuNC/0LAgXCLQt9Cw0LTQsNGH0LBcIiwg0YXRgNCw0L3Rj9GJ0LjQudGB0Y8g0LIg0LzQsNGB0YHQuNCy0LVcbiAgXTtcblxuICBjb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgndG9Eb0xpc3QnLCBbXSk7IC8vINC40L3QuNGG0LjQsNC70LjQt9C40YDRg9C10LwgYW5ndWxhci3Qv9GA0LjQu9C+0LbQtdC90LjQtVxuXG4gIC8qINCU0LjRgNC10LrRgtC40LLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwINGC0LXQutGD0YnQtdC5INC00LDRgtGLICovXG4gIGFwcC5kaXJlY3RpdmUoJ2N1cnJlbnREYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICB0ZW1wbGF0ZVVybDogJ2N1cnJlbnQtZGF0ZS5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkgeyAvLyDQt9Cw0LTQsNC10Lwg0LrQvtC90YLRgNC+0LvQu9C10YBcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgtC10LrRg9GJ0YPRjiDQtNCw0YLRg1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXJBczogJ2RhdGVDdHJsJyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDQv9GB0LXQstC00L7QvdC40Lwg0LTQu9GPINC60L7QvdGC0YDQvtC70LvQtdGA0LBcbiAgICB9O1xuICB9KTtcblxuICAvKiDQlNC40YDQtdC60YLQuNCy0LAg0LTQu9GPINC60L3QvtC/0L7QuiDRg9C/0YDQstC70LXQvdC40Y8gKi9cbiAgYXBwLmRpcmVjdGl2ZSgnY29udHJvbEJ1dHRvbnMnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsIC8vIG9ubHkgbWF0Y2hlcyBlbGVtZW50IG5hbWVcbiAgICAgIHRlbXBsYXRlVXJsOiAnY29udHJvbC1idXR0b25zLmh0bWwnLCAvLyDQs9C00LUg0YXRgNCw0L3QuNGC0YHRjyBodG1sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7IC8vINC30LDQtNCw0LXQvCDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICAgICAgICB0aGlzLmhpZGVUb2dnbGUgPSBoaWRlVG9nZ2xlOyAvLyDQt9Cw0LTQsNC10Lwg0YLQtdC60YPRidC10LUg0LfQvdCw0YfQtdC90LjQtSBoaWRlVG9nZ2xlXG4gICAgICAgIHRoaXMuaW5CYXNrZXQgPSBpbkJhc2tldDsgLy8g0LfQsNC00LDQtdC8INGC0LXQutGD0YnQtdC1INC30L3QsNGH0LXQvdC40LUgaW5CYXNrZXRcbiAgICAgICAgdGhpcy5hZGROZXdUYXNrID0gZnVuY3Rpb24gKGRlc2NyKSB7IC8vINC00L7QsdCw0LLQu9GP0LXQvCDQvdC+0LLRg9GOINC30LDQtNCw0YfRgywg0L3QsCDQstGF0L7QtCDQv9C+0LTQsNC10YLRgdGPINGB0L7QtNC10YDQttCw0LXQvdC40LUg0LfQsNC00LDRh9C4XG4gICAgICAgICAgdGFza3MucHVzaCh7IC8vINCyINC80LDRgdGB0LjQsiDQt9Cw0LTQsNGHINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0L3QvtCy0YvQuSDQvtCx0YrQtdC60YIg0YFcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjciwgLy/Qv9C+0LvRg9GH0LXQvdC90YvQvCDQv9GA0Lgg0LLRi9C30L7QstC1INGE0YPQvdC60YbQuNC4INC+0L/QuNGB0LDQvdC40LXQvFxuICAgICAgICAgICAgZGVsZXRlZDogZmFsc2UsIC8vINC30LDQtNCw0YfQsCDQvdC1INGD0LTQsNC70LXQvdCwXG4gICAgICAgICAgICBkb25lOiBmYWxzZSwgLy8g0L3QtSDQstGL0L/QvtC70L3QtdC90LBcbiAgICAgICAgICAgIGhpZGU6IGZhbHNlLCAvLyDQvdC1INGB0LrRgNGL0YLQsFxuICAgICAgICAgICAgb25jaGFuZ2U6IGZhbHNlIC8vINC90LUg0LjQt9C80LXQvdGP0LXRgtGB0Y8g0LIg0YLQtdC60YPRidC40Lkg0LzQvtC80LXQvdGCXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdC40YLRjCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRvZ2dsZURvbmUgPSBmdW5jdGlvbiAoKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9C10YDQtdC60LvRjtGH0LXQvdC40Y8gZG9uZS91bmRvbmUg0LfQsNC00LDRh9C4XG4gICAgICAgICAgdGhpcy5oaWRlVG9nZ2xlID0gaGlkZVRvZ2dsZSA9ICFoaWRlVG9nZ2xlOyAvLyDQv9C10YDQtdC60LvRjtGH0LDQtdC8IGRvbmUvdW5kb25lLCDQs9C70L7QsdCw0LvRjNC90YPRjiDQuCDQstC90YPRgtGA0Lgg0LrQvtGC0YDQvtC70LvQtdGA0LBcbiAgICAgICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vINC00LvRjyDQutCw0LbQtNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICBpdGVtLmRvbmUgJiYgaGlkZVRvZ2dsZSAmJiAoaXRlbS5oaWRlID0gdHJ1ZSk7IC8vINC10YHQu9C4INC30LDQtNCw0YfQsCDRgdC00LXQu9Cw0L3QsCwg0Lgg0LLRi9Cx0YDQsNC90L4g0YHQutGA0YvQstCw0YLRjCDRgdC00LXQu9Cw0L3QvdGL0LUg0LfQsNC00LDRh9C4LCDRgtC+INGB0LrRgNGL0LLQsNC10LxcbiAgICAgICAgICAgIGl0ZW0uZG9uZSAmJiAhaGlkZVRvZ2dsZSAmJiAoaXRlbS5oaWRlID0gZmFsc2UpOyAvLyDQtdGB0LjQuyDQt9Cw0LTQsNGH0LAg0YHQtNC10LvQsNC90LAsINC4INCy0YvQsdGA0LDQvdC+INC/0L7QutCw0LfRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LgsINGC0L4g0L/QvtC60LDQt9GL0LLQsNC10LxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90LjRgtGMINC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlIFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRvZ2dsZURlbGV0ZWRUYXNrcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLmluQmFza2V0ID0gaW5CYXNrZXQgPSAhaW5CYXNrZXQ7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10Lwg0LIg0LrQvtGA0LfQuNC90LUv0L3QtSDQsiDQutC+0YDQt9C40L3QtSwg0LPQu9C+0LHQsNC70YzQvdGD0Y4g0Lgg0LLQvdGD0YLRgNC4INC60L7RgtGA0L7Qu9C70LXRgNCwXG4gICAgICAgICAgdGFza3MuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAvLyDQtNC70Y8g0LrQsNC20LTQvtC5INC30LDQtNCw0YfQuFxuICAgICAgICAgICAgaXRlbS5oaWRlID0gdHJ1ZTsgLy8g0YHQutGA0YvQstCw0LXQvCDQutCw0LbQtNGD0Y4g0LfQsNC00LDRh9GDXG4gICAgICAgICAgICBpbkJhc2tldCAmJiBpdGVtLmRlbGV0ZWQgJiYgKGl0ZW0uaGlkZSA9IGZhbHNlKTsgLy8g0LXRgdC70Lgg0LIg0LTQsNC90L3Ri9C5INC80L7QvNC10L3RgiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0L3QsNGF0L7QtNC40YLRgdGPINCyINC60L7RgNC30LjQvdC1LCDQuCDQt9Cw0LTQsNGH0LAg0YPQtNCw0LvQtdC90LAsINGC0L4g0L/QvtC60LDQt9GL0LLQsNC10Lwg0LfQsNC00LDRh9GDXG4gICAgICAgICAgICAhaW5CYXNrZXQgJiYgIWl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpOyAvLyDQtdGB0LvQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0L3QtSDQvdCw0YXQvtC00LjRgtGB0Y8g0LIg0LrQvtGA0LfQuNC90LUsINC4INC30LDQtNCw0YfQsCDQvdC1INGD0LTQsNC70LXQvdCwLCDRgtC+INC/0L7QutCw0LfRi9Cy0LDQtdC8INC10ZFcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY29udHJvbGxlckFzOiAnYnRuQ3RybCcgLy8g0L/RgdC10LLQtNC+0L3QuNC8INC00LvRjyDQutC+0L3RgtGA0L7Qu9C70LXRgNCwXG4gICAgfTtcbiAgfSk7XG5cbiAgLyog0JTQuNGA0LXQutGC0LjQstCwINC00LvRjyDRgdC/0LjRgdC60LAg0LfQsNC00LDRhyAqL1xuICBhcHAuZGlyZWN0aXZlKCd0YXNrc0xpc3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsIC8vIG9ubHkgbWF0Y2hlcyBlbGVtZW50IG5hbWVcbiAgICAgIHRlbXBsYXRlVXJsOiAndGFza3MtbGlzdC5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRhc2tzID0gdGFza3M7IC8vINC/0L7Qu9GD0YfQsNC10Lwg0YHQv9C40YHQvtC6INC30LDQtNCw0YdcbiAgICAgICAgdGhpcy5jaGFuZ2VUYXNrID0gZnVuY3Rpb24gKHRhc2ssIGRlc2NyaXB0aW9uKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQuNC30LzQtdC90LXQvdC40Y8g0YLQtdC60YPRidC10LPQviDRgdC+0LTQtdGA0LbQsNC90LjRjyDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICB0YXNrLm9uY2hhbmdlID0gIXRhc2sub25jaGFuZ2U7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10Lwgb25jaGFuZ2Ug0LTQu9GPINC30LDQtNCw0YfQuFxuICAgICAgICAgIGRlc2NyaXB0aW9uICYmICh0YXNrLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pOyAvLyDQtdGB0LvQuCDQsiDRhNGD0L3QutGG0LjRjiDQv9C10YDQtdC00LDQvdC+INGB0L7QtNC10YDQsNC20LDQtdC90LjQtSDQtNC70Y8g0LfQsNC/0LjRgdC4INCyINC30LDQtNCw0YfRgywg0YLQviDQt9Cw0L/QuNGB0YvQstCw0LXQvCDQtdCz0L5cbiAgICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b2dnbGVEb25lID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC40LfQvNC10L3QtdC90LjRjyBkb25lL3VuZG9uZSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICB0YXNrLmRvbmUgPSAhdGFzay5kb25lOyAvLyDQv9C10YDQtdC60LvRjtGH0LDQtdC8IGRvbmUvdW5kb25lINC00LvRjyDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICBoaWRlVG9nZ2xlICYmICh0YXNrLmhpZGUgPSB0cnVlKTsgLy8g0LXRgdC70Lgg0LLRi9Cx0YDQsNC90L4g0YHQutGA0YvQstCw0YLRjCDRgdC00LXQu9Cw0L3QvdGL0LUg0LfQsNC00LDRh9C4LCDRgtC+INGB0LrRgNGL0LLQsNC10Lwg0YLQvtC70YzQutC+INGH0YLQviDQvtGC0LzQtdGH0LXQvdC90YPRjiDQt9Cw0LTQsNGH0YNcbiAgICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVsZXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQv9C10YDQtdC80LXRidC10L3QuNGPINC30LDQtNCw0YfQuCDQsiDQutC+0YDQt9C40L3Rg1xuICAgICAgICAgIHRhc2suZGVsZXRlZCA9IHRydWU7IC8vINC30LDQtNCw0YfQsCDRj9Cy0LvRj9C10YLRgdGPINGD0LTQsNC70LXQvdC90L7QuVxuICAgICAgICAgIHRhc2suaGlkZSA9IHRydWU7IC8vINGB0LrRgNGL0YLQvtC5XG4gICAgICAgICAgdGFzay5kb25lID0gZmFsc2U7IC8vINC4INC90LUg0LLRi9C/0L7Qu9C90LXQvdC90L7QuVxuICAgICAgICAgIHNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXR1cm5UYXNrID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINCy0L7Qt9Cy0YDQsNGJ0LXQvdC4INC30LDQtNCw0YfQuCDQuNC3INC60L7RgNC30LjQvdGLXG4gICAgICAgICAgdGFzay5kZWxldGVkID0gZmFsc2U7IC8vINC30LDQtNCw0YfQsCDRj9Cy0LvRj9C10YLRgdGPINC90LUg0YPQtNCw0LvQtdC90L3QvtC5XG4gICAgICAgICAgdGFzay5oaWRlID0gdHJ1ZTsgLy8g0YHQutGA0YvQstCw0LXQvCDQtdGRINC40Lcg0LrQvtGA0LfQuNC90YtcbiAgICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maW5hbGx5RGVsZXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrKSB7IC8vINGE0YPQvdC60YbQuNGPINC00LvRjyDQvtC60L7QvdGH0LDRgtC10LvRjNC90L7Qs9C+INGD0LTQsNC70LXQvdC40Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgaWYgKGNvbmZpcm0oXCLQotC+0YfQvdC+INGD0LTQsNC70LjRgtGMINC30LDQtNCw0YfRgz9cIikpIHsgLy8g0LfQsNC/0YDQvtGBINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjiDRgtC+0YfQvdC+INC70Lgg0L7QvSDRhdC+0YfQtdGCINGD0LTQsNC70LjRgtGMINC30LDQtNCw0YfRgywg0LXRgdC70Lgg0LTQsCwg0YLQviDQv9C10YDQtdGF0L7QtNC40Lwg0Log0YPQtNCw0LvQtdC90LjRjlxuICAgICAgICAgICAgbGV0IGluZGV4OyAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQuNC90LTQtdC60YHQsFxuICAgICAgICAgICAgbGV0IGkgPSB0YXNrcy5sZW5ndGggLSAxOyAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQtNC70LjQvdGLINC80LDRgdGB0LjQstCwIC0xXG4gICAgICAgICAgICB3aGlsZSAoaSA+PSAwKSB7IC8vINC/0L7QutCwINCyINC80LDRgdGB0LjQstC1INC10YnRkSDQtdGB0YLRjCDRjdC70LXQvNC10L3RgtGLXG4gICAgICAgICAgICAgIGlmICh0YXNrc1tpXS4kJGhhc2hLZXkgPT09IHRhc2suJCRoYXNoS2V5KSB7IC8vINC10YHQu9C4IGhhc2hLZXkg0Y3Qu9C10LzQtdC90YLQsCDRgNCw0LLQtdC9IGhhc2tLZXkg0YPQtNCw0LvRj9C10LzQvtC5INC30LDQtNCw0YfQuFxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTsgLy8g0YLQviDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQvdC00LXQutGBINC30LDQtNCw0YfQuCDQsiDQvNCw0YHRgdC40LLQtVxuICAgICAgICAgICAgICAgIGJyZWFrOyAvLyDQv9GA0LXQutGA0LDRidCw0LXQvCDQstGL0L/QvtC70L3QtdC90LjQtSDRhtC40LrQu9CwXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaS0tOyAvLyDQtNC10LvQsNC10Lwg0YHQu9C10LTRg9GO0YnQuNC5INGI0LDQs1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKTsgLy8g0YPQtNCw0LvRj9C10Lwg0LfQsNC00LDRh9GDINC40Lcg0LzQsNGB0YHQuNCy0LAg0LfQsNC00LDRh1xuICAgICAgICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY29udHJvbGxlckFzOiAndGFza0N0cmwnIC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INC/0YHQtdCy0LTQvtC90LjQvCDQtNC70Y8g0LrQvtC90YLRgNC+0LvQu9C10YDQsFxuICAgIH07XG4gIH0pO1xuXG4gIC8qINCk0YPQvdC60YbQuNGPINC00LvRjyDRgdC+0YXRgNC90LDQvdC10L3QuNGPINC40LfQvNC10L3QtdC90LjQuSDQsiBsb2NhbCBzdG9yYWdlICovXG4gIGZ1bmN0aW9uIHNhdmVJbkxvY2FsU3RvcmFnZSgpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza3MnLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWRlVG9nZ2xlJywgaGlkZVRvZ2dsZSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2luQmFza2V0JywgaW5CYXNrZXQpO1xuICB9XG5cbiAgLyog0KTRg9C90LrRhtC40Y8g0LTQu9GPINC30LDQs9GA0YPQt9C60Lgg0LTQsNC90L3Ri9GFINC40LcgbG9jYWwgc3RvcmFnZSAqL1xuICBmdW5jdGlvbiBsb2FkRnJvbUxvY2FsU3RvcmFnZSgpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpIHsgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDQutC70Y7RhyB0YXNrc1xuICAgICAgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKTsgLy8g0L/QvtC70YPRh9Cw0LXQvCDQv9C+INC60LvRjtGH0YMg0LzQsNGB0YHQuNCyXG4gICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vINC00LvRjyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINCyINC80LDRgdGB0LjQstC1IHRhc2tzIFxuICAgICAgICBpdGVtLiQkaGFzaEtleSA9IHVuZGVmaW5lZDsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10LwgaGFzaEtleSA9IHVuZGVmaW5lZCAo0L3QtdC+0LHRhdC+0LTQuNC80L4g0LTQu9GPINC40LfQsdC10LbQsNC90LjQtSDQutC+0L3RhNC70LjQutGC0L7QsiDQv9GA0Lgg0LLRi9Cy0L7QtNC1INC30LDQtNCw0YcpXG4gICAgICB9KTtcbiAgICB9XG4gICAgaGlkZVRvZ2dsZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWRlVG9nZ2xlJyk7IC8vINC/0YvRgtCw0LXQvNGB0Y8g0YHRh9C40YLQsNGC0Ywg0LfQvdCw0YfQtdC90LjQtSDQtNC70Y8gaGlkZSBUb2dnbGUg0LjQtyBMb2NhbCBTdG9yYWdlXG4gICAgaWYgKCFoaWRlVG9nZ2xlKSB7XG4gICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC90LXRgiBoaWRlVG9nZ2xlICjRgdGC0YDQsNC90LjRhtCwINC+0YLQutGA0YvRgtCwINCy0L/QtdGA0LLRi9C1KSwg0YLQvlxuICAgICAgaGlkZVRvZ2dsZSA9IGZhbHNlOyAvLyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQt9Cw0LTQsNC00LjQvCDQtdC80YMgZmFsc2UgKNC30L3QsNGH0LjRgiwg0L3QsCDQvdC10LPQviDQtdGJ0ZEg0L3QtSDQvdCw0LbQuNC80LDQu9C4KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC10YHRgtGMINGC0LDQutC+0Lkg0Y3Qu9C10LzQtdC90YIsINGC0L5cbiAgICAgIGhpZGVUb2dnbGUgPSBoaWRlVG9nZ2xlID09PSAndHJ1ZScgPyB0cnVlIDogZmFsc2U7IC8vINC10YHQu9C4INC30LDQv9C40YHQsNC90LAg0YHRgtGA0L7QutCwIHRydWUsINGC0L4g0L/RgNC10L7QsdGA0LDQt9GD0LXQvCDQtdGRINCyIGJvb2wgdHJ1ZSwg0LjQvdCw0YfQtSDQsiBib29sIGZhbHNlXG4gICAgfVxuICAgIGluQmFza2V0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luQmFza2V0Jyk7XG4gICAgaWYgKCFpbkJhc2tldCkge1xuICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQvdC10YIgaGlkZVRvZ2dsZSAo0YHRgtGA0LDQvdC40YbQsCDQvtGC0LrRgNGL0YLQsCDQstC/0LXRgNCy0YvQtSksINGC0L5cbiAgICAgIGluQmFza2V0ID0gZmFsc2U7IC8vINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC30LDQtNCw0LTQuNC8INC10LzRgyBmYWxzZSAo0LfQvdCw0YfQuNGCLCDQvdCwINC90LXQs9C+INC10YnRkSDQvdC1INC90LDQttC40LzQsNC70LgpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0LXRgdGC0Ywg0YLQsNC60L7QuSDRjdC70LXQvNC10L3Rgiwg0YLQvlxuICAgICAgaW5CYXNrZXQgPSBpbkJhc2tldCA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlOyAvLyDQtdGB0LvQuCDQt9Cw0L/QuNGB0LDQvdCwINGB0YLRgNC+0LrQsCB0cnVlLCDRgtC+INC/0YDQtdC+0LHRgNCw0LfRg9C10Lwg0LXRkSDQsiBib29sIHRydWUsINC40L3QsNGH0LUg0LIgYm9vbCBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIC8qINCf0YDQuCDQt9Cw0L/Rg9GB0LrQtSDQv9C+0LvRg9GH0LDQtdC8INC00LDQvdC90YvQtSDQuNC3IGxvY2FsIHN0b3JhZ2UgKi9cbiAgbG9hZEZyb21Mb2NhbFN0b3JhZ2UoKTtcbn0oKSk7Il19
