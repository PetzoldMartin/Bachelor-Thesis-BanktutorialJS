'use strict';

/* Controllers */
var BankappSubview = angular.module( 'bankapp.subview', ['bankapp.breadcrumb','bankapp.function'] );

BankappSubview.factory( 'subComponentService', ['BreadcrumbService',
	function (BreadcrumbService) {
		var Components=[]
		return {
			setComponent : function(str,needsNoBreadcrumb){
				var CT=[];
				var dupplikate = false;
				angular.forEach(Components, function(data) {
						if(data.name!=str.name && dupplikate==false){
							CT.push(data)
						}else{
							dupplikate=true
						}	
				})
				Components=angular.copy(CT);
				Components.push(str);
				if(!needsNoBreadcrumb){
				BreadcrumbService.setbreadcrumb(str)
			}
			},
			getActuallComponent : function () {

				return  Components[Components.length-1]
			},
			stepBack : function(){
				if(Components[Components.length-2]){
				this.setComponent(Components[Components.length-2])
				}
			},
			reset : function(){
				Components=[];
			}
			
			
		}
	}
] )