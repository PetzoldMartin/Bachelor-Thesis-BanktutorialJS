'use strict';

/* Controllers */
var BankappWelcomeview = angular.module( 'bankapp.welcomeview', [
		'bankapp.search', 'bankapp.breadcrumb', 'bankapp.subview'
] );

BankappWelcomeview.controller( 'welcomeComponentCtrl', [
		'$scope', 'subComponentService', 'BreadcrumbService', function ( $scope, subComponentService, BreadcrumbService ) {
			$scope.x = "test";
			subComponentService.setComponent_Lvl1( "" );
			subComponentService.setComponent_Lvl2( "" );
			BreadcrumbService.setBreadcrumbLvl2( "" );
			BreadcrumbService.setBreadcrumbLvl3( "" );
		}
] );
