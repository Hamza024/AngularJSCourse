(function () {
'use strict';

angular.module('CheckOffModule', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyCtrl = this;

  buyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

  buyCtrl.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.shiftItems(itemIndex);
  };
}


// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCtrl = this;

  boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of To Buy items
  var toBuy = [
              {
                name: 'Cookies',
                quantity: '10'
              },
              {
                name: 'Chips',
                quantity: '5'
              },
              {
                name: 'Juices',
                quantity: '3'
              },
              {
                name: 'Cakes',
                quantity: '2'
              },
              {
                name: 'Candies',
                quantity: '20'
              }
            ];

  //list of Bought items
  var bought = [];

  service.shiftItems = function (itemIndex) {
    // get the value form the toBuy list
    var valueAtIndex = toBuy[itemIndex];
    
    // remove the value in buy list
    toBuy.splice(itemIndex, 1);

    //add value in bought list
    bought.push(valueAtIndex);
  };

  service.getToBuyItems = function () {
    return toBuy;
  };

  service.getBoughtItems = function () {
    return bought;
  };
}

})();
