'use strict';

angular.module( 'testApp.mountainListing', ['ngRoute'])

.config([ '$routeProvider', function( $routerProvider ) {
	
	$routerProvider.when( '/listing', {
		templateUrl: 'listingView.html', 
		controller: 'ListingCtrl'
	});
	
}])

.controller( 'ListingCtrl', [function() {
	
	
	
}]);
