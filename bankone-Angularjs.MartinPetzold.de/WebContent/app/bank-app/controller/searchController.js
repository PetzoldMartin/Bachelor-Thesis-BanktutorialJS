'use strict';

/* Controllers */
var BankappSearch = angular.module('bankapp.search', []);

BankappMainview.factory('searchService', function() {
	
	var searchColumn = "";
	return {
		setSearchColumn : function(str) {
			searchColumn = str;
		},

		getSearchColumn : function() {
			return searchColumn;
		}
	}
})