'use strict';

/* Controllers */
var BankappCustomerview = angular.module( 'bankapp.customerview', [
		'bankapp.search', 'bankapp.breadcrumb', 'bankapp.subview', 'bankapp.function'
] );

BankappCustomerview.controller( 'customerComponentCtrl', [
		'$scope', 'subComponentService', 'BreadcrumbService', function ( $scope, subComponentService, BreadcrumbService ) {
			var overview = {
				"id" : 1,
				"name" : "Kundenübersicht",
				"class" : "list-group-item active",
				"icon" : "glyphicon glyphicon-home",
				"clicked" : true,
				"url" : 'mainTopicTemplates/customerSubpageTemplates/customerOverView.html'
			}
			var manipulate = {
				"id" : "undefined",
				"name" : "Kunde bearbeiten",
				"class" : "list-group-item active",
				"icon" : "glyphicon glyphicon-home",
				"clicked" : true,
				"url" : 'mainTopicTemplates/customerSubpageTemplates/customerManipulate.html'
			}

			subComponentService.setComponent_Lvl1( overview );
			BreadcrumbService.setBreadcrumbLvl2( overview );
			$scope.Component_Lvl1 = subComponentService.getComponent_Lvl1();
			$scope.$watch( function () {
				return $scope.Component_Lvl1 = subComponentService.getComponent_Lvl1();
			} );

			$scope.click = function ( oid ) {
				manipulate.id = oid;
				subComponentService.setComponent_Lvl1( manipulate );
				BreadcrumbService.setBreadcrumbLvl3( manipulate );

				$scope.Component_Lvl1 = subComponentService.getComponent_Lvl1();

			}

			$scope.$watch( function () {
				return $scope.Component_Lvl2 = subComponentService.getComponent_Lvl2();
			} );
		}
] );

BankappCustomerview.controller( 'customerListCtrl', [
		'$scope', '$http', 'searchService', 'arreyspliceByObjectId', function ( $scope, $http, searchService, arreyspliceByObjectId ) {
			$scope.query = "";

			$scope.$watch( function () {
				return $scope.query = searchService.getSearchColumn()
			} );
			$scope.loadData = function () {
				$http.get( 'http://localhost:8080/bankone/rest/customerREST' ).success( function ( data ) {
					$scope.customers = data;
					$scope.newAvaible = true;
					// Filter the data by Id's
					if ( searchService.getIds() != "" ) {
						$scope.customers = arreyspliceByObjectId.spliceByID( $scope.customers, searchService.getIds() );
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

BankappCustomerview.controller( 'customerviewCtrl', [
		'$scope', '$http', 'subComponentService', 'BreadcrumbService', function ( $scope, $http, subComponentService, BreadcrumbService ) {
			$scope.iddata = subComponentService.getComponent_Lvl1();
			$scope.newContact = {
				"phone" : "",
				"mobilePhone" : "",
				"email" : "",
				"address" : {
					"street" : "",
					"houseNumber" : "",
					"zipCode" : "",
					"city" : ""
				}
			};
			$scope.customer = {
				"firstname" : "",
				"surname" : "",
				"contact" : []
			};
			$scope.loadData = function () {
				if ( ( $scope.iddata.id ) != "undefined" ) {
					$http.get( 'http://localhost:8080/bankone/rest/customerREST' + '/' + $scope.iddata.id ).success( function ( data ) {
						$scope.customer = data;
						$scope.status = true;
					} ).error( function ( data, status, headers, config ) {
						$scope.status = false;
					} );

				} else {
					$scope.customer.contact = $scope.newContact
				}
			};
			$scope.orderProp = 'name';
			$scope.loadData();
			// function for cancel
			$scope.setSubComponentLvl2 = function () {
				subComponentService.setComponent_Lvl1( BreadcrumbService.getBreadcrumbLvl2() );
				BreadcrumbService.setBreadcrumbLvl3( "" );
				BreadcrumbService.setBreadcrumbLvl4( "" );
			}
			$scope.saveCustomer = function () {
				if ( ( $scope.iddata.id ) == "undefined" ) {

					$http( {
						withCredentials : false,
						method : 'post',
						url : 'http://localhost:8080/bankone/rest/customerREST',
						data : $scope.customer

					} ).success( function () {
						$scope.setSubComponentLvl2()
					} )
				} else {
					$http( {
						withCredentials : false,
						method : 'put',
						url : 'http://localhost:8080/bankone/rest/customerREST',
						data : $scope.customer

					} ).success( function () {
						$scope.loadData();
					} )
				}
			}
			$scope.deleteCustomer = function () {
				$http( {
					withCredentials : false,
					method : 'delete',
					url : 'http://localhost:8080/bankone/rest/customerREST' + '/' + $scope.customer.id,

				} ).success( function () {
					$scope.setSubComponentLvl2()
				} )
			}
		}
] )
