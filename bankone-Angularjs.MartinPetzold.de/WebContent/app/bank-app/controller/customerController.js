'use strict';

/* Controllers */
var BankappCustomerview = angular.module('bankapp.customerview', [ 'bankapp.search',
		'bankapp.breadcrumb', 'bankapp.subview' ]);

BankappCustomerview.controller('customerComponentCtrl',[
        '$scope',
        'subComponentService',
        'BreadcrumbService',
		function($scope,subComponentService,BreadcrumbService) {
        	var overview = {
					"id" : 1,
					"name" : "Kundenübersicht",
					"class" : "list-group-item active",
					"icon" : "glyphicon glyphicon-home",
					"clicked" : true,
					"url" : 'mainTopicTemplates/customerSubpageTemplates/customerOverView.html'
				}
				var manipulate = {
					"id" : "undefined",
					"name" : "Kunde bearbeiten",
					"class" : "list-group-item active",
					"icon" : "glyphicon glyphicon-home",
					"clicked" : true,
					"url" : 'mainTopicTemplates/bankSubpageTemplates/bankManipulate.html'
				}
        	
        	subComponentService.setComponent_Lvl1(overview);
			BreadcrumbService.setBreadcrumbLvl2(overview);
			$scope.Component_Lvl1 = subComponentService
					.getComponent_Lvl1();
			$scope
					.$watch(function() {
						return $scope.Component_Lvl1 = subComponentService
								.getComponent_Lvl1();
					});

			$scope.click = function(oid) {
				manipulate.id = oid;
				subComponentService
						.setComponent_Lvl1(manipulate);
				BreadcrumbService.setBreadcrumbLvl3(manipulate);

				$scope.Component_Lvl1 = subComponentService
						.getComponent_Lvl1();

			}

			$scope
					.$watch(function() {
						return $scope.Component_Lvl2 = subComponentService
								.getComponent_Lvl2();
					});
}]);