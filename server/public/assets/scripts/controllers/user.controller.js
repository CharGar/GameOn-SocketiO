myApp.controller('UserController', ['$http', '$location', 'NgMap','$scope',
'$timeout', '$mdSidenav', function($http, $location, NgMap,$scope, $timeout, $mdSidenav)
  {
// $mdSidenav
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;
    NgMap.getMap().then(function(map) {
      console.log('map', map);
      vm.map = map;
    });

    vm.clicked = function() {
      alert("You're signed up to play, current roster: 1");
    };

    // vm.toggleLeft = buildToggler('left');
    // vm.toggleRight = buildToggler('right');

    vm.test = function(e, shop) {
      // console.log('shop left', shopIndex);
      vm.shop = shop;

      $mdSidenav('left').toggle().then(function() {

      });
    }

    vm.toggleLeft = function(componentId) {
      // return function() {
      console.log(componentId);
        $mdSidenav(componentId).toggle().then(function() {
          console.log('is open?', $mdSidenav(componentId).isOpen());
        });
      // };
    }
    vm.shops = [
      {id:'grand', image:"url('/assets/styles/ghlt.jpg')", roster:' 0', Location: 'Grande Hotel Lifetime', nextGame: '11:30am', position:[44.975923, -93.268808]},
      {id:'cross', image:"url('/assets/styles/ctlt.jpg')", roster:' 0', Location: 'Crosstown Lifetime', nextGame: '11:30am', position:[44.8897309, -93.4457767]},
      {id:'louis', image:"url('/assets/styles/splt.jpg')", roster:' 0', Location: 'St Louis Park Lifetime', nextGame: '11:30am', position:[44.961798, -93.349895]},
      {id:'ep', image:"url('/assets/styles/eplt.jpg')", roster:' 0', Location: 'Eden Prairie Lifetime', nextGame: '11:30am', position:[44.85615401, -93.43660712]},
      {id:'target', image:"url('/assets/styles/tclt.jpg')", roster:' 0', Location: 'Target Center Lifetime', nextGame: '11:30am', position:[44.979527, -93.276157]}
    ];
    vm.shop = vm.shops[0];

    vm.showDetail = function(e, shop) {
      vm.shop = shop;
      vm.map.showInfoWindow('foo-iw', shop.id);
    };

    vm.hideDetail = function() {
      vm.map.hideInfoWindow('foo-iw');
    };
  console.log('checking user');
    NgMap.getMap().then(function(map) {

      vm.showCustomMarker = function(evt) {
        map.customMarkers.foo.setVisible(true);
        map.customMarkers.foo.setPosition(this.getPosition());
      };

      vm.closeCustomMarker= function(evt) {
        this.style.display = 'none';
      };
    });
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          vm.userName = response.data.username;
          console.log('User Data: ', vm.userName);
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }
}]);
