'use strict';


var TodoApp = angular.module('TodoApp', ['ngResource'])
    .config(function($routeProvider) {
        $routeProvider.when('/',
            {
                controller: ListCtrl,
                templateUrl: 'List.html'
            }).
        when('/new',
        {
            controller: CreateCtrl,
            templateUrl: 'details.html'
        }).
    when('/edit/:editId',
        {
            controller: EditCtrl,
            templateUrl: 'details.html'
        }).
        otherwise({ redirectTo: '/' });
    })
    .directive('greet', function() {
        return {
            template: '<h2> Greetings from {{from}} to my dear {{to}}</h2>',
            controller: function($scope, $element, $attrs) {
                $scope.from = $attrs.from;
                $scope.to = $attrs.greet;
            }
        };
    });


TodoApp.factory('Todo', function($resource) {
    return $resource('/api/Todo/:id', { id: '@id' }, {update: { method:'PUT'}});
});


var CreateCtrl = function($scope, $location, Todo) {
    $scope.save = function() {
        Todo.save($scope.item, function() {
            $location.path('/');
        });
    };

    $scope.action = 'Add';
};

var EditCtrl = function ($scope, $location, $routeParams, Todo) {
    var id = $routeParams.editId;
    $scope.item = Todo.get({ id: id });

    $scope.action = 'Update';

    $scope.save = function() {
        Todo.update({id: id}, $scope.item, function() {
            $location.path('/');
        });
    };
};


var ListCtrl = function($scope, $location, Todo) {
    $scope.test = "testing";

    $scope.sort_order = 'Priority';
    $scope.is_desc = false;
    
    $scope.search = function() {
        Todo.query({
                offset: $scope.offset,
                limit: $scope.limit,
                q: $scope.query
            },
            function (data) {
                $scope.has_more = data.length === 20;
                $scope.todos = $scope.todos.concat(data);
            });
    };

    $scope.delete = function() {
        var id = this.todo.Id;
        Todo.delete({ id: id }, function() {
            $('#todo_' + id).fadeOut();
        });
    };

    $scope.show_more = function() {
        $scope.offset += $scope.limit;
        $scope.search();
    };

    $scope.sort = function(col) {
        if ($scope.sort_order == col) {
            $scope.is_desc = !$scope.is_desc;
        } else {
            $scope.sort_order = col;
            $scope.is_desc = false;
        }
    };

    $scope.do_show = function(desc, col) {
        return (col == $scope.sort_order) && (desc == $scope.is_desc);
    };

    $scope.reset = function() {
        $scope.todos = [];
        $scope.offset = 0;
        $scope.limit = 20;
        $scope.has_more = true;
        $scope.search();
    };

    $scope.reset();
};