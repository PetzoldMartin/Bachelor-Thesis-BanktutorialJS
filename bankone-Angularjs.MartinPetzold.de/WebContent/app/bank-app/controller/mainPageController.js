'use strict';

/**
 * Modul der Hauptseite(Mainpage)
 */
var BankappMainview = angular.module( 'bankapp.mainview', [
		'bankapp.breadcrumb'
] );
/**
 * Controller zur Verwaltung der Kopfleiste
 */
BankappMainview.controller( 'headerCtrl', [
		'$scope', 'mainPageService', function ( $scope, mainPageService ) {
			$scope.logoNavyBlue_url = '../icons/logo-whzNavyBlue.jpg'
			$scope.logo_url = '../icons/logo-whz.jpg'
			$scope.headerText = mainPageService.getHeader();
			//Überwachung des Mainpageservice auf Änderungen neuer Daten zur Anzeige im Header
			$scope.$watch( function () {
				return mainPageService.getHeader();
			}, function(newValue,oldValue){
				$scope.headerText = mainPageService.getHeader();
			});
		}
] );
/**
 * Controller der Navigationsleiste
 */
BankappMainview.controller( 'sidebarCtrl', [
		'$scope', 'mainPageService', 'searchService', function ( $scope, mainPageService, searchService ) {
			//Sammlung der Models für die Auswahlen der Navigationsleiste
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
					},{
						"id" : 6,
						"name" : "Zinsüberweisung",
						"class" : "list-group-item",
						"icon" : "glyphicon glyphicon-dashboard",
						"clicked" : false,
						"url" : 'mainTopicTemplates/InterestSubpage.html'
					}
			];
			//Function wenn sich der Mauscursor über einer Auswahl befindet
			/**
			 * param topic Auswahl über dem sich der Mauscursor befindet
			 */
			$scope.hover = function ( topic ) {
				if ( topic.clicked == false ) {
					return topic.class = "list-group-item list-group-item-success";
				}
			};
			//Function wenn der Mauscursor eine Auswahl verläßt
			/**
			 * param topic Auswahl die verlassen wird
			 */
			$scope.leave = function ( topic ) {
				if ( topic.clicked == false ) {
					return topic.class = "list-group-item";
				}
			};
			//Function bei der Ausawl in der Navigationsleiste
			/**
			 * param topic  Model der Auswahl
			 * param realc	boolean ob der Benutzer oder ein Automatismus der Webapp die Methode aufruft
			 */
			$scope.click = function ( topic, realc ) {
				if ( !realc ) {
					searchService.reset();
				}
				
				angular.forEach( $scope.topics, function ( value, index ) {
					value.clicked = false;
					value.class = "list-group-item";
				} )

				topic.clicked = true;
				mainPageService.setData(topic);
				return topic.class = "list-group-item active";
			};
			mainPageService.setData( $scope.topics[ 0 ] );
			//Überwachung des mainPageService ob Auswahländerung angefordert wurde
			$scope.$watch( function () {
				return mainPageService.getTopicid()
			}, function ( newValue, oldValue ) {
				$scope.click( $scope.topics[ mainPageService.getTopicid() - 1 ], true )
			} )
		}
] );
/**
 * Controller zur Steuerung des Webseitetitels
 */
BankappMainview.controller( 'titleCtrl', [
		'$scope', 'mainPageService', function ( $scope, mainPageService ) {
			$scope.name = mainPageService.getHeader();
			//Überwachung des MainPageService für neue Daten zur Anzeige
			$scope.$watch( function () {
				return mainPageService.getHeader();
			} ,function(newValue,oldValue){
				$scope.name = mainPageService.getHeader();
			});
		}
] );


/**
 * Controller für die Verwaltung des Headerkomponenten Templates
 */
BankappMainview.controller( 'headerComponentCtrl', [
		'$scope', function ( $scope ) {
			$scope.headerTemplate_url = 'mainTemplates/mainHeader.html'

		}
] );
/**
 * Controller für die Verwaltung des Navigationskomponenten Templates
 */
BankappMainview.controller( 'sidebarComponentCtrl', [
		'$scope', function ( $scope ) {
			$scope.sidebarTemplate_url = 'mainTemplates/mainSidebar.html'

		}
] );
/**
 * Controller für die Verwaltung des Suchbarkomponenten Templates
 */
BankappMainview.controller( 'searchbarComponentCtrl', [
		'$scope', function ( $scope ) {
			$scope.searchbarTemplate_url = 'mainTemplates/mainSearchbar.html'

		}
] );
/**
 * Controller für die Verwaltung des Komponentenrahmen Templates
 */
BankappMainview.controller( 'subpageComponentCtrl', [
		'$scope', 'mainPageService', function ( $scope, mainPageService ) {
			$scope.topic = mainPageService.getData();
			//Überwacht den mainPageService auf änderungen betüglich Anforderungen eibes bestimmten Komponentenrahmens
			$scope.$watch(function(){
				$scope.topic = mainPageService.getData();
			});
			
		}
		
] );
/**
 * Service zur Verwaltung der Daten für die Komponentenrahmenauswahl
 * , und Änderung und der Kopfleisten und Titeldaten
 */
BankappMainview.factory( 'mainPageService',[ 'BreadcrumbService', function (BreadcrumbService) {
	var data = "";
	var topicid = 1;
	var header = "";

	return {
		//Function zum Setzen der Daten zum Laden Eines Komponentenrahmens
		/**
		 * param str Daten zum Laden eines Komponentenrahmens
		 */
		setData : function ( str ) {
			if(data!=str){
				BreadcrumbService.reset();
			}
			data = str;
			topicid = str.id;
		},
		//Function zur Abfrage der Daten zum Laden Eines Komponentenrahmens

		getData : function () {
			return data;
		},
		//Function zum setzen einer ID für eine Navigationsauswahl
		setTopicid : function ( str ) {
			topicid = str;
		},
		//Function zur Abfrage einer ID für eine Navigationsauswahl
		getTopicid : function () {
			return topicid;
		},
		//Function zum setzen von Daten die Anzeige in der Kopfleiste und im Titel
		setHeader : function ( str ) {
			header = str;
		},
		//Function zur abfrage von Daten die Anzeige in der Kopfleiste und im Titel

		getHeader : function () {
			return header;
		}
	}

}] )