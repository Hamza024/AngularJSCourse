(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchController', LunchController);

LunchController.$inject = ['$scope'];

function LunchController($scope) {
  $scope.lunchMenu = "";

  $scope.message = "";

  $scope.Checker = function () {
    if($scope.lunchMenu == "")
    {
      $scope.message = "Please enter data first.";
    }
    else
    {
      var lunchItems = $scope.lunchMenu.split(',');
    
      if(lunchItems.length <= 3)
      {
        $scope.message = "Enjoy!";
      }
      else
      {
        $scope.message = "Too much!";
      }
    }
  };
}

})();
