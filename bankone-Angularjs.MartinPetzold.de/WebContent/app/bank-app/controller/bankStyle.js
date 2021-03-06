'use strict';

/**
 * Modul zur Zentralisierung von CSS Befehlen und zusammengesetzten Bootstrapklassen
 */
var BankappStyle= angular.module('bankapp.style',[])
/**
 * Controller zur Zentralisierung von CSS Befehlen und zusammengesetzten Bootstrapklassen
 */
BankappStyle.controller('bankStyles',['$scope', function($scope) {
		//Main Page Styles
		$scope.headerTemplateStyle = {'margin-bottom': '0px'}
		$scope.sidebarColumnStyle= {'padding-right':'0px'}
		$scope.sidebarTemplateStyle={'margin-top': '0px','margin-right': '0px'}
		$scope.searchbarColumnStyle={'padding-left':'0px'}
		
		//Subpage
		$scope.componentStyle={'overflow-y': 'scroll','height': '80vh'}
		//Overview
		$scope.tileClass="col-xs-7 col-sm-4 col-md-3 col-lg-3"
		$scope.tileAlternateClass="col-xs-10 col-sm-8 col-md-6 col-lg-6"

		$scope.tileStyle={'height':'200px','width':'200px',
				'margin' : '30px'}
		//Header
		$scope.headerUnderlineStyle={'color':'#424242','height':'2px','background-color':'#424242'}
		$scope.headerUnderlineThinStyle={'color':'#424242','height':'1px','background-color':'#424242'}

		$scope.headerSpaceStyle={'padding-top':'5em'}
		
		//Manipulate
		$scope.controllClass="col-xs-12 col-sm-12 col-md-12 col-lg-12"
		$scope.inAndOutClass="col-xs-12 col-sm-12 col-md-8 col-lg-6"
		$scope.manipulateTemplateClass="col-xs-12 col-sm-8 col-md-6 col-lg-6"
		$scope.transfertemplClass="col-xs-12 col-sm-8 col-md-8 col-lg-8"
		
		
		//in-output Group
		$scope.rStyle={'float': 'right'}
		$scope.lStyle={'float': 'left'}
		$scope.contactClass="col-xs-10 col-sm-8 col-md-4 col-lg-4"
		$scope.contactAlignClass={'vertical-align': 'top'}
		$scope.ioStyle={'width': '10.2vw'}
			
		//input
		$scope.inputButtonStyle={'float': 'right','width': '78.5%','height':'30px'}
		$scope.inputButtonmarginStyle={'margin-top': '-13px'}
			
		//output
		$scope.outputStyle={'width': '15.2vw'}
		$scope.outputGroupStyle={'width': '50%'}
		//output Statement
		$scope.statementTemplateClass="col-xs-6 col-sm-6 col-md-6 col-lg-6"
		$scope.statementBoxstyle={'margin-bottom': '0px','height':'20px'}
		$scope.statementOutputStyle={'margin-top': '-10px'}
		$scope.statementTextStyle={'padding-left':'30%'}
		$scope.statementSumStyle={'font-weight': 'bold'}
		$scope.statementSumTab1Style={'padding-left':'11%'}
		$scope.statementSumTab2Style={'padding-left':'45%'}
		//colors
		$scope.ok={'color':'green'}
		$scope.nio={'color':'red'}
		//buttons
		$scope.buttonLeftMarginStyle={'margin-left': '15%'}
		$scope.bigGlyphStyle={'transform': 'scale(4)','margin-top': '50%'}
		$scope.bigbuttonStyle={'height':'8.2vw','width':'8.2vw',
				'margin' : '30px','margin-left' : '25px'}
		$scope.bigbuttonClass="col-xs-6 col-sm-5 col-md-4 col-lg-4"
		//Dynamischer Style und Klasse 
		$scope.tempStyle={"value" : ""}
		$scope.tempClass={"value" : ""}

}])