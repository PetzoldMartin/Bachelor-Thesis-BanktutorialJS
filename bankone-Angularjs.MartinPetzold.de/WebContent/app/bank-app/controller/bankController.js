'use strict';

/* Controllers */
var BankappBankview = angular.module('bankapp.bankview', [ 'bankapp.search',
		'bankapp.breadcrumb', 'bankapp.subview' ]);

BankappBankview
		.controller(
				'bankComponentCtrl',
				[
						'$scope',
						'subComponentService',
						function($scope, subComponentService) {
							subComponentService
									.setComponent_Lvl1({
										"id" : 1,
										"name" : "Bankenübersicht",
										"class" : "list-group-item active",
										"icon" : "glyphicon glyphicon-home",
										"clicked" : true,
										"url" : 'mainTopicTemplates/bankSubpageTemplates/bankOverView.html'
									});
							$scope.Component_Lvl1 = subComponentService
									.getComponent_Lvl1();
							$scope
									.$watch(function() {
										return $scope.Component_Lvl1 = subComponentService
												.getComponent_Lvl1();
									});
							$scope
									.$watch(function() {
										return $scope.Component_Lvl2 = subComponentService
												.getComponent_Lvl2();
									});
						} ]);

BankappBankview.controller('bankListCtrl', [
		'$scope',
		'$http',
		function($scope, $http) {
			$scope.loadData = function() {
				$http.get('http://localhost:8080/bankone/rest/bankREST')
						.success(function(data) {
							$scope.banks = data;
							$scope.status = true;
						}).error(function(data, status, headers, config) {
							$scope.status = false;
						});
			};
			$scope.orderProp = 'name';
			$scope.loadData();
		} ]);
