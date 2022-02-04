$(document).ready(function(){
	var EcardImgstr = sessionStorage.getItem('PersonalizedEcard');
	console.log(EcardImgstr);
	$('#Group_cg').prepend('<img id="PreviewImage" <img src="data:image/png;base64,'+EcardImgstr+'"> </div>');
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
		
		// navigate to page
		if (window.application.application==false || targetType=="page") {
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
			var stateEvent = new Event(window.application.STATE_NOT_FOUND);
			window.application.stateName = name;
			window.dispatchEvent(stateEvent);
		}

		event.stopImmediatePropagation();
	}