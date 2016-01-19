'use strict';

angular.module( 'testApp.mountainListing', [ 'ngRoute', 'testApp' ])

.config([ '$routeProvider', function( $routerProvider ) {
	
	$routerProvider.when( '/listing', {
		templateUrl: 'listingView.html', 
		controller: 'ListingCtrl'
	});
	
}])

.controller( 'ListingCtrl', [ '$scope', 'mountains', function( $scope, mountains ) {
	
	mountains.list( function( mountains_data ){
		
		console.log( mountains_data );
		
		// Grab the temperatures from the service.
		mountains_data.forEach( function( mountain ) {
			
			mountains.weather( mountain.endpoint, function( mountain_weather ) {
		
				mountain.temperature = mountain_weather.query.results.channel.item.condition.temp;
				console.log( "Temp found for " + mountain.name + ": " + mountain.temperature );
				
			});
			
		});
		
		$scope.mountains = mountains_data;
		
	} );
	
}]);
