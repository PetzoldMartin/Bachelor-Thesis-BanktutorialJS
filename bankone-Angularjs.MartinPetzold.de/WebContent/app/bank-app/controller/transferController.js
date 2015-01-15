'use strict';

/* Controllers */
var BankappTransfer = angular.module( 'bankapp.transfer', [
		'bankapp.search', 'bankapp.breadcrumb', 'bankapp.subview', 'bankapp.function'
] );

BankappTransfer.controller( 'transferComponentCtrl', [
		'$scope', 'subComponentService', 'BreadcrumbService', function ( $scope, subComponentService, BreadcrumbService ) {
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
			}

			
		}
] );

BankappTransfer.controller( 'transferAccounts', [
		'$scope', '$http', 'subComponentService', 'BreadcrumbService', 'searchService', function ( $scope, $http, subComponentService, BreadcrumbService, searchService ) {
			if ( searchService.getAccountIds() == "" ) {
				searchService.setAccountIds( "all" );
			}
			$scope.account = 'mainTopicTemplates/accountSubpageTemplates/accountOverView.html'

		}

] )

BankappTransfer.controller( 'transferType', [
		'$scope', '$http', 'subComponentService', 'BreadcrumbService', 'searchService', function ( $scope, $http, subComponentService, BreadcrumbService, searchService ) {
			$scope.hasSub=true
			$scope.transferway = "";
			$scope.tempids = searchService.getAccountIds();
			$scope.filter = [];
			// better filter
			$http.get( '../../../../bankone/rest/abstractAccountREST' + '/' + subComponentService.getComponent_Lvl1().id ).success( function ( data ) {
				$scope.account = data;
				$scope.status = true;
				{
					$http.get( '../../../../bankone/rest/abstractAccountREST' ).success( function ( data ) {
						$scope.accov = data;
						$scope.status = true;
					} ).success( function () {
						angular.forEach( $scope.accov, function ( acc ) {
							if ( acc.id != $scope.account.id ) {
								$scope.filter.push( acc.id )
							}
						} )
						searchService.setAccountIds( $scope.filter );
					} ).error( function ( data, status, headers, config ) {
						$scope.status = false;
					} );
				}
			} ).error( function ( data, status, headers, config ) {
				$scope.status = false;
			} );
			
			//$scope.exfilter()
			//
			$scope.ammount = {
				"value" : 0
			};
			$scope.accountto = null;
			$scope.accChoosen = false
			$scope.$watch( 'transferway', function () {
				if ( $scope.transferway == "transfer" ) {
					$scope.accountto = 'mainTopicTemplates/accountSubpageTemplates/accountOverView.html';
					$scope.accChoosen=true;
				} else {
					$scope.accountto = null;
					$scope.accChoosen=false;
				}
			} )

			$scope.accoverview = function () {
				$scope.accountto = 'mainTopicTemplates/accountSubpageTemplates/accountOverView.html';
				$scope.accChoosen=true;
			}
			$scope.click = function ( id ) {
				$scope.accChoosen = true;
				$scope.accountto = 'mainTopicTemplates/transferSubpageTemplates/transferManipulateTemplates/ChoosenAcc.html';
				$http.get( '../../../../bankone/rest/abstractAccountREST' + '/' + id ).success( function ( data ) {
					$scope.accountTwo = data;
					$scope.status = true;
				} ).error( function ( data, status, headers, config ) {

					$scope.status = false;
				} );
			}
			$scope.settype = function ( type ) {
				$scope.transferway = type;
			}
			$scope.setSubComponentLvl2 = function () {
				searchService.setAccountIds( $scope.tempids );
				subComponentService.setComponent_Lvl1( BreadcrumbService.getBreadcrumbLvl2() );
				BreadcrumbService.setBreadcrumbLvl3( "" );
				BreadcrumbService.setBreadcrumbLvl4( "" );
			}
			//vereinfachen
			$scope.newacc = function ( type, updaccount ) {
				if ( type == "CheckingAccount" ) {
					$http( {
						withCredentials : false,
						method : 'put',
						url : '../../../../bankone/rest/abstractAccountREST/CheckingAccount',
						data : updaccount

					} )
				} else {
					if ( type == "SavingsAccount" ) {
						$http( {
							withCredentials : false,
							method : 'put',
							url : '../../../../bankone/rest/abstractAccountREST/SavingsAccount',
							data : updaccount

						} )
					} else {
						if ( type == "FlexibleSavingsAccount" ) {
							$http( {
								withCredentials : false,
								method : 'put',
								url : '../../../../bankone/rest/abstractAccountREST/FlexibleSavingsAccount',
								data : updaccount

							} )
						} else {
							alert( "kein Accounttype Gewählt" )
						}
					}
				}
			}
			//vereinfachen renundanz
			$scope.save = function () {
				if ( $scope.transferway == "deposit" ) {
					$scope.account.balance = parseFloat( $scope.account.balance ) + parseFloat( $scope.ammount.value );
					$scope.newStatement = {
						"date" : Date.now(),
						"content" : $scope.ammount.value
					};
					$scope.account.statements.push( $scope.newStatement );
					$scope.newacc( $scope.account.accountType, $scope.account );
					$scope.ammount.value=0;
				}
				if ( $scope.transferway == "withdraw" ) {
					$scope.account.balance = parseFloat( $scope.account.balance ) - parseFloat( $scope.ammount.value )
					$scope.newStatement = {
						"date" : Date.now(),
						"content" : -$scope.ammount.value
					};
					$scope.account.statements.push( $scope.newStatement );
					$scope.newacc( $scope.account.accountType, $scope.account );
					$scope.ammount.value=0;
				}
				if ( $scope.transferway == "transfer" ) {
					if(!$scope.accountTwo){
						alert("Kein Zielaccount ausgewählt");
					}else{
					$scope.account.balance = parseFloat( $scope.account.balance ) - parseFloat( $scope.ammount.value );
					$scope.newStatement = {
							"date" : Date.now(),
							"content" : -$scope.ammount.value

						};
						$scope.account.statements.push( $scope.newStatement );
						$scope.newacc( $scope.account.accountType, $scope.account );
					$scope.accountTwo.balance = parseFloat( $scope.accountTwo.balance ) + parseFloat( $scope.ammount.value );
					$scope.newStatement = {
							"date" : Date.now(),
							"content" : $scope.ammount.value

						};
						$scope.accountTwo.statements.push( $scope.newStatement );
						$scope.newacc( $scope.accountTwo.accountType, $scope.accountTwo );
					$scope.ammount.value=0;}
				}

			}

		}
] )