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
			subComponentService.setComponent_Lvl1( overview );
			BreadcrumbService.setBreadcrumbLvl2( overview );
			$scope.Component_Lvl1 = subComponentService.getComponent_Lvl1();
			$scope.$watch( function () {
				return subComponentService.getComponent_Lvl1();
			},function(newValue, oldValue){
				$scope.Component_Lvl1 = subComponentService.getComponent_Lvl1();
			} );

			$scope.click = function ( oid ) {
				manipulate.id = oid;
				if ( oid != "undefined" ) {
					subComponentService.setComponent_Lvl1( manipulate );
					BreadcrumbService.setBreadcrumbLvl3( manipulate );
					$scope.Component_Lvl1 = subComponentService.getComponent_Lvl1();
				} else {
					subComponentService.setComponent_Lvl1( makeNew );
					BreadcrumbService.setBreadcrumbLvl3( makeNew );
				}

			}

		}
] );

BankappAccountview.controller( 'accountListCtrl', [
		'$scope', '$http', 'searchService', 'arreyspliceByObjectId', 'subComponentService', 'BreadcrumbService', function ( $scope, $http, searchService, arreyspliceByObjectId, subComponentService, BreadcrumbService ) {
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
			$scope.orderProp = 'id';
			$scope.loadData();
		}
] );

BankappAccountview.controller( 'accountViewCtrl', [
		'$scope', '$http', 'subComponentService', 'BreadcrumbService', 'mainPageService', 'searchService', function ( $scope, $http, subComponentService, BreadcrumbService, mainPageService, searchService ) {
			$scope.iddata = subComponentService.getComponent_Lvl1();

			// Load Function
			$scope.loadData = function () {	
				if ( $scope.iddata.name == "Konto bearbeiten" ) {
					$scope.nid=$scope.iddata.id
				}else{
					$scope.nid=BreadcrumbService.getBreadcrumbLvl4().id
				}
						$http.get( '../../../../bankone/rest/abstractAccountREST' + '/' + $scope.nid ).success( function ( data ) {
							$scope.account = data;
							$scope.status = true;
						} ).error( function ( data, status, headers, config ) {

							$scope.status = false;
						} )			
			};
			$scope.loadData();

			// Cancel Function
			$scope.setSubComponentLvl2 = function () {
				subComponentService.setComponent_Lvl1( BreadcrumbService.getBreadcrumbLvl2() );
				BreadcrumbService.setBreadcrumbLvl3( "" );
				BreadcrumbService.setBreadcrumbLvl4( "" );
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
				mainPageService.setTopicid( 3 );
				searchService.setCustomerIds( [
					$scope.account.owner.id
				] );
			}
			$scope.showBankByAccount = function () {
				mainPageService.setTopicid( 2 );
				searchService.setBankIds( [
					$scope.account.bank.id
				] );
			}
			$scope.accountTransfer = function () {
				mainPageService.setTopicid( 5 );
				searchService.setAccountIds( [
					$scope.account.id
				] );
			}
		}
] )

BankappAccountview.controller( 'accountMakeCtrl', [
		'$scope', '$http', 'subComponentService', 'BreadcrumbService', 'searchService', function ( $scope, $http, subComponentService, BreadcrumbService, searchService ) {
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
						subComponentService.setComponent_Lvl1( BreadcrumbService.getBreadcrumbLvl2() );
						BreadcrumbService.setBreadcrumbLvl3( "" );
						BreadcrumbService.setBreadcrumbLvl4( "" );
					} ).error( function ( data, status, headers, config ) {
						alert("eine Auswahl nicht getroffen")
					} )
				
			}

			$scope.click = function ( bid, kind ) {
				if ( kind == "customer" ) {
					$scope.customer = null
					searchService.setCustomerIds( [
						bid
					] );
					$scope.newAccount.owner.id = bid;
					setTimeout( function () {
						$scope.customer = 'mainTopicTemplates/customerSubpageTemplates/customerOverView.html'
					}, 1 )
				}
				if ( kind == "bank" ) {
					$scope.bank = null
					searchService.setBankIds( [
						bid
					] );
					$scope.newAccount.bank.id = bid;
					setTimeout( function () {
						$scope.bank = 'mainTopicTemplates/bankSubpageTemplates/bankOverView.html'

					}, 1 )
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