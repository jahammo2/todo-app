app.controller('HomeCtrl', ['tasks', 'taskService',
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
]);