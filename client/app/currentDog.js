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
    '0': 'solid',
    '1': 'mask',
    '2': 'socks',
    '3': 'saddle',
    '4': 'mottled',
    '5': 'grizzled',
    '6': 'freckles',
    '7': 'tuzedo',
    '8': 'blanket',
    '9': 'outline'
  }

  //////////////////////////////////////
 /////// *****MAIN FACTORY***** ///////
//////////////////////////////////////
  var layers;

  var random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var newDog = function() {
    layers = Array(random(0, 4)).fill({});

    layers.forEach(function(value) {
      value.z = random(1,9);
      value.image = images[value.z];
      value.hue = random(0,360);
      value.brightness = random(0,100);
      value.saturation = random(0,100);
    })
  }

});
