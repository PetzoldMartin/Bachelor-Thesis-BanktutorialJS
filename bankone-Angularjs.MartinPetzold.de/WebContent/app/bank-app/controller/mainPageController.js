'use strict';

/* Controllers */
var BankappMainview = angular.module('bankapp.mainview', []);

BankappMainview.controller('headerCtrl', [ '$scope', function($scope) {
	$scope.logoNavyBlue_url = '../icons/logo-whzNavyBlue.jpg'
	$scope.logo_url = '../icons/logo-whz.jpg'
	$scope.headerText = "Hauptseite"
} ]);

BankappMainview.controller('sidebarCtrl', [ '$scope', function($scope) {
	$scope.topics = [ {
		"id" : 1,
		"name" : "BankTutorial",
		"class" : "list-group-item active",
		"icon" : "glyphicon glyphicon-home",
		"clicked":true,
		"url" : "#"
	}, {
		"id" : 2,
		"name" : "Bank",
		"class" : "list-group-item",
		"icon" : "glyphicon glyphicon-lock",
		"clicked":false,
		"url" : "#"
	}, {
		"id" : 3,
		"name" : "Kunde",
		"class" : "list-group-item",
		"icon" : "glyphicon glyphicon-phone-alt",
		"clicked":false,
		"url" : "#"
	}, {
		"id" : 4,
		"name" : "Konto",
		"class" : "list-group-item",
		"icon" : "glyphicon glyphicon-usd",
		"clicked":false,
		"url" : "#"
	}, {
		"id" : 5,
		"name" : "Überweisung",
		"class" : "list-group-item",
		"icon" : "glyphicon glyphicon-transfer",
		"clicked":false,
		"url" : "#"
	} ];
	$scope.hover = function(topic) {
		if(topic.clicked==false){
		return topic.class = "list-group-item list-group-item-success";}
		
	};
	$scope.leave = function(topic) {
		if(topic.clicked==false){
		return topic.class = "list-group-item";}
		
	};
	$scope.click = function(topic) {
		angular.forEach($scope.topics,function(value,index){
            value.clicked=false;
            value.class="list-group-item";
        })
		topic.clicked=true;
		return topic.class = "list-group-item active";
		
	};
} ]);

BankappMainview.controller('headerComponentCtrl', [ '$scope', function($scope) {
	$scope.headerTemplate_url = 'mainTemplates/mainHeader.html'
} ]);

BankappMainview.controller('sidebarComponentCtrl', [ '$scope',
		function($scope) {
			$scope.sidebarTemplate_url = 'mainTemplates/mainSidebar.html'
		} ]);