'use strict';

/* Controllers */
var BankappBankview = angular.module( 'bankapp.bankview', [
		'bankapp.search', 'bankapp.breadcrumb', 'bankapp.subview', 'bankapp.function'
] );

BankappBankview.controller( 'bankComponentCtrl', [
		'$scope', 'subComponentService', 'BreadcrumbService', function ( $scope, subComponentService, BreadcrumbService ) {

			var overview = {
				"id" : 1,
				"name" : "Bankenübersicht",
				"url" : 'mainTopicTemplates/bankSubpageTemplates/bankOverView.html'
			}
			var manipulate = {
				"id" : "undefined",
				"name" : "Bank bearbeiten",
				"url" : 'mainTopicTemplates/bankSubpageTemplates/bankManipulate.html'
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

			
		}
] );

BankappBankview.controller( 'bankListCtrl', [
		'$scope', '$http', 'searchService','arreyspliceByObjectId', function ( $scope, $http, searchService ,arreyspliceByObjectId) {
			$scope.query = "";
			$scope.$watch( function () {
				return $scope.query = searchService.getSearchColumn()
			} );
			$scope.loadData = function () {
				$http.get( '../../../../bankone/rest/bankREST' ).success( function ( data ) {
					$scope.banks = data;
					$scope.newAvaible = true;

					if ( searchService.getBankIds() != "" ) {
						$scope.banks = arreyspliceByObjectId.spliceByID( $scope.banks, searchService.getBankIds() );
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

BankappBankview.controller( 'bankviewCtrl', [
		'$scope', '$http', 'subComponentService', 'BreadcrumbService', 'mainPageService', 'searchService', function ( $scope, $http, subComponentService, BreadcrumbService, mainPageService, searchService ) {
			// Initialization of the Controller
			$scope.iddata = subComponentService.getComponent_Lvl1();
			$scope.customerCount = 0;
			$scope.accountCount = 0;
			$scope.addnew = false;
			$scope.customerIds = [
				0
			];
			$scope.accountIds = [
				0
			];


			$scope.bank = {
				"name" : "",
				"sortCode" : "",
				"contacts" : []
			};
			// Function for Triggering new Contact View
			$scope.triggerAddNew = function () {
				$scope.tempContact = {
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
				$scope.bank.contacts.push( $scope.tempContact );
			}
			// Function for loading Showing Data
			$scope.loadData = function () {
				if ( ( $scope.iddata.id ) != "undefined" ) {
					$http.get( '../../../../bankone/rest/bankREST' + '/' + $scope.iddata.id ).success( function ( data ) {
						$scope.bank = data;
						$scope.status = true;
						angular.forEach( $scope.bank.customers, function ( c ) {
							$scope.customerCount = $scope.customerCount + 1;
							$scope.customerIds.push( c.id );
						} );
						$http.get( '../../../../bankone/rest/abstractAccountREST/bank/' + $scope.iddata.id ).success( function ( data ) {
							$scope.accounts = data;
							angular.forEach( $scope.accounts, function ( a ) {
								$scope.accountCount = $scope.accountCount + 1;
								$scope.accountIds.push( a.id );
							} );
						} ).error( function ( data, status, headers, config ) {
							$scope.status = false;
						} )

					} ).error( function ( data, status, headers, config ) {
						$scope.status = false;
					} );
				}
			};
			// Initialize and Loaddata
			$scope.orderProp = 'name';
			$scope.loadData();
			// function for cancel
			$scope.setSubComponentLvl2 = function () {
				subComponentService.setComponent_Lvl1( BreadcrumbService.getBreadcrumbLvl2() );
				BreadcrumbService.setBreadcrumbLvl3( "" );
				BreadcrumbService.setBreadcrumbLvl4( "" );
			}
			// save Function
			$scope.saveBank = function () {

				if ( ( $scope.iddata.id ) == "undefined" ) {
					$http( {
						withCredentials : false,
						method : 'post',
						url : '../../../../bankone/rest/bankREST',
						data : {
							name : $scope.bank.name,
							sortCode : $scope.bank.sortCode,
							contacts : $scope.bank.contacts
						}

					} ).success( function () {
						alert("Bank gespeichert")
						$scope.setSubComponentLvl2()
					} )
				} else {
					$http( {
						withCredentials : false,
						method : 'put',
						url : '../../../../bankone/rest/bankREST',
						data : {
							id : $scope.bank.id,
							name : $scope.bank.name,
							sortCode : $scope.bank.sortCode,
							contacts : $scope.bank.contacts,
							customers : $scope.bank.customers

						}

					} ).success( function () {
						$scope.loadData();
					} )
				}

			}
			$scope.deleteContact = function ( $index ) {
				$scope.bank.contacts.splice( $index, 1 );
			}
			$scope.deleteBank = function () {
				$http( {
					withCredentials : false,
					method : 'delete',
					url : '../../../../bankone/rest/bankREST' + '/' + $scope.bank.id,

				} ).success( function () {
					$scope.setSubComponentLvl2()
					alert("Bank wurde gelöscht")
				} )
			}
			$scope.showCustomerByBank = function () {
				mainPageService.setTopicid( 3 );
				searchService.setCustomerIds( $scope.customerIds );
			}
			$scope.showAccountByBank = function () {
				mainPageService.setTopicid( 4 );
				searchService.setAccountIds( $scope.accountIds );
			}
		}
] );
