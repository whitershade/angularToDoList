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
    statistic: false,
    tasks: [// массив для хранения задач
      //    { description: '1', deleted: false, done: false, hide: false, onchange: false } --> так выглядит объект типа "задача", хранящийся в массиве
    ]
  }).factory('saveFactory', ['appValues', 'test', function (appValues, test) {
    return {
      saveInLocalStorage: function saveInLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(appValues.tasks));
        localStorage.setItem('hideToggle', appValues.hideToggle);
        localStorage.setItem('inBasket', appValues.inBasket);
        localStorage.setItem('statistic', appValues.statistic);
        test.broadcast();
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
        test.broadcast();
      },
      getStatisticValue: function getStatisticValue() {
        appValues.statistic = localStorage.getItem('statistic');
        if (!appValues.statistic) {
          // если в local storage нет hideToggle (страница открыта впервые), то
          appValues.statistic = false; // по умолчанию зададим ему false (значит, на него ещё не нажимали)
        } else {
            // если в local storage есть такой элемент, то
            appValues.statistic = appValues.statistic === 'true' ? true : false; // если записана строка true, то преобразуем её в bool true, иначе в bool false
          }
        return appValues.statistic;
      }
    };
  }]).service('test', function ($rootScope) {
    this.broadcast = function () {
      $rootScope.$broadcast("SendDown", "some data");
    };
  })
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
    $scope.hideShow = $scope.show === false ? 'show statistics' : 'hide statistics';
    $scope.showHideClick = function () {
      appValues.statistic = $scope.show = !$scope.show;
      $scope.hideShow = $scope.show === false ? 'show statistics' : 'hide statistics';
      saveFactory.saveInLocalStorage();
    };
    $rootScope.$on("SendDown", function (evt, data) {
      $scope.updatePie();
    });
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
        responsive: false
      };
    };
  }]);
})();
//# sourceMappingURL=data:application/json;base64,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QUFpQjtBQUMvQixjQUFJLE9BQU8sRUFBWDtBQUNBLGVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLElBQU4sQ0FBVyxRQUFYLENBQW9CLE1BQXhDLEVBQWdELEdBQWhELEVBQXFEO0FBQ25ELGdCQUFJLFVBQVUsTUFBTSxJQUFOLENBQVcsUUFBWCxDQUFvQixDQUFwQixDQUFkO0FBQ0EsaUJBQUssSUFBTCxDQUFVLEVBQVY7QUFDQSxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLFFBQVEsSUFBUixDQUFhLE1BQWpDLEVBQXlDLEdBQXpDLEVBQThDO0FBQzVDLG1CQUFLLElBQUwsQ0FBVSxFQUFWO0FBQ0EsbUJBQUssSUFBTCxDQUFVLE1BQU0sSUFBTixDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsQ0FBVjtBQUNBLG1CQUFLLElBQUwsQ0FBVSxFQUFWO0FBQ0Q7QUFDRCxpQkFBSyxJQUFMLENBQVUsRUFBVjtBQUNEO0FBQ0QsaUJBQU8sS0FBSyxJQUFMLENBQVUsRUFBVixDQUFQO0FBQ0QsU0FqQmM7QUFrQmYsb0JBQVk7QUFsQkcsT0FBakI7QUFvQkQsS0FqREQ7QUFrREQsR0EvRHNCLENBN056QjtBQTZSRCxDQS9SQSxHQUFEIiwiZmlsZSI6ImNvbW1vbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBtYXgtbGVuOiBbXCJlcnJvclwiLCAyMDBdICovXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cbi8qIGVzbGludCBuby11bnVzZWQtZXhwcmVzc2lvbnM6IFtcImVycm9yXCIsIHsgXCJhbGxvd1Nob3J0Q2lyY3VpdFwiOiB0cnVlLCBcImFsbG93VGVybmFyeVwiOiB0cnVlIH1dICovXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBhbmd1bGFyLm1vZHVsZSgndG9Eb0xpc3QnLCBbJ3RjLmNoYXJ0anMnXSkgLy8g0LjQvdC40YbQuNCw0LvQuNC30LjRgNGD0LXQvCBhbmd1bGFyLdC/0YDQuNC70L7QttC10L3QuNC1XG4gICAgLnZhbHVlKCdhcHBWYWx1ZXMnLCB7XG4gICAgICBoaWRlVG9nZ2xlOiBmYWxzZSwgLy8g0YHQutGA0YvQstCw0YLRjCAvINC/0L7QutCw0LfRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LhcbiAgICAgIGluQmFza2V0OiBmYWxzZSwgLy8g0L/QvtC60LDQt9GL0LLQsNGC0YwgLyDRgdC60YDRi9Cy0LDRgtGMINGD0LTQsNC70LXQvdC90YvQtSDQt9Cw0LTQsNGH0LhcbiAgICAgIHN0YXRpc3RpYzogZmFsc2UsXG4gICAgICB0YXNrczogWyAvLyDQvNCw0YHRgdC40LIg0LTQu9GPINGF0YDQsNC90LXQvdC40Y8g0LfQsNC00LDRh1xuICAgICAgICAvLyAgICB7IGRlc2NyaXB0aW9uOiAnMScsIGRlbGV0ZWQ6IGZhbHNlLCBkb25lOiBmYWxzZSwgaGlkZTogZmFsc2UsIG9uY2hhbmdlOiBmYWxzZSB9IC0tPiDRgtCw0Log0LLRi9Cz0LvRj9C00LjRgiDQvtCx0YrQtdC60YIg0YLQuNC/0LAgXCLQt9Cw0LTQsNGH0LBcIiwg0YXRgNCw0L3Rj9GJ0LjQudGB0Y8g0LIg0LzQsNGB0YHQuNCy0LVcbiAgICAgIF1cbiAgICB9KVxuICAgIC5mYWN0b3J5KCdzYXZlRmFjdG9yeScsIFsnYXBwVmFsdWVzJywgJ3Rlc3QnLCBmdW5jdGlvbiAoYXBwVmFsdWVzLCB0ZXN0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzYXZlSW5Mb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza3MnLCBKU09OLnN0cmluZ2lmeShhcHBWYWx1ZXMudGFza3MpKTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlkZVRvZ2dsZScsIGFwcFZhbHVlcy5oaWRlVG9nZ2xlKTtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5CYXNrZXQnLCBhcHBWYWx1ZXMuaW5CYXNrZXQpO1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzdGF0aXN0aWMnLCBhcHBWYWx1ZXMuc3RhdGlzdGljKTtcbiAgICAgICAgICB0ZXN0LmJyb2FkY2FzdCgpO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkRnJvbUxvY2FsU3RvcmFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSkgeyAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC10YHRgtGMINC60LvRjtGHIHRhc2tzXG4gICAgICAgICAgICBhcHBWYWx1ZXMudGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKTsgLy8g0L/QvtC70YPRh9Cw0LXQvCDQv9C+INC60LvRjtGH0YMg0LzQsNGB0YHQuNCyXG4gICAgICAgICAgICBhcHBWYWx1ZXMudGFza3MuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAvLyDQtNC70Y8g0LrQsNC20LTQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQsiDQvNCw0YHRgdC40LLQtSB0YXNrc1xuICAgICAgICAgICAgICBpdGVtLiQkaGFzaEtleSA9IHVuZGVmaW5lZDsgLy8g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10LwgaGFzaEtleSA9IHVuZGVmaW5lZCAo0L3QtdC+0LHRhdC+0LTQuNC80L4g0LTQu9GPINC40LfQsdC10LbQsNC90LjQtSDQutC+0L3RhNC70LjQutGC0L7QsiDQv9GA0Lgg0LLRi9Cy0L7QtNC1INC30LDQtNCw0YcpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXBwVmFsdWVzLmhpZGVUb2dnbGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlkZVRvZ2dsZScpOyAvLyDQv9GL0YLQsNC10LzRgdGPINGB0YfQuNGC0LDRgtGMINC30L3QsNGH0LXQvdC40LUg0LTQu9GPIGhpZGUgVG9nZ2xlINC40LcgTG9jYWwgU3RvcmFnZVxuICAgICAgICAgIGlmICghYXBwVmFsdWVzLmhpZGVUb2dnbGUpIHtcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0L3QtdGCIGhpZGVUb2dnbGUgKNGB0YLRgNCw0L3QuNGG0LAg0L7RgtC60YDRi9GC0LAg0LLQv9C10YDQstGL0LUpLCDRgtC+XG4gICAgICAgICAgICBhcHBWYWx1ZXMuaGlkZVRvZ2dsZSA9IGZhbHNlOyAvLyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQt9Cw0LTQsNC00LjQvCDQtdC80YMgZmFsc2UgKNC30L3QsNGH0LjRgiwg0L3QsCDQvdC10LPQviDQtdGJ0ZEg0L3QtSDQvdCw0LbQuNC80LDQu9C4KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC10YHRgtGMINGC0LDQutC+0Lkg0Y3Qu9C10LzQtdC90YIsINGC0L5cbiAgICAgICAgICAgIGFwcFZhbHVlcy5oaWRlVG9nZ2xlID0gYXBwVmFsdWVzLmhpZGVUb2dnbGUgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTsgLy8g0LXRgdC70Lgg0LfQsNC/0LjRgdCw0L3QsCDRgdGC0YDQvtC60LAgdHJ1ZSwg0YLQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10ZEg0LIgYm9vbCB0cnVlLCDQuNC90LDRh9C1INCyIGJvb2wgZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgYXBwVmFsdWVzLmluQmFza2V0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2luQmFza2V0Jyk7XG4gICAgICAgICAgaWYgKCFhcHBWYWx1ZXMuaW5CYXNrZXQpIHtcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0L3QtdGCIGhpZGVUb2dnbGUgKNGB0YLRgNCw0L3QuNGG0LAg0L7RgtC60YDRi9GC0LAg0LLQv9C10YDQstGL0LUpLCDRgtC+XG4gICAgICAgICAgICBhcHBWYWx1ZXMuaW5CYXNrZXQgPSBmYWxzZTsgLy8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LfQsNC00LDQtNC40Lwg0LXQvNGDIGZhbHNlICjQt9C90LDRh9C40YIsINC90LAg0L3QtdCz0L4g0LXRidGRINC90LUg0L3QsNC20LjQvNCw0LvQuClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g0LXRgdC70Lgg0LIgbG9jYWwgc3RvcmFnZSDQtdGB0YLRjCDRgtCw0LrQvtC5INGN0LvQtdC80LXQvdGCLCDRgtC+XG4gICAgICAgICAgICBhcHBWYWx1ZXMuaW5CYXNrZXQgPSBhcHBWYWx1ZXMuaW5CYXNrZXQgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTsgLy8g0LXRgdC70Lgg0LfQsNC/0LjRgdCw0L3QsCDRgdGC0YDQvtC60LAgdHJ1ZSwg0YLQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10ZEg0LIgYm9vbCB0cnVlLCDQuNC90LDRh9C1INCyIGJvb2wgZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgdGVzdC5icm9hZGNhc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U3RhdGlzdGljVmFsdWU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgYXBwVmFsdWVzLnN0YXRpc3RpYyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdGF0aXN0aWMnKTtcbiAgICAgICAgICBpZiAoIWFwcFZhbHVlcy5zdGF0aXN0aWMpIHtcbiAgICAgICAgICAgIC8vINC10YHQu9C4INCyIGxvY2FsIHN0b3JhZ2Ug0L3QtdGCIGhpZGVUb2dnbGUgKNGB0YLRgNCw0L3QuNGG0LAg0L7RgtC60YDRi9GC0LAg0LLQv9C10YDQstGL0LUpLCDRgtC+XG4gICAgICAgICAgICBhcHBWYWx1ZXMuc3RhdGlzdGljICA9IGZhbHNlOyAvLyDQv9C+INGD0LzQvtC70YfQsNC90LjRjiDQt9Cw0LTQsNC00LjQvCDQtdC80YMgZmFsc2UgKNC30L3QsNGH0LjRgiwg0L3QsCDQvdC10LPQviDQtdGJ0ZEg0L3QtSDQvdCw0LbQuNC80LDQu9C4KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDQtdGB0LvQuCDQsiBsb2NhbCBzdG9yYWdlINC10YHRgtGMINGC0LDQutC+0Lkg0Y3Qu9C10LzQtdC90YIsINGC0L5cbiAgICAgICAgICAgIGFwcFZhbHVlcy5zdGF0aXN0aWMgID0gYXBwVmFsdWVzLnN0YXRpc3RpYyAgPT09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTsgLy8g0LXRgdC70Lgg0LfQsNC/0LjRgdCw0L3QsCDRgdGC0YDQvtC60LAgdHJ1ZSwg0YLQviDQv9GA0LXQvtCx0YDQsNC30YPQtdC8INC10ZEg0LIgYm9vbCB0cnVlLCDQuNC90LDRh9C1INCyIGJvb2wgZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFwcFZhbHVlcy5zdGF0aXN0aWM7XG4gICAgICAgIH1cbiAgICAgIH07XG4gIH1dKVxuICAgIC5zZXJ2aWNlKCd0ZXN0JywgZnVuY3Rpb24gKCRyb290U2NvcGUpIHtcbiAgICAgIHRoaXMuYnJvYWRjYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoXCJTZW5kRG93blwiLCBcInNvbWUgZGF0YVwiKTtcbiAgICAgIH07XG4gICAgfSlcbiAgICAvKiDQlNC40YDQtdC60YLQuNCy0LAg0LTQu9GPINCy0YvQstC+0LTQsCDRgtC10LrRg9GJ0LXQuSDQtNCw0YLRiyAqL1xuICAgIC5kaXJlY3RpdmUoJ2N1cnJlbnREYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJywgLy8gb25seSBtYXRjaGVzIGVsZW1lbnQgbmFtZVxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2N1cnJlbnQtZGF0ZS5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7IC8vINC30LDQtNCw0LXQvCDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICAgICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKCk7IC8vINC/0L7Qu9GD0YfQsNC10Lwg0YLQtdC60YPRidGD0Y4g0LTQsNGC0YNcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlckFzOiAnZGF0ZUN0cmwnIC8vINGD0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INC/0YHQtdCy0LTQvtC90LjQvCDQtNC70Y8g0LrQvtC90YLRgNC+0LvQu9C10YDQsFxuICAgICAgfTtcbiAgICB9KVxuICAgIC8qINCU0LjRgNC10LrRgtC40LLQsCDQtNC70Y8g0LrQvdC+0L/QvtC6INGD0L/RgNCy0LvQtdC90LjRjyAqL1xuICAgIC5kaXJlY3RpdmUoJ2NvbnRyb2xCdXR0b25zJywgWydzYXZlRmFjdG9yeScsICdhcHBWYWx1ZXMnLCBmdW5jdGlvbiAoc2F2ZUZhY3RvcnksIGFwcFZhbHVlcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJywgLy8gb25seSBtYXRjaGVzIGVsZW1lbnQgbmFtZVxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbnRyb2wtYnV0dG9ucy5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7IC8vINC30LDQtNCw0LXQvCDQutC+0L3RgtGA0L7Qu9C70LXRgFxuICAgICAgICAgIHNhdmVGYWN0b3J5LmxvYWRGcm9tTG9jYWxTdG9yYWdlKCk7XG4gICAgICAgICAgdGhpcy5pbkJhc2tldCA9IGFwcFZhbHVlcy5pbkJhc2tldDsgLy8g0LfQsNC00LDQtdC8INGC0LXQutGD0YnQtdC1INC30L3QsNGH0LXQvdC40LUgaW5CYXNrZXRcbiAgICAgICAgICB0aGlzLmhpZGVUb2dnbGUgPSBhcHBWYWx1ZXMuaGlkZVRvZ2dsZTsgLy8g0LfQsNC00LDQtdC8INGC0LXQutGD0YnQtdC1INC30L3QsNGH0LXQvdC40LUgaGlkZVRvZ2dsZVxuICAgICAgICAgIHRoaXMuYWRkTmV3VGFzayA9IGZ1bmN0aW9uIChkZXNjcikgeyAvLyDQtNC+0LHQsNCy0LvRj9C10Lwg0L3QvtCy0YPRjiDQt9Cw0LTQsNGH0YMsINC90LAg0LLRhdC+0LQg0L/QvtC00LDQtdGC0YHRjyDRgdC+0LTQtdGA0LbQsNC10L3QuNC1INC30LDQtNCw0YfQuFxuICAgICAgICAgICAgYXBwVmFsdWVzLnRhc2tzLnB1c2goeyAvLyDQsiDQvNCw0YHRgdC40LIg0LfQsNC00LDRhyDQtNC+0LHQsNCy0LvRj9C10YLRgdGPINC90L7QstGL0Lkg0L7QsdGK0LXQutGCINGBXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjciwgLy/Qv9C+0LvRg9GH0LXQvdC90YvQvCDQv9GA0Lgg0LLRi9C30L7QstC1INGE0YPQvdC60YbQuNC4INC+0L/QuNGB0LDQvdC40LXQvFxuICAgICAgICAgICAgICBkZWxldGVkOiBmYWxzZSwgLy8g0LfQsNC00LDRh9CwINC90LUg0YPQtNCw0LvQtdC90LBcbiAgICAgICAgICAgICAgZG9uZTogZmFsc2UsIC8vINC90LUg0LLRi9C/0L7Qu9C90LXQvdCwXG4gICAgICAgICAgICAgIGhpZGU6IGZhbHNlLCAvLyDQvdC1INGB0LrRgNGL0YLQsFxuICAgICAgICAgICAgICBvbmNoYW5nZTogZmFsc2UgLy8g0L3QtSDQuNC30LzQtdC90Y/QtdGC0YHRjyDQsiDRgtC10LrRg9GJ0LjQuSDQvNC+0LzQtdC90YJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdC40YLRjCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy50b2dnbGVEb25lID0gZnVuY3Rpb24gKCkgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/QtdGA0LXQutC70Y7Rh9C10L3QuNGPIGRvbmUvdW5kb25lINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgdGhpcy5oaWRlVG9nZ2xlID0gYXBwVmFsdWVzLmhpZGVUb2dnbGUgPSAhYXBwVmFsdWVzLmhpZGVUb2dnbGU7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10LwgZG9uZS91bmRvbmUsINCz0LvQvtCx0LDQu9GM0L3Rg9GOINC4INCy0L3Rg9GC0YDQuCDQutC+0YLRgNC+0LvQu9C10YDQsFxuICAgICAgICAgICAgYXBwVmFsdWVzLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHsgLy8g0LTQu9GPINC60LDQttC00L7QuSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgICAgaXRlbS5kb25lICYmIGFwcFZhbHVlcy5oaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSB0cnVlKTsgLy8g0LXRgdC70Lgg0LfQsNC00LDRh9CwINGB0LTQtdC70LDQvdCwLCDQuCDQstGL0LHRgNCw0L3QviDRgdC60YDRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LgsINGC0L4g0YHQutGA0YvQstCw0LXQvFxuICAgICAgICAgICAgICBpdGVtLmRvbmUgJiYgIWFwcFZhbHVlcy5oaWRlVG9nZ2xlICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7IC8vINC10YHQuNC7INC30LDQtNCw0YfQsCDRgdC00LXQu9Cw0L3QsCwg0Lgg0LLRi9Cx0YDQsNC90L4g0L/QvtC60LDQt9GL0LLQsNGC0Ywg0YHQtNC10LvQsNC90L3Ri9C1INC30LDQtNCw0YfQuCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90LjRgtGMINC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlIFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy50b2dnbGVEZWxldGVkVGFza3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmluQmFza2V0ID0gYXBwVmFsdWVzLmluQmFza2V0ID0gIWFwcFZhbHVlcy5pbkJhc2tldDsgLy8g0L/QtdGA0LXQutC70Y7Rh9Cw0LXQvCDQsiDQutC+0YDQt9C40L3QtS/QvdC1INCyINC60L7RgNC30LjQvdC1LCDQs9C70L7QsdCw0LvRjNC90YPRjiDQuCDQstC90YPRgtGA0Lgg0LrQvtGC0YDQvtC70LvQtdGA0LBcbiAgICAgICAgICAgIGFwcFZhbHVlcy50YXNrcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7IC8vINC00LvRjyDQutCw0LbQtNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICAgIGl0ZW0uaGlkZSA9IHRydWU7IC8vINGB0LrRgNGL0LLQsNC10Lwg0LrQsNC20LTRg9GOINC30LDQtNCw0YfRg1xuICAgICAgICAgICAgICBhcHBWYWx1ZXMuaW5CYXNrZXQgJiYgaXRlbS5kZWxldGVkICYmIChpdGVtLmhpZGUgPSBmYWxzZSk7IC8vINC10YHQu9C4INCyINC00LDQvdC90YvQuSDQvNC+0LzQtdC90YIg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINC90LDRhdC+0LTQuNGC0YHRjyDQsiDQutC+0YDQt9C40L3QtSwg0Lgg0LfQsNC00LDRh9CwINGD0LTQsNC70LXQvdCwLCDRgtC+INC/0L7QutCw0LfRi9Cy0LDQtdC8INC30LDQtNCw0YfRg1xuICAgICAgICAgICAgICAhYXBwVmFsdWVzLmluQmFza2V0ICYmICFpdGVtLmRlbGV0ZWQgJiYgKGl0ZW0uaGlkZSA9IGZhbHNlKTsgLy8g0LXRgdC70Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINC90LUg0L3QsNGF0L7QtNC40YLRgdGPINCyINC60L7RgNC30LjQvdC1LCDQuCDQt9Cw0LTQsNGH0LAg0L3QtSDRg9C00LDQu9C10L3QsCwg0YLQviDQv9C+0LrQsNC30YvQstCw0LXQvCDQtdGRXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyQXM6ICdidG5DdHJsJyAvLyDQv9GB0LXQstC00L7QvdC40Lwg0LTQu9GPINC60L7QvdGC0YDQvtC70LvQtdGA0LBcbiAgICAgIH07XG4gIH1dKVxuICAgIC8qINCU0LjRgNC10LrRgtC40LLQsCDQtNC70Y8g0YHQv9C40YHQutCwINC30LDQtNCw0YcgKi9cbiAgICAuZGlyZWN0aXZlKCd0YXNrc0xpc3QnLCBbJ3NhdmVGYWN0b3J5JywgJ2FwcFZhbHVlcycsIGZ1bmN0aW9uIChzYXZlRmFjdG9yeSwgYXBwVmFsdWVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLCAvLyBvbmx5IG1hdGNoZXMgZWxlbWVudCBuYW1lXG4gICAgICAgIHRlbXBsYXRlVXJsOiAndGFza3MtbGlzdC5odG1sJywgLy8g0LPQtNC1INGF0YDQsNC90LjRgtGB0Y8gaHRtbFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy50YXNrcyA9IGFwcFZhbHVlcy50YXNrczsgLy8g0L/QvtC70YPRh9Cw0LXQvCDRgdC/0LjRgdC+0Log0LfQsNC00LDRh1xuICAgICAgICAgIHRoaXMuY2hhbmdlVGFzayA9IGZ1bmN0aW9uICh0YXNrLCBkZXNjcmlwdGlvbikgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LjQt9C80LXQvdC10L3QuNGPINGC0LXQutGD0YnQtdCz0L4g0YHQvtC00LXRgNC20LDQvdC40Y8g0LfQsNC00LDRh9C4XG4gICAgICAgICAgICB0YXNrLm9uY2hhbmdlID0gIXRhc2sub25jaGFuZ2U7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10Lwgb25jaGFuZ2Ug0LTQu9GPINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgZGVzY3JpcHRpb24gJiYgKHRhc2suZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbik7IC8vINC10YHQu9C4INCyINGE0YPQvdC60YbQuNGOINC/0LXRgNC10LTQsNC90L4g0YHQvtC00LXRgNCw0LbQsNC10L3QuNC1INC00LvRjyDQt9Cw0L/QuNGB0Lgg0LIg0LfQsNC00LDRh9GDLCDRgtC+INC30LDQv9C40YHRi9Cy0LDQtdC8INC10LPQvlxuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy50b2dnbGVEb25lID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC40LfQvNC10L3QtdC90LjRjyBkb25lL3VuZG9uZSDQt9Cw0LTQsNGH0LhcbiAgICAgICAgICAgIHRhc2suZG9uZSA9ICF0YXNrLmRvbmU7IC8vINC/0LXRgNC10LrQu9GO0YfQsNC10LwgZG9uZS91bmRvbmUg0LTQu9GPINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgYXBwVmFsdWVzLmhpZGVUb2dnbGUgJiYgKHRhc2suaGlkZSA9IHRydWUpOyAvLyDQtdGB0LvQuCDQstGL0LHRgNCw0L3QviDRgdC60YDRi9Cy0LDRgtGMINGB0LTQtdC70LDQvdC90YvQtSDQt9Cw0LTQsNGH0LgsINGC0L4g0YHQutGA0YvQstCw0LXQvCDRgtC+0LvRjNC60L4g0YfRgtC+INC+0YLQvNC10YfQtdC90L3Rg9GOINC30LDQtNCw0YfRg1xuICAgICAgICAgICAgc2F2ZUZhY3Rvcnkuc2F2ZUluTG9jYWxTdG9yYWdlKCk7IC8vINGB0L7RhdGA0LDQvdGP0LXQvCDQuNC30LzQtdC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5kZWxldGVUYXNrID0gZnVuY3Rpb24gKHRhc2spIHsgLy8g0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0LXRgNC10LzQtdGJ0LXQvdC40Y8g0LfQsNC00LDRh9C4INCyINC60L7RgNC30LjQvdGDXG4gICAgICAgICAgICB0YXNrLmRlbGV0ZWQgPSB0cnVlOyAvLyDQt9Cw0LTQsNGH0LAg0Y/QstC70Y/QtdGC0YHRjyDRg9C00LDQu9C10L3QvdC+0LlcbiAgICAgICAgICAgIHRhc2suaGlkZSA9IHRydWU7IC8vINGB0LrRgNGL0YLQvtC5XG4gICAgICAgICAgICB0YXNrLmRvbmUgPSBmYWxzZTsgLy8g0Lgg0L3QtSDQstGL0L/QvtC70L3QtdC90L3QvtC5XG4gICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC10L3QtdC90LjRjyDQsiBsb2NhbCBzdG9yYWdlXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnJldHVyblRhc2sgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0LLQvtC30LLRgNCw0YnQtdC90Lgg0LfQsNC00LDRh9C4INC40Lcg0LrQvtGA0LfQuNC90YtcbiAgICAgICAgICAgIHRhc2suZGVsZXRlZCA9IGZhbHNlOyAvLyDQt9Cw0LTQsNGH0LAg0Y/QstC70Y/QtdGC0YHRjyDQvdC1INGD0LTQsNC70LXQvdC90L7QuVxuICAgICAgICAgICAgdGFzay5oaWRlID0gdHJ1ZTsgLy8g0YHQutGA0YvQstCw0LXQvCDQtdGRINC40Lcg0LrQvtGA0LfQuNC90YtcbiAgICAgICAgICAgIHNhdmVGYWN0b3J5LnNhdmVJbkxvY2FsU3RvcmFnZSgpOyAvLyDRgdC+0YXRgNCw0L3Rj9C10Lwg0LjQt9C80LXQvdC10L3QuNGPINCyIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuZmluYWxseURlbGV0ZVRhc2sgPSBmdW5jdGlvbiAodGFzaykgeyAvLyDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L7QutC+0L3Rh9Cw0YLQtdC70YzQvdC+0LPQviDRg9C00LDQu9C10L3QuNGPINC30LDQtNCw0YfQuFxuICAgICAgICAgICAgaWYgKGNvbmZpcm0oJ9Ci0L7Rh9C90L4g0YPQtNCw0LvQuNGC0Ywg0LfQsNC00LDRh9GDPycpKSB7IC8vINC30LDQv9GA0L7RgSDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y4g0YLQvtGH0L3QviDQu9C4INC+0L0g0YXQvtGH0LXRgiDRg9C00LDQu9C40YLRjCDQt9Cw0LTQsNGH0YMsINC10YHQu9C4INC00LAsINGC0L4g0L/QtdGA0LXRhdC+0LTQuNC8INC6INGD0LTQsNC70LXQvdC40Y5cbiAgICAgICAgICAgICAgbGV0IGluZGV4OyAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQuNC90LTQtdC60YHQsFxuICAgICAgICAgICAgICBsZXQgaSA9IGFwcFZhbHVlcy50YXNrcy5sZW5ndGggLSAxOyAvLyDQv9C10YDQtdC80LXQvdC90LDRjyDQtNC70Y8g0YXRgNCw0L3QtdC90LjRjyDQtNC70LjQvdGLINC80LDRgdGB0LjQstCwIC0xXG4gICAgICAgICAgICAgIHdoaWxlIChpID49IDApIHsgLy8g0L/QvtC60LAg0LIg0LzQsNGB0YHQuNCy0LUg0LXRidGRINC10YHRgtGMINGN0LvQtdC80LXQvdGC0YtcbiAgICAgICAgICAgICAgICBpZiAoYXBwVmFsdWVzLnRhc2tzW2ldLiQkaGFzaEtleSA9PT0gdGFzay4kJGhhc2hLZXkpIHsgLy8g0LXRgdC70LggaGFzaEtleSDRjdC70LXQvNC10L3RgtCwINGA0LDQstC10L0gaGFza0tleSDRg9C00LDQu9GP0LXQvNC+0Lkg0LfQsNC00LDRh9C4XG4gICAgICAgICAgICAgICAgICBpbmRleCA9IGk7IC8vINGC0L4g0YHQvtGF0YDQsNC90Y/QtdC8INC40L3QtNC10LrRgSDQt9Cw0LTQsNGH0Lgg0LIg0LzQsNGB0YHQuNCy0LVcbiAgICAgICAgICAgICAgICAgIGJyZWFrOyAvLyDQv9GA0LXQutGA0LDRidCw0LXQvCDQstGL0L/QvtC70L3QtdC90LjQtSDRhtC40LrQu9CwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGktLTsgLy8g0LTQtdC70LDQtdC8INGB0LvQtdC00YPRjtGJ0LjQuSDRiNCw0LNcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhcHBWYWx1ZXMudGFza3Muc3BsaWNlKGluZGV4LCAxKTsgLy8g0YPQtNCw0LvRj9C10Lwg0LfQsNC00LDRh9GDINC40Lcg0LzQsNGB0YHQuNCy0LAg0LfQsNC00LDRh1xuICAgICAgICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTsgLy8g0YHQvtGF0YDQsNC90Y/QtdC8INC40LfQvNC90LXQvdC40Y8g0LIgbG9jYWwgc3RvcmFnZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3Rhc2tDdHJsJyAvLyDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDQv9GB0LXQstC00L7QvdC40Lwg0LTQu9GPINC60L7QvdGC0YDQvtC70LvQtdGA0LBcbiAgICAgIH07XG4gIH1dKVxuICAgLyogLmRpcmVjdGl2ZSgncGllVGFza3MnLCBbJyRzY29wZScsICdhcHBWYWx1ZXMnLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uICgkc2NvcGUsIGFwcFZhbHVlcywgJHJvb3RTY29wZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJ1Y3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwaWUtdGFza3MuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRvbihcIlNlbmREb3duXCIsIGZ1bmN0aW9uIChldnQsIGRhdGEpIHtcbiAgICAgICAgICAgICRzY29wZS51cGRhdGVQaWUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkc2NvcGUuc2hvdyA9IHRydWU7XG4gICAgICAgICAgJHNjb3BlLnVwZGF0ZVBpZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBkb25lVGFza3MgPSAwO1xuICAgICAgICAgICAgbGV0IGRlbGV0ZWRUYXNrcyA9IDA7XG4gICAgICAgICAgICBsZXQgdW5kb25lVGFza3MgPSAwO1xuICAgICAgICAgICAgYXBwVmFsdWVzLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgaXRlbS5kb25lICYmIChkb25lVGFza3MgKz0gMSk7XG4gICAgICAgICAgICAgIGl0ZW0uZGVsZXRlZCAmJiAoZGVsZXRlZFRhc2tzICs9IDEpO1xuICAgICAgICAgICAgICAhaXRlbS5kZWxldGVkICYmICFpdGVtLmRvbmUgJiYgKHVuZG9uZVRhc2tzICs9IDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUuZGF0YSA9IHtcbiAgICAgICAgICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiTXkgRmlyc3QgZGF0YXNldFwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZWRUYXNrcyxcbiAgICAgICAgICAgICAgICAgIGRvbmVUYXNrcyxcbiAgICAgICAgICAgICAgICAgIHVuZG9uZVRhc2tzXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogW1xuICAgICAgICAgICAgICAgICAgXCIjRjc0NjRBXCIsXG4gICAgICAgICAgICAgICAgICBcIiM0NkJGQkRcIixcbiAgICAgICAgICAgICAgICAgIFwiI0ZEQjQ1Q1wiXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgbGFiZWxzOiBbXG4gICAgICAgICAgICAgICAgICBcIkRlbGV0ZWQgdGFza3NcIixcbiAgICAgICAgICAgICAgICAgIFwiRG9uZSB0YXNrc1wiLFxuICAgICAgICAgICAgICAgICAgXCJVbmRvbmUgdGFza3NcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkc2NvcGUub3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsZWdlbmRDYWxsYmFjazogZnVuY3Rpb24gKGNoYXJ0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJ0LmRhdGEuZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIHZhciBkYXRhc2V0ID0gY2hhcnQuZGF0YS5kYXRhc2V0c1tpXTtcbiAgICAgICAgICAgICAgICAgIHRleHQucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFzZXQuZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0LnB1c2goJycpO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0LnB1c2goY2hhcnQuZGF0YS5sYWJlbHNbal0pO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0LnB1c2goJycpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdGV4dC5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQuam9pbihcIlwiKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1dKSAqL1xuICAgIC5jb250cm9sbGVyKCdQaWVDdHJsJywgWyckc2NvcGUnLCAnYXBwVmFsdWVzJywgJyRyb290U2NvcGUnLCAnc2F2ZUZhY3RvcnknLCBmdW5jdGlvbiAoJHNjb3BlLCBhcHBWYWx1ZXMsICRyb290U2NvcGUsIHNhdmVGYWN0b3J5KSB7XG4gICAgICBzYXZlRmFjdG9yeS5sb2FkRnJvbUxvY2FsU3RvcmFnZSgpO1xuICAgICAgJHNjb3BlLnNob3cgPSBzYXZlRmFjdG9yeS5nZXRTdGF0aXN0aWNWYWx1ZSgpO1xuICAgICAgJHNjb3BlLmJ1dHRvblNob3cgPSBhcHBWYWx1ZXMudGFza3MubGVuZ3RoID4gMDtcbiAgICAgICRzY29wZS5oaWRlU2hvdz0gJHNjb3BlLnNob3cgPT09IGZhbHNlID8gJ3Nob3cgc3RhdGlzdGljcycgOiAnaGlkZSBzdGF0aXN0aWNzJztcbiAgICAgICRzY29wZS5zaG93SGlkZUNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGFwcFZhbHVlcy5zdGF0aXN0aWMgPSAkc2NvcGUuc2hvdyA9ICEkc2NvcGUuc2hvdztcbiAgICAgICAgJHNjb3BlLmhpZGVTaG93PSAkc2NvcGUuc2hvdyA9PT0gZmFsc2UgPyAnc2hvdyBzdGF0aXN0aWNzJyA6ICdoaWRlIHN0YXRpc3RpY3MnO1xuICAgICAgICBzYXZlRmFjdG9yeS5zYXZlSW5Mb2NhbFN0b3JhZ2UoKTtcbiAgICAgIH1cbiAgICAgICRyb290U2NvcGUuJG9uKFwiU2VuZERvd25cIiwgZnVuY3Rpb24gKGV2dCwgZGF0YSkge1xuICAgICAgICAkc2NvcGUudXBkYXRlUGllKCk7XG4gICAgICB9KTtcbiAgICAgICRzY29wZS51cGRhdGVQaWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBkb25lVGFza3MgPSAwO1xuICAgICAgICBsZXQgZGVsZXRlZFRhc2tzID0gMDtcbiAgICAgICAgbGV0IHVuZG9uZVRhc2tzID0gMDtcbiAgICAgICAgYXBwVmFsdWVzLnRhc2tzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICBpdGVtLmRvbmUgJiYgKGRvbmVUYXNrcyArPSAxKTtcbiAgICAgICAgICBpdGVtLmRlbGV0ZWQgJiYgKGRlbGV0ZWRUYXNrcyArPSAxKTtcbiAgICAgICAgICAhaXRlbS5kZWxldGVkICYmICFpdGVtLmRvbmUgJiYgKHVuZG9uZVRhc2tzICs9IDEpO1xuICAgICAgICB9KTtcbiAgICAgICAgJHNjb3BlLmRhdGEgPSB7XG4gICAgICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgICAgICBsYWJlbDogXCJNeSBGaXJzdCBkYXRhc2V0XCIsXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgZGVsZXRlZFRhc2tzLFxuICAgICAgICAgIGRvbmVUYXNrcyxcbiAgICAgICAgICB1bmRvbmVUYXNrc1xuICAgICAgICBdLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBbXG4gICAgICAgICAgXCIjRjc0NjRBXCIsXG4gICAgICAgICAgXCIjNDZCRkJEXCIsXG4gICAgICAgICAgXCIjRkRCNDVDXCJcbiAgICAgICAgXVxuICAgICAgfV0sXG4gICAgICAgICAgbGFiZWxzOiBbXG4gICAgICAgIFwiRGVsZXRlZCB0YXNrc1wiLFxuICAgICAgICBcIkRvbmUgdGFza3NcIixcbiAgICAgICAgXCJVbmRvbmUgdGFza3NcIlxuICAgICAgXVxuICAgICAgICB9O1xuICAgICAgICAkc2NvcGUub3B0aW9ucyA9IHtcbiAgICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGxlZ2VuZENhbGxiYWNrOiBmdW5jdGlvbiAoY2hhcnQpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJ0LmRhdGEuZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGFzZXQgPSBjaGFydC5kYXRhLmRhdGFzZXRzW2ldO1xuICAgICAgICAgICAgICB0ZXh0LnB1c2goJycpO1xuICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFzZXQuZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHRleHQucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgdGV4dC5wdXNoKGNoYXJ0LmRhdGEubGFiZWxzW2pdKTtcbiAgICAgICAgICAgICAgICB0ZXh0LnB1c2goJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRleHQucHVzaCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGV4dC5qb2luKFwiXCIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVzcG9uc2l2ZTogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfV0pO1xufSgpKTsiXX0=
