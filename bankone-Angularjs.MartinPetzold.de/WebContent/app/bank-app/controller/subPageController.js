'use strict';

/* Controllers */
var BankappSubview = angular.module( 'bankapp.subview', ['bankapp.breadcrumb','bankapp.function'] );

BankappSubview.factory( 'subComponentService', ['BreadcrumbService',
	function (BreadcrumbService) {
		var Component_Lvl1 = '';
		var Component_Lvl2 = '';
		var Component_Lvl3 = '';
		return {
			setComponent_Lvl1 : function ( str ) {
				Component_Lvl1 = str;
				BreadcrumbService.setBreadcrumbLvl2(str);
			},
			getComponent_Lvl1 : function () {
				return Component_Lvl1;
			},
			setComponent_Lvl2 : function ( str ) {
				Component_Lvl2 = str;
				BreadcrumbService.setBreadcrumbLvl3(str);
			},
			getComponent_Lvl2 : function () {
				return Component_Lvl2;
			},
			setComponent_Lvl3 : function ( str ) {
				Component_Lvl3 = str;
				BreadcrumbService.setBreadcrumbLvl4(str);
			},
			getComponent_Lvl3 : function () {
				return Component_Lvl3;
			},
			getActuallComponent : function () {
				if(Component_Lvl2==""){
					return Component_Lvl1;

				}else{
				if(Component_Lvl3==""){
				return Component_Lvl2;}
				else{
					return Component_Lvl3;

				}
				}
			},
			reset : function(){
				Component_Lvl1 = '';
				Component_Lvl2 = '';
				Component_Lvl3 = '';
			}
			
			
		}
	}
] )