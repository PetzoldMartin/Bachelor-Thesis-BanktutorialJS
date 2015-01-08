'use strict';

/* Controllers */
var BankappSubview = angular.module( 'bankapp.subview', [] );

BankappSubview.factory( 'subComponentService', [
	function () {
		var Component_Lvl1 = '';
		return {
			setComponent_Lvl1 : function ( str ) {
				Component_Lvl1 = str;
			},

			getComponent_Lvl1 : function () {
				return Component_Lvl1;
			}
			
		}
	}
] )