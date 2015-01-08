'use strict';

/* Controllers */
var BankappBreadcrum = angular.module( 'bankapp.breadcrumb', [
		'bankapp.subview', 'bankapp.search'
] );

BankappBreadcrum.controller( 'breadcrumbCtrl', [
		'$scope', 'BreadcrumbService', 'subComponentService','mainPageService',

		function ( $scope, BreadcrumbService, subComponentService,mainPageService ) {
			$scope.tomain=function(){
				mainPageService.setTopicid( 1 );
			}
			$scope.setSubComponentLvl1 = function () {
				subComponentService.setComponent_Lvl1( BreadcrumbService.getBreadcrumbLvl1() );
				BreadcrumbService.setBreadcrumbLvl2( "" );
				BreadcrumbService.setBreadcrumbLvl3( "" );
			}
			
			$scope.$watch( function () {
				return $scope.breadcrumbLvl1 = BreadcrumbService.getBreadcrumbLvl1();
			} );
			$scope.breadcrumbLvl1 = BreadcrumbService.getBreadcrumbLvl1();
			$scope.$watch( function () {
				return $scope.breadcrumbLvl2 = BreadcrumbService.getBreadcrumbLvl2();
			} );
			$scope.breadcrumbLvl2 = BreadcrumbService.getBreadcrumbLvl2();
			$scope.$watch( function () {
				return $scope.breadcrumbLvl3 = BreadcrumbService.getBreadcrumbLvl3();
			} );
			$scope.breadcrumbLvl3 = BreadcrumbService.getBreadcrumbLvl3();
			$scope.$watch( function () {
				return $scope.breadcrumbLvl4 = BreadcrumbService.getBreadcrumbLvl4();
			} );
			$scope.breadcrumbLvl4 = BreadcrumbService.getBreadcrumbLvl4();
		}
] );

BankappBreadcrum.factory( 'BreadcrumbService', [
		'searchService', function ( searchService ) {
			var breadcrumbLvl1 = "";
			var breadcrumbLvl2 = "";
			var breadcrumbLvl3 = "";
			var breadcrumbLvl4 = "";
			var breadcrumbLvl5 = "";
			return {
				setBreadcrumbLvl1 : function ( str ) {
					breadcrumbLvl1 = str;
					searchService.setSearchColumn( "" );
				},

				getBreadcrumbLvl1 : function () {
					return breadcrumbLvl1;
				},

				setBreadcrumbLvl2 : function ( str ) {
					breadcrumbLvl2 = str;
					searchService.setSearchColumn( "" );
				},

				getBreadcrumbLvl2 : function () {
					return breadcrumbLvl2;
				},

				setBreadcrumbLvl3 : function ( str ) {
					breadcrumbLvl3 = str;
					searchService.setSearchColumn( "" );
				},

				getBreadcrumbLvl3 : function () {
					return breadcrumbLvl3;
				},

				setBreadcrumbLvl4 : function ( str ) {
					breadcrumbLvl4 = str;
					searchService.setSearchColumn( "" );
				},

				getBreadcrumbLvl4 : function () {
					return breadcrumbLvl4;
				},

				setBreadcrumbLvl5 : function ( str ) {
					breadcrumbLvl5 = str;
					searchService.setSearchColumn( "" );
				},

				getBreadcrumbLvl5 : function () {
					return breadcrumbLvl5;
				}
			}
		}
] )