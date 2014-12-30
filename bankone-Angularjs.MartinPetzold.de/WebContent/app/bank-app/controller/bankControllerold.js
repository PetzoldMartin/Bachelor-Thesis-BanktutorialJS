'use strict';

/* Controllers */
var BankappBankview = angular.module( 'bankapp.bankviewold', [] );

BankappBankview.controller( 'bankListCtrl', [
		'$scope', '$http',

		function ( $scope, $http ) {
			$scope.loadData = function () {
				$http.get( 'http://localhost:8080/bankone/rest/bankREST' ).success( function ( data ) {
					$scope.banks = data;
					$scope.status = true;
				} ).error( function ( data, status, headers, config ) {
					$scope.status = false;
				} );
			};
			$scope.test = "test";
			$scope.loadData();
			$scope.orderProp = 'name';

			$scope.add = function () {

				if ( $scope.blzInput.blz.$valid && $scope.blzInput.blz.$dirty ) {
					$http( {
						withCredentials : false,
						method : 'post',
						url : 'http://localhost:8080/bankone/rest/bankREST',
						data : {
							name : $scope.name,
							sortCode : $scope.blzInput.blz.$viewValue
						}

					} ).success( function () {
						$scope.loadData();
					} )
				}
			};
			$scope.put = function () {

				if ( $scope.blzInput.blz.$valid && $scope.blzInput.blz.$dirty ) {
					$http( {
						withCredentials : false,
						method : 'put',
						url : 'http://localhost:8080/bankone/rest/bankREST',
						data : {
							id : $scope.id,
							name : $scope.name,
							sortCode : $scope.blzInput.blz.$viewValue
						}

					} ).success( function () {
						$scope.loadData();
					} )
				}
			};
			$scope.del = function () {
				$http( {
					withCredentials : false,
					method : 'delete',
					url : 'http://localhost:8080/bankone/rest/bankREST' + '/' + $scope.id,

				} ).success( function () {
					$scope.loadData();
				} )

			};
			$scope.refresh = function () {
				$scope.loadData();
			};
		}

] );
