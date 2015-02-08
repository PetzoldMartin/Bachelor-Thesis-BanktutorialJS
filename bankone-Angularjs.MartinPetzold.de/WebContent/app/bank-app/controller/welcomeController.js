'use strict';

/**
 * Modul zur steuerung der Willkommenseite
 */
var BankappWelcomeview = angular.module( 'bankapp.welcomeview', [
		 'bankapp.breadcrumb'
] );

BankappWelcomeview.controller( 'welcomeComponentCtrl', [
		'$scope', 'subComponentService', 'BreadcrumbService', function ( $scope, subComponentService, BreadcrumbService ) {
		}
] );
