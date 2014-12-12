'use strict';

/* Controllers */
var BankappBreadcrum = angular.module('bankapp.breadcrum', []);

BankappBreadcrum.controller('breadcrumCtrl', [ '$scope','BreadcrumService', function($scope,BreadcrumService) {
	$scope.$watch(function(){return $scope.breadcrumLvl1=BreadcrumService.getBreadcrumLvl1();});
	$scope.$watch(function(){return $scope.breadcrumLvl2=BreadcrumService.getBreadcrumLvl2();});
} ]);

BankappBreadcrum.factory('BreadcrumService', function() {
	var breadcrumLvl1="";
	var breadcrumLvl2="";
    return{
        setBreadcrumLvl1:function(str){
        	breadcrumLvl1 = str;
        },

        getBreadcrumLvl1:function(){
            return breadcrumLvl1;
        },
        
            setBreadcrumLvl2:function(str){
            	breadcrumLvl2 = str;
            },

            getBreadcrumLvl2:function(){
                return breadcrumLvl2;
            }
    }
})