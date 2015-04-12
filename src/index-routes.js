app.config(['$routeProvider', function ($routeProvider) {
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
}]);