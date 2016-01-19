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
		.otherwise( { 
			redirectTo: '/listing' 
		} );
	
}])

.factory( 'mountains', ['$http', function( $http ) {
	
	return {
		list: function ( callback ) {
			
			$http({
				method: "GET", 
				url: 'data/mountains.json', 
				cache: true
			}).success( callback );
			
		},
		
		weather: function ( endpoint, callback ) {
			
			$http({
				method: "GET",
				url: endpoint, 
				cache: true
			}).success( callback );
			
		}, 
		
		get: function ( mountain_id, callback ) {
			
			var self = this;
			
			$http({
				method: "GET", 
				url: 'data/mountains.json', 
				cache: true
			}).success( function( mountains ) {
				
				for( var i=0; i<mountains.length; i++ ) {
					
					if( mountain_id == mountains[i].id ) {
						
						var mountain_info = mountains[i];
						
						self.weather( mountains[i].endpoint, function( mountain ) {

							mountain.id = mountain_info.id;
							mountain.name = mountain_info.name;
							mountain.endpoint = mountain_info.endpoint;
							
							callback( mountain );
							
						} );
						
					}
					
				}
				
			} );
			
		}, 
		
		background: function( lat, lng, callback ) {
			
			$http({
				method: "GET",
				url: "https://api.flickr.com/services/rest/", 
				cache: true,
				params: {
					method: "flickr.photos.search", 
					api_key: "9742b0a005a377865f2d6593d2532655", 
					lat: lat, 
					lon: lng,
					is_getty: 1,
					format: "json",
					nojsoncallback: 1
				}
			}).success( function( flickr_data ) {
				
				console.log( flickr_data );
				
				// Make sure we got at least one photo
				if( flickr_data.photos.total >= 1 ) {
					
					var first_photo = flickr_data.photos.photo[0];
				
					callback( 
						"https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg"
							.replace( "{farm-id}", first_photo.farm )
							.replace( "{server-id}", first_photo.server )
							.replace( "{id}", first_photo.id )
							.replace( "{secret}", first_photo.secret ) 
					);
					
				} else {
					
					// No photos match this response.
					callback( "https://farm8.staticflickr.com/7436/10501892075_f8f71f9481.jpg" );
					
				}
				
			} );
			
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
						console.log( "Directive: Temp found for " + mountain.name + ": " + mountain.temperature );
						
					});
					
				});
				
			});
			
			$scope.mountains = mountains;
			
		}
	};
	
});
