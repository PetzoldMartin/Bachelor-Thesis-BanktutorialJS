'use strict';

/* Controllers */
var BankappSubview = angular.module( 'bankapp.subview', ['bankapp.breadcrumb','bankapp.function'] );

BankappSubview.factory( 'subComponentService', ['BreadcrumbService',
	function (BreadcrumbService) {
		var Components=[]
		return {
			setComponent : function(str,y){
				var CT=[];
				var x = false;
				angular.forEach(Components, function(data) {
						if(data.name!=str.name && x==false){
							CT.push(data)
						}else{
							x=true
						}	
				})
				Components=angular.copy(CT);
				Components.push(str);
				if(!y){
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