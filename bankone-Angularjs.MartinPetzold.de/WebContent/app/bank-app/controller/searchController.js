'use strict';

/* Controllers */
var BankappSearch = angular.module( 'bankapp.search', [] );

BankappMainview.factory( 'searchService', function () {

	var searchColumn = "";
	var ids = "";
	var accountIds = "";
	var customerIds = "";
	var bankIds="";
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
		},
		setAccountIds : function ( str ) {
			accountIds = str;
		},
		getAccountIds : function () {
			return accountIds;
		},
		setCustomerIds : function ( str ) {
			customerIds = str;
		},
		getCustomerIds : function () {
			return customerIds;
		},
		setBankIds : function ( str ) {
			bankIds = str;
		},
		getBankIds : function () {
			return bankIds;
		}
	}
} )