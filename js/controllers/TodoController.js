app.controller("TodoController", ['$scope', '$window', function ($scope, $window) {
  $scope.todos = [];
  $scope.inputText = "";

  if ($window.localStorage['itemsList']) {
    $scope.todos = angular.fromJson($window.localStorage.getItem('itemsList'));
    console.log('Fetched Items from localStorage', $scope.todos)
  } else {
    // $scope.todos = []; 
    console.log('No localStorage found');
  }

  $scope.addItem = function () {
    // prevent empty entries from being accepted
    if ($scope.inputText.length > 0) {
      //if user typed something , proceed
      $scope.todos.push({
        text: $scope.inputText,
        done: false,
        editing: false
      });
      $window.localStorage.setItem('itemsList', angular.toJson($scope.todos))
      $scope.inputText = "";
    }
  };

  $scope.remaining = function () {
    return $scope.todos.length;
  };

  $scope.completed = function () {
    let count = 0;
    angular.forEach($scope.todos, function (todo) {
      if (todo.done) {
        count++
      }
    })
    return count;
  }

  $scope.toggleDone = function () {
    this.todo.done = !this.todo.done;
    $window.localStorage.setItem('itemsList', angular.toJson($scope.todos))
  }

  $scope.clearCompleted = function () {
    if ($scope.todos.length > 0) {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function (todo) {
        !todo.done && $scope.todos.push(todo);
      });
      $window.localStorage.setItem('itemsList', angular.toJson($scope.todos))

    } else {
      console.log("No items listed yet...")
    }

  };

  $scope.deleteAll = function () {
    $scope.todos.length = 0;
    $window.localStorage.removeItem('itemsList')
  }

  $scope.deleteItem = function () {
    $scope.todos.splice(this.$index, 1);
    $window.localStorage.setItem('itemsList', angular.toJson($scope.todos))
  }

  $scope.updateItem = function () {
    console.log()
    // $window.localStorage.setItem('itemsList', angular.toJson($scope.todos))

  }

  $scope.toggleEdit = function (todo) {
    if (!todo.editing) {
      todo.newText = "";
      todo.editing = true;
      todo.done = false;
      console.log("Edit!", todo)
      // $event.target.previousElementSibling.focus()
    } else {
      todo.editing = false;
      console.log("editing cancelled by user...")
    }
  }


  $scope.saveEdit = function (todo) {
    if (todo.newText !== "" && todo.newText !== todo.text) {
      todo.text = todo.newText;
      todo.editing = false;
      console.log("Saved", todo)
      $window.localStorage.setItem('itemsList', angular.toJson($scope.todos))
    } else {
      todo.editing = false;
      console.log("no changes detected", todo)
    }
  }
}]);