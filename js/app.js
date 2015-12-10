/**
 * Setup core Angular app and link out to any dependencies.
 */

'use strict';

angular.module( 'testApp', [
	'ngRoute',
	'testApp.mountainListing',
	'testApp.mountainDetail'
]).
config([ '$routeProvider', function( $routeProvider ) {
	
	$routeProvider.otherwise( { redirectTo: '/listing' } );
	
}]);
