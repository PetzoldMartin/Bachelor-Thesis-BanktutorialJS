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
					"url" : 'mainTopicTemplates/bankSubpageTemplates/bankOverView.html'
				}
				var manipulate = {
					"id" : "undefined",
					"name" : "Kunde bearbeiten",
					"class" : "list-group-item active",
					"icon" : "glyphicon glyphicon-home",
					"clicked" : true,
					"url" : 'mainTopicTemplates/bankSubpageTemplates/bankManipulate.html'
				}
}]);