'use strict';

/* eslint max-len: ["error", 200] */
/* eslint-env browser */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
/* global angular */

(function () {
  'use strict';

  var hideToggle = void 0;
  var inBasket = void 0;
  var tasks = [
    //    { description: '1', deleted: false, done: true, hide: false, onchange: false }
  ];
  var app = angular.module('toDoList', []);
  app.directive('currentDate', function () {
    return {
      restrict: 'E',
      templateUrl: 'current-date.html',
      controller: function controller() {
        this.date = new Date();
      },
      controllerAs: 'dateCtrl'
    };
  });
  app.directive('controlButtons', function () {
    return {
      restrict: 'E',
      templateUrl: 'control-buttons.html',
      controller: function controller() {
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
      controller: function controller() {
        this.tasks = tasks;
        this.changeTask = function (task, description) {
          task.onchange = !task.onchange;
          description && (task.description = description);
          saveInLocalStorage();
        };
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
        };
        this.finallyDeleteTask = function (task) {
          var index = void 0;
          var i = tasks.length - 1;
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
})();
//# sourceMappingURL=data:application/json;base64,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LENBQUMsUUFBTCxFQUFlOztBQUViLGlCQUFXLEtBQVgsQztBQUNELEtBSEQsTUFHTzs7QUFFTCxtQkFBVyxhQUFhLE1BQWIsR0FBc0IsSUFBdEIsR0FBNkIsS0FBeEM7QUFDRDtBQUNGO0FBQ0Q7QUFDRCxDQWpJQSxHQUFEIiwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCAyMDBdICovXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cbi8qIGVzbGludCBuby11bnVzZWQtZXhwcmVzc2lvbnM6IFtcImVycm9yXCIsIHsgXCJhbGxvd1Nob3J0Q2lyY3VpdFwiOiB0cnVlLCBcImFsbG93VGVybmFyeVwiOiB0cnVlIH1dICovXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xuXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIGxldCBoaWRlVG9nZ2xlO1xuICBsZXQgaW5CYXNrZXQ7XG4gIGxldCB0YXNrcyA9IFtcbi8vICAgIHsgZGVzY3JpcHRpb246ICcxJywgZGVsZXRlZDogZmFsc2UsIGRvbmU6IHRydWUsIGhpZGU6IGZhbHNlLCBvbmNoYW5nZTogZmFsc2UgfVxuICBdO1xuICBjb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgndG9Eb0xpc3QnLCBbXSk7XG4gIGFwcC5kaXJlY3RpdmUoJ2N1cnJlbnREYXRlJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdjdXJyZW50LWRhdGUuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICB9LFxuICAgICAgY29udHJvbGxlckFzOiAnZGF0ZUN0cmwnXG4gICAgfTtcbiAgfSk7XG4gIGFwcC5kaXJlY3RpdmUoJ2NvbnRyb2xCdXR0b25zJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdjb250cm9sLWJ1dHRvbnMuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaGlkZVRvZ2dsZSA9IGhpZGVUb2dnbGU7XG4gICAgICAgIHRoaXMuaW5CYXNrZXQgPSBpbkJhc2tldDtcbiAgICAgICAgdGhpcy5hZGROZXdUYXNrID0gZnVuY3Rpb24gKGRlc2NyKSB7XG4gICAgICAgICAgdGFza3MucHVzaCh7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3IsXG4gICAgICAgICAgICBkZWxldGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50b2dnbGVEb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuaGlkZVRvZ2dsZSA9IGhpZGVUb2dnbGUgPSAhaGlkZVRvZ2dsZTtcbiAgICAgICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLmRvbmUgJiYgaGlkZVRvZ2dsZSAmJiAoaXRlbS5oaWRlID0gdHJ1ZSk7XG4gICAgICAgICAgICBpdGVtLmRvbmUgJiYgIWhpZGVUb2dnbGUgJiYgKGl0ZW0uaGlkZSA9IGZhbHNlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50b2dnbGVEZWxldGVkVGFza3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5pbkJhc2tldCA9IGluQmFza2V0ID0gIWluQmFza2V0O1xuICAgICAgICAgIHRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uaGlkZSA9IHRydWU7XG4gICAgICAgICAgICBpbkJhc2tldCAmJiBpdGVtLmRlbGV0ZWQgJiYgKGl0ZW0uaGlkZSA9IGZhbHNlKTtcbiAgICAgICAgICAgICFpbkJhc2tldCAmJiAhaXRlbS5kZWxldGVkICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY29udHJvbGxlckFzOiAnYnRuQ3RybCdcbiAgICB9O1xuICB9KTtcbiAgYXBwLmRpcmVjdGl2ZSgndGFza3NMaXN0JywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICd0YXNrcy1saXN0Lmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRhc2tzID0gdGFza3M7XG4gICAgICAgIHRoaXMuY2hhbmdlVGFzayA9IGZ1bmN0aW9uICh0YXNrLCBkZXNjcmlwdGlvbikge1xuICAgICAgICAgIHRhc2sub25jaGFuZ2UgPSAhdGFzay5vbmNoYW5nZTtcbiAgICAgICAgICBkZXNjcmlwdGlvbiAmJiAodGFzay5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZURvbmUgPSBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgIHRhc2suZG9uZSA9ICF0YXNrLmRvbmU7XG4gICAgICAgICAgaGlkZVRvZ2dsZSAmJiAodGFzay5oaWRlID0gdHJ1ZSk7XG4gICAgICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVsZXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgdGFzay5kZWxldGVkID0gdHJ1ZTtcbiAgICAgICAgICB0YXNrLmhpZGUgPSB0cnVlO1xuICAgICAgICAgIHRhc2suZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHNhdmVJbkxvY2FsU3RvcmFnZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJldHVyblRhc2sgPSBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgIHRhc2suZGVsZXRlZCA9IGZhbHNlO1xuICAgICAgICAgIHRhc2suaGlkZSA9IHRydWU7XG4gICAgICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maW5hbGx5RGVsZXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgbGV0IGluZGV4O1xuICAgICAgICAgIGxldCBpID0gdGFza3MubGVuZ3RoIC0gMTtcbiAgICAgICAgICB3aGlsZSAoaSA+PSAwKSB7XG4gICAgICAgICAgICBpZiAodGFza3NbaV0uJCRoYXNoS2V5ID09PSB0YXNrLiQkaGFzaEtleSkge1xuICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaS0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIHNhdmVJbkxvY2FsU3RvcmFnZSgpO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXJBczogJ3Rhc2tDdHJsJ1xuICAgIH07XG4gIH0pO1xuICBmdW5jdGlvbiBzYXZlSW5Mb2NhbFN0b3JhZ2UoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkodGFza3MpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlkZVRvZ2dsZScsIGhpZGVUb2dnbGUpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbkJhc2tldCcsIGluQmFza2V0KTtcbiAgfVxuICBmdW5jdGlvbiBsb2FkRnJvbUxvY2FsU3RvcmFnZSgpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpIHtcbiAgICAgIHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSk7XG4gICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uJCRoYXNoS2V5ID0gdW5kZWZpbmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGhpZGVUb2dnbGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlkZVRvZ2dsZScpOyAvLyDQv9GL0YLQsNC10LzRgdGPINGB0YfQuNGC0LDRgtGMINC30L3QsNGH0LXQvdC40LUg0LTQu9GPIGhpZGUgVG9nZ2xlINC40LcgTG9jYWwgU3RvcmFnZVxuICAgIGlmICghaGlkZVRvZ2dsZSkge1xuICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQvdC10YIgaGlkZVRvZ2dsZSAo0YHRgtGA0LDQvdC40YbQsCDQvtGC0LrRgNGL0YLQsCDQstC/0LXRgNCy0YvQtSksINGC0L5cbiAgICAgIGhpZGVUb2dnbGUgPSBmYWxzZTsgLy8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LfQsNC00LDQtNC40Lwg0LXQvNGDIGZhbHNlICjQt9C90LDRh9C40YIsINC90LAg0L3QtdCz0L4g0LXRidGRINC90LUg0L3QsNC20LjQvNCw0LvQuClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDRgtCw0LrQvtC5INGN0LvQtdC80LXQvdGCLCDRgtC+XG4gICAgICBoaWRlVG9nZ2xlID0gaGlkZVRvZ2dsZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cbiAgICBpbkJhc2tldCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbkJhc2tldCcpO1xuICAgIGlmICghaW5CYXNrZXQpIHtcbiAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0L3QtdGCIGhpZGVUb2dnbGUgKNGB0YLRgNCw0L3QuNGG0LAg0L7RgtC60YDRi9GC0LAg0LLQv9C10YDQstGL0LUpLCDRgtC+XG4gICAgICBpbkJhc2tldCA9IGZhbHNlOyAvLyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQt9Cw0LTQsNC00LjQvCDQtdC80YMgZmFsc2UgKNC30L3QsNGH0LjRgiwg0L3QsCDQvdC10LPQviDQtdGJ0ZEg0L3QtSDQvdCw0LbQuNC80LDQu9C4KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC10YHRgtGMINGC0LDQutC+0Lkg0Y3Qu9C10LzQtdC90YIsINGC0L5cbiAgICAgIGluQmFza2V0ID0gaW5CYXNrZXQgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgbG9hZEZyb21Mb2NhbFN0b3JhZ2UoKTtcbn0oKSk7Il19
