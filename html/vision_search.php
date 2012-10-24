<!-- This experiment is designed to measure and explore the ways that the brain searches through patterns of letters.  It presents the subject with a series of screens with a target letter surrounded by distractors.  In half of the trials, the target letter will be present, and in half of the trials it will be absent.  The experiment then records the time it takes for the subject to determine whether or not the target is present.  

The trials are generated systematically with a series of nested for-loops which ensure a perfectly even distribution of trials with 4, 8, 12, 16, 20, 24, and 28 distractors.  The trial order is then shuffled and run trial by trial as the results are recorded.

Because the experiment gives the user the capability to have multiple types of distractors, a certain number of the distractors in some trials will be randomly selected.  However, the experiment tries to keep as even a distribution of different types of distractors as possible.

The screens themselves are generated using the "overlaps" javascript plugin.  Each letter is first placed randomly. Then, the "overlaps" plugin checks whether or not that letter is overlapping any of the letters that have already been placed.  If it does, the letter is repositioned randomly again and the process repeats.  This particular methodology can be used when placing fewer than 100 letters without noticable performance issues, however for n > 100 letters, most computers will tend to exhibit performance lags of several seconds.  If you are adapting this program to have significantly more distractors, then you should divide the screen into grids and only check each letter against the adjacent squares.  

The bulk of the data analysis for this experiment is being done in a python script on the server.  It crunches the data, bifurcates the data into trials where the target was present and trials where the target was absent, runs a regression analysis on each dataset, computes error rates, and passes the data back to the client side via an ajax call.  The same script is also used to output the data to a '.csv' file by means of the "filedownload" plugin.  These scripts can return errors if passed incomplete datasets.  

Once the data has been passed back from the server, it is plotted in a scatterchart using the google visualizer api.  The data points for each of the two regression lines are computed based on the regression coefficients passed back by the server and then plotted.  

This experiment was programmed by Jacob Adenbaum and David Nahmias under the supervision of Frank Durgin.  If you have any questions about this experiment and the way it works, please contact either Frank Durgin (fdurgin1@swarthmore.edu) or Jacob Adenbaum (jadenba1@swarthmore.edu).
-->

