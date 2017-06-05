myApp.controller('UserController', ['$http', '$location', 'NgMap','$scope',
'$timeout', '$mdSidenav', 'getService', function($http, $location, NgMap,$scope, $timeout, $mdSidenav, getService){


  var vm = this;// calling google maps
    NgMap.getMap().then(function(map) {
      console.log('map', map);
      vm.map = map;
    });

    vm.clicked = function() { //click alert, likely to remove
      alert("You're signed up to play, current roster: 1");
    };// end click alert

    // vm.toggleLeft = buildToggler('left');
    // vm.toggleRight = buildToggler('right');

    vm.test = function(e, shop) {
      vm.shop = shop;
      $mdSidenav('left').toggle().then(function() {
      });
    }

    vm.toggleLeft = function(componentId) { //angular slide toggle start
      console.log(componentId);
        $mdSidenav(componentId).toggle().then(function() {
          console.log('is open?', $mdSidenav(componentId).isOpen());
        });
    } //angular slide toggle end

    vm.shops = [ //array of basketball location objects
      {id:'grand', image:"url('/assets/styles/ghlt.jpg')", roster:' 0', Location: 'Grande Hotel Lifetime', nextGame: '11:30am', position:[44.975923, -93.268808]},
      {id:'cross', image:"url('/assets/styles/ctlt.jpg')", roster:' 0', Location: 'Crosstown Lifetime', nextGame: '11:30am', position:[44.8897309, -93.4457767]},
      {id:'louis', image:"url('/assets/styles/splt.jpg')", roster:' 0', Location: 'St Louis Park Lifetime', nextGame: '11:30am', position:[44.961798, -93.349895]},
      {id:'ep', image:"url('/assets/styles/eplt.jpg')", roster:' 0', Location: 'Eden Prairie Lifetime', nextGame: '11:30am', position:[44.85615401, -93.43660712]},
      {id:'target', image:"url('/assets/styles/tclt.jpg')", roster:' 0', Location: 'Target Center Lifetime', nextGame: '11:30am', position:[44.979527, -93.276157]}
    ];// end location objects
    vm.shop = vm.shops[0];

    vm.showDetail = function(e, shop) {//need to review and possibly remove
      vm.shop = shop;
      vm.map.showInfoWindow('foo-iw', shop.id);
    };

    vm.hideDetail = function() { //need to review and possible remove
      vm.map.hideInfoWindow('foo-iw');
    };
  console.log('checking user');

    NgMap.getMap().then(function(map) {

      vm.showCustomMarker = function(evt) {//getting custom markers from basketball location objects listed above
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


  vm.logout = function() {//start 'logout' logic
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }//end logout logic


//start copy paste for get item
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

  // vm.logout = function() {
  //   $http.get('/user/logout').then(function(response) {
  //     console.log('logged out');
  //     $location.path("/home");
  //   });
  // } //end logout function

  vm.addItem = function(){
    console.log('in add items!');
    var itemToSend = {
      description: vm.description,
      imgURL: vm.imgURL,
      user: vm.userName
    }
    console.log('this is the itemTOsend', itemToSend);
    $http({
      method:'POST',
      url:'/user/AddItem',
      data: itemToSend
    }).then(function(res) {
      console.log('get after add in controller', res);
      // location.reload();
      getService.getItems();
    });
  };





}]);
