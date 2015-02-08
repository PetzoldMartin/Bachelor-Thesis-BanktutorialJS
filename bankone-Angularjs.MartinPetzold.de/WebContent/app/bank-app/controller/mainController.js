'use strict';

/**
 * Module zum Zentralisierten laden von anderen Modulen
 */
var bankapp = angular.module( 'bankapp', [
		'bankapp.bankview', 'bankapp.mainview', 'bankapp.welcomeview', 'bankapp.customerview',
		'bankapp.accountview','bankapp.transfer','bankapp.style','bankapp.interest'
] );