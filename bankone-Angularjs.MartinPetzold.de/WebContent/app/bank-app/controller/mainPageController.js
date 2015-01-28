'use strict';

/* Controllers */
var BankappMainview = angular.module( 'bankapp.mainview', [
		'bankapp.breadcrumb'
] );

BankappMainview.controller( 'headerCtrl', [
		'$scope', 'mainPageService', function ( $scope, mainPageService ) {
			$scope.logoNavyBlue_url = '../icons/logo-whzNavyBlue.jpg'
			$scope.logo_url = '../icons/logo-whz.jpg'
			$scope.headerText = mainPageService.getHeader();
			$scope.$watch( function () {
				return mainPageService.getHeader();
			}, function(newValue,oldValue){
				$scope.headerText = mainPageService.getHeader();
			});
		}
] );

BankappMainview.controller( 'sidebarCtrl', [
		'$scope', 'mainPageService', 'searchService', function ( $scope, mainPageService, searchService ) {
			$scope.topics = [
					{
						"id" : 1,
						"name" : "BankTutorial",
						"class" : "list-group-item active",
						"icon" : "glyphicon glyphicon-home",
						"clicked" : true,
						"url" : 'mainTopicTemplates/welcomeSubpage.html'
					}, {
						"id" : 2,
						"name" : "Bank",
						"class" : "list-group-item",
						"icon" : "glyphicon glyphicon-lock",
						"clicked" : false,
						"url" : 'mainTopicTemplates/bankSubpage.html'
					}, {
						"id" : 3,
						"name" : "Kunde",
						"class" : "list-group-item",
						"icon" : "glyphicon glyphicon-phone-alt",
						"clicked" : false,
						"url" : 'mainTopicTemplates/customerSubpage.html'
					}, {
						"id" : 4,
						"name" : "Konto",
						"class" : "list-group-item",
						"icon" : "glyphicon glyphicon-usd",
						"clicked" : false,
						"url" : 'mainTopicTemplates/accountSubpage.html'
					}, {
						"id" : 5,
						"name" : "Überweisung",
						"class" : "list-group-item",
						"icon" : "glyphicon glyphicon-transfer",
						"clicked" : false,
						"url" : 'mainTopicTemplates/transferSubpage.html'
					}
			];
			$scope.hover = function ( topic ) {
				if ( topic.clicked == false ) {
					return topic.class = "list-group-item list-group-item-success";
				}
			};
			$scope.leave = function ( topic ) {
				if ( topic.clicked == false ) {
					return topic.class = "list-group-item";
				}
			};
			$scope.click = function ( topic, realc ) {
				if ( !realc ) {
					searchService.reset();
				}
				
				angular.forEach( $scope.topics, function ( value, index ) {
					value.clicked = false;
					value.class = "list-group-item";
				} )

				topic.clicked = true;
				mainPageService.setData( topic );
				return topic.class = "list-group-item active";
			};
			mainPageService.setData( $scope.topics[ 0 ] );
			$scope.$watch( function () {
				return mainPageService.getTopicid()
			}, function ( newValue, oldValue ) {
				$scope.click( $scope.topics[ mainPageService.getTopicid() - 1 ], true )
			} )
		}
] );

BankappMainview.controller( 'titleCtrl', [
		'$scope', 'mainPageService', function ( $scope, mainPageService ) {
			$scope.name = mainPageService.getHeader();
			$scope.$watch( function () {
				return mainPageService.getHeader();
			} ,function(newValue,oldValue){
				$scope.name = mainPageService.getHeader();
			});
		}
] );



BankappMainview.controller( 'headerComponentCtrl', [
		'$scope', function ( $scope ) {
			$scope.headerTemplate_url = 'mainTemplates/mainHeader.html'

		}
] );

BankappMainview.controller( 'sidebarComponentCtrl', [
		'$scope', function ( $scope ) {
			$scope.sidebarTemplate_url = 'mainTemplates/mainSidebar.html'

		}
] );
BankappMainview.controller( 'searchbarComponentCtrl', [
		'$scope', function ( $scope ) {
			$scope.searchbarTemplate_url = 'mainTemplates/mainSearchbar.html'

		}
] );

BankappMainview.controller( 'subpageComponentCtrl', [
		'$scope', 'mainPageService', function ( $scope, mainPageService ) {
			$scope.topic = mainPageService.getData();
			$scope.$watch( function () {
				return mainPageService.getData();
			} ,function(newValue,oldValue){
				$scope.topic = mainPageService.getData();
			});
			
		}
		
] );

BankappMainview.factory( 'mainPageService',[ 'BreadcrumbService', function (BreadcrumbService) {
	var data = "";
	var topicid = 1;
	var header = "";

	return {
		setData : function ( str ) {
			BreadcrumbService.reset();
			BreadcrumbService.setbreadcrumb( str );
			data = str;
			topicid = str.id;
		},
		getData : function () {
			return data;
		},
		setTopicid : function ( str ) {
			topicid = str;
		},
		getTopicid : function () {
			return topicid;
		},
		setHeader : function ( str ) {
			header = str;
		},
		getHeader : function () {
			return header;
		}
	}

}] )