    //Load Google's Visualizer Package for Scatterplots
    google.load('visualization', '1', {
        packages: ["corechart", 'table']
    });
    
//Sets all variables for a new experiment
    function varSet(){
        
        //Store Important variables in global object
        global = {
            display:[
                //The elts to be shown in the list:
                	[
                    ['i think that flowers are lovely in the spring','filler',''],
                    ['make sure that the tipi is closed for the','filler',''],
                    ['she wandered along a trail before discovering the path she wanted','synonym','path'],
                    ['he poured in liquid until the fluid reached the liter mark','synonym','fluid'],
                    ['the administrator demanded a answer although no reply was forthcoming','synonym','reply'],
                    ['his story was a tale of hard work and success','synonym','tale'],
                    ['we worked in the soil until dirt covered our clothes','synonym','dirt'],
                    ['we bought the pattern while cloth was on sale','control','cloth'],
                    ['they sat in the seats because the center offered the best view','control','center'],
                    ['the department store sold a rug from the far east','control','rug'],
                    ['we were anxious for apples well before autumn arrived','control','autumn'],
                    ['the new girls worked with the students who could help them','control','students'],
                    ['the worst smells are the smells at the school cafeteria','repetition','smells'],
                    ['she was terrified in cellars because cellars have spiders','repetition','cellars'],
                    ["the slaves wanted freedom although freedom wasn't attainable",'repetition','freedom'],
                    ['his films are long films about war','repetition','films'],
                    ["we couldn't see the display because the display was being rearranged",'repetition','display'],
                    ['when he lost his vision suddenly seemed very important','skipped','vison'],
                    ['she always manages to have courage when is required','skipped','courage'],
                    ['his birthday gift was an unexpected from his parents','skipped','gift'],
                    ["the company's new poison might many people accidentally",'skipped','poison'],
                    ['that cab passed our very quickly','skipped','cab'],
                    ['The owl and the teddy bear had a big lunch','filler',''],
                    ['Unless you eat pizza with pepperoni you will be fine','filler',''],
                    ['There are many ways to remove old rusty bolts','filler',''],
                    ['The cake that I baked turned out rather dry','filler',''],
                    ["There aren't any more cookies in the jar",'filler',''],
                    ],
                    
                    
                	[
                    ['i think that flowers are lovely in the spring','filler',''],
                    ['make sure that the tipi is closed for the','filler',''],
                    ['when he lost his sight suddenly vision seemed very important','synonym','vision'],
                    ['she always manages to have bravery when courage is required','synonym','courage'],
                    ['his birthday present was an unexpected gift from his parents','synonym','gift'],
                    ["the company's new toxin might poison many people accidentally",'synonym','poison'],
                    ['that taxi passed our cab very quickly','synonym','cab'],
                    ['she wandered along a beach before discovering the path she wanted','control','path'],
                    ['he poured in oil until the fluid reached the liter mark','control','fluid'],
                    ['the administrator demanded a raise although no reply was forthcoming','control','reply'],
                    ['his life was a tale of hard work and success','control','tale'],
                    ['we worked in the garden until dirt covered our clothes','control','dirt'],
                    ['we bought the cloth while cloth was on sale','repetition','cloth'],
                    ['they sat in the center because the center offered the best view','repetition','center'],
                    ['the rug store sold a rug from the far east','repetition','rug'],
                    ['we were anxious for autumn well before autumn arrived','repetition','autumn'],
                    ['the new students worked with the students who could help them','repetition','students'],
                    ['the worst smells are the at the school cafeteria','skipped','smells'],
                    ['she was terrified in cellars because have spiders','skipped','cellars'],
                    ["the slaves wanted freedom although wasn't attainable",'skipped','freedom'],
                    ['his films are long about war','skipped','films'],
                    ["we couldn't see the display because the was being rearranged",'skipped','display'],
                    ['the owl and the teddy bear had a big lunch','filler',''],
                    ['unless you eat pizza with pepperoni you will be fine','filler',''],
                    ['there are many ways to remove old rusty bolts','filler',''],
                    ['the cake that I baked turned out rather dry','filler',''],
                    ["there aren't any more cookies in the jar",'filler',''],
                    ],
                    
                    
                	[
                    ['i think that flowers are lovely in the spring','filler',''],
                    ['make sure that the tipi is closed for the','filler',''],
                    ['the worst odors are the smells at the school cafeteria','synonym','smells'],
                    ['she was terrified in basements because cellars have spiders','synonym','cellars'],
                    ["the slaves wanted liberty although freedom wasn't attainable",'synonym','freedom'],
                    ['his movies are long films about war','synonym','films'],
                    ["we couldn't see the exhibit because the display was being rearranged",'synonym','display'],
                    ['when he lost his glasses suddenly vision seemed very important','control','vision'],
                    ['she always manages to have strength when courage is required','control','courage'],
                    ['his birthday cake was an unexpected gift from his parents','control','gift'],
                    ["the company's new product might poison many people accidentally",'control','poison'],
                    ['that truck passed our cab very quickly','control','cab'],
                    ['she wandered along a path before discovering the path she wanted','repetition','path'],
                    ['he poured in fluid until the fluid reached the liter mark','repetition','fluid'],
                    ['the administrator demanded a reply although no reply was forthcoming','repetition','reply'],
                    ['his tale was a tale of hard work and success','repetition','tale'],
                    ['we worked in the dirt until dirt covered our clothes','repetition','dirt'],
                    ['we bought the cloth while was on sale','skipped','cloth'],
                    ['they sat in the center because the offered the best view','skipped','center'],
                    ['the rug store sold a from the far east','skipped','rug'],
                    ['we were anxious for autumn well before arrived','skipped','autumn'],
                    ['the new students worked with the who could help them','skipped','students'],
                    ['the owl and the teddy bear had a big lunch','filler',''],
                    ['unless you eat pizza with pepperoni you will be fine','filler',''],
                    ['there are many ways to remove old rusty bolts','filler',''],
                    ['the cake that I baked turned out rather dry','filler',''],
                    ["there aren't any more cookies in the jar",'filler',''],
                    ],
                    
                	[
                    ['i think that flowers are lovely in the spring','filler',''],
                    ['make sure that the tipi is closed for the','filler',''],
                    ['we bought the cloth while cloth was on sale','synonym','cloth'],
                    ['they sat in the middle because the center offered the best view','synonym','center'],
                    ['the carpet store sold a rug from the far east','synonym','rug'],
                    ['we were anxious for fall well before autumn arrived','synonym','autumn'],
                    ['the new students worked with the students who could help them','synonym','students'],
                    ['the worst memories are the smells at the school cafeteria','control','smells'],
                    ['she was terrified down there because cellars have spiders','control','cellars'],
                    ["the slaves wanted money although freedom wasn't attainable",'control','freedom'],
                    ['his favorites are long films about war','control','films'],
                    ["we couldn't see the painting because the display was being rearranged",'control','display'],
                    ['when he lost his vision suddenly vision seemed very important','repetition','vision'],
                    ['she always manages to have courage when courage is required','repetition','courage'],
                    ['his birthday gift was an unexpected gift from his parents','repetition','gift'],
                    ["the company's new poison might poison many people accidentally",'repetition','poison'],
                    ['that cab passed our cab very quickly','repetition','cab'],
                    ['she wandered along a beach before discovering the path she wanted','skipped','path'],
                    ['he poured in oil until the fluid reached the liter mark','skipped','fluid'],
                    ['the administrator demanded a raise although no reply was forthcoming','skipped','reply'],
                    ['his life was a tale of hard work and success','skipped','tale'],
                    ['we worked in the garden until dirt covered our clothes','skipped','dirt'],
                    ['the owl and the teddy bear had a big lunch','filler',''],
                    ['unless you eat pizza with pepperoni you will be fine','filler',''],
                    ['there are many ways to remove old rusty bolts','filler',''],
                    ['the cake that I baked turned out rather dry','filler',''],
                    ["there aren't any more cookies in the jar",'filler',''],
                    ],
                    
                    
                    
                //The elts to be shown in the test:
            ],
            //Time Parameters -- current values are default.
            timeParameters:{
                display: 500, //Time between list elts
                recall: 1000, //Time before test is shown
            },
            listName: -1,
            trials: [], //empty array to be populated with the trial order
            trialNumber: 27,  //total number of trials; current value is default
        };
        
        keyPress={
            digits:{
            	" ":32,
                "a":65,
                "b":66,
                "c":67,
                "d":68,
                "e":69,
                "f":70,
                "g":71,
                "h":72,
                "i":73,
                "j":74,
                "k":75,
                "l":76,
                "m":77,
                "n":78,
                "o":79,
                "p":80,
                "q":81,
                "r":82,
                "s":83,
                "t":84,
                "u":85,
                "v":86,
                "w":87,
                "x":88,
                "y":89,
                "z":90,
                ",":188,
                ".":190,
                "'":222
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
        
        //Change function updates global object.
        $('#trials').change(function(){
            global['trialNumber'] = this.value;
        });

        //Change dropdown.  
		$('#dropdown').change(function(){
			global['listName'] = parseInt($(this).val());
			if (global.listName <= 0){
				global.listName = Math.floor(Math.random()*3)
			}
		});
        $('#dropdown').trigger('change');
        
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
        var j=0;
        //Sets a function to run every n seconds to display the list elts
        timer = setInterval(function(){
            $('.listDisplay').remove(); //clears display
                                
            //if list is not done yet:
            if (i<global.trials[t][0].length){
            
                //display list elt
                $('#experiment').append('<div class="listDisplay">'+ global.trials[t][0][i] + '</div>');
                
                i++;
            } 
            //if the list is done:
            else {
                clearInterval(timer); //stop the interval loop
                $('.listDisplay').remove(); //clear the experiment box
                    //$('#experiment').append('<div class="listDisplay cross"><center> + </center></div>') //screen to get ready
                
                //set time delay for the probe elt
               // setTimeout(function(){
               //     $('.listDisplay').remove(); //clear experiment box
                    
                    
                    //record start time
                    //var t1 = new Date();
                    //start = t1.getTime();
                    //tells keydown function that experiment is waiting for response
              //      select=false; 
              //  }, global.timeParameters.recall);
               //sets ups recall list for this trial:
               
                    global.trials[t]['recall']="";
                    
                    //clears experiment box
                    $('#experiment').text('');
                    
                    recall = true; //sets experiment to listen for subject recall of list
                    select = true; //sets experiment not to accept 'j' or 'f' keypress
                    
                    //prompt a recall
                    $('#experiment').append('<div class="enterList"> Enter the sentence: <p id="subjectRecall"> </p> </div>')
                    experimentControls.updateFooter('<span style="font-size: .85em">After entering the sentence, press enter to continue</span>');
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
                
                if (code==32 && select==true && recall==false){ 
                	experimentControls.updateFooter("");
                    select=false;
                    presentLetters(t);
                }
            }
            
            //Handler for subject recall of the list
            if (recall==true){
                $.each(keyPress.digits, function(key, value){
                    if (code == value){
						$('#subjectRecall').append(key);
                        global.trials[t].recall += key;
                    }
                });
                if (code == 8){
                        e.preventDefault();
                        $('#subjectRecall').text(     
                            $('#subjectRecall').text().slice(0,-1)
                        );
                        global.trials[t].recall.slice(0,-1);
                }
            }

            //if they press enter:
            if (code==13 && recall==true && global.trials[t].recall.length >= 1){
                
                $('#experiment').text('');
                
                recall=false; //turn off recall mode
                
                //determines whether correct or not -- uses JSON.stringify to check array equality.  
                //global.trials[t]['correctRecall'] = (JSON.stringify(global.trials[t].list) == JSON.stringify(global.trials[t].recall));
                
                                        
                //iterates counter to the next trial
                t++;
                
                //if we aren't done the trials yet:
                if (t<global.trialNumber){ 
                	experimentControls.updateFooter("Press the space bar to continue");
                    $('#experiment').append('<div id="ready" class="listDisplay">Ready?</div>');
                    select=true;
                } 
        
                //if we are done the trials:
                else {
                    experimentControls.deliver("endExperiment");
                }
            }
            
            //Escape key ends experiment
            if (code == 27) {
            	experimentControls.deliver("cancelExperiment");
            }
        });
    }
    
    function runExperiment(){
        var trials = global.trials
        var currentExp = global.display[global.listName].slice(2)
        

        //shuffle trial order and store clone as actual trial order.  
        global.trials = shuffleArray(currentExp).slice(0); 
        
       global.trials = global.display[global.listName].slice(0,2).concat(global.trials);
       
        //Generate Trial Order
        for (i=0;i<=26;i++){
        	global.trials[i][0] = global.trials[i][0].split(" ")
        }
        
        //number the trials
        for (i=1;i<=global.trials.length;i++){
            global.trials[i-1]['trialNumber'] = i;
        }
        
        //initialize keydown listener and start presenting the experiment
        $('#experiment').append('<div id="ready" class="listDisplay">Ready?</div>');
        select=true;
        
        initializeKeyDown();
    };
    
    function dataAnalysis(){
       
		//stores JSON data from server in global object
		//global['analysis'] = analysis
            
        
        //Send Data to Server
        
       /* $.ajax({
            type: 'POST',
            url: '../cgi-bin/sternberg3.py',
            data: {
                exp_data: JSON.stringify(global),
                option: JSON.stringify('analysis')
            }
        }).done(function (analysis) {

            //Send Data to Server for Download as a CSV file        
            $('#download').click(function () {
                $.fileDownload("../cgi-bin/sternberg3.py", {
                    httpMethod: 'POST',
                    data: {
                        exp_data: JSON.stringify(global),
                        option: JSON.stringify('csv')
                    }
                });
            });
            
            drawChart();
        }); */
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
    
    //Global event subscription
    experimentControls.subscribe("tryExperiment", function(){
        varSet();
        formInitializer();
    });
    experimentControls.subscribe("startExperiment", function(){
    	//Start the Experiement
         runExperiment();
         experimentControls.updateFooter("Press the space bar to start");
    });
    experimentControls.subscribe("endExperiment", function(){
    	//Run DataAnalyis
    	dataAnalysis()
    });
