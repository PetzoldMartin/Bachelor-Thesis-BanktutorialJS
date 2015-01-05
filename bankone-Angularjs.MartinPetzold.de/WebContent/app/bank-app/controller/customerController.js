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
					if ( searchService.getCustomerIds() != "" ) {
						$scope.customers = arreyspliceByObjectId.spliceByID( $scope.customers, searchService.getCustomerIds() );
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
		'$scope', '$http', 'subComponentService', 'BreadcrumbService', 'searchService', function ( $scope, $http, subComponentService, BreadcrumbService ,searchService) {
			$scope.iddata = subComponentService.getComponent_Lvl1();

			$scope.accountIds = [
				     				0
				     			];
			$scope.accountByCustomer=''

			$scope.acd=false;

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
			var manipulate = {
					"name" : "Account des Kunden"
				
				}
			
			//Overide of the Click Method from customer for the account subview
			$scope.click = function ( oid ) {
				$scope.accountByCustomer='mainTopicTemplates/accountSubpageTemplates/accountManipulate.html'
					manipulate.id = oid;
				BreadcrumbService.setBreadcrumbLvl4( manipulate );
				$scope.acd=true;
			}
			$scope.accback = function () {
				$scope.accountByCustomer='mainTopicTemplates/accountSubpageTemplates/accountOverView.html'
					$scope.acd=false;
				BreadcrumbService.setBreadcrumbLvl4("");


			}
			//Load Function
			$scope.loadData = function () {
				if ( ( $scope.iddata.id ) != "undefined" ) {
					
					$http.get( 'http://localhost:8080/bankone/rest/customerREST' + '/' + $scope.iddata.id ).success( function ( data ) {
						$scope.customer = data;
						$scope.status = true;
						
					} ).success(function(data, status, headers, config) {
						
						$http.get( 'http://localhost:8080/bankone/rest/abstractAccountREST/customer/' + $scope.iddata.id ).success( function ( data ) {
							$scope.accounts = data;
							angular.forEach( $scope.accounts, function ( a ) {
								$scope.accountCount = $scope.accountCount + 1;
								$scope.accountIds.push( a.id );
							} );
							searchService.setAccountIds( $scope.accountIds );
							$scope.accountByCustomer='mainTopicTemplates/accountSubpageTemplates/accountOverView.html'

						} ).error( function ( data, status, headers, config ) {
							$scope.status = false;
						} )
					}).error( function ( data, status, headers, config ) {
						$scope.status = false;
					} );

				} else {
					$scope.customer.contact = $scope.newContact
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
			
			//Save Function
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
			
			//Delete Function
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
