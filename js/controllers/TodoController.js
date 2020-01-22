app.controller("TodoController", function ($scope) {
  $scope.todos = [];

  $scope.addItem = function () {
    $scope.todos.push({
      text: $scope.inputText,
      done: false
    });
    $scope.inputText = "";
  };

  $scope.remaining = function () {
    return $scope.todos.length;
  };

  $scope.clearCompleted = function () {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function (todo) {
      !todo.done && $scope.todos.push(todo);
    });
  };
});
