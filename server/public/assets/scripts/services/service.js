myApp.service('getService',['$http', function($http){

  var service = this;

  service.items = {shelfItems: []};

  service.getItems = function(location){
    return $http({
      method:'GET',
      url:'/user/getItems/' + location
    }).then(function(res) {
      console.log('get from service', res.data);
      service.items.shelfItems = res.data;
      return res.data;
    });
  }; //end getItems function
}]); //end getService
