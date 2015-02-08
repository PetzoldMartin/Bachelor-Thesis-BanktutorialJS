'use strict';

/**
 * Modul zur Verwaltung von Accounts und der Ansichten von Accounts
 */
var BankappAccountview = angular.module( 'bankapp.accountview', [
		 'bankapp.subview'
] );
/**
 * Controller zur Verwaltung des Account(Konten)Komponentenrahmens
 */
BankappAccountview.controller( 'accountComponentCtrl', [
		'$scope', 'subComponentService',  function ( $scope, subComponentService ) {
			//Models zum Laden der Ausprägungen der Accountanzeige
			var overview = {
				"id" : 1,
				"name" : "Kontenübersicht",
				"url" : 'mainTopicTemplates/accountSubpageTemplates/accountOverView.html'
			}
			var manipulate = {
				"id" : "undefined",
				"name" : "Konto bearbeiten",
				"url" : 'mainTopicTemplates/accountSubpageTemplates/accountManipulate.html'
			}
			var makeNew = {
				"id" : "undefined",
				"name" : "Konto erstellen",
				"url" : 'mainTopicTemplates/accountSubpageTemplates/newAccount.html'
			}
			subComponentService.reset();
			subComponentService.setComponent( overview);
			//Methode zur Auswahl aus einer Accountübersicht
			/**
			 * param oid Identifikationsnummer des Ausgewählten Accounts
			 */
			$scope.click = function ( oid ) {
				manipulate.id = oid;
				if ( oid != "undefined" ) {
					subComponentService.setComponent( manipulate);
				} else {
					subComponentService.setComponent( makeNew );
				}
			}
			//Überwachung von Änderungen des subComponentService
			$scope.$watch( function () {
				return subComponentService.getActuallComponent();
			} ,function(newValue, oldValue){
				$scope.Component_Lvl1 = subComponentService.getActuallComponent();
			});
		}
] );
/**
 * Controller für die Accountübersicht
 */
BankappAccountview.controller( 'accountListCtrl', [
		'$scope', '$http', 'searchService', 'arreyspliceByObjectId', 'subComponentService', function ( $scope, $http, searchService, arreyspliceByObjectId, subComponentService ) {
			$scope.query = "";
			//Methode zum Laden der Übersichtsdaten über REST
			$scope.loadData = function () {
				$http.get( '../../../../bankone/rest/abstractAccountREST' ).success( function ( data ) {
					$scope.accounts = data;
					$scope.newAvaible = true;
				} ).error( function () {
					alert("Accountsübersichtservice nicht vorhanden")
				} );
			};	
			
			$scope.orderProp = 'id';
			$scope.loadData();
			//Überwachung des Searchservice auf Einschränkung der Übersicht
			$scope.$watch(function(){
				if ( searchService.getAccountIds() != "" ) {
					$scope.accounts = arreyspliceByObjectId.spliceByID( $scope.accounts, searchService.getAccountIds() );
					$scope.newAvaible = false;
				}
			});
			//Überwachung des Searchservice auf eine Sucheingabe
			$scope.$watch( function () {
				return searchService.getSearchColumn()
			},function(newValue, oldValue){
				$scope.query = searchService.getSearchColumn()
			} );
		}
] );
/**
 * Controller für die Ansicht eines speziellen Accounts
 */
