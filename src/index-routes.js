app.config(['$routeProvider',
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
]);