var experimentControls = {
	init: function(){
		var _this = this;
		$(document).ready(function(){
			_this.initializeButtons();
			_this.setActiveNav();
		});
		// Global event subscriptions
		this.subscribe("tryExperiment", function(){
			$(".exp-pane").hide();
			$("#experiment-form").show();
		});
		this.subscribe("startExperiment", function(){
	    	$( "#experiment-modal").dialog({
	    	   modal: true,
	    	   width: 600,
	    	   height: "auto",
	    	   close: function( event, ui ) {
	    		   experimentControls.deliver("cancelExperiment");
	    	   }
	    	}).show();
	    	//inits the trial counter
	    	this.totalTrials = (typeof global.trials == 'object') ? global.trials.length : parseInt(global.trials, 10);
			this.trialNum = 0;
			$("#experiment_footer .counter").html(this.trialNum + '/' + this.totalTrials);
		});
		this.subscribe("endExperiment", function(){
			//close the modal
			$("#experiment-modal").dialog("destroy");
			//unbind the keystroke listener
			$(document).unbind('keydown');
            //show the results
            $(".exp-pane").hide();
            $("#experiment-results").show();
		});
		this.subscribe("cancelExperiment", function(){
			document.location.reload(true);
		});
		this.subscribe("incrementCounter", function(){
			this.trialNum++;
			$("#experiment_footer .counter").html(this.trialNum + '/' + this.totalTrials);
		});
	},
	initializeButtons: function(){
		var _this = this;
	    //load the experiment form
	    $("#tryit").click(function(){
	    	_this.deliver("tryExperiment");
	    	return false;
	    });
	    //start the experiment
	    $("#start").click(function(){
	    	_this.deliver("startExperiment");
	    	return false;
	    });
	    //restart the experiment
	    $('#restart').click(function () {
	    	_this.deliver("cancelExperiment");
	    	return false;
	    });
	},
	setActiveNav: function(){
		var activePage = $("a[href$='" + document.location.pathname.replace(/^.*\/([^\/]+)$/, "$1")  + "']");
	    if (!activePage.length){
	    	activePage = $("a[href$='index.php']");
	    }
	    activePage.parent("li").addClass("active");
	},
	updateFooter: function(msg){
		$("#experiment_footer .instructions").html(msg);
	},
	/**
	 * Event subscription system
	 */
	notifiers: {},
	subscribe: function(eventName, func, context){ //subscribe a callback to an event
		this.notifiers[eventName] = this.notifiers[eventName] || [];
		this.notifiers[eventName].push({func: func, context: context || this});
	},
	deliver: function(eventName){ //fire an event and deliver all subscriptions
		if (this.notifiers[eventName]){
			for (var i = 0; i < this.notifiers[eventName].length; i++) {
        		this.notifiers[eventName][i].func.call(this.notifiers[eventName][i].context);
        	}
        } else {
        	this.log ("Event '" + eventName + "' not subscribed");
        }
	},
	/**
	 * Utility logging function
	 */
	log: function(msg){
		if (typeof console == 'object'){
			console.log(msg);
		}
	}
};

experimentControls.init();
