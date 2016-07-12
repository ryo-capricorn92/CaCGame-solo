angular.module('cac', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute'])

.controller('dogCtrl', function ($scope, auth, Current, Saved) {
    ////////////////////////////////////////
   ////// *****AUTH0 FUNCTIONS***** ///////
  ////////////////////////////////////////
  function onLoginSuccess(profile, token) {
    $scope.message.text = '';
    store.set('profile', profile);
    store.set('token', token);
    $location.path('/');
    $scope.loading = false;
  }
  function onLoginFailed() {
    $scope.message.text = 'invalid credentials';
    $scope.loading = false;
  }
  $scope.login = function () {
    $scope.message = 'loading...';
     $scope.loading = true;
     auth.signin({
       connection: 'Username-Password-Authentication',
       username: $scope.user,
       password: $scope.pass,
       authParams: {
         scope: 'openid name email' //Details: https://auth0.com/docs/scopes
       }
     }, onLoginSuccess, onLoginFailed);
   };
   $scope.signup = function () {
      $scope.message = 'loading...';
     $scope.loading = true;
     auth.signup({
       connection: 'Username-Password-Authentication',
       username: $scope.user,
       password: $scope.pass,
       authParams: {
         scope: 'openid name email'
       }
     }, onLoginSuccess, onLoginFailed);
    }




     ////////////////////////////////////////
    ////// *****EVERYTHING ELSE***** ///////
   ////////////////////////////////////////

  $scope.msgs = Saved.msgs;

  $scope.containerStyle = {
    'height': '' + Current.height + 'px',
    'width': '' + Current.width + 'px'
  }

  $scope.showDog = function(dog) {
    $scope.layers = dog || Current.newDog();
    $scope.layers.forEach(function(layer) {
      layer.style = {
        'filter': 'hue-rotate(' + layer.hue + 'deg) saturate(' + layer.saturation + '%) brightness(' + layer.brightness + '%)',
        '-webkit-filter': 'hue-rotate(' + layer.hue + 'deg) saturate(' + layer.saturation + '%) brightness(' + layer.brightness + '%)',
        'z-index': layer.z
      };
      layer.image = 'imgs/layers/' + layer.imageName + '.png';
    });
  }

  $scope.dogs = Saved.serveDogs();

  $scope.saveDog = function() {
    Saved.saveDog($scope.layers);
    $scope.dogs = Saved.serveDogs();
  }

  $scope.deleteDog = function(dog) {
    Saved.deleteDog(dog.index);
    $scope.dogs = Saved.serveDogs();
  }

  $scope.clearList = function() {
    var sure = confirm('Are you sure you want to clear this list?');
    if (sure) {
      Saved.clearList();
      $scope.dogs = Saved.serveDogs();
    }
  }

  $scope.saveList = function() {
    Saved.saveList();
  }

  $scope.loadList = function() {
    Saved.loadList();
    $scope.dogs = Saved.serveDogs();
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

  return {
    newDog, width, height
  }

})

.factory('Saved', function($window) {
  var dogs = [];
  var index = 0;
  var nameEdit = false;
  var msgs = [];

  var saveDog = function(dog) {
    var name = 'Saved dog ' + (index+1);
    dogs.push({dog, index, name, nameEdit});
    index++;
    msgs.length = 0;
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

  var serveMsgs = function() {
    return msgs;
  }

  var deleteDog = function(index) {
    dogs[index].dog = null;
  }

  var clearList = function() {
    dogs.length = 0;
  }

  var saveList = function() {
    $window.localStorage.setItem('create-a-canine-list', JSON.stringify(dogs));
  }

  var loadList = function() {
    var list = JSON.parse($window.localStorage.getItem('create-a-canine-list'));
    if (list) {
      dogs = list.slice();
    } else {
      msgs.push("You don't have a list saved");
    }
  }

  return {
    saveDog,
    serveDogs,
    deleteDog,
    clearList,
    saveList,
    loadList,
    msgs
  };
})

.config( function myAppConfig ($routeProvider, authProvider) {

  authProvider.init({
    domain: 'ryo.auth0.com',
    clientID: 'D7CQR8eg95UROrrVsthL6y8UtqWhWUz7'
  });

  $routeProvider
  .when( '/', {
    controller: 'dogCtrl'
  })
  .when( '/login', {
    redirectTo: '/'
  });

  authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', function($location, profilePromise, idToken, store) {
    // Successfully log in
    // Access to user profile and token
    profilePromise.then(function(profile){
      // profile
      store.set('profile', profile);
      store.set('token', idToken);
    });
    $location.url('/');
  }]);

  authProvider.on('loginFailure', function() {
    // If anything goes wrong
  });

})

.run(['$rootScope', 'auth', 'store', 'jwtHelper', '$location', function($rootScope, auth, store, jwtHelper, $location) {
  // Listen to a location change event
  $rootScope.$on('$locationChangeStart', function() {
    // Grab the user's token
    var token = store.get('token');
    // Check if token was actually stored
    if (token) {
      // Check if token is yet to expire
      if (!jwtHelper.isTokenExpired(token)) {
        // Check if the user is not authenticated
        if (!auth.isAuthenticated) {
          // Re-authenticate with the user's profile
          // Calls authProvider.on('authenticated')
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page
        // $location.path('/');
        // .. or
        // or use the refresh token to get a new idToken
        auth.refreshIdToken(token);
      }
    }

  });
}])
