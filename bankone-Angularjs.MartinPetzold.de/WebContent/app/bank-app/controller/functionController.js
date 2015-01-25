'use strict';

/* Controllers */
var BankappFunctions = angular.module( 'bankapp.function', [] );

BankappFunctions.factory( 'arreyspliceByObjectId', function () {
	var toSplice;
	var newArrey = [];
	return {
		spliceByID : function ( arreyToSplice, idArrey ) {
			if(idArrey!="all"){
			newArrey = [];
			angular.forEach( arreyToSplice, function ( spliceObject ) {
				toSplice = true
				angular.forEach( idArrey, function ( id ) {
					if ( spliceObject.id == id ) {
						toSplice = false
					}
				} )
				if ( !toSplice ) {
					newArrey.push( spliceObject )
				}
			} )
			return newArrey;
		}else{
			return arreyToSplice
		}
		}
	}

} )