'use strict';

/* Controllers */
var BankappWelcomeview = angular.module('bankapp.welcomeview', [
		'bankapp.search', 'bankapp.breadcrumb', 'bankapp.subview' ]);

BankappWelcomeview.controller('welcomeComponentCtrl', [
		'$scope',
		'subComponentService',
		function($scope, subComponentService) {
			$scope.x="test";
			subComponentService.setComponent_Lvl1("");
			subComponentService.setComponent_Lvl2("");
		} ]);
