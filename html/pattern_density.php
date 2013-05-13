<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Pattern Density - Cognitive Psychology Demos</title>
	<meta name="description" content="">
	<?php include("head.inc"); ?>
	<script src="lib/pattern_density.js"></script> 
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
	                    	<h2>Pattern Density</h2>
	                	</div>
	                	<div class="module_content">
                           	<!-- Information -->
	                   		<div id="experiment-info" class="exp-pane">
			                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis dui quis libero imperdiet ac dapibus velit dignissim. Nunc suscipit nulla et nunc luctus posuere. Curabitur placerat elit nec ipsum porta in bibendum neque mattis. Nullam tristique pharetra massa, et eleifend libero pulvinar a. Nunc et nisl eros, id porta turpis. Morbi consequat vulputate lacus, mollis semper lorem facilisis vel. Sed sit amet risus augue, quis sagittis felis. Nam ac arcu convallis metus vulputate porta a in erat. Etiam tortor elit, volutpat et vulputate quis, semper vel diam. </p>

			                    <p>Curabitur tincidunt augue sit amet est ullamcorper ac dictum nisl imperdiet. Suspendisse id felis in risus lacinia rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam faucibus nunc a turpis volutpat rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque id rhoncus risus. Pellentesque sapien sem, ornare vel euismod a, condimentum id nisi. Aenean a augue quis purus gravida faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec nisl quis quam hendrerit euismod. Phasellus lacinia, tortor vitae facilisis lobortis, lorem lorem sagittis tortor, nec facilisis felis est nec nisl.</p>
			
			                    <p>Ut condimentum fermentum enim vitae porttitor. Nulla mollis dignissim dolor non aliquam. Ut orci libero, gravida id euismod eu, aliquam eu tellus. Vestibulum gravida iaculis nisl eu egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam est justo, eleifend consequat aliquam cursus, pulvinar id metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas a sapien at massa venenatis gravida sed eu metus. Vestibulum ultrices imperdiet venenatis. Nunc sed felis eget ipsum tincidunt aliquam elementum in est.</p>
			
			                    <p>Suspendisse aliquet pretium mattis. Sed rhoncus nibh vel eros sodales blandit. Proin eleifend pharetra tristique. Curabitur eget nunc diam. Morbi urna urna, rutrum sed convallis ut, gravida vitae quam. Praesent et ornare eros. Fusce ultricies ultricies gravida.</p>
			
			                    <p>Curabitur porta pellentesque lorem quis dapibus. Phasellus et ullamcorper est. In hendrerit facilisis justo, quis ornare ligula tincidunt a. In vel ipsum vel lacus tempus laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Curabitur non elementum nulla.</p>
                    
		                    	<button id="tryit" class="btn btn-primary tryit">Try it!</button>
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
				                            <label class="control-label"> Density 1 </label>
				                            <div class="controls">
				                                <input type="text" id="density1">
				                            </div>
				                        </div>
				
				                        <div class="control-group">
				                            <label class="control-label"> Density 2 </label>
				                            <div class="controls">
				                                <input type="text" id="density2">
				                            </div>
				                        </div>
				
				                        <div class="control-group">
				                            <label class="control-label"> Density 3 </label>
				                            <div class="controls">
				                                <input type="text" id="density3">
				                            </div>
				                        </div>
				
				                        <div class="control-group">
				                            <label class="control-label"> Pattern? </label>
				                            <div class="controls">
				                                <input type="text" id="pattern">
				                            </div>
				                        </div>
				
				                        <div class="control-group">
				                            <label class="control-label"> Control Side </label>
				                            <div class="controls">
				                                <select id="dropdown">
				                                    <option value="0">Left</option>
				                                    <option value="1">Right</option>
				                                    <option value="-1">Random</option>
				                                </select> 
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
				                <p> Your results have been saved into a file called "dataResults". It contains information about each trial including the response latency of your responses. You can download it as a ".csv" file by clicking the download data button below.</p>
				                
				                <div id="plot_1" class= dataReport' style="width:500; height:500"></div>
				
				                <div id="plot_2" class="dataReport" style="width:500; height:500"></div>
				                
				                <div id="plot_3" class="dataReport" style="width:500; height:500"></div>
				
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
    <div id="experiment-modal" title="Pattern Density">
	    <div id="experiment" class="experiment"> 
	        <div id="left_experiment" class="left"> </div>
	        <div id="center_experiment" class="listDisplay cross"> + </div>
	        <div id="right_experiment" class="right"> </div>
	    </div>
	    <div id="experiment_footer" class="experiment"> 
	            <div class="instructions"> "F" = Present "J" = Not Present </div>
	            <div class="counter"> </div>
	    </div>
	</div>
</body>
</html>