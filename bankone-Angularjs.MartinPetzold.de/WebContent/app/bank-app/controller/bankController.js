'use strict';

/* Controllers */
var BankappBankview = angular.module('bankapp.bankview', []);

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
			$scope.loadData();
		} ]);