app.controller('HomeCtrl', ['tasks', 'taskService', function (tasks, taskService) {
	console.log('working');

	var self = this;

	self.tasks = tasks;
	console.log(tasks);

	self.task = {};

	self.newTask = function () {
		console.log('yes');
		taskService.addTask(self.task);
		self.tasks.push(self.task);
		self.task = {};
	}
}]);