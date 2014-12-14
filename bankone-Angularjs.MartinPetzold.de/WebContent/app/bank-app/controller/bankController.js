'use strict';

/* Controllers */
var BankappBankview = angular.module('bankapp.bankview', [ 'bankapp.search',
		'bankapp.breadcrumb' ]);

BankappBankview.controller('bankComponentCtrl', [
		'$scope',
		'bankComponentService',
		function($scope,bankComponentService) {
			$scope.showComponent_url = bankComponentService
					.getShowComponent_url()
			$scope.$watch(function() {
				return $scope.showComponent_url = bankComponentService
						.getShowComponent_url();
			});
			$scope.$watch(function() {
				return $scope.inputComponent_url = bankComponentService
						.getInputComponent_url();
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

BankappBankview
		.factory(
				'bankComponentService',
				function() {
					var inputComponent_url = '';
					var showComponent_url = 'mainTopicTemplates/bankSubpageTemplates/bankOverView.html';
					return {
						setInputComponent_url : function(str) {
							inputComponent_url = str;
						},

						getInputComponent_url : function() {
							return inputComponent_url;
						},

						setShowComponent_url : function(str) {
							showComponent_url = str;
						},

						getShowComponent_url : function() {
							return showComponent_url;
						}
					}
				})