(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.itemName = "";
  ctrl.found = [];
  ctrl.getMatchedMenuItems = function () {
    ctrl.found = MenuSearchService.getMatchedMenuItems(ctrl.itemName);
  };

  ctrl.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  var foundItems = [];

  service.getMatchedMenuItems = function (searchItem) {
    foundItems = [];
    if(searchItem === "")
    {
      return foundItems;
    }

    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    response.then(function (response) {
      var data = response.data;
      
      angular.forEach(data, function(value, key){
        angular.forEach(value, function(value, key){
          var check = value.description.includes(searchItem);
          if(check)
          {
            foundItems.push(value);
          }
        });
      });
    })
    .catch(function (error) {
      console.log(error);
    });

    return foundItems;
  };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };
}


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
}

})();
