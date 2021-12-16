///////////////////////////////////////
// INITIALIZATION
///////////////////////////////////////

/**
 * Functionality for scaling, showing by media query, and navigation between multiple pages on a single page. 
 * Code subject to change.
 **/

if (window.console==null) { window["console"] = { log : function() {} } }; // some browsers do not set console

$(document).ready(function(){
	var user_agent = navigator.userAgent;
	var re = new RegExp('^.*(\bAndroid\b)?.*$', '');
	var myArray = user_agent.match(re);
	var UA_includesAndroid = user_agent.includes("Android");
	var UA_includesApple = user_agent.includes("iPhone");
	var UA_includesMobile = UA_includesApple || UA_includesAndroid;

	$('#indexBody').append('<br> '+myArray);
	console.log('Apple '+UA_includesApple);
	console.log('Android '+UA_includesAndroid);
	console.log('Mobile '+UA_includesMobile);
	
	
	if(UA_includesMobile) {
		window.location.replace('./Ecard/Mobile/HomePage.html');
		console.log("going to mobile");
	} else {
		window.location.replace('./Ecard/Desktop/HomePage.html');
		console.log("going to desktop");
	}

});

