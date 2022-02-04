import { fullAddress } from './config.js';
var versionAPI = "http://"+fullAddress()+"/version";
var cardsAPI = "http://"+fullAddress()+"/cards";
	
	/**
	 * Go to the view in the event targets CSS variable
	 */
	$(document).ready(function(){
		var method;

		$.getJSON( versionAPI, function( data ) {
		  console.log( "JSON Data version: " + data );
		});
		

		$.getJSON( cardsAPI, function( data ) {
			console.log( "JSON Data cards: " + data.cards.length);
			cardsArray = data.cards;
		  $.each( cardsArray, function( key, val ) {
			  
				$('.Ecards-container').append('<img onclick="Application.goToTargetView(event,'+(val.id-1)+')" class="EcardsImages" src="data:image/png;base64,'+val.img+'" ></img>');
			});
			console.log(cardsArray);
			$("#ecard_media_style").text("@media (max-width: 353px) {  .EcardsImages {    flex: 100%;  }}");
		});

	});
	 
	Application.goToTargetView = function(event,id) {
		var button = event.currentTarget;
		var buttonComputedStyles = getComputedStyle(button);
		var actionTargetValue = buttonComputedStyles.getPropertyValue(window.application.prefix+"action-target").trim();
		var animation = buttonComputedStyles.getPropertyValue(window.application.prefix+"animation").trim();
		var targetType = buttonComputedStyles.getPropertyValue(window.application.prefix+"action-type").trim();
		var targetView = window.application ? null : window.application.getElement(actionTargetValue);
		var targetState = targetView ? Application.getStateNameByViewId(targetView.id) : null;
		var actionTargetStyles = targetView ? targetView.style : null;
		var state = window.application.viewsDictionary[actionTargetValue];
		console.log(id);
		//console.log(cardsArray);
		sessionStorage.setItem("SelectedEcardID", id);
		sessionStorage.setItem("SelectedEcardImgstr", cardsArray[id].img);
		// navigate to page
		if (window.application ==false || targetType=="page") {
			//console.log("../" + actionTargetValue);
			document.location.href = "./" + actionTargetValue;
			return;
		}

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
			var stateEvent = new Event(self.STATE_NOT_FOUND);
			window.application.stateName = name;
			window.dispatchEvent(stateEvent);
		}

		event.stopImmediatePropagation();
	}