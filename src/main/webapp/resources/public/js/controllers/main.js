(function() {
  // ===============================================================================
  // Controllers / Main
  //

  function MainCtrl() {
    this.companyName = 'Review Analytics';
    this.username = '';
    this.error = "";
    
    this.states = [
        { name: 'Alberta' ,id: 'AB'},
		{ name: 'British Columbia' ,id: 'BC'},
		{ name: 'Manitoba' ,id: 'MB'},
		{ name: 'New Brunswick' ,id: 'NB'},
		{ name: 'Newfoundland and Labrador' ,id: 'NL'},
		{ name: 'Nova Scotia' ,id: 'NS'},
		{ name: 'Northwest Territories' ,id: 'NT'},
		{ name: 'Nunavut' ,id: 'NU'},
		{ name: 'Ontario' ,id: 'ON'},
		{ name: 'Prince Edward Island' ,id: 'PE'},
		{ name: 'Quebec' ,id: 'QC'},
		{ name: 'Saskatchewan' ,id: 'SK'},
		{ name: 'Yukon' ,id: 'YT'}
      ];
    
    
    
  }
  
  function MyController($rootScope, $scope, $http, $location){
	     
	    var self = this;
	    self.showErrorMessage = $("#error").text().length > 0;
	    self.showLogoutMessage = $("#logout").text().length > 0;
	  
  }

  angular.module('pixeladmin')
    .controller('MyController',MyController)
    .controller('MainCtrl', MainCtrl);

})();
