app.controller("TodoController", function ($scope, $window) {
  $scope.todos = []

  if ($window.localStorage.length >= 1) {
    console.log(angular.fromJson($window.localStorage.getItem('itemsList')))
  } else { console.log('No localStorage found')}

  $scope.addItem = function () {
    // prevent empty entries from being accepted
    if (!$scope.inputText == '') {
      //if user typed something , proceed
      $scope.todos.push({
        text: $scope.inputText,
        done: false
      });
      $window.localStorage.setItem('itemsList', angular.toJson($scope.todos))
      $scope.inputText = "";
    }
  };

  $scope.remaining = function () {
    return $scope.todos.length;
  };

  $scope.completed = function() {
    let count = 0;
    angular.forEach($scope.todos, function(todo) {
      if (todo.done) {
        count++
      }
    })
    return count;
  }

  $scope.clearCompleted = function () {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function (todo) {
      !todo.done && $scope.todos.push(todo);
    });
  };
});
