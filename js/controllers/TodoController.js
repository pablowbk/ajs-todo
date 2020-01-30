app.controller("TodoController", ['$scope', '$window', 'ngNotify', function ($scope, $window, ngNotify) {
  $scope.todos = [];
  $scope.inputText = "";

  if ($window.localStorage['itemsList']) {
    $scope.todos = angular.fromJson($window.localStorage.getItem('itemsList'));
    console.log('Fetched Items from localStorage', $scope.todos)
  } else {
    // $scope.todos = []; 
    console.log('No localStorage found');
    ngNotify.set('No previous list items found. Starting a new one!')
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
    if ($scope.completed() === $scope.todos.length) {
      ngNotify.set('All movies watched!')
    }
  }

  $scope.clearCompleted = function () {
    if ($scope.todos.length > 0 && $scope.completed() > 0) {
      var oldTodos = $scope.todos;
      $scope.todos = [];
      angular.forEach(oldTodos, function (todo) {
        !todo.done && $scope.todos.push(todo);
      });
      $window.localStorage.setItem('itemsList', angular.toJson($scope.todos));

    } else {
      console.log("No items listed yet...");
      ngNotify.set('Nothing to be cleared. Check your selection.');
    }

  };

  $scope.deleteAll = function () {
    if ($scope.todos.length > 0) {
      $scope.todos.length = 0;
      $window.localStorage.removeItem('itemsList');
      ngNotify.set('List cleared!');
    } else {
      ngNotify.set('Oops, no items listed yet!');
    }
  }

  $scope.deleteItem = function () {
    $scope.todos.splice(this.$index, 1);
    console.log($scope.todos) 
  }

  $scope.toggleEdit = function (todo) {
    if (!todo.editing) {
      todo.newText = "";
      todo.editing = true;
      todo.done = false;
      console.log("Edit!", todo)
    } else {
      todo.editing = false;
      console.log("editing cancelled by user...")
      ngNotify.set('editing cancelled by user')
    }
  }


  $scope.saveEdit = function (todo) {
    if (todo.newText !== "" && todo.newText !== todo.text) {
      todo.text = todo.newText;
      todo.editing = false;
      console.log("Saved", todo)
      ngNotify.set('Movie title updated!')
      $window.localStorage.setItem('itemsList', angular.toJson($scope.todos))
    } else {
      todo.editing = false;
      console.log("no changes detected", todo)
      ngNotify.set('Nothing changed...')
    }
  }

  
}]);