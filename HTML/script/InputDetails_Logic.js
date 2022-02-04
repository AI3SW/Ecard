import { fullAddress } from './config.js';

var EmailAPI = "http://"+fullAddress()+"/email";
$(document).ready(function(){
	
	var EcardId = sessionStorage.getItem('SelectedEcardID');
	console.log(EcardId);
	var EcardImgstr = sessionStorage.getItem('PersonalizedEcard');
	//console.log(EcardImgstr);
	$('#ViewBody').prepend('<img id="EcardTemplate" <img src="data:image/png;base64,'+EcardImgstr+'"> </div>');
});

	/**
	 * Go to the view in the event targets CSS variable
	 */
	window.application.goToTargetView = function(event) {
		var button = event.currentTarget;
		var buttonComputedStyles = getComputedStyle(button);
		var actionTargetValue = buttonComputedStyles.getPropertyValue(window.application.prefix+"action-target").trim();
		var animation = buttonComputedStyles.getPropertyValue(window.application.prefix+"animation").trim();
		var targetType = buttonComputedStyles.getPropertyValue(window.application.prefix+"action-type").trim();
		var targetView = window.application.application ? null : window.application.getElement(actionTargetValue);
		var targetState = targetView ? window.application.getStateNameByViewId(targetView.id) : null;
		var actionTargetStyles = targetView ? targetView.style : null;
		var state = window.application.viewsDictionary[actionTargetValue];
		
		var formdata = $("#Form").serializeArray();

		var jsonstring = "{";
		var errorMessage = ""
		var invalidatedForm = false;
		$(formdata).each(function(i, field){
			if(!field.value || /^\s*$/.test(field.value)) {
				invalidatedForm = true;
				errorMessage += "Please fill in " +field.name+" the fields\n";
			}
			//console.log(field.name);
			if(field.name.includes("email")) {
				if(!validateEmail(field.value)) {
					errorMessage += "Please make sure " +field.name+" has a correct email\n";
					invalidatedForm = true;
				}

			}
			jsonstring += "\""+field.name +"\": \""+field.value + "\"";
			//console.log(i + " " +  formdata.length);
			if(i < formdata.length -1)	jsonstring += ",";
		  //dataObj[field.name] = field.value;
		});

		
		
		jsonstring += "}";

		if(invalidatedForm) {
				alert(errorMessage);
				return;
		}
		
		var dataLength = JSON.stringify(jsonstring).length;
		console.log(jsonstring);
		//$("#Form").submit();

	   
		$.ajax({
			url: EmailAPI,
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json',
			header: {
				'Content-Length': dataLength
			},
			data: jsonstring,
			processData: false,
			success: function( data, textStatus, jQxhr ){
				console.log('status: ' + status + ', data: ' + data.success);
			},
			error: function( jqXhr, textStatus, errorThrown ){
				console.log( errorThrown );
			}
		});
	   
	   
		// navigate to page
		//console.log( $( this ).serializeArray() );
		if (window.application.application==false || targetType=="page") {
			document.location.href = "./" + actionTargetValue;
			return;
		}

console.log("view is found");
		// if view is found
		if (targetView) {

			if (window.application.currentOverlay) {
				window.application.removeOverlay(false);
			}

			if (window.application.showByMediaQuery) {
				var stateName = targetState;
				
				if (stateName==null || stateName=="") {
					var initialView = window.application.getInitialView();
					stateName = initialView ? window.application.getStateNameByViewId(initialView.id) : null;
				}
				window.application.showMediaQueryViewsByState(stateName, event);
				return;
			}

			// add animation set in event target style declaration
			if (animation && window.application.supportAnimations) {
				window.application.crossFade(window.application.currentView, targetView, false, animation);
			}
			else {
				window.application.setViewVariables(window.application.currentView);
				window.application.hideViews();
				window.application.enableMediaQuery(state.rule);
				window.application.scaleViewIfNeeded(targetView);
				window.application.centerView(targetView);
				window.application.updateViewLabel();
				window.application.updateURL();
			}
		}
		else {
			var stateEvent = new Event(window.application.STATE_NOT_FOUND);
			window.application.stateName = name;
			window.dispatchEvent(stateEvent);
		}

		event.stopImmediatePropagation();
	}
	
function validateEmail(email) 
    {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }