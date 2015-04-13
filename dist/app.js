var app = angular.module('app', ['ngRoute']);app.config(['$routeProvider',
    function($routeProvider) {
        var page = {
            templateUrl: 'main/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            resolve: {
                tasks: ['taskService',
                    function(taskService) {
                        return taskService.list();
                    }
                ]
            }
        };

        $routeProvider
            .when('/', page);
    }
]);app.controller('CtCtrl', function () {
	console.log('working');

	var self = this;

	console.log('another');

});app.controller('HomeCtrl', ['tasks', 'taskService',
    function(tasks, taskService) {

        var self = this;

        self.tasks = tasks;

        self.task = {};

        self.showNew = false;

        self.showNewTask = function() {
            self.showNew = true;
        }

        self.newTask = function() {
            taskService.addTask(self.task);
            self.tasks.push({
                title: self.task.title,
                status: 0
            });
            self.task = {};
            self.showNew = false;
        }

        self.removeTask = function(id) {
            self.tasks = self.tasks.filter(function(el) {
                return el.task_id !== id;
            });
            taskService.deleteTask(id);
        }

        self.statusUpdate = function(task) {
            var checkbox = $(event.target).parent().find('.checkbox-input');
            var result = $.grep(self.tasks, function(el) {
                if (task.task_id === el.task_id) {
                    if (el.status === 0) {
                        el.status = 1;
                    } else {
                        el.status = 0;
                    }
                }
                return task.task_id === el.task_id;
            });
            var num;
            if (result[0].status === 0) {
                num = 0;
                checkbox.prop('checked', true);
            } else {
                num = 1;
                checkbox.prop('checked', false);
            }
            taskService.updateTask(task.task_id, num);
            checkbox = undefined;
        }

    }
]);(function() {
    app.directive('newTask', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'main/new-task/new-task.html',
            ControllerAs: 'nt',
            Controller: 'NtCtrl'
        };
    });

    app.directive('currentTasks', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'main/current-tasks/current-tasks.html',
            ControllerAs: 'ct',
            Controller: 'CtCtrl'
        };
    });

    app.directive('headerText', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'main/header/header.html',
            ControllerAs: 'ct',
            Controller: 'CtCtrl'
        };
    });
})();app.controller('NtCtrl', ['tasks', 'taskService', function (tasks, taskService) {
	console.log('workinfasg');

	var self = this;

}]);

app.factory('taskService', ['$http', '$log',
    function($http, $log) {
        function get(url) {
            return processAjaxPromise($http.get(url));
        }

        function post(url, share) {
            console.log(url);
            return processAjaxPromise($http.post(url, share));
        }

        function put(url, share) {
            return processAjaxPromise($http.put(url, share));
        }

        function remove(url) {
            return processAjaxPromise($http.delete(url));
        }

        function processAjaxPromise(p) {
            return p.then(function(result) {
                    return result.data;
                })
                .catch(function(error) {
                    $log.log(error);
                });
        }

        return {
            list: function() {
                return get('/api/tasks');
            },

            addTask: function(task) {
                return post('/api/tasks', task);
            },

            deleteTask: function(id) {
                return remove('/api/tasks/' + id);
            },

            updateTask: function(id, status) {
                return post('/api/tasks/' + id + '/' + status);
            }

        };
    }
]);