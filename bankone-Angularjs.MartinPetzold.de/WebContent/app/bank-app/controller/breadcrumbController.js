'use strict';

/* Controllers */
var BankappBreadcrum = angular.module( 'bankapp.breadcrumb', [
		'bankapp.subview', 'bankapp.search'
] );

BankappBreadcrum.controller( 'breadcrumbCtrl', [
		'$scope', 'BreadcrumbService', 'subComponentService','mainPageService',

		function ( $scope, BreadcrumbService, subComponentService,mainPageService ) {
			$scope.tomain=function(){
				subComponentService.reset();
				mainPageService.setTopicid( 1 );
			}
			$scope.setComponent = function (c) {
				subComponentService.setComponent(c);
			}

			$scope.$watch( function () {
					$scope.Breadcrumbs = BreadcrumbService.getBreadcrumbs()
						
			} );
			$scope.$watch( function () {
				mainPageService.setHeader(BreadcrumbService.getHighestBreadcrumb());
			});
		}
] );

BankappBreadcrum.factory( 'BreadcrumbService', [
		'searchService', function ( searchService ) {

			var breadcrumbs = [];

			return {
				setbreadcrumb : function (str){
					var CT=[];
					var x = false;
					angular.forEach(breadcrumbs, function(data) {
							if(data.name!=str.name && x==false){
								CT.push(data)
							}else{
								x=true
							}	
					})
					breadcrumbs=angular.copy(CT);
					breadcrumbs.push(str);
				},
				getHighestBreadcrumb : function () {
					return breadcrumbs[breadcrumbs.length-1]
				},
				getBreadcrumbs : function () {
					return breadcrumbs
				},
				reset : function(){
					breadcrumbs=[];
					
				}
			}
		}
] )