'use strict';

/* Controllers */
var BankappCustomerview = angular.module( 'bankapp.customerview', [
		 'bankapp.subview'
] );

BankappCustomerview.controller( 'customerComponentCtrl', [
		'$scope', 'subComponentService',  function ( $scope, subComponentService ) {
			var overview = {
				"id" : 1,
				"name" : "Kundenübersicht",
				"url" : 'mainTopicTemplates/customerSubpageTemplates/customerOverView.html'
			}
			var manipulate = {
				"id" : "undefined",
				"name" : "Kunde bearbeiten",
				"url" : 'mainTopicTemplates/customerSubpageTemplates/customerManipulate.html'
			}
			subComponentService.reset();
			subComponentService.setComponent_Lvl1( overview );			

			$scope.click = function ( oid ) {
				manipulate.id = oid;
				subComponentService.setComponent_Lvl2( manipulate );
			}
			$scope.$watch( function () {
				return subComponentService.getActuallComponent();
			} ,function(newValue, oldValue){
				$scope.Component_Lvl1 = subComponentService.getActuallComponent();
			});
			
		}
] );

BankappCustomerview.controller( 'customerListCtrl', [
		'$scope', '$http', 'searchService', 'arreyspliceByObjectId', function ( $scope, $http, searchService, arreyspliceByObjectId ) {
			$scope.query = "";

			$scope.$watch( function () {
				return searchService.getSearchColumn()
			},function(newValue, oldValue){
				$scope.query = searchService.getSearchColumn()
			} );
			$scope.loadData = function () {
				$http.get( '../../../../bankone/rest/customerREST' ).success( function ( data ) {
					$scope.customers = data;
					$scope.newAvaible = true;
					// Filter the data by Id's
					if ( searchService.getCustomerIds() != "" ) {
						$scope.customers = arreyspliceByObjectId.spliceByID( $scope.customers, searchService.getCustomerIds() );
						$scope.newAvaible = false;
					}
				} ).error( function ( data, status, headers, config ) {
					alert("Kundenübersichtservice nicht vorhanden");
				} );
			};
			$scope.orderProp = 'name';
			$scope.loadData();
			
		}
] );

BankappCustomerview.controller( 'customerviewCtrl', [
		'$scope', '$http', 'subComponentService', 'searchService', function ( $scope, $http, subComponentService,searchService) {
			$scope.accountByCustomer=''
			$scope.iddata = subComponentService.getComponent_Lvl2();
			$scope.hasSub=true
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
			
			//Overide of the Click Method from customer for the account subview
			$scope.click = function ( oid ) {
				$scope.tc=angular.copy(subComponentService.getComponent_Lvl2())
				$scope.tc.name="Account "+ oid +" des Kunden"
				$scope.tc.id = oid;
				subComponentService.setComponent_Lvl3($scope.tc);
				$scope.accountByCustomer='mainTopicTemplates/accountSubpageTemplates/accountManipulate.html'	
				$scope.acd=true;
			}
			$scope.accback = function () {
				$scope.accountByCustomer='mainTopicTemplates/accountSubpageTemplates/accountOverView.html'
					$scope.acd=false;
				subComponentService.setComponent_Lvl3("");
			}
			$scope.$watch( function () {
				return subComponentService.getComponent_Lvl3();
			} ,function(newValue, oldValue){
				if(newValue==''){
					$scope.accback();
				}
			});
			//Load Function
			$scope.loadData = function () {
				if ( ( $scope.iddata.id ) != "undefined" ) {					
					$http.get( '../../../../bankone/rest/customerREST' + '/' + $scope.iddata.id ).success( function ( data ) {
						$scope.customer = data;
					} ).success(function(data, status, headers, config) {						
						$http.get( '../../../../bankone/rest/abstractAccountREST/customer/' + $scope.iddata.id ).success( function ( data ) {
							$scope.accounts = data;
							angular.forEach( $scope.accounts, function ( a ) {
								$scope.accountCount = $scope.accountCount + 1;
								$scope.accountIds.push( a.id );
							} );
							searchService.setAccountIds( $scope.accountIds )
							$scope.accountByCustomer='mainTopicTemplates/accountSubpageTemplates/accountOverView.html'
						} ).error( function ( data, status, headers, config ) {
							alert("Account von kunde service nicht vorhanden")
						} )
					}).error( function ( data, status, headers, config ) {
						alert("Kunde nicht vorhanden")
					} );
				} else {
					$scope.customer.contact = $scope.newContact
				}
			};
			$scope.orderProp = 'name';
			$scope.loadData();
			
			// Cancel Function
			$scope.setSubComponentLvl2 = function () {
				subComponentService.setComponent_Lvl2( "" );
				subComponentService.setComponent_Lvl3( "" );

			}
			
			//Save Function
			$scope.saveCustomer = function () {
				if ( ( $scope.iddata.id ) == "undefined" ) {
					$http( {
						withCredentials : false,
						method : 'post',
						url : '../../../../bankone/rest/customerREST',
						data : $scope.customer
					} ).success( function () {						
						$scope.setSubComponentLvl2()
						alert("Kunde gespeichert")
					} )
				} else {
					$http( {
						withCredentials : false,
						method : 'put',
						url : '../../../../bankone/rest/customerREST',
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
					url : '../../../../bankone/rest/customerREST' + '/' + $scope.customer.id,
				} ).success( function () {
					$scope.setSubComponentLvl2()
					alert("Kunde gelöscht")
				} ).error( function ( data, status, headers, config ) {
					alert("Kunde wird noch von einer Bank genutzt")
				} )
			}
		}
] )
