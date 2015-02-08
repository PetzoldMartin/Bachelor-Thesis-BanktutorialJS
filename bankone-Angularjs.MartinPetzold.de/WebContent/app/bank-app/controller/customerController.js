'use strict';

/**
 * Modul zur Verwaltung von Customer(Kunden) und der Ansichten von Customern
 */
var BankappCustomerview = angular.module( 'bankapp.customerview', [
		 'bankapp.subview'
] );
/**
 * Controller zur Verwaltung des Customer(Kunden)komponentenrahmens
 */
BankappCustomerview.controller( 'customerComponentCtrl', [
		'$scope', 'subComponentService',  function ( $scope, subComponentService ) {
			//Models zum Laden der Ausprägungen der Kundenanzeige
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
			subComponentService.setComponent( overview);			
			//Methode zur Auswahl aus einer Kundenübersicht
			/**
			 * param oid Identifikationsnummer des Ausgewählten Customers
			 */
			$scope.click = function ( oid ) {
				manipulate.id = oid;
				subComponentService.setComponent( manipulate );
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
 * Controller für die Kundenübersicht
 */
BankappCustomerview.controller( 'customerListCtrl', [
		'$scope', '$http', 'searchService', 'arreyspliceByObjectId', function ( $scope, $http, searchService, arreyspliceByObjectId ) {
			$scope.query = "";	
			//Methode zum Laden der Übersichtsdaten über REST
			$scope.loadData = function () {
				$http.get( '../../../../bankone/rest/customerREST' ).success( function ( data ) {
					$scope.customers = data;
					$scope.newAvaible = true;
					// Filter the data by Id's
					if ( searchService.getCustomerIds() != "" ) {
						$scope.customers = arreyspliceByObjectId.spliceByID( $scope.customers, searchService.getCustomerIds() );
						$scope.newAvaible = false;
					}
				} ).error( function () {
					alert("Kundenübersichtservice nicht vorhanden");
				} );
			};
			$scope.orderProp = 'name';
			$scope.loadData();
			//Überwachung des Searchservice auf Einschränkung der Übersicht
			$scope.$watch(function(){
				if ( searchService.getCustomerIds() != "" ) {
					$scope.customers = arreyspliceByObjectId.spliceByID( $scope.customers, searchService.getCustomerIds() );
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
 * Controller für die Ansicht zum Erstellen ,Löschen und Updaten eines customers(Kunden)
 */
BankappCustomerview.controller( 'customerviewCtrl', [
		'$scope', '$http', 'subComponentService', 'searchService', function ( $scope, $http, subComponentService,searchService) {
			$scope.accountByCustomer=''
			$scope.iddata = subComponentService.getActuallComponent();
			$scope.hasSub=true
			$scope.accountIds = [
				     				0
				     			];
			$scope.accountByCustomer=''
			$scope.acd=false;
			//Datenstub eines Contakts
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
			//Datenstub eines Customers
			$scope.customer = {
				"firstname" : "",
				"surname" : "",
				"contact" : []
			};
			
			//Überlagerung der Methode zur Auswahl der verwendeten Kontenübersicht
			/**
			 * param oid Identifikationsnummer des Ausgewählten Kontos
			 */
			$scope.click = function ( oid ) {
				$scope.tc=angular.copy(subComponentService.getActuallComponent())
				$scope.tc.name="Account"+ oid +" des Kunden " +$scope.customer.firstname +" "+$scope.customer.surname
				$scope.tc.id = oid;
				subComponentService.setComponent($scope.tc);
				$scope.accountByCustomer='mainTopicTemplates/accountSubpageTemplates/accountManipulate.html'	
				$scope.acd=true;
			}
			//Methode zur Rückkehr zur Anzeige mit Übersicht aller dem Kunden zugeordneten Konten
			$scope.accback = function () {
				$scope.accountByCustomer='mainTopicTemplates/accountSubpageTemplates/accountOverView.html'
					$scope.acd=false;
				subComponentService.stepBack();
			}
			//überwachung des subComponentService auf neue Komponenten
			$scope.$watch( function () {
				return subComponentService.getActuallComponent();
			} ,function(newValue, oldValue){
				if(newValue==''){
					$scope.accback();
				}
			});
			//Function zum Laden von Customerdaten über REST
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
			
			// Function zur Rückkehr zur Kundenübersicht 
			$scope.setSubComponentLvl2 = function () {
				subComponentService.stepBack();
				subComponentService.stepBack();

			}
			//Function zum Speichern und Updaten von Kundendaten über REST
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
			
			//Function zum löschen von Kundendaten über REST
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
