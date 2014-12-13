'use strict';

/* Controllers */
var BankappBreadcrum = angular.module('bankapp.breadcrumb', []);

BankappBreadcrum.controller('breadcrumbCtrl', [ '$scope','BreadcrumbService', function($scope,BreadcrumbService) {
	$scope.$watch(function(){return $scope.breadcrumbLvl1=BreadcrumbService.getBreadcrumbLvl1();});
	$scope.breadcrumbLvl1=BreadcrumbService.getBreadcrumbLvl1();
	$scope.$watch(function(){return $scope.breadcrumbLvl2=BreadcrumbService.getBreadcrumbLvl2();});
	$scope.breadcrumbLvl2=BreadcrumbService.getBreadcrumbLvl2();
	$scope.$watch(function(){return $scope.breadcrumbLvl3=BreadcrumbService.getBreadcrumbLvl3();});
	$scope.breadcrumbLvl3=BreadcrumbService.getBreadcrumbLvl3();
	$scope.$watch(function(){return $scope.breadcrumbLvl4=BreadcrumbService.getBreadcrumbLvl4();});
	$scope.breadcrumbLvl4=BreadcrumbService.getBreadcrumbLvl4();
} ]);

BankappBreadcrum.factory('BreadcrumbService', function() {
	var breadcrumbLvl1="";
	var breadcrumbLvl2="";
	var breadcrumbLvl3="";
	var breadcrumbLvl4="";
    return{
        setBreadcrumbLvl1:function(str){
        	breadcrumbLvl1 = str;
        },

        getBreadcrumbLvl1:function(){
            return breadcrumbLvl1;
        },
        
            setBreadcrumbLvl2:function(str){
            	breadcrumbLvl2 = str;
            },

            getBreadcrumbLvl2:function(){
                return breadcrumbLvl2;
            }
            ,
            
            setBreadcrumbLvl3:function(str){
            	breadcrumbLvl3 = str;
            },

            getBreadcrumbLvl3:function(){
                return breadcrumbLvl3;
            },
            
            setBreadcrumbLvl4:function(str){
            	breadcrumbLvl4 = str;
            },

            getBreadcrumbLvl4:function(){
                return breadcrumbLvl4;
            }
    }
})