app.controller('NtCtrl', ['taskService', function (taskService) {
	var self = this;

	self.task = {
		'title': 'get wine'
	};
	
	self.newTask = function () {
		console.log('yes');
		taskService.addTask(self.task);
	}
}]);

