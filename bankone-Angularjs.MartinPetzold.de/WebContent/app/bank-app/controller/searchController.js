'use strict';

/* Controllers */
var BankappSearch = angular.module( 'bankapp.search', [] );

BankappMainview.factory( 'searchService', function () {

	var searchColumn = "";
	var ids = "";
	return {
		setSearchColumn : function ( str ) {
			searchColumn = str;
		},

		getSearchColumn : function () {
			return searchColumn;
		},
		setIds : function ( str ) {
			ids = str;
		},
		getIds : function () {
			return ids;
		}
	}
} )