var app = angular.module('app', ['ngRoute']);app.config(['$routeProvider', function ($routeProvider) {
  var page = {
    templateUrl: 'main/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'vm',
    resolve: {
      tasks: ['taskService',
        function(taskService) {
          console.log(taskService.list())
          return taskService.list();
        }
      ]
    }
  };

  $routeProvider
  .when('/', page);
}]);app.controller('CtCtrl', function () {
	console.log('working');

	var self = this;


});app.controller('HomeCtrl', ['tasks', 'taskService', function (tasks, taskService) {
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
}]);(function () {
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
})();app.controller('NtCtrl', ['taskService', function (taskService) {
	var self = this;

	self.task = {
		'title': 'get wine'
	};
	
	self.newTask = function () {
		console.log('yes');
		taskService.addTask(self.task);
	}
}]);

app.factory('taskService', ['$http', '$log',
  function($http, $log) {
    function get(url) {
      return processAjaxPromise($http.get(url));
    }
    function post(url, share) {
      return processAjaxPromise($http.post(url, share));
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

      addTask: function (task) {
        return post('/api/tasks', task);
      }

      // getByShareId: function(shareId) {
      //   return get('/api/res/' + shareId);
      // },

      // getVotes: function(shareId) {
      //   return get('/api/res/' + shareId + '/votes');
      // },

      // addShare: function(share) {
      //   return post('/api/res', share);
      // },

      // deleteShare: function(shareId) {
      //   return remove('/api/res/' + shareId);
      // },

      // upvote: function(shareId) {
      //   return post('/api/res/' + shareId + '/votes', {
      //     vote: 1
      //   });
      // },

      // downvote: function(shareId) {
      //   return post('/api/res/' + shareId + '/votes', {
      //     vote: -1
      //   });
      // },

      // undovote: function(shareId) {
      //   return post('/api/res/' + shareId + '/votes', {
      //     vote: 0
      //   });
      // },

      // listComments: function(shareId) {
      //   return get('/api/res/' + shareId + '/comments');
      // },

      // addComment: function(shareId, comment) {
      //   return post('/api/res/' + shareId + '/comments', comment);
      // },

      // deleteComment: function(shareId, comment) {
      //   return delete('/api/res/' + shareId + '/comments/:id');
      // }
    };
  }
]);
