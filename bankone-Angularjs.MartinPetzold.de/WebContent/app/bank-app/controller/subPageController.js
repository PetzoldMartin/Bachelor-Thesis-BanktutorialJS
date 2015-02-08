'use strict';

/**
 * Modul zur Verwaltung von Daten für die Wechselbaren Komponenten
 */
var BankappSubview = angular.module( 'bankapp.subview', ['bankapp.breadcrumb','bankapp.function'] );
/**
 * Service zur Verwaltung von Daten für die Wechselbaren Komponenten
 */
BankappSubview.factory( 'subComponentService', ['BreadcrumbService',
	function (BreadcrumbService) {
		var Components=[]
		return {
			//Function zur eintragung eines Breadcrumbs
			/**
			 * param str einzutragende Daten
			 * param needsNoBreadcrumb boolean ob Eintragung in den Breadcrumbservice nicht erwünscht wird
			 */
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
			//Function zur Abfrage der Letzten Eintragung
			getActuallComponent : function () {

				return  Components[Components.length-1]
			},
			//Function zur Löschung der Letzten Eintragung
			stepBack : function(){
				if(Components[Components.length-2]){
				this.setComponent(Components[Components.length-2])
				}
			},
			//Function zur Rücksetzung der internen Variable
			reset : function(){
				Components=[];
			}
			
			
		}
	}
] )