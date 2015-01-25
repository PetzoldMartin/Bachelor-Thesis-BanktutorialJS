'use strict';

/* Controllers */
var BankappWelcomeview = angular.module( 'bankapp.welcomeview', [
		 'bankapp.breadcrumb'
] );

BankappWelcomeview.controller( 'welcomeComponentCtrl', [
		'$scope', 'subComponentService', 'BreadcrumbService', function ( $scope, subComponentService, BreadcrumbService ) {
			subComponentService.setComponent_Lvl1('');
		}
] );
