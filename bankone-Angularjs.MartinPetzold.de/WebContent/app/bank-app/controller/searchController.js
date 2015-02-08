'use strict';

/**
 * Modul zur verwaltung der Suche und des Suchservice
 */
var BankappSearch = angular.module( 'bankapp.search', [] );
/**
 * Controller zum steuern der Suche 
 */
BankappSearch.controller( 'searchCtrl', [
		'$scope', 'searchService', function ( $scope, searchService ) {
			$scope.search;
			$scope.clicked = false;
			//Überwachung des searchservice zur rücksetzung des Eingabefeldes
			$scope.$watch( function () {
				if ( searchService.getSearchColumn() == "" && $scope.clicked ) {
					return $scope.search = ""
				}
			} );
			//Überwachung der Sucheingabe und Eintragungen in den Service
			$scope.$watch( 'search', function ( newValue, oldValue ) {
				searchService.setSearchColumn( $scope.search );
			} );
		}
] );

BankappSearch.factory( 'searchService', function () {

	var searchColumn = "";
	var ids = "";
	var accountIds = "";
	var customerIds = "";
	var bankIds = "";
	return {
		//Eintragung einer Variable für die Suche
		/**
		 * param str Variable zur Eintragung
		 */
		setSearchColumn : function ( str ) {
			searchColumn = str;
		},
		//Abfrage einer Variable für die Suche
		getSearchColumn : function () {
			return searchColumn;
		},
		//Eintragung eines ID Filters
		/**
		 * param str Filter
		 */
		setIds : function ( str ) {
			ids = str;
		},
		//Abfrage eines ID Filters
		getIds : function () {
			return ids;
		},
		//Eintragung eines ID Filters für Accounts
		/**
		 * param str Filter
		 */
		setAccountIds : function ( str ) {
			accountIds = str;
		},
		//Abfrage eines ID Filters für Accounts
		getAccountIds : function () {
			return accountIds;
		},
		//Eintragung eines ID Filters für Customer
		/**
		 * param str Filter
		 */
		setCustomerIds : function ( str ) {
			customerIds = str;
		},
		//Abfrage eines ID Filters für Customer
		getCustomerIds : function () {
			return customerIds;
		},
		//Eintragung eines ID Filters für Banken
		/**
		 * param str Filter
		 */
		setBankIds : function ( str ) {
			bankIds = str;
		},
		//Abfrage eines ID Filters für Banken
		getBankIds : function () {
			return bankIds;
		},
		//Function zum rücksetzen derinternen Variablen 
		reset : function () {
			searchColumn = "";
			ids = "";
			accountIds = "";
			customerIds = "";
			bankIds = "";
		}
	}
} )