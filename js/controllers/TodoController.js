app.controller("TodoController", ['$scope', '$window', 'ngNotify', function ($scope, $window, ngNotify) {
  $scope.todos = [];
  $scope.inputText = "";

  ngNotify.config({
    duration: 2000
  })

  if ($window.localStorage['itemsList']) {
    $scope.todos = angular.fromJson($window.localStorage.getItem('itemsList'));
    ngNotify.set('Existing list found and loaded!', 'success')

  } else {
    // $scope.todos = []; 
    ngNotify.set('No previous list items found. Starting a new one!', 'grimace')
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
    } else {
      ngNotify.set('Type a movie title first!', 'warn')
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
      ngNotify.set('All movies watched!', 'success');
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
      ngNotify.set('Nothing to be cleared. Check your selection.', 'warn');
    }

  };

  $scope.deleteAll = function () {
    if ($scope.todos.length > 0) {
      $scope.todos.length = 0;
      $window.localStorage.removeItem('itemsList');
      ngNotify.set('List cleared!');
    } else {
      ngNotify.set('Oops, no movies listed yet!', 'warn');
    }
  }

  $scope.deleteItem = function () {
    $scope.todos.splice(this.$index, 1);
  }

  $scope.toggleEdit = function (todo) {
    if (!todo.editing) {
      todo.newText = todo.text;
      todo.editing = true;
      todo.done = false;
    } else {
      todo.editing = false;
      ngNotify.set('editing cancelled by user')
    }
  }


  $scope.saveEdit = function (todo) {
    if (todo.newText !== "" && todo.newText !== todo.text) {
      todo.text = todo.newText;
      todo.editing = false;
      ngNotify.set('Movie title updated!', 'success')
      $window.localStorage.setItem('itemsList', angular.toJson($scope.todos))
    } else {
      todo.editing = false;
      ngNotify.set('Nothing changed...')
    }
  }

  
}]);