BankappAccountview.controller( 'accountViewCtrl', [
		'$scope', '$http', 'subComponentService', 'mainPageService', 'searchService', function ( $scope, $http, subComponentService, mainPageService, searchService ) {
			$scope.iddata = subComponentService.getActuallComponent();
			// Load Function zum Laden von Accountdaten über REST
			$scope.loadData = function () {	
				if ( $scope.iddata.name == "Konto bearbeiten" ) {
					$scope.nid=$scope.iddata.id
				}else{
					$scope.nid=subComponentService.getActuallComponent().id
				}
						$http.get( '../../../../bankone/rest/abstractAccountREST' + '/' + $scope.nid ).success( function ( data ) {
							$scope.account = data;
						} ).error( function ( data, status, headers, config ) {
								alert("Konto nicht vorhanden")
						} )			
			};
			$scope.loadData();
			// Function zur Rückkehr zur Accountübersicht 
			$scope.setSubComponentLvl2 = function () {
				subComponentService.stepBack('');
			}
			// Function zum Löschen eines Accounts über REST 
			$scope.deleteAccount = function () {
				$http( {
					withCredentials : false,
					method : 'delete',
					url : '../../../../bankone/rest/abstractAccountREST' + '/' + $scope.account.id,
				} ).success( function () {
					$scope.setSubComponentLvl2()
				} )
			}
			//Function zum Aufruf der Übersicht vom des zum Account zuggeordneten Customers
			$scope.showCustomerByAccount = function () {
				subComponentService.reset();
				mainPageService.setTopicid( 3 );
				searchService.setCustomerIds( [
					$scope.account.owner.id
				] );
			}
			//Function zum Aufruf der Übersicht vom des zum Account zuggeordneten Bank
			$scope.showBankByAccount = function () {
				subComponentService.reset();
				mainPageService.setTopicid( 2 );
				searchService.setBankIds( [
					$scope.account.bank.id
				] );
			}
			//Function zum Aufruf der Überweisungsauswahl des Accounts
			$scope.accountTransfer = function () {
				subComponentService.reset();
				mainPageService.setTopicid( 5 );
				searchService.setAccountIds( [
					$scope.account.id
				] );
			}
		}
] )
/**
 * Controller für die Ansicht zur neuerstellung eines Accounts
 */
BankappAccountview.controller( 'accountMakeCtrl', [
		'$scope', '$http', 'subComponentService',  'searchService', function ( $scope, $http, subComponentService, searchService ) {
			$scope.customer = 'mainTopicTemplates/customerSubpageTemplates/customerOverView.html'
			$scope.bank = 'mainTopicTemplates/bankSubpageTemplates/bankOverView.html'
			//Datenstub für einen neuen Account
			$scope.newAccount = {
				'balance' : 0,
				'bank' : {
					'id' : ''
				},
				'owner' : {
					'id' : ''
				}
			};
			//Arrey der Accountarten
			$scope.accountType = [
					"CheckingAccount", "SavingsAccount", "FlexibleSavingsAccount"
			];
			searchService.setCustomerIds( "all" );
			searchService.setBankIds( "all" );
			// Function zum setzen des Accountypes
			/**
			 * param type Accounttype
			 */
			$scope.set = function ( type ) {
				$scope.typeQuery = type
			}
			//Function zum erstellen eines neuen Accounts durch REST
			$scope.newacc = function () {
					$http( {
						withCredentials : false,
						method : 'post',
						url : '../../../../bankone/rest/abstractAccountREST/'+$scope.typeQuery,
						data : $scope.newAccount
					} ).success( function () {
						$scope.autoregisterCustomerAtBank( $scope.newAccount.bank.id, $scope.newAccount.owner.id );
						subComponentService.stepBack();
						
					} ).error( function () {
						alert("eine Auswahl wurde nicht getroffen")
					} )	
			}
			//Function zur Auswertung einer Auswahl bei der Accounterstellung
			/**
			 * param bid Identifikationsnummer der Auswahl
			 * param kind Art der Auswahl
			 */
			$scope.click = function ( bid, kind ) {
				if ( kind == "customer" ) {
					searchService.setCustomerIds( [
						bid
					] );
					$scope.newAccount.owner.id = bid;
					
				}
				if ( kind == "bank" ) {
					searchService.setBankIds( [
						bid
					] );
					$scope.newAccount.bank.id = bid;
				}
			}
			//Function zur überprüfung der Registrierung und automatischen Registrierung eines Customers bei einer Bank
			/**
			 * param bankid Identifikationsnummer der Bank
			 * param customerid Identifikationsnummer des Customers
			 */
			$scope.autoregisterCustomerAtBank = function ( bankid, customerid ) {
				$http.get( '../../../../bankone/rest/bankREST' + '/' + bankid ).success( function ( data ) {
					$scope.bank = data;
					$scope.hit = false
					angular.forEach( $scope.bank.customers, function ( c ) {
						if ( c.id == customerid ) {
							$scope.hit = true
						}
					} )
					if ( $scope.hit == false ) {
						$http.get( '../../../../bankone/rest/customerREST' + '/' + customerid ).success( function ( data ) {
							$scope.customer = data;

							$scope.bank.customers.push( $scope.customer )
							$http( {
								withCredentials : false,
								method : 'put',
								url : '../../../../bankone/rest/bankREST',
								data : $scope.bank
							} )
						} )
					}
				} );
			}
		}
] );