import { fullAddress } from './config.js';
var ImageAPI = "http://"+fullAddress()+"/image";


$(document).ready(function(){
	
	var EcardId = sessionStorage.getItem('SelectedEcardID');
	console.log(EcardId);
	var EcardImgstr = sessionStorage.getItem('SelectedEcardImgstr');
	console.log(EcardImgstr);
	$('#ViewBody').prepend('<img id="EcardTemplate" <img src="data:image/png;base64,'+EcardImgstr+'"> </div>');
});

	var stringData;
	window.application.uploadFiles = function(event) {
		//var preview = document.querySelector('#InputBox'); // Image reference
		
		
		var file = document.querySelector('input[type=file]').files[0];  // File refrence
		
		var reader = new FileReader(); // Creating reader instance from FileReader() API

		reader.addEventListener("load", function () { // Setting up base64 URL on image
			//preview.src = reader.result;
			//this.Imgstr = reader.result;
			//console.log(reader.result);


			stringData = reader.result.split(",");

			console.log( ("#PhotoOutput").length );
			$("#PhotoOutput").attr("src","data:image/png;base64,"+stringData[1]);
			//const obj = {name: "John", age: 30, city: "New York"};

			
			
			
			
			/*
			$.post( ImageAPI,   // url
				   jsonString, // data to be submit
				   function(data, status, jqXHR) {// success callback
						console.log('status: ' + status + ', data: ' + data);
					},
					"json");
							*/
		}, false);
        reader.addEventListener('error', () => {
            console.error(`Error occurred reading file: ${file.name}`);
        });
		reader.readAsDataURL(file); // Converting file into data URL
	}






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

		var EcardId = parseInt(sessionStorage.getItem('SelectedEcardID'))+1;
		var jsonString = "{ \"card_id\" : \""+EcardId+"\" , \"img\": \""+stringData[1]+"\"}";
		//console.log(jsonString);
		var dataLength = JSON.stringify(jsonString).length;
		console.log(ImageAPI);
		$.ajax({
			url: ImageAPI,
			dataType: 'json',
			type: 'POST',
			contentType: 'application/json',
			header: {
				'Content-Length': dataLength
			},
			data: jsonString,
			processData: false,
			success: function( receiveddata, textStatus, jQxhr ){
				console.log('status: ' + status + ', data: ' + receiveddata);
				
				var Badresponse = false;
				var responseMessage;
				$.each( receiveddata, function( key, val ) {
					console.log(key +" , "+ val);
					if(key == "error") {
						Badresponse = true;
						responseMessage = val;
					} else {
						sessionStorage.setItem("PersonalizedEcard", val);
						console.log("saving image");
												// navigate to page
						//console.log( $( this ).serializeArray() );
						if (window.application.application==false || targetType=="page") {
							document.location.href = "./" + actionTargetValue;
							return;
						}
					}
				});

				if(Badresponse) {
					console.log(responseMessage);
				}

				
			},
			error: function( jqXhr, textStatus, errorThrown ){
				console.log( errorThrown );
			}
		})
	   
		//console.log("view is found");
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