<!DOCTYPE html>
<html lang="en">
    
    <head>
        <meta charset="utf-8">
        <title>Search Patterns</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        
        <?php include('core_js_css.html'); ?>
        
        
        
        
        
       
        <script src="bootstrap/docs/assets/js/bootstrap-button.js"></script>
		<script src="bootstrap/docs/assets/js/bootstrap-typeahead.js"></script>
        
        <script src="js/jquery.fileDownload.js"></script>
        
        <script src="js/jquery.overlaps.js"></script>

      
        
        <script src="bootstrap/docs/assets/js/bootstrap-transition.js"></script>
        
        <script src="bootstrap/docs/assets/js/bootstrap-alert.js"></script>
        
        <script src="bootstrap/docs/assets/js/bootstrap-modal.js"></script>
        
        <script src="bootstrap/docs/assets/js/bootstrap-dropdown.js"></script>
        
        <script src="bootstrap/docs/assets/js/bootstrap-scrollspy.js"></script>
        
        <script src="bootstrap/docs/assets/js/bootstrap-tab.js"></script>
        
        <script src="bootstrap/docs/assets/js/bootstrap-tooltip.js"></script>
        
        <script src="bootstrap/docs/assets/js/bootstrap-popover.js"></script>
        
        
        <script src="bootstrap/docs/assets/js/bootstrap-collapse.js"></script>
        
        <script src="bootstrap/docs/assets/js/bootstrap-carousel.js"></script>
        

        <script src="https://www.google.com/jsapi"></script>

        
        <script type="text/javascript">
            google.load('visualization', '1', {
                packages: ["corechart", 'table']
            });
            
            
        //Initializes Experiment Variables
            function varSet(){
                t = 0;
                
                //Global Variable
                global = {
                    trialsPerDistractor: 20,
                    trialDistractors: [4, 8, 12, 16, 20, 24, 28], 
                    distractors: [
                        'O',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',                        
                    ],
                    numberDistractors: 0,
                    target: 'Q',
                    percentagePresent: .5,
                    trials:[],
                }
                
                select = true;
                experimentStart = undefined;
            }

        //following while loop is variation on Fisher-Yates shuffle algorithm.  Shuffles trialOrder randomly.
            function shuffleArray(array){                     
                var j, x, i = array.length; 
                
                //clones array so we aren't changing the original
                array = array.slice(0); 
                
                //Runs through each array entry and randomly switches it with another.
                while (i) { // same as while(i != 0)
                    j = parseInt(Math.random() * i);
                    x = array[--i];
                    array[i] = array[j];
                    array[j] = x;
                }
                return array; //Note: returns the cloned array.  Doesn't alter original.  
            }
           
        //Initializes Form
            function initializeForm(){
                //Initialize listLength Slider
                $('#slider').slider({
                    value: 1,
                    min:1,
                    max:9,
                    step:1,
                    animate:true,
                    slide: function(event,ui){
                        //Resets associated field value when slider is changed:
                        $('#distractors').val(ui.value);
                        //Trigger change function for listLength when slider is moved.  (See change function below)
                        $('#distractors').trigger('change');
                    }
                });
                
                //Dynamically adjust form based on input value for listLength:
                $('#distractors').change(function(){
                    distractors = global.distractors; //creates local pointer to global object
                    
                    //if input is inside accepted range:
                    if (this.value <= 9 && this.value >=1 && Math.floor(this.value) == this.value){
                        
                        //Adjust Slider
                        $('#slider').slider( "value", this.value);
                        
                        //Remove Error Message if it exists attached to elt's grandparent in the DOM
                        if ($(this).parent().parent().hasClass('error')){
                            $(this).parent().parent().removeClass('error');
                            $(this).siblings('.help-inline').remove();
                        }                  
                                               
                        //If they increased the number of fields:
                        if (global.numberDistractors < $('#distractors').val()){
                            
                            //Loop through and add the extra fields:
                            for (i=global.numberDistractors; i<$('#distractors').val();i++){
                                global.numberDistractors++;
                                $('#distractorElts').append(
                                "<div class='control-group distractors'> \
                                <label class='control-label'> Distractor " + (i+1) + " </label> \
                                <div class='controls'>\
                                <input type='text' id='distractor_" + (i+1) + "' value='" +  distractors[i] + "'>\
                                </div> </div>");
                            }                        
                        } 
                        //If they decreased the number of fields:
                        else if (global.distractors.length > $('#distractors').val()){
                            
                            //Loop through and remove the extra fields:
                            for (i=global.numberDistractors; i>$('#distractors').val();i=i-1){
                                global.numberDistractors--;
                                $('.distractors:last').remove();   
                            }
                        }                        
                    } 
                    
                    //If input is not in accepted range, add error message.  Do not update global object. 
                    else if (!$(this).parent().parent().hasClass('error')){
                        $(this).parent().parent().addClass('error');
                        $(this).parent().append("<span class='help-inline'> Please submit an integer between 1 and 9 </span>");
                    }
                    
                    //If any of the list elements are changed, update the global object with the new value
                    $('.distractors').find(':input').change(function(){
                        distractors[($(this).attr('id').slice(-1)-1)] = $(this).val();
                    });
                    
                });
                
                //Set initial value of listLength field to the default slider value:
                $('#distractors').val($('#slider').slider('value'));
                
                //Run the change function we just set up
                $('#distractors').trigger('change');
                
                
                //Populates the Target input field and sets up a change function
                $('#target').val(global.target);
                $('#target').change(function(){
                    global['target'] = $(this).val();
                });
                
                //Create Click function for Start Experiment Button
                $('#start').click(function(){
                    $('form').hide();
                    generateTrials();
                    initializeModal();
        
                    //updates trial counter
                    $('.counter').text( t + '/' + global.trials.length );
                    
                    runExperiment();
                });
            }
        //Generate Trials
            function generateTrials(){
                //Create Local Pointer
                var trials = global.trials
                
                //Determine from Form how many trials per distractor to run
                if ( $('#expType').children('.active').val() == 'Demo' ){
                    global['trialsPerDistractor'] = 4;
                } else {
                    global['trialsPerDistractor'] = 20;
                }
                
                //Populates the Trial Order
                for (var i = 0; i < global.trialDistractors.length; i++){
                    
                    //Makes half the trials have target present and half absent
                    for (var n = 0; n < Math.ceil(global['trialsPerDistractor']/2); n++){
                        trials.push({
                            distractors: global.trialDistractors[i], 
                            targetPresent: true,
                            }
                        );
                    }
                    for (var n = 0; n < Math.ceil(global['trialsPerDistractor']/2); n++){
                        trials.push({
                            distractors: global.trialDistractors[i], 
                            targetPresent: false,
                            }
                        );
                    }
                }
                
                //Shuffles trial order
                global.trials = shuffleArray(trials);
            }
        
        //Initialize the Experiment Modal -- not a real jQuery modal
            function initializeModal(){
                $('.body_outer_container').hide();
                $('.experiment').show();
            }
        
        //Close the experiment modal
            function closeModal(){
                
                //remove modal
                $('.experiment').hide();
                
                //turn off keypress
                $(document).unbind('keydown');
                
                //show main page
                $('.body_outer_container').show();
                
                //throw out trials that haven't been run
                global.trials = global.trials.slice(0,t); 
                
                //Run DataAnalyis
                dataAnalysis();
            }
            
        //Generates a Random Placement of distractor
            function randomPlacement() {
                randNum1 = Math.floor(Math.random() * 560) + 10;
                randNum2 = Math.floor(Math.random() * 530) + 10;
            };

            function letterPlacement(letter, number){
            
                //generates new placement
                randomPlacement();
    
                //adds letter
                $("#experiment").append("<div id='trial_" + t + "_letter_div_" + number + "' class='letters trial_" + t + "'  style= 'width:12px; color:none'>" + letter + "</div>"); 
                
                //positions letter
                $("#trial_" + t + "_letter_div_" + number).position({
                    of: $('#experiment'),
                    my: 'left top',
                    at: 'left top',
                    offset: randNum1 + ' ' + randNum2
                }); 
                
                //Checks that the letter doesn't overlap anything
                while ($("#trial_" + t + "_letter_div_" + number).overlaps('.placed')) {
                    
                    //if it does, then reposition the letter
                    randomPlacement();
                    $("#trial_" + t + "_letter_div_" + number).position({
                        of: $('#experiment'),
                        my: 'left top',
                        at: 'left top',
                        offset: randNum1 + ' ' + randNum2
                    }); 
                }
                
                //once placed, make sure nothing gets placed over it.  
                $("#trial_" + t + "_letter_div_" + number).addClass("placed");
            }
            
            function newScreen() {
            
            //hides instructions dialog
                if (!$('#instructions').hasClass('hide')) {
                    $('#instructions').addClass('hide');
                }
                $('#experiment').text('');
                
                console.log('trial: ' + t);
                console.log('target present? ' + global.trials[t].targetPresent);
                console.log('distractors: ' + global.trials[t].distractors);
                
                //counter for how many letters have been placed
                var u = 0;
                
                var ratio = global.trials[t].distractors/global.numberDistractors;
                
                for (var n = 0; n < global.numberDistractors; n++) {
                    for (var i = 0; i < Math.floor(ratio); i++) {
                        
                        letterPlacement(global.distractors[n], u)
                        
                        //increase counter.  
                        u = u + 1;
                    }
                }
                
                //places some extra letters to account for rounding earlier
                
                if (Math.floor(ratio) != ratio) {
                    
                    //determine how many extra letters are necessary
                    var extras = Math.round((ratio - Math.floor(ratio)) * global.numberDistractors);
                    
                    //loop through and place extras
                    for (var i=0; i < extras; i++){
                        
                        //randomly select index
                        var n = Math.floor(Math.random() * global.numberDistractors)
                        
                        //place letter
                        letterPlacement(global.distractors[n], u)
                        
                        //increase counter
                        u++;
                    }
                }
                
                var rand = Math.random();
            
            //places target letter    
                randomPlacement();
                
                //determines if target should be placed based on trial order
                if (global.trials[t].targetPresent) {
                    $("#experiment").append("<div id='trial_" + t + "_targ_letter' class='letters trial_" + t + "' style='width:12px; color:none'>" + global.target + "</div>");
                } 
                //if not, place random distractor letter instead
                else {
                    $("#experiment").append("<div id='trial_" + t + "_targ_letter' class='letters trial_" + t + "' style='width:12px; color:none'>" + global.distractors[Math.floor(Math.random() * global.numberDistractors)] + "</div>");
                }
                
                //positions letter randomly
                $("#trial_" + t + "_targ_letter").position({
                    of: $('#experiment'),
                    my: 'left top',
                    at: 'left top',
                    offset: randNum1 + ' ' + randNum2
                }); 
                
                //if target is overlapping other letter, reposition
                while ($("#trial_" + t + "_targ_letter").overlaps( $('.placed')) ) {
                    randomPlacement()
                    $("#trial_" + t + "_targ_letter").position({
                        of: $('#experiment'),
                        my: 'left top',
                        at: 'left top',
                        offset: randNum1 + ' ' + randNum2
                    }); 
                }
                $("#trial_" + t + "_targ_letter").addClass('placed');
                console.log('placed: ' + $('.placed').length)
            };
            
        //Prints Instructions
            function generateInstructions(){
                $('#experiment').append("<div id='instructions'> Press the space bar to start each trial. If you see the target, press the \"F\" key. If you do not see the target, press the \"J\" key. Don't worry if you make a mistake. </div>");
            }
                
        //Sets up Keydown function
            function initializeKeydown(){
                $(document).keydown(function (e) {
                    var code = (e.keyCode ? e.keyCode : e.which);

                    //CHECKS TO MAKE SURE EXPERIMENT HAS BEEN STARTED
                    if (typeof experimentStart != 'undefined') { 
                        if (code == 32 && t < global.trials.length && select) {
                            
                            //pulls down keypress time
                            var t1 = new Date();
                            var keypress = t1.getTime();
                            
                            //prints a new screen
                            newScreen(t);
                            
                            //pulls down start time
                            var t2 = new Date();
                            
                            //start defined globally so it can be accessed outside the the if statement...
                            start = t2.getTime(); 
                            
                            //user has not yet made a selection...
                            select = false;
                        }
                        if ( (code == 70 || code == 74) && t < global.trials.length && !select) {
                            
                            //pulls down time for response
                            var t3 = new Date();
                            end = t3.getTime();
                            
                            //records response time
                            global.trials[t]['time'] = end - start;
                            
                            //records subject response (true or false)
                            if (code == 70){
                                global.trials[t]['subjectResponse'] = true;
                            } else if (code == 74) {
                                global.trials[t]['subjectResponse'] = false;
                            }
                            
                            //clears screen
                            $('#experiment').text('').append('<div class="listDisplay cross"><center> + </center></div>');
                            
                            //subject has made selection
                            select = true;
                            
                            //iterates trial counter
                            if (t < global.trials.length - 1) {
                                t = t + 1;
                                //updates trial counter
                                $('.counter').text( t + '/' + global.trials.length );
                            } 
                            //if this is the end of the experiment
                            else { 
                                closeModal();
                            }
    
                        } 
                        //if subject hits escape key
                        else if (code == 27) {                           
                            //experiment is off
                            experimentStart = undefined;
                            
                            //close the modal
                            closeModal();
                        }
                    }
                });
        }
        
        //Analyze Data and Send to Server
            function dataAnalysis(){
                
                //sends to server to get regression data
                $.ajax({
                    type: 'POST',
                    url: '../cgi-bin/exptest11.py',
                    data: {
                        exp_data: JSON.stringify(global),
                        option: JSON.stringify('analysis')
                    }
                }).done(function (analysis) {
                    
                    //stores JSON data from server in global object
                    global['analysis'] = analysis
                    
                    //draws in chart with data
                    drawChart();

                    //Send Data to Server for Download as a CSV file        
                    $('#download').click(function () {
                        console.log('clicked');
                        $.fileDownload("../cgi-bin/exptest11.py", {
                            httpMethod: 'POST',
                            data: {
                                exp_data: JSON.stringify(global),
                                option: JSON.stringify('csv')
                            }
                        });
                    });
                    
                    //restart the experiment
                    $('#restart').click(function () {
                        location.reload();
                    });
                });
            }
        //Draws in the charts and tables
            function drawChart() {
                
                //make local pointers
                present = global.analysis.present;
                absent = global.analysis.absent;
                regression = global.analysis.regression;
                errors = global.analysis.errors;
                
                var dataTable = new google.visualization.DataTable();

                //declare columns
                dataTable.addColumn('number', 'Number of Distractors');
                dataTable.addColumn('number', 'Average Time Present (ms)');
                dataTable.addColumn('number', 'Average Time Absent (ms)');
                dataTable.addColumn('number', 'Best Fit Present');
                dataTable.addColumn('number', 'Best Fit Absent');
                dataTable.addColumn('number', 'Error Rate (%)');
                
                //Add data
                for (key in (present || absent)) {
                    dataTable.addRow([
                        parseFloat(key), 
                        parseFloat(present[key].mean),
                        parseFloat(absent[key].mean), 
                        parseFloat(regression.present.a + regression.present.b * key), 
                        parseFloat(regression.absent.a + regression.absent.b * key), 
                        parseFloat(errors[key].rate)
                    ]);
                }
                
                //Extend Regression Lines to Edges of Graph
                dataTable.addRow([
                    0, 
                    null, 
                    null, 
                    parseFloat(regression.present.a),
                    parseFloat(regression.absent.a), null
                ]);
                
                dataTable.addRow([
                    30, 
                    null, 
                    null, 
                    parseFloat(regression.present.a + regression.present.b * 30), 
                    parseFloat(regression.absent.a + regression.absent.b * 30), null
                ]);
                
                //create specialized instance of table
                var tableView = new google.visualization.DataView(dataTable);
                
                //set columns and rows to show
                tableView.setColumns([0, 1, 2, 5])
                tableView.setRows(0, 6)
                
                //set options for graph 
                var options = {
                    title: 'Time vs. Number of Distractors',
                    width: 600,
                    height: 600,
                    hAxis: {
                        title: 'Number of Distractors',
                        gridlines: {
                            count: global.trialDistractors.length
                        }
                    },
                    vAxis: {
                        title: 'Average Time (ms)'
                    },
                    series: {
                        2: {
                            color: 'blue',
                            visibleInLegend: false,
                            pointSize: 0,
                            lineWidth: 2
                        },
                        3: {
                            color: 'red',
                            visibleInLegend: false,
                            pointSize: 0,
                            lineWidth: 2
                        },
                        4: {
                            color: 'none',
                            visibleInLegend: false,
                            pointSize: 0,
                            lineWidth: 0
                        }
                    }
                };
                
                //print chart
                var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
                chart.draw(dataTable, options);
                
                //create table object
                var table = new google.visualization.Table(document.getElementById('table_div'));
                
                //create formatter object for table and define options
                var formatter = new google.visualization.NumberFormat({
                    groupingSymbol: '',
                    fractionDigits:0,
                })
                var formatter2 =new google.visualization.NumberFormat({
                    fractionDigits: 2,
                }) 
                
                //format the columns
                formatter.format(dataTable, 1)
                formatter.format(dataTable, 2)
                formatter2.format(dataTable, 5)
                
                //print table
                table.draw(tableView, {
                    allowHtml: true,
                    showRowNumber: false,
                    width: 600,
                });
                
                $('#analysis').show();
            }
        //Runs the script when document is ready:
            $(document).ready(function(){
                varSet();

                //will initialize start button that calls runExperiment()
                initializeForm(); 
            });
            
        //Runs Experiment -- gets called when the user clicks the start button
            function runExperiment(){
                experimentStart = true;
                generateInstructions();
                initializeKeydown();
            }
        
          </script>
    </head>
    <body>
    <div class='body_outer_container'>
        <div class='body_inner_container'>    
            <header id='header'  class="header">
                <hgroup class="header_title">
                    <h1>
                        <a href="http://www.swarthmore.edu" target="_self" title="Swarthmore College">Swarthmore College</a>
                    </h1>
            </hgroup>
        </header>
        <div class='body_content'>    
            <div class='row'>           
                <script>
                    $.ajax({
                        url: 'navbar.html',
                        context: $('.row:first')
                    }).done(function(data){
                        $(this).prepend(data);
                        $('#myTab a[href="index.php'+window.location.hash +'"]')
                            .parent() 
                            .addClass('active')
                            .children()
                            .attr('href', window.location);
                    });
                </script>
            <div class='module_type1 span8'>
                <div class='module_title'>
                    <h2>
                    Parallel and Serial Search Patterns
                    </h2>
                </div>
                <div class='module_content'>
                    <form class='form-horizontal'>
                    <legend>Parameters</legend>
                    <fieldset>
                    
                    <div class='controls'>    
                        <div class='btn-group' id='expType' data-toggle='buttons-radio'>
                            <input type='button' class='btn active' value='Demo'>
                            <input type='button' class='btn' value='Full Experiment'>
                        </div>
                    </div>
                        <br>
                        <div class='control-group'>
                            <label class='control-label'> How many types of distractors? </label>
                            <div class='controls'>
                                <input type='text' id='distractors'>
                                <div id='slider' class='slider'></div>
                            </div>
                        </div>
                        
                        <div id='distractorElts'>
                        </div>
    
                        <div class='control-group'>
                            <label class='control-label'> Target </label>
                            <div class='controls'>
                                <input type='text' id='target'>
                            </div>
                        </div>
                        
                        <div class='controls'>
                            <input id='start' class='btn btn-primary' type='button' value='Start Experiment'>
                        </div>
                    </fieldset>
                </form>
            <div id='analysis' class='hide'> 
                <p> Your results have been saved into a file called "dataResults". It contains information about each trial including the response latency of your responses. You can download it as a ".csv" file by clicking the download data button below.</p>
                
                <div id = 'chart_div' class = 'dataReport' style = 'width:400; height:300'></div>

                <p> The most important variable that is normally used to measure the ease (or "efficiency") of visual search is the amount of time added to search for each additional distractor.  In the present experiment, the number of items on the screen on each trial varied between 4 and 28.  Normally, response times will be longer as more items are added, but the amount of response time per item (the slope of the regression line) is a good measure of search efficiency. </p>

                <div id = 'table_div' class = 'dataReport' style = 'width:400; height:300'></div>                

                <p> Questions to ponder:
                <ol> 
                    <li> Is the slope different for "present" trials and "absent" trials? </li>
                    <li> What is the ratio of the "absent" slope to the "present" slopes? </li> 
                    <li> Often the ratio is about 2 to 1. Why might this be? </li>
                </ol> </p>
                <div id='buttons'> 
                    <input type='button' class = 'btn dataReport' id = 'restart' value = 'Try Again' /> 
                    <input type='button' class = 'btn dataReport' id = 'download' value = 'Download Data'/> <div>
            </div>
                
            </div>
        </div>
        </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div id='experiment' class='experiment hide'> </div>
    <div id='experiment_footer' class='experiment hide'> 
            <div class='instructions'> "F" = Present "J" = Not Present </div>
            <div class='counter'> </div>
    </div>
    </body>

</html>