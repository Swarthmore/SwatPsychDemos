   
search = {            
//Initializes Experiment Variables
    varSet: function(){
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
    },

//following while loop is variation on Fisher-Yates shuffle algorithm.  Shuffles trialOrder randomly.
    shuffleArray: function(array){                     
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
    },

//Initializes Form
    initializeForm: function(){
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
            if (this.value <= 9 && this.value >=1){
                
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
                $(this).parent().append("<span class='help-inline'> Please submit a value between 1 and 9 </span>");
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
            $('form').parent().parent().hide();
            search.generateTrials();
            search.initializeModal();
            search.runExperiment();
        });
    },
//Generate Trials
    generateTrials: function(){
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
        global.trials = search.shuffleArray(trials);
    },

//Initialize the Experiment Modal
    initializeModal: function(){
        $( "#experiment" ).dialog({
            resizable: false,   //modal can't be dragged
            height:600,         //600 x 600 pixels
            width: 600,
            modal: true,        //user can't interact with screen
            
            //Closing the Modal ends the Experiment
            close: function(event, ui){
                
                //turn off keypress
                $(document).unbind('keydown');
                
                //throw out trials that haven't been run
                global.trials = global.trials.slice(0,t); 
                
                //Run DataAnalyis
                search.dataAnalysis();
            },
        });
    },            
//Generates a Random Placement of distractor
    randomPlacement: function() {
        randNum1 = Math.floor(Math.random() * 580);
        randNum2 = Math.floor(Math.random() * 550);
    },

    newScreen: function() {
        
        console.log('trial: ' + t);
        console.log('target present? ' + global.trials[t].targetPresent);
        console.log('distractors: ' + global.trials[t].distractors);
        
        //counter for how many letters have been placed
        var u = 0;
        
        for (var n = 0; n < global.numberDistractors; n++) {
            for (var i = 0; i < Math.floor(global.trials[t].distractors/global.numberDistractors); i++) {
                
                //generates new placement
                search.randomPlacement();

                //adds letter
                $("#experiment").append("<div id='trial_" + t + "_letter_div_" + u + "' class='letters trial_" + t + "'  style= 'width:12px; color:none'>" + global.distractors[n] + "</div>"); 
                
                //positions letter
                $("#trial_" + t + "_letter_div_" + u).position({
                    of: $('#experiment'),
                    my: 'left top',
                    at: 'left top',
                    offset: randNum1 + ' ' + randNum2
                }); 
                
                //Checks that the letter doesn't overlap anything
                while ($("#trial_" + t + "_letter_div_" + u).overlaps('.placed')) {
                    
                    //if it does, then reposition the letter
                    search.randomPlacement();
                    $("#trial_" + t + "_letter_div_" + u).position({
                        of: $('#experiment'),
                        my: 'left top',
                        at: 'left top',
                        offset: randNum1 + ' ' + randNum2
                    }); 
                }
                
                //once placed, make sure nothing gets placed over it.  
                $("#trial_" + t + "_letter_div_" + u).addClass("placed");
                
                //increase counter.  
                u = u + 1;
            }
        }
        var rand = Math.random();
    
    //places target letter    
        search.randomPlacement();
        
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
            search.randomPlacement()
            $("#trial_" + t + "_targ_letter").position({
                of: $('#experiment'),
                my: 'left top',
                at: 'left top',
                offset: randNum1 + ' ' + randNum2
            }); 
        }
    },
    
//Prints Instructions
    generateInstructions: function(){
        $('#experiment').append("<div id='instructions'> Press the space bar to start each trial. If you see the target, press the \"F\" key. If you do not see the target, press the \"J\" key. Don't worry if you make a mistake. </div>");
    },
        
//Sets up Keydown function
    initializeKeydown: function(){
        $(document).keydown(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);

            //CHECKS TO MAKE SURE EXPERIMENT HAS BEEN STARTED
            if (typeof experimentStart != 'undefined') { 
                if (code == 32 && t < global.trials.length && select) {
                    
                    //pulls down keypress time
                    var t1 = new Date();
                    var keypress = t1.getTime();
                    
                    //hides instructions dialog
                    if (!$('#instructions').hasClass('hidden')) {
                        $('#instructions').addClass('hidden');
                    }
                    
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
                    $('#experiment').text('');
                    
                    //subject has made selection
                    select = true;
                    
                    //iterates trial counter
                    if (t < global.trials.length - 1) {
                        t = t + 1;
                    } 
                    //if this is the end of the experiment
                    else { 
                        
                        //experiment is off
                        experimentStart = undefined;
                        
                        //close the modal
                        $( '#experiment' ).dialog('close');
                        
                        //closing the modal will run search.dataAnalysis();   
                    }

                } 
                //if subject hits escape key
                else if (code == 27) {                           
                    //experiment is off
                    experimentStart = undefined;
                    
                    //close the modal
                    $( '#experiment' ).dialog('close');
                }
            }
        });
    },

//Analyze Data and Send to Server
    dataAnalysis: function(){
        
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
            
            
            //creates divs for charts and analyisis
            $('#analysis').append("<div id = 'chart_div' class = 'dataReport' style = 'width:400; height:300'></div>");
            
            $('#analysis').append("<div id = 'table_div' class = 'dataReport' style = 'width:400; height:300'></div>");
            
            $('#analysis').append("<div id='buttons'> <input type='button' class = 'btn dataReport' id = 'restart' value = 'Try Again' /> <input type='button' class = 'btn dataReport' id = 'download' value = 'Download Data'/> <div>");
            
            //draws in chart with data
            search.drawChart();

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
    },
//Draws in the charts and tables
    drawChart: function() {
        
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
            width: 800,
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
            width: 600
        });
    },
//Runs the script when document is ready:
    ready: function(modal){
        modal.append("\
            <div class='row'>\
            <div class='span5 offset4'>\
            <form class='form-horizontal'>\
                    <legend>Parameters</legend>\
                    <fieldset>\
                    <div class='controls'>\
                        <div class='btn-group' id='expType' data-toggle='buttons-radio'>\
                            <input type='button' class='btn active' value='Demo'>\
                            <input type='button' class='btn' value='Full Experiment'>\
                        </div>\
                    </div>\
                        <br>\
                        <div class='control-group'>\
                            <label class='control-label'> How many types of distractors? </label>\
                            <div class='controls'>\
                                <input type='text' id='distractors'>\
                                <div id='slider' class='slider'></div>\
                            </div>\
                        </div>\
                        <div id='distractorElts'>\
                        </div>\
                        <div class='control-group'>\
                            <label class='control-label'> Target </label>\
                            <div class='controls'>\
                                <input type='text' id='target'>\
                            </div>\
                        </div>\
                        <div class='controls'>\
                            <input id='start' class='btn btn-primary' type='button' value='Start Experiment'>\
                        </div>\
                    </fieldset>\
                </form>\
            </div>\
            </div>\
            <div id='experiment'></div>\
            <div id='analysis'> </div>\
            ");
            
        search.varSet();

        //will initialize start button that calls search.runExperiment()
        search.initializeForm(); 
       
        google.load('visualization', '1', {
            packages: ["corechart", 'table']
        });
       
        
    },
    
//Runs Experiment -- gets called when the user clicks the start button
    runExperiment: function(){
        experimentStart = true;
        search.generateInstruction();
        search.initializeKeydown();
    },
};