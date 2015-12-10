'use strict';

angular.module( 'testApp.mountainDetail', ['ngRoute'])

.config([ '$routeProvider', function( $routerProvider ) {
	
	$routerProvider.when( '/:mountain', {
		templateUrl: 'listingDetail.html', 
		controller: 'DetailCtrl'
	});
	
}])

.controller( 'DetailCtrl', [function() {
	
	
	
}]);
