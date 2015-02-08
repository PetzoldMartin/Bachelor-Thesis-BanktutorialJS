'use strict';

/**
 * Modul zur Verwaltung von Banken und der Ansichten von Banken
 */
var BankappBankview = angular.module( 'bankapp.bankview', [
		 'bankapp.subview'

] );
/**
 * Controller zur Verwaltung des Bankenkomponentenrahmens
 */
BankappBankview.controller( 'bankComponentCtrl', [
		'$scope', 'subComponentService', function ( $scope, subComponentService, BreadcrumbService ) {
			//Models zum Laden der Ausprägungen der Bankenanzeige
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
			//Methode zur Auswahl aus einer Bankenübersicht
			/**
			 * param oid Identifikationsnummer der Ausgewählten Bank
			 */
			$scope.click = function ( oid ) {
				manipulate.id = oid;
				subComponentService.setComponent(manipulate);
			}
			//Überwachung von Änderungen des subComponentService
			$scope.$watch( function () {
				return subComponentService.getActuallComponent();
			}, function(){
				$scope.Component_Lvl1 = subComponentService.getActuallComponent();
				
			} );
		}
] );
/**
 * Controller für die Bankenübersicht
 */
BankappBankview.controller( 'bankListCtrl', [
		'$scope', '$http', 'searchService','arreyspliceByObjectId', function ( $scope, $http, searchService ,arreyspliceByObjectId) {
			$scope.query = "";
			//Methode zum Laden der Übersichtsdaten über REST
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
			//Überwachung des Searchservice auf Einschränkung der Übersicht
			$scope.$watch(function(){
				if ( searchService.getBankIds() != "" ) {
					$scope.banks = arreyspliceByObjectId.spliceByID( $scope.banks, searchService.getBankIds() );
					$scope.newAvaible = false;
				}
			});
			//Überwachung des Searchservice auf eine Sucheingabe
			$scope.$watch( function () {
				return searchService.getSearchColumn()
			} ,function(newValue, oldValue){
				$scope.query = searchService.getSearchColumn()
			});
		}
] );
/**
 * Controller für die Ansicht zum Erstellen ,Löschen und Updaten einer Bank
 */
BankappBankview.controller( 'bankviewCtrl', [
		'$scope', '$http', 'subComponentService', 'mainPageService', 'searchService', function ( $scope, $http, subComponentService, mainPageService, searchService ) {
			// Initializierung
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

			//Bank Datenstub
			$scope.bank = {
				"name" : "",
				"sortCode" : "",
				"contacts" : []
			};
			// Function zur Anzeige und Eintragung eines neuen Contacts in die Bandaten
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
			// Function zum Laden von Bankdaten über REST
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
			// Initializierung
			$scope.orderProp = 'name';
			$scope.loadData();
			// Function zur Rückkehr zur Bankenübersicht 
			$scope.setSubComponentLvl2 = function () {
				subComponentService.stepBack();
			}
			// Function zum Speichern und Updaten von Bankdaten über REST
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
			//Function zum Löschen austragen eines Accounts aus den Bankdaten
			/**
			 * param $index index des Zu löschenden Accounts in den Bankdaten
			 */
			$scope.deleteContact = function ( $index ) {
				$scope.bank.contacts.splice( $index, 1 );
			}
			//Function zum Löschen einer Bank über REST
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
			//Function zum Aufruf der Übersicht von zur Bank zuggeordneten Customers
			$scope.showCustomerByBank = function () {
				subComponentService.reset();
				mainPageService.setTopicid( 3 );
				searchService.setCustomerIds( $scope.customerIds );
			}
			//Function zum Aufruf der Übersicht von zur Bank zuggeordneten Accounts
			$scope.showAccountByBank = function () {
				subComponentService.reset();
				mainPageService.setTopicid( 4 );
				searchService.setAccountIds( $scope.accountIds );
			}
		}
] );
