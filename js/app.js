'use strict';
/**
 * Setup core Angular app and link out to any dependencies.
 */

angular.module( 'testApp', [
	'ngRoute',
	'testApp.mountainListing',
	'testApp.mountainDetail'
])

.config([ '$routeProvider', function( $routeProvider ) {
	
	$routeProvider
		.when( '/listing', {
			templateUrl: 'listingView.html', 
			controller: 'ListingCtrl'
		} )
		.when( '/:mountain_id', {
			templateUrl: 'detailView.html', 
			controller: 'DetailCtrl'
		})
		.otherwise( { 
			redirectTo: '/listing' 
		} );
	
}])

.factory( 'mountains', ['$http', function( $http ) {
	
	return {
		list: function (callback) {
			
			$http({
				method: "GET", 
				url: 'data/mountains.json', 
				cache: true
			}).success( callback );
			
		},
		find: function (endpoint, callback) {
			
			$http({
				method: "GET",
				url: endpoint, 
				cache: true
			}).success( callback );
			
		}
	};
	
}])

.directive( 'mountain', function() {
	
	return {
		scope: {
			mountain: '='
		}, 
		restrict: 'A', 
		templateUrl: 'mountain.html',
		controller: function( $scope, mountains ) {
			
			mountains.list( function( data ) {
				
				console.log( data );
				
				data.forEach( function( mountain ) {
					
					var mountain_name = mountain.name;
					
					mountains.find( mountain.endpoint, function( mountain_weather ) {
				
						mountain.temperature = mountain_weather.query.results.channel.item.condition.temp;
						console.log( "Temp found for " + mountain.name + ": " + mountain.temperature );
						
					});
					
				});
				
			});
			
		}
	};
	
});
