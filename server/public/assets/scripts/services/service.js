myApp.service('getService',['$http', function($http){

  var service = this;

  service.items = {shelfItems: []};

  service.getItems = function(){
    return $http({
      method:'GET',
      url:'/user/getItems'
    }).then(function(res) {
      console.log('get from service', res.data);
      service.items.shelfItems = res.data;
    });
  }; //end getItems function
}]); //end getService
