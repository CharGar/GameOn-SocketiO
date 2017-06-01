myApp.controller('UserController', ['$http', '$location', 'NgMap', function($http, $location, NgMap) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;

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
  }]);

  // Upon load, check this user's session on the server
//   $http.get('/user').then(function(response) {
//       if(response.data.username) {
//           // user has a curret session on the server
//           vm.userName = response.data.username;
//           console.log('User Data: ', vm.userName);
//       } else {
//           // user has no session, bounce them back to the login page
//           $location.path("/home");
//       }
//   });
//
//   vm.logout = function() {
//     $http.get('/user/logout').then(function(response) {
//       console.log('logged out');
//       $location.path("/home");
//     });
//   }
// }]);
