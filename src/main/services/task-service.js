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