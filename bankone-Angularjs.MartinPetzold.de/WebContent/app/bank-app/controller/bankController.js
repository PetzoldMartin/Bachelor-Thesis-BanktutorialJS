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
						'BreadcrumbService',
						function($scope, subComponentService,BreadcrumbService) {
							
							var overview ={
									"id" : 1,
									"name" : "Bankenübersicht",
									"class" : "list-group-item active",
									"icon" : "glyphicon glyphicon-home",
									"clicked" : true,
									"url" : 'mainTopicTemplates/bankSubpageTemplates/bankOverView.html'
								}
							var manipulate={
									"id" : 2,
									"name" : "Bank bearbeiten",
									"class" : "list-group-item active",
									"icon" : "glyphicon glyphicon-home",
									"clicked" : true,
									"url" : 'mainTopicTemplates/bankSubpageTemplates/bankManipulate.html'
								}
							subComponentService
									.setComponent_Lvl1(overview);
							BreadcrumbService.setBreadcrumbLvl2(overview);
							$scope.Component_Lvl1 = subComponentService
									.getComponent_Lvl1();
							$scope
									.$watch(function() {
										return $scope.Component_Lvl1 = subComponentService
												.getComponent_Lvl1();
									});
							
							$scope.click=function(){
									subComponentService
									.setComponent_Lvl2(manipulate);
									BreadcrumbService.setBreadcrumbLvl3(manipulate);

									$scope.Component_Lvl2 = subComponentService
									.getComponent_Lvl2();
									
							}
							
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
