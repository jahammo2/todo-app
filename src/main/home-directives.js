(function() {
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

    app.directive('taskInfo', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'main/current-tasks/task-info.html',
            ControllerAs: 'ct',
            Controller: 'CtCtrl'
        };
    });

    app.directive('sideBar', function() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'main/side-bar/side-bar.html',
            ControllerAs: 'ct',
            Controller: 'CtCtrl'
        };
    });
})();