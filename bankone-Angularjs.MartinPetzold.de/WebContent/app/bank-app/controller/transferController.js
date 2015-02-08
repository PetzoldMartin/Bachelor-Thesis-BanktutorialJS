'use strict';

/**
 * Modul zur Verwaltung von Überweisungsansichten
 */
var BankappTransfer = angular.module( 'bankapp.transfer', [
	'bankapp.subview'
] );
/**
 * Controller zur Verwaltung des Transferkomponentenrahmens
 */
BankappTransfer.controller( 'transferComponentCtrl', [
		'$scope', 'subComponentService', function ( $scope, subComponentService ) {
			//Models zum Laden der Ausprägungen der Überweisungsanzeigen
			var overview = {
				"id" : 1,
				"name" : "Verfügbare Konten",
				"url" : 'mainTopicTemplates/transferSubpageTemplates/transferOverView.html'
			}
			var manipulate = {
				"id" : "undefined",
				"name" : "Geldtransfer ausführen",
				"url" : 'mainTopicTemplates/transferSubpageTemplates/transferManipulate.html'
			}
			subComponentService.setComponent( overview);
			//Methode zur Auswahl aus einer Kontenübersicht zur Überweisungszuordnung
			/**
			 * param oid Identifikationsnummer des Ausgewählten Kontos
			 */
			$scope.click = function ( oid ) {
				manipulate.id = oid;
				subComponentService.setComponent( manipulate );
			}
			//Überwachung von Änderungen des subComponentService
			$scope.$watch( function () {
				return subComponentService.getActuallComponent();
			}, function ( newValue, oldValue ) {
				$scope.Component_Lvl1 = subComponentService.getActuallComponent();
			} );

		}
] );
/**
 * Controller für die Kontenübersicht zur Überweisungszuordnung
 */
BankappTransfer.controller( 'transferAccounts', [
		'$scope', '$http', 'subComponentService', 'searchService', function ( $scope, $http, subComponentService, searchService ) {
			if ( searchService.getAccountIds() == "" ) {
				searchService.setAccountIds( "all" );
			}
			$scope.account = 'mainTopicTemplates/accountSubpageTemplates/accountOverView.html'

		}

] )
/**
 * Controller für die Ansicht zur Tätigung einer Überweisung mit den Typen Ein- ,Auszahlung oder Überweisung
 */
BankappTransfer.controller( 'transferType', [
		'$scope', '$http', 'subComponentService',  'searchService', function ( $scope, $http, subComponentService, searchService ) {
			$scope.hasSub = true
			$scope.transferway = "";
			$scope.tempids = searchService.getAccountIds();
			$scope.filter = [];
			$scope.tempid='';
			// Function zum Laden des zur überweisung zugeordeneten Accounts und des filters für die möglichen Gegenaccounts
			$scope.load= function(){$http.get( '../../../../bankone/rest/abstractAccountREST' + '/' + subComponentService.getActuallComponent().id ).success( function ( data ) {
				$scope.account = data;
				{
					$http.get( '../../../../bankone/rest/abstractAccountREST' ).success( function ( data ) {
						$scope.accov = data;
					} ).success( function () {
						angular.forEach( $scope.accov, function ( acc ) {
							if ( acc.id != $scope.account.id ) {
								$scope.filter.push( acc.id )
							}
						} )
						searchService.setAccountIds( $scope.filter );
					} ).error( function () {
						alert("Server stellt keinen AccountÜbersichtsService zur verfügung")
					} );
				}
			} ).error( function () {
				alert("Account nicht vorhanden")
			} );}
			$scope.load()

			// 
			//Betrag für die Kontenmanipulation 
			$scope.ammount = {
				"value" : 0
			};
			$scope.accountto = null;
			$scope.accChoosen = false
			//überwachung zur Auswahl des Überweisungstyps zum ein und ausblenden der Gegenkontos
			$scope.$watch( 'transferway', function () {
				if ( $scope.transferway == "transfer" ) {
					$scope.accountto = 'mainTopicTemplates/accountSubpageTemplates/accountOverView.html';
					$scope.accChoosen = true;
				} else {
					$scope.accountto = null;
					$scope.accChoosen = false;
				}
			} )
			//Function zur Rückehr in die Gegenkontoauswahl
			$scope.accoverview = function () {
				$scope.accountto = 'mainTopicTemplates/accountSubpageTemplates/accountOverView.html';
				$scope.accChoosen = true;
			}
			//Function bei der Auswahl des Gegenkontos
			$scope.click = function ( id ) {
				$scope.tempid=id;
				$scope.accChoosen = true;
				$scope.accountto = 'mainTopicTemplates/transferSubpageTemplates/transferManipulateTemplates/ChoosenAcc.html';
				$http.get( '../../../../bankone/rest/abstractAccountREST' + '/' + id ).success( function ( data ) {
					$scope.accountTwo = data;
				} ).error( function () {
					alert("account nicht vorhanden")
				} );
			}
			//Function zum stezen des Überweisungsypes
			$scope.settype = function ( type ) {
				$scope.transferway = type;
			}
			//Function zur Rückehr in die auswahl zur auswahl des kontos für die Überweisung
			$scope.setSubComponentLvl2 = function () {
				searchService.setAccountIds( $scope.tempids );
				subComponentService.stepBack();
			}
			//Function zum Updaten von Accountdaten
			/**
			 * param type zu des Upzudatenden Accounts
			 * param updaccount Daten des upzudatendenden Accounts
			 */
			$scope.newacc = function ( type, updaccount ) {
				$http( {
					withCredentials : false,
					method : 'put',
					url : '../../../../bankone/rest/abstractAccountREST/' + type,
					data : updaccount

				} )

			}
			//Function zur eintragung eines Statements einen account
			/**
			 * param value wert des Statements
			 * param acc Account wo das Statement eingetragen wird
			 */
			$scope.make = function(value,acc){
				acc.balance = parseFloat( acc.balance ) + parseFloat( value );
				$scope.newStatement = {
					"date" : Date.now(),
					"content" : value
				};
				acc.statements.push( $scope.newStatement );
				$scope.newacc( acc.accountType, acc );
			}
			//Function zum Auslösen der Überweisung
			$scope.save = function () {
				$scope.load();
				$scope.click($scope.tempid);
				if ( $scope.transferway == "deposit" ) {
					$scope.make(+$scope.ammount.value,$scope.account)
				}
				if ( $scope.transferway == "withdraw" ) {
					$scope.make(-$scope.ammount.value,$scope.account)
				}
				if ( $scope.transferway == "transfer" ) {
					if ( !$scope.accountTwo ) {
						alert( "Kein Zielaccount ausgewählt" );
					} else {
						$scope.make(-$scope.ammount.value,$scope.account)
						$scope.make(+$scope.ammount.value,$scope.accountTwo)
					}
				}
				if ( $scope.transferway == "" ){
					alert("bitte Transeroption auswählen")
				}
				$scope.ammount.value = 0;
				$scope.accoverview();
			}

		}
] )