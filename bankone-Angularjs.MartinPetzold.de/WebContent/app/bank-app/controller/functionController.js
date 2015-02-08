'use strict';

/**
 * Modul zum Verwalten von Allgemeinen Functionen
 */
var BankappFunctions = angular.module( 'bankapp.function', [] );
/**
 * Service zum Filtern einer Javascriptsammlung mit Objekten mit id's anhand eines ID-arrays
 */
BankappFunctions.factory( 'arreyspliceByObjectId', function () {
	var toSplice;
	var newArrey = [];
	return {
		//Function zum Filtern einer Javascriptsammlung mit Objekten mit id's anhand eines ID-arrays
		/**
		 * param arreyToSplice zu Filternde Sammlung
		 * param idArrey Array der ID's
		 */
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
			
			return arreyToSplice;
		}
		}
	}

} )