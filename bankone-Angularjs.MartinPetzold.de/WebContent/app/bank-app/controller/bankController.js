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
						function($scope, subComponentService, BreadcrumbService) {

							var overview = {
								"id" : 1,
								"name" : "Bankenübersicht",
								"class" : "list-group-item active",
								"icon" : "glyphicon glyphicon-home",
								"clicked" : true,
								"url" : 'mainTopicTemplates/bankSubpageTemplates/bankOverView.html'
							}
							var manipulate = {
								"id" : "undefined",
								"name" : "Bank bearbeiten",
								"class" : "list-group-item active",
								"icon" : "glyphicon glyphicon-home",
								"clicked" : true,
								"url" : 'mainTopicTemplates/bankSubpageTemplates/bankManipulate.html'
							}
							subComponentService.setComponent_Lvl1(overview);
							BreadcrumbService.setBreadcrumbLvl2(overview);
							$scope.Component_Lvl1 = subComponentService
									.getComponent_Lvl1();
							$scope
									.$watch(function() {
										return $scope.Component_Lvl1 = subComponentService
												.getComponent_Lvl1();
									});

							$scope.click = function(oid) {
								manipulate.id = oid;
								subComponentService
										.setComponent_Lvl1(manipulate);
								BreadcrumbService.setBreadcrumbLvl3(manipulate);

								$scope.Component_Lvl1 = subComponentService
										.getComponent_Lvl1();

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
		'searchService',
		function($scope, $http,searchService) {
			$scope.query="";
			$scope
			.$watch(function() {
				return $scope.query = searchService.getSearchColumn()
			});
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

BankappBankview.controller('bankviewCtrl', [
		'$scope',
		'$http',
		'subComponentService',
		'BreadcrumbService',
		function($scope, $http, subComponentService,BreadcrumbService) {
			$scope.iddata = subComponentService.getComponent_Lvl1();
			$scope.customerCount=0;
			$scope.accountCount=0;
			$scope.bank={
					"name" : "",
					"sortCode" : ""
			};
			$scope.loadData = function() {
				if (($scope.iddata.id) != "undefined") {
					$http.get(
							'http://localhost:8080/bankone/rest/bankREST' + '/'
									+ $scope.iddata.id).success(function(data) {
						$scope.bank = data;
						$scope.status = true;
						angular.forEach($scope.bank.customers, function(value, key) {
							$scope.customerCount=$scope.customerCount+1;});
						$http.get('http://localhost:8080/bankone/rest/abstractAccountREST/bank/'+
								$scope.iddata.id).success(function(data) {
									$scope.accounts=data;
									angular.forEach($scope.accounts, function(value, key) {
										$scope.accountCount=$scope.accountCount+1;});
								}).error(function(data, status, headers, config) {
									$scope.status = false;
								})	
						
					}).error(function(data, status, headers, config) {
						$scope.status = false;
					});
				}
			};
			$scope.orderProp = 'name';
			$scope.loadData();
			$scope.setSubComponentLvl2 = function() {
				subComponentService.setComponent_Lvl1(BreadcrumbService
						.getBreadcrumbLvl2());
				BreadcrumbService.setBreadcrumbLvl3("");
				BreadcrumbService.setBreadcrumbLvl4("");
			}
			$scope.saveBank=function(){
				alert($scope.bank.name)
				if (($scope.iddata.id) == "undefined") {
					$http({
						withCredentials : false,
						method : 'post',
						url : 'http://localhost:8080/bankone/rest/bankREST',
						data : {
							name : $scope.bank.name,
							sortCode : $scope.bank.sortCode
						}
					
					}).success(function() {
						$scope.loadData();
					})
				}else{
					$http({
						withCredentials : false,
						method : 'put',
						url : 'http://localhost:8080/bankone/rest/bankREST',
						data : {
							id : $scope.bank.id,
							name : $scope.bank.name,
							sortCode : $scope.bank.sortCode
						}
					
					}).success(function() {
						$scope.loadData();
					})
				}
				
			}
		} ]);
