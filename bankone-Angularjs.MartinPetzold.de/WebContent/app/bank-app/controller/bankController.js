'use strict';

/* Controllers */
var BankappBankview = angular.module( 'bankapp.bankview', [
		 'bankapp.subview'

] );

BankappBankview.controller( 'bankComponentCtrl', [
		'$scope', 'subComponentService', function ( $scope, subComponentService, BreadcrumbService ) {

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
			subComponentService.reset();
			subComponentService.setComponent(overview);
			$scope.click = function ( oid ) {
				manipulate.id = oid;
				subComponentService.setComponent(manipulate);
			}
			$scope.$watch( function () {
				return subComponentService.getActuallComponent();
			}, function(){
				$scope.Component_Lvl1 = subComponentService.getActuallComponent();
				
			} );
		}
] );

BankappBankview.controller( 'bankListCtrl', [
		'$scope', '$http', 'searchService','arreyspliceByObjectId', function ( $scope, $http, searchService ,arreyspliceByObjectId) {
			$scope.query = "";
			
			$scope.loadData = function () {
				$http.get( '../../../../bankone/rest/bankREST' ).success( function ( data ) {
					$scope.banks = data;
					$scope.newAvaible = true;

					if ( searchService.getBankIds() != "" ) {
						$scope.banks = arreyspliceByObjectId.spliceByID( $scope.banks, searchService.getBankIds() );
						$scope.newAvaible = false;
					}
				} ).error( function () {
					alert("Kein Bankenübersichtservice vorhanden")
				} );
			};
			$scope.orderProp = 'name';
			$scope.loadData();
			$scope.$watch(function(){
				if ( searchService.getBankIds() != "" ) {
					$scope.banks = arreyspliceByObjectId.spliceByID( $scope.banks, searchService.getBankIds() );
					$scope.newAvaible = false;
				}
			});
			$scope.$watch( function () {
				return searchService.getSearchColumn()
			} ,function(newValue, oldValue){
				$scope.query = searchService.getSearchColumn()
			});
		}
] );

BankappBankview.controller( 'bankviewCtrl', [
		'$scope', '$http', 'subComponentService', 'mainPageService', 'searchService', function ( $scope, $http, subComponentService, mainPageService, searchService ) {
			// Initialization of the Controller
			$scope.iddata = subComponentService.getActuallComponent();
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
							alert("Kein Service vorhanden um Konten anhand der Bank Auszulesen")
						} )

					} ).error( function ( data, status, headers, config ) {
						alert("bank nicht vorhanden")
					} );
				}
			};
			// Initialize and Loaddata
			$scope.orderProp = 'name';
			$scope.loadData();
			// function for cancel
			$scope.setSubComponentLvl2 = function () {
				subComponentService.stepBack();
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
						data : $scope.bank

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
				} ).error( function ( data, status, headers, config ) {
					alert("Die Bank hat noch Registrierte Konten")
				} )
			}
			$scope.showCustomerByBank = function () {
				subComponentService.reset();
				mainPageService.setTopicid( 3 );
				searchService.setCustomerIds( $scope.customerIds );
			}
			$scope.showAccountByBank = function () {
				subComponentService.reset();
				mainPageService.setTopicid( 4 );
				searchService.setAccountIds( $scope.accountIds );
			}
		}
] );
