myApp.controller('UserController', ['$http', '$location', 'NgMap','$scope',
'$timeout', '$mdSidenav', 'getService', function($http, $location, NgMap,$scope, $timeout, $mdSidenav, getService){

  var vm = this;// calling google maps
    NgMap.getMap().then(function(map) {
      // console.log('map', map);
      vm.map = map;
    });

    // vm.toggleLeft = buildToggler('left');
    // vm.toggleRight = buildToggler('right');

    vm.test = function(e, shop) {
      vm.shop = shop;
      $mdSidenav('left').toggle().then(function() {

      });
    }

    vm.toggleLeft = function(componentId, id) { //angular slide toggle start
      // console.log(componentId, id);
        $mdSidenav(componentId).toggle().then(function() {
          // console.log('is open?', $mdSidenav(componentId).isOpen());
          vm.getItems(id);
          document.getElementById('scrollBox').scrollTop = 1000000000000000;
        });
    } //angular slide toggle end

    vm.shops = [ //array of basketball location objects
      {id:'grand',  image:"url('/assets/styles/ghlt.jpg')", roster:[' ryan b', ' ben', ' jake'], count: '3', Location: 'Grande Hotel', nextGame: '11:30am', position:[44.975923, -93.268808], times: [
      	['none'], // Sunday
        ['6:00am', '11:30am', '5:00pm'], // Monday
        ['none'], // Tuesday
        ['6:00am', '11:30pm'], // Wednesday
        ['none'], // Thursday
        ['6:00am', '11:30am'], // Friday
      	['none'] // Saturday
      ], address:'615 2nd Ave S, Minneapolis, MN 55402'},
      {id:'cross',  image:"url('/assets/styles/ctlt.jpg')", roster:' 0', count: '10', Location: 'Crosstown', nextGame: '11:30am', position:[44.8897309, -93.4457767], times: [
      	['none'], // Sunday
        ['6:00am', '11:30am', '5:00pm'], // Monday
        ['none'], // Tuesday
        ['6:00am', '11:30pm'], // Wednesday
        ['none'], // Thursday
        ['6:00am', '11:30am'], // Friday
      	['none'] // Saturday
      ], address:'6233 Baker Rd, Eden Prairie, MN 55346'},
      {id:'louis',  image:"url('/assets/styles/splt.jpg')", roster:' 0', count: '10', Location: 'St Louis Park', nextGame: '11:30am', position:[44.961798, -93.349895],times: [
      	['none'], // Sunday
        ['6:00am', '11:30am', '5:00pm'], // Monday
        ['none'], // Tuesday
        ['6:00am', '11:30pm'], // Wednesday
        ['none'], // Thursday
        ['6:00am', '11:30am'], // Friday
      	['none'] // Saturday
      ],address:'5525 Cedar Lake Rd, St Louis Park, MN 55416'},
      {id:'ep', image:"url('/assets/styles/eplt.jpg')", roster:[' chris', ' damon', ' devin', ' kevin', ' tim', ' bigBear', ' aria', ' scott', ' connor', ' zach'], count: '10', Location: 'Eden Prairie', nextGame: '11:30am', position:[44.85615401, -93.43660712], times: [
      	['none'], // Sunday
        ['6:00am', '11:30am', '5:00pm'], // Monday
        ['none'], // Tuesday
        ['6:00am', '11:30pm'], // Wednesday
        ['none'], // Thursday
        ['6:00am', '11:30am'], // Friday
      	['none'] // Saturday
      ],address:'755 Prairie Center Dr, Eden Prairie, MN 55344'},
      {id:'target', image:"url('/assets/styles/tclt.jpg')", roster:[' chris', ' damon', ' devin', ' kevin', ' tim', ' bigBear', ' aria', ' scott', ' connor', ' zach'], count: '10', Location: 'Target Center', nextGame: '11:30am', position:[44.979527, -93.276157],times: [
      	['none'], // Sunday
        ['6:00am', '11:30am', '5:00pm'], // Monday
        ['none'], // Tuesday
        ['6:00am', '11:30pm'], // Wednesday
        ['none'], // Thursday
        ['6:00am', '11:30am'], // Friday
      	['none'] // Saturday
      ],address:'600 N 1st Ave, Minneapolis, MN 55403'}
    ];// end location objects
    vm.shop = vm.shops[0];

    vm.showDetail = function(e, shop) {//need to review and possibly remove
      vm.shop = shop;
      vm.map.showInfoWindow('map-canvas', shop.id);
      var today = moment();
      var dow = today.day(); // number 0 through 6

      vm.gameTimeArray = vm.shop.times[dow]; // The array of times for that day of the week


    };
    var today = moment();
console.log(today);


    vm.hideDetail = function() { //need to review and possible remove
      vm.map.hideInfoWindow('map-canvas');
    };
  // console.log('checking user');

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
          // console.log('User Data: ', vm.userName);
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });


  vm.logout = function() {//start 'logout' logic
    $http.get('/user/logout').then(function(response) {
      // console.log('logged out');
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


  // } //end logout function
vm.items = {shelfItems: []};
  vm.addItem = function(location){

    // console.log('in add items!');
    var itemToSend = {
      item: vm.description,
      user: vm.userName,
      location: location
    }
    // console.log('this is the itemTOsend', itemToSend);
    $http({
      method:'POST',
      url:'/user/AddItem',
      data: itemToSend
    }).then(function(res) {
      // console.log('get after add in controller', res);
vm.description = '';//this resets the text input field to empty
setTimeout(function () {
  document.getElementById('scrollBox').scrollTop = 1000000000000000;
}, 1000);


    });

  };

  vm.getItems = function(location){
  getService.getItems(location).then(function(data){
    vm.items.shelfItems = data;
  });
};


setInterval(function() {
  getService.getItems(vm.shop.id).then(function(data){

      vm.items.shelfItems = data;



  });
}, 1000, 1);


$scope.hovering = false;

   // create the timer variable
   var timer;

   // mouseenter event
   $scope.showIt = function () {
       timer = $timeout(function () {
           $scope.hovering = true;
       }, 5);
   };

   // mouseleave event
   $scope.hideIt = function () {
       $timeout.cancel(timer);
       $scope.hovering = false;
   };





}]);
