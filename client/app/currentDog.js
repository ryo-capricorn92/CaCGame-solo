angular.module('cac', [])

.controller('currentCtrl', function ($scope, Dog) {
  $scope.created = false;

  $scope.newDog = function() {
    $scope.layers = Dog.newDog();
    $scope.layers.forEach(function(layer) {
      layer.style = {
        'filter': 'hue-rotate(' + layer.hue + 'deg) saturate(' + layer.saturation + '%) brightness(' + layer.brightness + '%)',
        '-webkit-filter': 'hue-rotate(' + layer.hue + 'deg) saturate(' + layer.saturation + '%) brightness(' + layer.brightness + '%)',
        'z-index': layer.z
      };
      layer.image = 'imgs/layers/' + layer.imageName + '.png';
    });
  }

  $scope.containerStyle = {
    'height': '' + Dog.height + 'px',
    'width': '' + Dog.width + 'px'
  }

  $scope.dogs = Dog.serveDogs();

  $scope.saveDogs = function() {
    Dog.saveDog($scope.layers);
  }
})

.factory('Dog', function ($window) {
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
    '7': 'tuxedo',
    '8': 'blanket',
    '9': 'outline'
  }

  //////////////////////////////////////
 /////// *****MAIN FACTORY***** ///////
//////////////////////////////////////

  var height = $window.innerHeight * 0.9;
  var width = $window.innerWidth * 0.9;

  var random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var newDog = function() {
    var layers = [];
    var ran = random(0,4);

    for (var i = 0; i < ran; i++) {
      layers.push({});
    }

    layers.forEach(function(layer) {
      layer.z = random(1,8);
      layer.imageName = images[layer.z];
      layer.hue = random(0,360);
      if (layer.z === 7 || layer.z === 8) {
        if (random(0,1)) {
          layer.brightness = random(80, 100);
        } else {
          layer.brightness = random(0, 20);
        }
      } else {
        layer.brightness = random(0,100);
      }
      layer.saturation = random(0,100);
    })

    layers.push({
      z: 0,
      imageName: images[0],
      hue: random(0,360),
      brightness: random(0,100),
      saturation: random(0,100)
    });

    layers.push({
      z: 100,
      imageName: images[9],
      hue: 0,
      brightness: 100,
      saturation: 100
    })

    return layers;
  }

  var dogs = [];
  var index = 0;

  var saveDog = function(dog) {
    dogs.push({dog, index});
    index++;
  }

  var serveDogs = function() {
    var result = [];
    dogs.forEach(function(value) {
      if (value.dog) {
        result.push(value);
      }
    })

    return result;
  }

  return {
    newDog, saveDog, serveDogs, width, height
  }

});
