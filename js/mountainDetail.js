'use strict';

angular.module( 'testApp.mountainDetail', [ 'ngRoute', 'testApp' ] )

.config([ '$routeProvider', function( $routerProvider ) {
	
	$routerProvider.when( '/:mountain_id', {
		templateUrl: 'detailView.html', 
		controller: 'DetailCtrl'
	});
	
}])

.controller( 'DetailCtrl', [ '$scope', '$routeParams', 'mountains', function( $scope, $routeParams, mountains_service ) {
	
	console.log( "Route Params Mountain ID: " + $routeParams.mountain_id );
	
	mountains_service.get( $routeParams.mountain_id, function( mountain ) {
		
		console.log( mountain );
		$scope.mountain = mountain;
		
		// Search for an image to go with this city.
		mountains_service.background( mountain.query.results.channel.item.lat, mountain.query.results.channel.item.long, function( background_url ) {
			
			// Set this background somewhere.
			$scope.mountain_image = background_url;
			
		});
		
	});
	
}]);
