'use strict';

/* Controllers */
var BankappAccountview = angular.module( 'bankapp.accountview', [
		'bankapp.search', 'bankapp.breadcrumb', 'bankapp.subview', 'bankapp.function'
] );

BankappAccountview.controller( 'accountComponentCtrl', [
		'$scope', 'subComponentService', 'BreadcrumbService', function ( $scope, subComponentService, BreadcrumbService ) {
			var overview = {
				"id" : 1,
				"name" : "Kontenübersicht",
				"class" : "list-group-item active",
				"icon" : "glyphicon glyphicon-home",
				"clicked" : true,
				"url" : 'mainTopicTemplates/accountSubpageTemplates/accountOverView.html'
			}
			var manipulate = {
				"id" : "undefined",
				"name" : "Konto bearbeiten",
				"class" : "list-group-item active",
				"icon" : "glyphicon glyphicon-home",
				"clicked" : true,
				"url" : 'mainTopicTemplates/accountSubpageTemplates/accountManipulate.html'
			}
			var makeNew = {
				"id" : "undefined",
				"name" : "Konto bearbeiten",
				"class" : "list-group-item active",
				"icon" : "glyphicon glyphicon-home",
				"clicked" : true,
				"url" : 'mainTopicTemplates/accountSubpageTemplates/newAccount.html'
			}
			subComponentService.setComponent_Lvl1( overview );
			BreadcrumbService.setBreadcrumbLvl2( overview );
			$scope.Component_Lvl1 = subComponentService.getComponent_Lvl1();
			$scope.$watch( function () {
				return $scope.Component_Lvl1 = subComponentService.getComponent_Lvl1();
			} );

			$scope.click = function ( oid ) {
				if ( oid != "undefined" ) {
					manipulate.id = oid;
					subComponentService.setComponent_Lvl1( manipulate );
					BreadcrumbService.setBreadcrumbLvl3( manipulate );

					$scope.Component_Lvl1 = subComponentService.getComponent_Lvl1();
				} else {
					manipulate.id = oid;
					subComponentService.setComponent_Lvl1( makeNew );
					BreadcrumbService.setBreadcrumbLvl3( makeNew );
				}

			}

			$scope.$watch( function () {
				return $scope.Component_Lvl2 = subComponentService.getComponent_Lvl2();
			} );
		}
] );

BankappAccountview.controller( 'accountListCtrl', [
		'$scope', '$http', 'searchService', 'arreyspliceByObjectId', 'subComponentService', 'BreadcrumbService', function ( $scope, $http, searchService, arreyspliceByObjectId, subComponentService, BreadcrumbService ) {
			$scope.query = "";

			$scope.$watch( function () {
				return $scope.query = searchService.getSearchColumn()
			} );
			$scope.loadData = function () {
				$http.get( 'http://localhost:8080/bankone/rest/abstractAccountREST' ).success( function ( data ) {
					$scope.accounts = data;
					$scope.newAvaible = true;
					// Filter the data by Id's
					if ( searchService.getAccountIds() != "" ) {
						$scope.accounts = arreyspliceByObjectId.spliceByID( $scope.accounts, searchService.getAccountIds() );
						$scope.newAvaible = false;
					}
					$scope.status = true;
				} ).error( function ( data, status, headers, config ) {
					$scope.status = false;
				} );
			};

			$scope.orderProp = 'name';
			$scope.loadData();

		}
] );

BankappAccountview.controller( 'accountViewCtrl', [
		'$scope', '$http', 'subComponentService', 'BreadcrumbService', function ( $scope, $http, subComponentService, BreadcrumbService ) {
			$scope.iddata = subComponentService.getComponent_Lvl1();

			$scope.newAccount = {
				"balance" : 0,
				"accountType" : "",
				"bank" : [],
				"owner" : []
			};

			// Load Function
			$scope.loadData = function () {
				if ( $scope.iddata.name == "Konto bearbeiten" ) {
					if ( ( $scope.iddata.id ) != "undefined" ) {
						$http.get( 'http://localhost:8080/bankone/rest/abstractAccountREST' + '/' + $scope.iddata.id ).success( function ( data ) {
							$scope.account = data;
							$scope.status = true;
						} ).error( function ( data, status, headers, config ) {

							$scope.status = false;
						} );

					} else {
						$scope.account = $scope.newAccount
					}
				} else {
					$http.get( 'http://localhost:8080/bankone/rest/abstractAccountREST' + '/' + BreadcrumbService.getBreadcrumbLvl4().id ).success( function ( data ) {
						$scope.account = data;
						$scope.status = true;
					} ).error( function ( data, status, headers, config ) {

						$scope.status = false;
					} );
				}
			};
			$scope.orderProp = 'name';
			$scope.loadData();

			// Cancel Function
			$scope.setSubComponentLvl2 = function () {
				subComponentService.setComponent_Lvl1( BreadcrumbService.getBreadcrumbLvl2() );
				BreadcrumbService.setBreadcrumbLvl3( "" );
				BreadcrumbService.setBreadcrumbLvl4( "" );
			}

			// Save Function
			$scope.saveCustomer = function () {
				if ( ( $scope.iddata.id ) == "undefined" ) {

					$http( {
						withCredentials : false,
						method : 'post',
						url : 'http://localhost:8080/bankone/rest/abstractAccountREST',
						data : $scope.account

					} ).success( function () {
						$scope.setSubComponentLvl2()
					} )
				} else {
					$http( {
						withCredentials : false,
						method : 'put',
						url : 'http://localhost:8080/bankone/rest/abstractAccountREST',
						data : $scope.account

					} ).success( function () {
						$scope.loadData();
					} )
				}
			}

			// Delete Function
			$scope.deleteCustomer = function () {
				$http( {
					withCredentials : false,
					method : 'delete',
					url : 'http://localhost:8080/bankone/rest/abstractAccountREST' + '/' + $scope.account.id,

				} ).success( function () {
					$scope.setSubComponentLvl2()
				} )
			}
		}
] )