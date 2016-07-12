angular.module('cac', [])

.controller('currentCtrl', function ($scope, Current) {
  $scope.newDog = function() {
    Current.newDog();
  }
})

.factory('Current', function ($window) {
    //////////////////////////////////////
   /// *****STATIC DATA STORAGE***** ////
  //////////////////////////////////////

  var images = {
    '01': 'solid',
    '02': 'other_name_here'
  }

  //////////////////////////////////////
 /////// *****MAIN FACTORY***** ///////
//////////////////////////////////////
  var layers = [];

  var newDog = function() {

  }

  var orderLayers = function() {

  }
});
