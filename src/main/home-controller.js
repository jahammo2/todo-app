app.controller('HomeCtrl', ['tasks', 'taskService',
    function(tasks, taskService) {

        var self = this;

        self.tasks = tasks;

        self.task = {};

        self.showNew = false;

        self.showNewTask = function() {
            self.showNew = true;
        }

        self.showMenu = function () {
            var checkbox = $(event.target).parent().parent().parent().parent().parent().find('.home-checkbox');
            if (checkbox.prop('checked')) {
                checkbox.prop('checked', false);
            } else {
                checkbox.prop('checked', true);
            }
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

        self.allTasks = true;
        self.currentTasks = false;
        self.completedTasks = false;

        self.all = function () {
            var checkbox = $(event.target).parent().parent().parent().parent().find('.home-checkbox');
            checkbox.prop('checked', false);
            self.allTasks = true;
            self.currentTasks = false;
            self.completedTasks = false; 
        }

        self.current = function () {
            var checkbox = $(event.target).parent().parent().parent().parent().find('.home-checkbox');
            checkbox.prop('checked', false);
            self.allTasks = false;
            self.currentTasks = true;
            self.completedTasks = false; 
        }

        self.completed = function () {
            var checkbox = $(event.target).parent().parent().parent().parent().find('.home-checkbox');
            checkbox.prop('checked', false);
            self.allTasks = false;
            self.currentTasks = false;
            self.completedTasks = true; 
        }

    }
]);