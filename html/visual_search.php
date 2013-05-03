<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Parallel and Serial Search Patterns - Cognitive Psychology Demos</title>
	<meta name="description" content="">
	<?php include("head.inc"); ?>
	<script src="lib/jquery.overlaps.js"></script>
	<script src="lib/visual_search.js"></script>
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
	                    	<h2>Parallel and Serial Search Patterns</h2>
	                	</div>
	                	<div class="module_content">
	                		<!-- Information -->
	                   		<div id="experiment-info" class="exp-pane">
		                    	<img src="lib/bootstrap/img/visualsearch.png" alt="About Location" style="float: right">
		
		                    	<p>How does the brain find something in the visual world that it is seeking? Triesman and Gelade (XXX) did an elegant experiment designed to show that it was easy to search for distinct features, but much harder to search for the absence of a feature.  For example, searching for a Q among O's is easy, but searching for an O among Q's is much harder.  In this version of the experiment, you can choose to simply replicate this basic finding, or, if you wish, you can design your own version of the experiment by choosing any characters you wish as target and distracter(s).  Does search become harder when you have more different types of distractors? </p>
		
		                    	<p>To practice the task and see how it works, click the "Try it" button below.  By default you should press "F" when the target is present and "J" when the target is not present. Press the space bar to start each new trial.  Try to go as quickly as you can without making more than a couple mistakes. </p>
		                    
		                    	<button class="btn btn-primary tryit">Try it!</button>
		              		</div>
	                		<!-- Setup Form -->
	                		<div id="experiment-form" class="exp-pane hide">
	                			<form class="form-horizontal">
				                    <legend>Parameters</legend>
				                    <fieldset>
				                    
					                    <div class="controls">    
					                        <div class="btn-group" id="expType" data-toggle="buttons-radio">
					                            <input type="button" class="btn active" value="Demo">
					                            <input type="button" class="btn" value="Full Experiment">
					                        </div>
					                    </div>
				                        <br>
				                        <div class="control-group">
				                            <label class="control-label"> How many types of distractors? </label>
				                            <div class="controls">
				                                <input type="text" id="distractors">
				                                <div id="slider" class="slider"></div>
				                            </div>
				                        </div>
				                        
				                        <div id="distractorElts">
				                        </div>
				    
				                        <div class="control-group">
				                            <label class="control-label"> Target </label>
				                            <div class="controls">
				                                <input type="text" id="target">
				                            </div>
				                        </div>
				                        
				                        <div class="controls">
				                            <input id="start" class="btn btn-primary" type="button" value="Start Experiment">
				                        </div>
				                        
				                    </fieldset>
				                </form>
	                		</div>
	                		<!-- Results -->
	                		<div id="experiment-results" class="exp-pane hide"> 
                				<p> Your results have been saved into a file called "dataResults". It contains information about each trial including the response latency of your responses. You can download it as a ".csv" file by clicking the download data button below.</p>
                
                				<div id="chart_div" class="dataReport" style="width:400; height:300"></div>

                				<p> The most important variable that is normally used to measure the ease (or "efficiency") of visual search is the amount of time added to search for each additional distractor.  In the present experiment, the number of items on the screen on each trial varied between 4 and 28.  Normally, response times will be longer as more items are added, but the amount of response time per item (the slope of the regression line) is a good measure of search efficiency. </p>

                				<div id="table_div" class="dataReport" style="width:400; height:300"></div>                

                				<p> Questions to ponder:
					                <ol> 
					                    <li> Is the slope different for "present" trials and "absent" trials? </li>
					                    <li> What is the ratio of the "absent" slope to the "present" slopes? </li> 
					                    <li> Often the ratio is about 2 to 1. Why might this be? </li>
					                </ol>
					            </p>
                				<div id="buttons"> 
                    				<input type="button" class="btn dataReport" id="restart" value="Try Again"> 
                    				<input type="button" class="btn dataReport" id="download" value="Download Data"> 
            					</div>
                			</div>
            
	    				</div>
	            	</div>
	        	</div>
	        </div>
    	</div>
    </div>
    
    <!-- Experiment -->
    <div id="experiment" class="experiment hide exp-pane"> </div>
    <div id="experiment_footer" class="experiment hide exp-pane "> 
            <div class="instructions"> "F" = Present "J" = Not Present </div>
            <div class="counter"> </div>
    </div>
</body>
</html>