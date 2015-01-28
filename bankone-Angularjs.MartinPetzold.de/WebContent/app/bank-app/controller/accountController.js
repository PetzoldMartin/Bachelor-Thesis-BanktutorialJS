'use strict';

/* Controllers */
var BankappAccountview = angular.module( 'bankapp.accountview', [
		 'bankapp.subview'
] );

BankappAccountview.controller( 'accountComponentCtrl', [
		'$scope', 'subComponentService',  function ( $scope, subComponentService ) {
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
			subComponentService.setComponent( overview );	
			$scope.click = function ( oid ) {
				manipulate.id = oid;
				if ( oid != "undefined" ) {
					subComponentService.setComponent( manipulate );
				} else {
					subComponentService.setComponent( makeNew );
				}
			}
			$scope.$watch( function () {
				return subComponentService.getActuallComponent();
			} ,function(newValue, oldValue){
				$scope.Component_Lvl1 = subComponentService.getActuallComponent();
			});
		}
] );

BankappAccountview.controller( 'accountListCtrl', [
		'$scope', '$http', 'searchService', 'arreyspliceByObjectId', 'subComponentService', function ( $scope, $http, searchService, arreyspliceByObjectId, subComponentService ) {
			$scope.query = "";
			$scope.$watch( function () {
				return searchService.getSearchColumn()
			},function(newValue, oldValue){
				$scope.query = searchService.getSearchColumn()
			} );
			$scope.loadData = function () {
				$http.get( '../../../../bankone/rest/abstractAccountREST' ).success( function ( data ) {
					$scope.accounts = data;
					$scope.newAvaible = true;
				} ).error( function ( ) {
					alert("Accountsübersichtservice nicht vorhanden")
				} );
			};	
			$scope.$watch(function(){
				if ( searchService.getAccountIds() != "" ) {
					$scope.accounts = arreyspliceByObjectId.spliceByID( $scope.accounts, searchService.getAccountIds() );
					$scope.newAvaible = false;
				}
			});
			$scope.orderProp = 'id';
			$scope.loadData();
		}
] );

BankappAccountview.controller( 'accountViewCtrl', [
		'$scope', '$http', 'subComponentService', 'mainPageService', 'searchService', function ( $scope, $http, subComponentService, mainPageService, searchService ) {
			$scope.iddata = subComponentService.getActuallComponent();
			// Load Function
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
			// Cancel Function
			$scope.setSubComponentLvl2 = function () {
				subComponentService.setComponent_Lvl2('');
			}
			// Delete Function
			$scope.deleteAccount = function () {
				$http( {
					withCredentials : false,
					method : 'delete',
					url : '../../../../bankone/rest/abstractAccountREST' + '/' + $scope.account.id,
				} ).success( function () {
					$scope.setSubComponentLvl2()
				} )
			}
			$scope.showCustomerByAccount = function () {
				subComponentService.reset();
				mainPageService.setTopicid( 3 );
				searchService.setCustomerIds( [
					$scope.account.owner.id
				] );
			}
			$scope.showBankByAccount = function () {
				subComponentService.reset();
				mainPageService.setTopicid( 2 );
				searchService.setBankIds( [
					$scope.account.bank.id
				] );
			}
			$scope.accountTransfer = function () {
				subComponentService.reset();
				mainPageService.setTopicid( 5 );
				searchService.setAccountIds( [
					$scope.account.id
				] );
			}
		}
] )

BankappAccountview.controller( 'accountMakeCtrl', [
		'$scope', '$http', 'subComponentService',  'searchService', function ( $scope, $http, subComponentService, searchService ) {
			$scope.customer = 'mainTopicTemplates/customerSubpageTemplates/customerOverView.html'
			$scope.bank = 'mainTopicTemplates/bankSubpageTemplates/bankOverView.html'
			$scope.newAccount = {
				'balance' : 0,
				'bank' : {
					'id' : 0
				},
				'owner' : {
					'id' : 0
				}
			};
			$scope.accountType = [
					"CheckingAccount", "SavingsAccount", "FlexibleSavingsAccount"
			];
			searchService.setCustomerIds( "all" );
			searchService.setBankIds( "all" );
			// $scope.typeQuery;
			$scope.set = function ( type ) {
				$scope.typeQuery = type
			}
			$scope.newacc = function () {
					$http( {
						withCredentials : false,
						method : 'post',
						url : '../../../../bankone/rest/abstractAccountREST/'+$scope.typeQuery,
						data : $scope.newAccount
					} ).success( function () {
						$scope.autoregisterCustomerAtBank( $scope.newAccount.bank.id, $scope.newAccount.owner.id );
						subComponentService.setComponent_Lvl2("");
						
					} ).error( function ( data, status, headers, config ) {
						alert("eine Auswahl wurde nicht getroffen")
					} )	
			}
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