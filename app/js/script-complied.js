'use strict';

/* eslint max-len: ["error", 200] */
/* eslint-env browser */
/* eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }] */
/* global angular */

(function () {
  'use strict';

  var hideToggle = void 0;
  var inBasket = void 0;
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
      templateUrl: 'current-date.html',
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
  app.controller('ButtonsController', function () {
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
  });
  app.controller('TaskController', function () {
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

  var tasks = [{
    description: '1',
    deleted: false,
    done: true,
    hide: false,
    onchange: false
  }, {
    description: '2',
    deleted: false,
    done: true,
    hide: false,
    onchange: false
  }, {
    description: '3',
    deleted: false,
    done: false,
    hide: false,
    onchange: false
  }, {
    description: '4',
    deleted: true,
    done: false,
    hide: true,
    onchange: false
  }];
  loadFromLocalStorage();
})();
//# sourceMappingURL=data:application/json;base64,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Y0FBVTtBQUxaLEdBUlUsRUFlVjtBQUNFLGlCQUFhLEdBRGY7QUFFRSxhQUFTLEtBRlg7QUFHRSxVQUFNLEtBSFI7QUFJRSxVQUFNLEtBSlI7QUFLRSxjQUFVO0FBTFosR0FmVSxFQXNCVjtBQUNFLGlCQUFhLEdBRGY7QUFFRSxhQUFTLElBRlg7QUFHRSxVQUFNLEtBSFI7QUFJRSxVQUFNLElBSlI7QUFLRSxjQUFVO0FBTFosR0F0QlUsQ0FBWjtBQThCQTtBQUNELENBdExBLEdBQUQiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG1heC1sZW46IFtcImVycm9yXCIsIDIwMF0gKi9cbi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuLyogZXNsaW50IG5vLXVudXNlZC1leHByZXNzaW9uczogW1wiZXJyb3JcIiwgeyBcImFsbG93U2hvcnRDaXJjdWl0XCI6IHRydWUsIFwiYWxsb3dUZXJuYXJ5XCI6IHRydWUgfV0gKi9cbi8qIGdsb2JhbCBhbmd1bGFyICovXG5cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgbGV0IGhpZGVUb2dnbGU7XG4gIGxldCBpbkJhc2tldDtcbiAgY29uc3QgYXBwID0gYW5ndWxhci5tb2R1bGUoJ3RvRG9MaXN0JywgW10pO1xuICBhcHAuZGlyZWN0aXZlKCdjdXJyZW50RGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnY3VycmVudC1kYXRlLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXJBczogJ2RhdGVDdHJsJ1xuICAgIH07XG4gIH0pO1xuICBhcHAuZGlyZWN0aXZlKCdjb250cm9sQnV0dG9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnY3VycmVudC1kYXRlLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhpZGVUb2dnbGUgPSBoaWRlVG9nZ2xlO1xuICAgICAgICB0aGlzLmluQmFza2V0ID0gaW5CYXNrZXQ7XG4gICAgICAgIHRoaXMuYWRkTmV3VGFzayA9IGZ1bmN0aW9uIChkZXNjcikge1xuICAgICAgICAgIHRhc2tzLnB1c2goe1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyLFxuICAgICAgICAgICAgZGVsZXRlZDogZmFsc2UsXG4gICAgICAgICAgICBkb25lOiBmYWxzZSxcbiAgICAgICAgICAgIGhpZGU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG9nZ2xlRG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLmhpZGVUb2dnbGUgPSBoaWRlVG9nZ2xlID0gIWhpZGVUb2dnbGU7XG4gICAgICAgICAgdGFza3MuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5kb25lICYmIGhpZGVUb2dnbGUgJiYgKGl0ZW0uaGlkZSA9IHRydWUpO1xuICAgICAgICAgICAgaXRlbS5kb25lICYmICFoaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG9nZ2xlRGVsZXRlZFRhc2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuaW5CYXNrZXQgPSBpbkJhc2tldCA9ICFpbkJhc2tldDtcbiAgICAgICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLmhpZGUgPSB0cnVlO1xuICAgICAgICAgICAgaW5CYXNrZXQgJiYgaXRlbS5kZWxldGVkICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7XG4gICAgICAgICAgICAhaW5CYXNrZXQgJiYgIWl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNhdmVJbkxvY2FsU3RvcmFnZSgpO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXJBczogJ2J0bkN0cmwnXG4gICAgfTtcbiAgfSk7XG4gIGFwcC5jb250cm9sbGVyKCdCdXR0b25zQ29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmhpZGVUb2dnbGUgPSBoaWRlVG9nZ2xlO1xuICAgIHRoaXMuaW5CYXNrZXQgPSBpbkJhc2tldDtcbiAgICB0aGlzLmFkZE5ld1Rhc2sgPSBmdW5jdGlvbiAoZGVzY3IpIHtcbiAgICAgIHRhc2tzLnB1c2goe1xuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3IsXG4gICAgICAgIGRlbGV0ZWQ6IGZhbHNlLFxuICAgICAgICBkb25lOiBmYWxzZSxcbiAgICAgICAgaGlkZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7XG4gICAgfTtcbiAgICB0aGlzLnRvZ2dsZURvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmhpZGVUb2dnbGUgPSBoaWRlVG9nZ2xlID0gIWhpZGVUb2dnbGU7XG4gICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uZG9uZSAmJiBoaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSB0cnVlKTtcbiAgICAgICAgaXRlbS5kb25lICYmICFoaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIHNhdmVJbkxvY2FsU3RvcmFnZSgpO1xuICAgIH07XG4gICAgdGhpcy50b2dnbGVEZWxldGVkVGFza3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmluQmFza2V0ID0gaW5CYXNrZXQgPSAhaW5CYXNrZXQ7XG4gICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uaGlkZSA9IHRydWU7XG4gICAgICAgIGluQmFza2V0ICYmIGl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpO1xuICAgICAgICAhaW5CYXNrZXQgJiYgIWl0ZW0uZGVsZXRlZCAmJiAoaXRlbS5oaWRlID0gZmFsc2UpO1xuICAgICAgfSk7XG4gICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTtcbiAgICB9O1xuICB9KTtcbiAgYXBwLmNvbnRyb2xsZXIoJ1Rhc2tDb250cm9sbGVyJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudGFza3MgPSB0YXNrcztcbiAgICB0aGlzLmNoYW5nZVRhc2sgPSBmdW5jdGlvbiAodGFzaywgZGVzY3JpcHRpb24pIHtcbiAgICAgIHRhc2sub25jaGFuZ2UgPSAhdGFzay5vbmNoYW5nZTtcbiAgICAgIGRlc2NyaXB0aW9uICYmICh0YXNrLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pO1xuICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7XG4gICAgfVxuICAgIHRoaXMudG9nZ2xlRG9uZSA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICB0YXNrLmRvbmUgPSAhdGFzay5kb25lO1xuICAgICAgaGlkZVRvZ2dsZSAmJiAodGFzay5oaWRlID0gdHJ1ZSk7XG4gICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2UoKTtcbiAgICB9O1xuICAgIHRoaXMuZGVsZXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICB0YXNrLmRlbGV0ZWQgPSB0cnVlO1xuICAgICAgdGFzay5oaWRlID0gdHJ1ZTtcbiAgICAgIHRhc2suZG9uZSA9IGZhbHNlO1xuICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7XG4gICAgfTtcbiAgICB0aGlzLnJldHVyblRhc2sgPSBmdW5jdGlvbiAodGFzaykge1xuICAgICAgdGFzay5kZWxldGVkID0gZmFsc2U7XG4gICAgICB0YXNrLmhpZGUgPSB0cnVlO1xuICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7XG4gICAgfVxuICAgIHRoaXMuZmluYWxseURlbGV0ZVRhc2sgPSBmdW5jdGlvbiAodGFzaykge1xuICAgICAgbGV0IGluZGV4O1xuICAgICAgbGV0IGkgPSB0YXNrcy5sZW5ndGggLSAxO1xuICAgICAgd2hpbGUgKGkgPj0gMCkge1xuICAgICAgICBpZiAodGFza3NbaV0uJCRoYXNoS2V5ID09PSB0YXNrLiQkaGFzaEtleSkge1xuICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgc2F2ZUluTG9jYWxTdG9yYWdlKCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2F2ZUluTG9jYWxTdG9yYWdlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZGVUb2dnbGUnLCBoaWRlVG9nZ2xlKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5CYXNrZXQnLCBpbkJhc2tldCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkRnJvbUxvY2FsU3RvcmFnZSgpIHtcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpIHtcbiAgICAgIHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSk7XG4gICAgICB0YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uJCRoYXNoS2V5ID0gdW5kZWZpbmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGhpZGVUb2dnbGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlkZVRvZ2dsZScpOyAvLyDQv9GL0YLQsNC10LzRgdGPINGB0YfQuNGC0LDRgtGMINC30L3QsNGH0LXQvdC40LUg0LTQu9GPIGhpZGUgVG9nZ2xlINC40LcgTG9jYWwgU3RvcmFnZVxuICAgIGlmICghaGlkZVRvZ2dsZSkge1xuICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQvdC10YIgaGlkZVRvZ2dsZSAo0YHRgtGA0LDQvdC40YbQsCDQvtGC0LrRgNGL0YLQsCDQstC/0LXRgNCy0YvQtSksINGC0L5cbiAgICAgIGhpZGVUb2dnbGUgPSBmYWxzZTsgLy8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LfQsNC00LDQtNC40Lwg0LXQvNGDIGZhbHNlICjQt9C90LDRh9C40YIsINC90LAg0L3QtdCz0L4g0LXRidGRINC90LUg0L3QsNC20LjQvNCw0LvQuClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDRgtCw0LrQvtC5INGN0LvQtdC80LXQvdGCLCDRgtC+XG4gICAgICBoaWRlVG9nZ2xlID0gaGlkZVRvZ2dsZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cbiAgICBpbkJhc2tldCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbkJhc2tldCcpO1xuICAgIGlmICghaW5CYXNrZXQpIHtcbiAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0L3QtdGCIGhpZGVUb2dnbGUgKNGB0YLRgNCw0L3QuNGG0LAg0L7RgtC60YDRi9GC0LAg0LLQv9C10YDQstGL0LUpLCDRgtC+XG4gICAgICBpbkJhc2tldCA9IGZhbHNlOyAvLyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQt9Cw0LTQsNC00LjQvCDQtdC80YMgZmFsc2UgKNC30L3QsNGH0LjRgiwg0L3QsCDQvdC10LPQviDQtdGJ0ZEg0L3QtSDQvdCw0LbQuNC80LDQu9C4KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC10YHRgtGMINGC0LDQutC+0Lkg0Y3Qu9C10LzQtdC90YIsINGC0L5cbiAgICAgIGluQmFza2V0ID0gaW5CYXNrZXQgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBsZXQgdGFza3MgPSBbXG4gICAge1xuICAgICAgZGVzY3JpcHRpb246ICcxJyxcbiAgICAgIGRlbGV0ZWQ6IGZhbHNlLFxuICAgICAgZG9uZTogdHJ1ZSxcbiAgICAgIGhpZGU6IGZhbHNlLFxuICAgICAgb25jaGFuZ2U6IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICBkZXNjcmlwdGlvbjogJzInLFxuICAgICAgZGVsZXRlZDogZmFsc2UsXG4gICAgICBkb25lOiB0cnVlLFxuICAgICAgaGlkZTogZmFsc2UsXG4gICAgICBvbmNoYW5nZTogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIGRlc2NyaXB0aW9uOiAnMycsXG4gICAgICBkZWxldGVkOiBmYWxzZSxcbiAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgaGlkZTogZmFsc2UsXG4gICAgICBvbmNoYW5nZTogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIGRlc2NyaXB0aW9uOiAnNCcsXG4gICAgICBkZWxldGVkOiB0cnVlLFxuICAgICAgZG9uZTogZmFsc2UsXG4gICAgICBoaWRlOiB0cnVlLFxuICAgICAgb25jaGFuZ2U6IGZhbHNlXG4gICAgfVxuICBdO1xuICBsb2FkRnJvbUxvY2FsU3RvcmFnZSgpO1xufSgpKTsiXX0=
