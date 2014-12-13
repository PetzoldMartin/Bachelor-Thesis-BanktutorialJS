'use strict';

/* Controllers */
var BankappMainview = angular.module('bankapp.mainview',
		[ 'bankapp.breadcrumb' ]);

BankappMainview.controller('headerCtrl', [ '$scope', 'mainPageService',
		function($scope, mainPageService) {
			$scope.logoNavyBlue_url = '../icons/logo-whzNavyBlue.jpg'
			$scope.logo_url = '../icons/logo-whz.jpg'
			$scope.headerText = mainPageService.getData();
			$scope.$watch(function() {
				return $scope.headerText = mainPageService.getData();
			});
		} ]);

BankappMainview
		.controller(
				'sidebarCtrl',
				[
						'$scope',
						'mainPageService',
						'BreadcrumbService',
						function($scope, mainPageService, BreadcrumbService) {
							$scope.topics = [ {
								"id" : 1,
								"name" : "BankTutorial",
								"class" : "list-group-item active",
								"icon" : "glyphicon glyphicon-home",
								"clicked" : true,
								"url" : "#"
							}, {
								"id" : 2,
								"name" : "Bank",
								"class" : "list-group-item",
								"icon" : "glyphicon glyphicon-lock",
								"clicked" : false,
								"url" : "#"
							}, {
								"id" : 3,
								"name" : "Kunde",
								"class" : "list-group-item",
								"icon" : "glyphicon glyphicon-phone-alt",
								"clicked" : false,
								"url" : "#"
							}, {
								"id" : 4,
								"name" : "Konto",
								"class" : "list-group-item",
								"icon" : "glyphicon glyphicon-usd",
								"clicked" : false,
								"url" : "#"
							}, {
								"id" : 5,
								"name" : "Überweisung",
								"class" : "list-group-item",
								"icon" : "glyphicon glyphicon-transfer",
								"clicked" : false,
								"url" : "#"
							} ];
							$scope.hover = function(topic) {
								if (topic.clicked == false) {
									return topic.class = "list-group-item list-group-item-success";
								}
							};
							$scope.leave = function(topic) {
								if (topic.clicked == false) {
									return topic.class = "list-group-item";
								}
							};
							$scope.click = function(topic) {
								angular.forEach($scope.topics, function(value,
										index) {
									value.clicked = false;
									value.class = "list-group-item";
								})
								topic.clicked = true;
								mainPageService.setData(topic);
								BreadcrumbService.setBreadcrumbLvl1(topic);
								return topic.class = "list-group-item active";

							};
							mainPageService.setData($scope.topics[0]);
							BreadcrumbService
									.setBreadcrumbLvl1($scope.topics[0]);
						} ]);

BankappMainview.controller('titleCtrl', [ '$scope', 'mainPageService',
		function($scope, mainPageService) {
			$scope.name = mainPageService.getData();
			$scope.$watch(function() {
				return $scope.name = mainPageService.getData();
			});
		} ]);

BankappMainview.controller('searchCtrl', [ '$scope', 'mainPageService',
		function($scope, mainPageService) {
	$scope.search;
	$scope.$watch('search',function(newValue, oldValue) {
		mainPageService.setSearchColumn(search);;
	});
		} ]);

BankappMainview.controller('headerComponentCtrl', [ '$scope', function($scope) {
	$scope.headerTemplate_url = 'mainTemplates/mainHeader.html'

} ]);

BankappMainview.controller('sidebarComponentCtrl', [ '$scope',
		function($scope) {
			$scope.sidebarTemplate_url = 'mainTemplates/mainSidebar.html'

		} ]);
BankappMainview.controller('searchbarComponentCtrl', [ '$scope',
		function($scope) {
			$scope.searchbarTemplate_url = 'mainTemplates/mainSearchbar.html'

		} ]);

BankappMainview.factory('mainPageService', function() {
	var data = "";
	var searchColumn = "";
	return {
		setData : function(str) {
			data = str;
		},

		getData : function() {
			return data;
		},
		setSearchColumn : function(str) {
			searchColumn = str;
		},

		getSearchColumn : function() {
			return searchColumn;
		}
	}
})