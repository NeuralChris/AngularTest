'use strict';

angular.module( 'testApp.mountainDetail', ['ngRoute'] )

.config([ '$routeProvider', function( $routerProvider ) {
	
	$routerProvider.when( '/:mountain_id', {
		templateUrl: 'detailView.html', 
		controller: 'DetailCtrl'
	});
	
}])

.controller( 'DetailCtrl', [function() {
	
	
	
}]);
