<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <title>Reverse Stroop Vision Experiment - Cognitive Psychology Demos</title>
    <meta name="description" content="">
	<?php include("head.inc"); ?>
    <script src="lib/raphael.js"></script>
    <script src="lib/reverse_stroop.js"></script>
</head>
<body>	
    <div class="body_outer_container">
        <div class="body_inner_container">    
            <header id="header" class="header">
                <hgroup class="header_title">
                    <h1>
                        <a href="/" target="_self" title="Swarthmore College">Swarthmore College</a>
                    </h1>
            	</hgroup>
        	</header>
	        <div class="body_content">    
	            <div class="row">
	            	<?php include("navbar.inc"); ?>          
	            	<div class="module_type1 span8">
	                	<div class="module_title">
	                    	<h2>Reverse Stroop Vision Experiment </h2>
	                	</div>
	                	<div class="module_content">
                           <!-- Information -->
	                   		<div id="experiment-info" class="exp-pane">
			                    <img src="lib/bootstrap/img/reversestroop.png" alt="About Location" style="float: right">
			                    <p> Stroop (1935) showed that there was large processing cost for naming the ink color of incongruently named color words. For example if the word "blue" is printed in red, trying to say "red" in response is rendered more difficult by the fact that the word "blue" is staring you in the face. In contrast, saying "blue" to such a word is easy. Many textbooks illustrate this phenomenon because it illustrates ways in which our ability to control the flow of information is limited. Short of blurring our eyes, it is hard to avoid processing the verbal information even when we know it isn't relevant.  Here we implement a variant designed to show that this phenomenon is not simply based on the precedence of verbal information. </p>
			
			                    <p> In this reverse Stroop task you have to point to a color patch corresponding to the verbal part of a Stroop word. That is, if presented with the word "blue", depicted in red light, your task is to point to the blue color patch in the surround.  Because this is a visual search task in which one is searching for a sensory color, you may find that the color in which the word is printed is now quite interfering. </p>
			
			                    <p> The present implementation of this task is designed to mimic an experiment reported by Durgin (2003) in which only four different color words ever appeared (these words were selected at random from a set of 9 colors), and the distractor color (printed color) could either belong to this set of four or not (In the Set or Not in the Set), and could also be present or absent as one of the surrounding response patches available. </p>
			
			                    <p> To do the task you simply click the mouse in the center to show the display and then move the mouse to the color named by the central word (as quickly as possible without sacrificing accuracy). </p>

		                    	<button id="tryit" class="btn btn-primary tryit">Try it!</button>
		              		</div>     
                            <!-- Setup Form -->
	                		<div id="experiment-form" class="exp-pane hide">
                                <form class="form-horizontal">
                                    <fieldset>
                                        <legend>Parameters</legend>
                                        <div class="control-group">
                                            <label class="control-label">Number of Trials</label>
                                            <div class="controls">
                                                <input type="text" id="trialnum" class="input-large" value="4" disabled>
                               					<div id="trialSlider" class="slider"></div>
                                            </div>
                                        </div>
                                        <div class="controls">
                                            <button id="start" class="btn btn-primary">Start Experiment</button>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>   
                            <!-- Results -->
	                		<div id="experiment-results" class="exp-pane hide">   
	                        	<p> Your results are displayed below. It contains information about each trial including the response latency and accuracy of your response. </p>
                                <div id="table_div"></div>
                                <p> It also defines each trial in terms of "Set" and "Match". Consider that the distracter information on each trial (the printed color) can either be one of the four colors that are sometimes targets (Set = 1) or not (Set = 0). The distracted could also match the on-screen responses (Match = 1) or not (Match = 0). Durgin (2003) found that distractors in the response Set delayed people by about 30 ms, whereas having a Matched response patch only slowed responses by about 15 ms. Evidently, much of the delay from the distractor color may be due to effects on processing the verbal information (forming a search image from it) rather than attentional distraction posed by the Matched foil on the screen.  The two effects were additive. </p>
                                <p> Questions to ponder: </p>
                                <ol>
                                        <li> Why does the sensory color interfere with the verbal information? </li>
                                        <li> What strategies might an information processing system use for this task? </li>
                                        <li> Would you get different results if you always tried to visualize the target color? What if you always tried to name all the response patches? </li>
                                </ol>
                                <div id="buttons"> 
                                        <input type="button" class="btn btn-primary dataReport" id="restart" value="Try Again"> 
                                        <input type="button" class="btn btn-primary dataReport" id="download" value="Download Data"> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
	<!-- simply four divs, no other distractions -->
    <div id="holder" class="hide">
       		<div class="instructions">
				Instructions:
				Click to start, then move your cursor over the circle that has the color indicated by the word.
			</div>
       		<div id="canvas"></div>
    </div>
</body>
</html>
