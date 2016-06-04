"use strict";!function(){var a=[],b=angular.module("toDoList",[]);b.value("appValues",{hideToggle:!1,inBasket:!1}),b.factory("saveFactory",["appValues",function(b){return{saveInLocalStorage:function(){localStorage.setItem("tasks",JSON.stringify(a)),localStorage.setItem("hideToggle",b.hideToggle),localStorage.setItem("inBasket",b.inBasket)},loadFromLocalStorage:function(){localStorage.getItem("tasks")&&(a=JSON.parse(localStorage.getItem("tasks")),a.forEach(function(a){a.$$hashKey=void 0})),b.hideToggle=localStorage.getItem("hideToggle"),b.hideToggle?b.hideToggle="true"===b.hideToggle:b.hideToggle=!1,b.inBasket=localStorage.getItem("inBasket"),b.inBasket?b.inBasket="true"===b.inBasket:b.inBasket=!1}}}]),b.directive("currentDate",function(){return{restrict:"E",templateUrl:"current-date.html",controller:function(){this.date=new Date},controllerAs:"dateCtrl"}}),b.directive("controlButtons",["saveFactory","appValues",function(b,c){return{restrict:"E",templateUrl:"control-buttons.html",controller:function(c){b.loadFromLocalStorage(),this.inBasket=c.inBasket,this.hideToggle=c.hideToggle,this.addNewTask=function(c){a.push({description:c,deleted:!1,done:!1,hide:!1,onchange:!1}),b.saveInLocalStorage()},this.toggleDone=function(){this.hideToggle=c.hideToggle=!c.hideToggle,a.forEach(function(a){a.done&&c.hideToggle&&(a.hide=!0),a.done&&!c.hideToggle&&(a.hide=!1)}),b.saveInLocalStorage()},this.toggleDeletedTasks=function(){this.inBasket=c.inBasket=!c.inBasket,a.forEach(function(a){a.hide=!0,c.inBasket&&a.deleted&&(a.hide=!1),!c.inBasket&&!a.deleted&&(a.hide=!1)}),b.saveInLocalStorage()}},controllerAs:"btnCtrl"}}]),b.directive("tasksList",["saveFactory",function(b){return{restrict:"E",templateUrl:"tasks-list.html",controller:function(c){this.tasks=a,this.changeTask=function(a,c){a.onchange=!a.onchange,c&&(a.description=c),b.saveInLocalStorage()},this.toggleDone=function(a){a.done=!a.done,c.hideToggle&&(a.hide=!0),b.saveInLocalStorage()},this.deleteTask=function(a){a.deleted=!0,a.hide=!0,a.done=!1,b.saveInLocalStorage()},this.returnTask=function(a){a.deleted=!1,a.hide=!0,b.saveInLocalStorage()},this.finallyDeleteTask=function(c){if(confirm("Точно удалить задачу?")){for(var d=void 0,e=a.length-1;e>=0;){if(a[e].$$hashKey===c.$$hashKey){d=e;break}e--}a.splice(d,1),b.saveInLocalStorage()}}},controllerAs:"taskCtrl"}}])}();