//Load Google's Visualizer Package for Scatterplots
            google.load('visualization', '1', {
                packages: ["corechart", 'table']
            });
            
        //Sets all variables for a new experiment
            function varSet(){
                
                //Store Important variables in global object
                global = {
                    listElements:{
                        //The elts to be shown in the list:
                        display:[
                            ['zero',0],
                            ['one',1],
                            ['two',2],
                            ['three',3],
                            ['four',4],
                            ['five',5],
                            ['six',6],
                            ['seven',7],
                            ['eight',8],
                            ['nine',9]
                            ],
                        //The elts to be shown in the test:
                    },
                    //Time Parameters -- current values are default.
                    timeParameters:{
                        display: 500, //Time between list elts
                        recall: 1000, //Time before test is shown
                    },
                    trials: [], //empty array to be populated with the trial order
                    trialNumber: 120,  //total number of trials; current value is default
                };
                
                keyPress={
                    digits:{
                        0:{code: [48,96], name: 'zero'},
                        1:{code: [49,97], name: 'one'},
                        2:{code: [50,98], name: 'two'},
                        3:{code: [51,99], name:'three'},
                        4:{code: [52,100], name: 'four'},
                        5:{code: [53,101], name: 'five'},
                        6:{code: [54,102], name: 'six'},
                        7:{code: [55,103], name: 'seven'},
                        8:{code: [56,104], name: 'eight'},
                        9:{code: [57,105], name: 'nine'}
                    },
                    commands:{
                        backspace:[8],
                        enter:[13]
                    }
                }
                
                //trial counter
                t=0; 
                
                //boolean to determine if keydown is listening for a recall list
                recall=false;

            };
            
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
            
            
        //Sets up special functionality for the form
            function formInitializer(){
            
                //Initialize trialSlider
                $('#trialSlider').slider({
                    value: 120,
                    min:24,
                    max:360,
                    step:12,
                    animate:true,
                    slide: function(event,ui){
                        //Resets associated field value when slider is changed:
                        $('#trials').val(ui.value);
                        
                        //Trigger change function to update global object:
                        $('#trials').trigger('change');

                    }
                });
                
                //Change function updates global object.
                $('#trials').change(function(){
                    global['trialNumber'] = this.value;
                });

                //Sets initial value and updates global object.  
                $('#trials').val($('#trialSlider').slider('value'));
                $('#trials').trigger('change');

                
                //Sets up change functions to update global object for the other field elements.  
                $('#display').val(global.timeParameters.display).change(function(){
                    global.timeParameters['display'] = $(this).val();
                });
                
                $('#recall').val(global.timeParameters.recall).change(function(){
                    global.timeParameters['recall'] = $(this).val();                    
                });
            }

        //Function to Present the Lists -- will be called recursively in the keydown function.  
            function presentLetters(){
                //update trial counter
                $('.counter').text(t+1 + '/' + global.trials.length);
                
                var i=0; //define counter variable for list length
                
                //Sets a function to run every n seconds to display the list elts
                timer = setInterval(function(){
                    $('.listDisplay').remove(); //clears display
                                        
                    //if list is not done yet:
                    if (i<global.trials[t].list.length){
                    
                        //display list elt
                        $('#experiment').append('<div class="listDisplay">'+ global.trials[t].list[i][0] + '</div>'); 
                        i++;
                    } 
                    //if the list is done:
                    else {
                        clearInterval(timer); //stop the interval loop
                        $('.listDisplay').remove(); //clear the experiment box
                            $('#experiment').append('<div class="listDisplay cross"><center> + </center></div>') //screen to get ready
                        
                        //set time delay for the probe elt
                        setTimeout(function(){
                            $('.listDisplay').remove(); //clear experiment box
                            
                            //display the probe
                            $('#experiment').append('<div class="listDisplay"><center>' + global.trials[t].test[1] + '</center></div>') 
                            
                            //record start time
                            var t1 = new Date();
                            start = t1.getTime();
                            //tells keydown function that experiment is waiting for response
                            select=false; 
                        }, global.timeParameters.recall);
                    }
                },global.timeParameters.display);
            }
            
        //General Keydown Function -- used across all functions.  
            function initializeKeyDown(){    
                $(document).keydown(function (e) {
                    
                    //sets keycode according to the downpress
                    var code = (e.keyCode ? e.keyCode : e.which);
                    
                    //checks that experiment has started
                    if (typeof select != 'undefined'){ 
                        
                        //'select==false' checks that experiment is waiting for 'f' or 'j' input
                        if ((code == 70 || code == 74) && select==false) { 
                            var t2 = new Date();
                            var end = t2.getTime();
                            global.trials[t]['time']=(end-start);
                            
                            //records if they said true:
                            if (code==70){global.trials[t]['response']=true;} 

                            //records if they said false:
                            if (code==74){global.trials[t]['response']=false;}
                            
                            //sets ups recall list for this trial:
                            global.trials[t]['recall']=[];
                            
                            //clears experiment box
                            $('#experiment').text('');
                            
                            recall = true; //sets experiment to listen for subject recall of list
                            select = true; //sets experiment not to accept 'j' or 'f' keypress
                            
                            //prompt a recall
                            $('#experiment').append('<div class="listDisplay"> Enter the list: <p id="subjectRecall"> </p> </div>')
                            
                        } else if (code==32 && select==true && recall==false){ 
                            presentLetters(t);
                        }
                    }
                    
                    //Handler for subject recall of the list
                    if (recall==true){ 
                        $.each(keyPress.digits, function(key, value){
                            if ($.inArray(code, value.code) != -1){
                                if ($.inArray(global.listElements.display[key], global.trials[t].recall) == -1 && global.trials[t].recall.length < 6){                                
                                    if (global.trials[t].recall.length == 0){
                                        $('#subjectRecall').append(key);
                                    } else {
                                        $('#subjectRecall').append(', ' + key);
                                    }
                                global.trials[t].recall.push(global.listElements.display[key]);
                                }
                            }
                        });
                        if (code == 8){
                                e.preventDefault();
                                $('#subjectRecall').text(     
                                    $('#subjectRecall').text().slice(0,-3)
                                );
                                global.trials[t].recall.pop();
                        }
                    }

                    //if they press enter:
                    if (code==13 && recall==true && global.trials[t].recall.length >= 1){
                        
                        $('#experiment').text('');
                        
                        recall=false; //turn off recall mode
                        
                        //determines whether correct or not -- uses JSON.stringify to check array equality.  
                        global.trials[t]['correctRecall'] = (JSON.stringify(global.trials[t].list) == JSON.stringify(global.trials[t].recall));
                        
                                                
                        //iterates counter to the next trial
                        t++;
                        
                        //if we aren't done the trials yet:
                        if (t<global.trialNumber){ 
                            $('#experiment').append('<div id="ready" class="listDisplay">Ready?</div>');
                            select=true;
                        } 
                
                        //if we are done the trials:
                        else {
                            $(this).unbind('keydown') //turn off keypress listner
                            
                             //hide experiment
                            $('.experiment').hide()
                    
                            //show text body
                            $('.body_outer_container').show();
                            
                            dataAnalysis(t); //run the data analysis
                           
                            //show the results
                            $("#experiment-results").show();
                        }
                    }
                    
                    //Escape key ends experiment
                    if (code == 27) {
                        document.location.reload(true);
                    }
                });
            }
            
            function runExperiment(){
                var trials = global.trials
                var order = trials
                //Generate Trial Order
                for (i=1;i<=6;i++){ //for list lengths 1 to 6
                    for (j=0; j<global.trialNumber/12; j++){ //for the appropriate number of trials
                        
                        //create one trial where probe is not present
                        var shuffle = shuffleArray( global.listElements.display).slice(0) //shuffle list elts array and create clone.  
                        order.push(
                            {list: shuffle.slice(0,i), //take the first i elts from the shuffled list.  
                            test: shuffle[Math.floor(Math.random()*(shuffle.length-i))+i], //randomly select probe from outside the list
                            testPresent: false
                            });
                        
                        //create one trial where probe is present
                        shuffle = shuffleArray( global.listElements.display).slice(0)
                        order.push(
                            {list: shuffle.slice(0,i), //take the first i elts from the shuffled list
                            test: shuffle[Math.floor(Math.random()*(i))], //randomly select probe from inside the list
                            testPresent: true
                            });
                    }
                }

                //shuffle trial order and store clone as actual trial order.  
                global.trials = shuffleArray(order).slice(0); 
                
                //number the trials
                for (i=1;i<=global.trials.length;i++){
                    global.trials[i-1]['trialNumber'] = i;
                }
                
                //initialize keydown listener and start presenting the experiment
                $('#experiment').append('<div id="ready" class="listDisplay">Ready?</div>');
                
                select=true;
                
                initializeKeyDown();
            };
            
            function dataAnalysis(t){
                //Send Data to Server
                
                $.ajax({
                    type: 'POST',
                    url: '../cgi-bin/sternberg.py',
                    data: {
                        exp_data: JSON.stringify(global),
                        option: 'analysis'
                    }
                }).done(function (analysis) {

                    //stores JSON data from server in global object
                    global['analysis'] = analysis
                    
                    //Send Data to Server for Download as a CSV file        
                    $('#download').click(function () {
                        $.fileDownload("../cgi-bin/sternberg.py", {
                            httpMethod: 'POST',
                            data: {
                                exp_data: JSON.stringify(global),
                                option: 'csv'
                            }
                        });
                    });
                    
                    drawChart();
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
                dataTable.addColumn('number', 'List Length');
                dataTable.addColumn('number', 'Average Latency Present (ms)');
                dataTable.addColumn('number', 'Average Latency Absent (ms)');
                dataTable.addColumn('number', 'Best Fit Present');
                dataTable.addColumn('number', 'Best Fit Absent');
                dataTable.addColumn('number', 'Response Error Rate (%)');
                dataTable.addColumn('number', 'Recall Error Rate (%)');
                
                //Add data
                for (key in (present || absent)) {
                    dataTable.addRow([
                        parseFloat(key), 
                        parseFloat(present[key].mean),
                        parseFloat(absent[key].mean), 
                        parseFloat(regression.present.a + regression.present.b * key), 
                        parseFloat(regression.absent.a + regression.absent.b * key), 
                        parseFloat(errors[key].responseErrors),
                        parseFloat(errors[key].recallErrors)
                    ]);
                }
                
                //Extend Regression Lines to Edges of Graph
                dataTable.addRow([
                    0, 
                    null, 
                    null, 
                    parseFloat(regression.present.a),
                    parseFloat(regression.absent.a), 
                    null,
                    null,
                ]);
                
                dataTable.addRow([
                    6, 
                    null, 
                    null, 
                    parseFloat(regression.present.a + regression.present.b * 6), 
                    parseFloat(regression.absent.a + regression.absent.b * 6), 
                    null,
                    null,
                ]);
                
                //create specialized instance of table
                var tableView = new google.visualization.DataView(dataTable);
                
                //set columns and rows to show
                tableView.setColumns([0, 1, 2, 5, 6])
                tableView.setRows(0, 5)
                
                //set options for graph 
                var options = {
                    title: 'Time vs. Number of Distractors',
                    width: 600,
                    height: 600,
                    hAxis: {
                        title: 'Number of Distractors',
                        gridlines: {
                            count: 6
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
                        },
                        5: {
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
                formatter2.format(dataTable, 6)
                
                //print table
                table.draw(tableView, {
                    allowHtml: true,
                    showRowNumber: false,
                    width: 600,
                });
            }
            
            function startExperiment(){
            	$('.body_outer_container').hide();
            	$('.experiment').show();
                runExperiment();
            }
            
            $('document').ready(function(){
                varSet();
                formInitializer();
            });