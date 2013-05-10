<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Sternberg Vision Experiment - Cognitive Psychology Demos</title>
	<meta name="description" content="">
	<?php include("head.inc"); ?>
	<script src="lib/sternberg.js"></script>
    
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
	                    	<h2>Sternberg Vision Experiment</h2>
	                	</div>
	                	<div class="module_content">
							<!-- Information -->
	                   		<div id="experiment-info" class="exp-pane">
		                   		<p> If you are holding a list in your memory, how can you check to see if an item is on the list? </p>
	
		                        <img src="lib/bootstrap/img/sternberg.png" alt="About Location" style="float: left">
	
		                        <p> Sternberg (1966) proposed that we could measure mental operations using an "additive factors" approach.  He gave people lists of numerals of different lengths. Then a probe digit would follow. People had to indicate whether the item was in the list or not. Does it take time to search immediate memory? </p>
	
		                        <p> To emulate Sternberg's auditory presentation technique, we will present number words one at a time. You will get a list to store of between 1 and 6 numbers. Then a warning signal will tell you that the probe will be presented. You should respond as quickly as you can to indicate whether the probe was in the list or not by pressing "F" if it was present and "J" if it was not. After each trial you have to type in the entire list in order to show that you stored it all.  Press return when you have finished entering the list. </p>
		                                           
		                        <p> Do the task diligently and we'll discuss the data once you're finished. </p>
	
		                        
		                        <button id="tryit" class="btn btn-primary tryit">Try it!</button>
		              		</div>
		              		<!-- Setup Form -->
	                		<div id="experiment-form" class="exp-pane hide">
								<form class="form-horizontal">
				                    <legend>Parameters</legend>
				                    <fieldset>                  
				                        <div class="control-group">
				                            <label class="control-label"> Number of Trials </label>
				                            <div class="controls">
				                                <input type="text" id="trials" disabled class="input-large">
				                                <div id="trialSlider" class="slider"></div>
				                            </div>
				                        </div>
				 
				                         <div class="control-group">
				                            <label class="control-label"> Display Time (ms) </label>
				                            <div class="controls">
				                                <input type="text" id="display" class="input-large">
				                            </div>
				                        </div>
				                        <div class="control-group">
				                            <label class="control-label"> Recall Time (ms) </label>
				                            <div class="controls">
				                                <input type="text" id="recall" class="input-large">
				                            </div>
				                        </div>
				    
				                        <div id="listElts"></div>
				                        <div class="controls">
				                            <button id="start" class="btn btn-primary">Start Experiment</button>
				                        </div>
				                    </fieldset>
				                </form>
				            </div>
				            <!-- Results -->
	                		<div id="experiment-results" class="exp-pane hide"> 
			                    <p> Your results have been saved into a file called "dataResults". It contains information about each trial including the response latency of your responses. You can download it as a ".csv" file by clicking the download data button below.</p>
			
			                    <p> Sternberg (1966) found that for each additional item in the list, people took about 40 additional ms to respond. Sternberg suggested that this showed that the search was a serial search through memory, rather than a parallel search of all the items at once.  However, this speed is much faster than you can say the items in your head, so the search is probably unconscious. </p>
			
			                    <div id="chart_div" class="dataReport"></div>
			
			                    <p> Surprisingly, however, Sternberg also observed that the rate for saying "present" was no faster than the rate for saying absent.  Sternberg argued that this meant the search involved comparisons to ALL the items in the list (exhaustive search) rather than only until the matching item was found (self-terminating search). </p>                         
			
			                    <div id="table_div" class="dataReport" style="width:400; height:300"></div>
			                    
			                    <p> Questions to ponder: </p>
			                    
			                    <ol>
			                        <li> Is the slope different for "present" trials and "absent" trials? </li>
			                        <li> Sternberg found that the slopes were the same (and both about 40 ms per item). </li> 
			                        <li> Why might the memory scanning process be serial AND exhaustive (rather than self-terminating)? </li>
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
    <div id="experiment-modal" title="Sternberg Vision Experiment">
	    <!-- Experiment -->
	    <div id="experiment" class="experiment"> </div>
	    <div id="experiment_footer" class="experiment"> 
			<div class="instructions"> "F" = Yes, "J" = No, "Space" = New Trial, "Enter" = Submit List </div>
			<div class="counter"> </div>
		</div>
	</div>
</body>
</html>