            google.load('visualization', '1', {
                packages: ["corechart", 'table']
            });
            
            function varSet(){
                global = {
                    pattern: "Q",
                    density: [100, 200, 300],
                    trials: [],
                    staircase:[],
                    adaptor: 500,
                }
                
                t=0;
                staircaseCounter = [0,0,0,0,0,0];
                select = true;
                presenting = false;
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
        // Initializes the form    
            function initializeForm(){
                
                //sets default values
                $('#density1').val(global.density[0]);
                $('#density2').val(global.density[1]);
                $('#density3').val(global.density[2]);
                $('#pattern').val(global.pattern);
                
               
            }
            
        //start the experiment
            function startExperiment(){
            	//Resets Global var to reflect inputs
                global.density[0] = $('#density1').val();
                global.density[1] = $('#density2').val();
                global.density[2] = $('#density3').val();                    
                global.pattern = $('#pattern').val();
                
                var side = parseInt($('#dropdown').val())
                if (side == -1){
                    side = Math.round(Math.random());
                }
                
                if (side == 0){
                    leftcode = 70;
                    rightcode = 74;
                } else {
                    leftcode = 74;
                    rightcode = 70;
                    $('#left_experiment').removeClass('left').addClass('right');
                    $('#right_experiment').removeClass('right').addClass('left');
                }
                
                global.left = $('.left .letters').slice(0);
                global.right = $('.right .letters').slice(0);
                
                populate(Math.max(global.density[0], global.density[1], global.density[2], global.adaptor), 1000);
 
                $('.body_outer_container').hide();
                $('.experiment').show();
                
                runExperiment()
            }
        //prepopulates the two fields
            function populate(left, right){
                
                //Populates Left side
                if (global.left.length < left){
                    for (var i=global.left.length; i < left; i++){
                        //generates new placement
                        randomPlacement();
            
                        //adds letter
                        $('#left_experiment').append("<div class='letters'  style=' top:" + randNum1 + "px; left:" + randNum2 + "px; display:none;'>" + global.pattern + "</div>")
                    }
                } else {
                    global.left.slice(left).remove();
                }
                
                //Populates Right Side    
                if (global.right.length < right){
                    for (var i=global.left.length; i < right; i++){
                        randomPlacement();
                        $('#right_experiment').append("<div class='letters'  style=' top:" + randNum1 + "px; left:" + randNum2 + "px; display:none;'>" + global.pattern + "</div>")
                    }
                } else {
                    global.right.slice(right).remove();
                }
                
                global.left = $('.left .letters').slice(0);
                global.right = $('.right .letters').slice(0);

            };
            
        // Runs experiment    
            function runExperiment(){
                trialOrder();
                initializeKeyDown();
            }
        // Generates a randomized trial order:
            function trialOrder(){
                for (var i=0; i < 6; i++){
                    global.staircase.push([]);
                    for (var u=0; u<20; u++){                        
                        //determines staircase will be on
                        global['trials'].push({staircase:i+1});
                    }
                }
                
                //shuffles staircases
                global.trials = shuffleArray(global.trials).slice(0);
                
                for (var k=0; k < global.trials.length; k++){

                    //adds trial number attribute to each trial
                    global.trials[k]['trial'] = k + 1;
                }
                
                for (var k=0; k < 6; k++){
                    if (Math.floor(k/2) == k/2){
                        search(0, k+1)['density'] = parseFloat(global.density[Math.floor(k/2)]*0.5);
                    } else{
                        search(0, k+1)['density'] = parseFloat(global.density[Math.floor(k/2)]*2);
                    }
                }
            }
        // Loop and Find in Array
            function search(start, staircase){
                for (var i=start; i < global.trials.length; i++){
                    if (global.trials[i].staircase == staircase){
                        return global.trials[i]
                    }
                }
            }
        
        //Initialize Keydown Function
            function initializeKeyDown(){
                $(document).keydown(function(e){
                    var code = (e.keyCode ? e.keyCode : e.which);
                    if ((code == leftcode || code == rightcode) && select == false && presenting == false){
                        select = true;
                        var trial = global.trials[t];
                        var staircase = trial.staircase;
                        var next = search(t+1,staircase);
                        if (code == leftcode){
                            if (next != undefined){
                                next['density'] = global.trials[t].density + 25
                            }
                            trial.response = 0;
                        } else if (code == rightcode){
                            if (next != undefined){
                                next['density'] = global.trials[t].density - 25
                            }
                            trial.response = 1;
                        }                                           
                        t++;

                    } else if (code == 32 && select == true){                        
                        select = false;
                        presenting = true;
                        var i = 0;
                        if (t < 2){
                            timer = setInterval(
                                function(){
                                    if (i < 4){
                                        printScreen(global.adaptor, 0);
                                        i++;
                                        setTimeout(
                                            function(){
                                                $('.letters').hide();                                
                                            }, 100
                                        );
                                    }
                                    else {
                                        clearInterval(timer);
                                        printScreen(global.density[ Math.floor( (global.trials[t].staircase - 1)/2)] , global.trials[t].density);
                                        global.trials[t].left = global.density[Math.floor((global.trials[t].staircase - 1)/2)];
                                        global.trials[t].right = global.trials[t].density;
                                        setTimeout(
                                            function(){
                                                $('.letters').hide();
                                                presenting = false;
                                            }, 200
                                        );
                                    }
                                }, 200);

                        
                            //Checks to be sure the field has been sufficiently prepopulated
                            populate(Math.max(global.density[0], global.density[1], global.density[2], global.adaptor * 2), Math.max(global.trials[t].density, 1000));
                        }
                        else {
                            analysis();
                        }
                    }
                   
                    //Escape key ends experiment
                    if (code == 27) {
                        document.location.reload(true);
                    }
                });
            }
        
        //Prints a new Experiment Screen
            function printScreen(leftDensity, rightDensity){
                if (leftDensity != 0){
                    shuffleArray(global.left).slice(0, leftDensity).css('display', 'block')
                }
                if (rightDensity !=0){
                    shuffleArray(global.right).slice(0, rightDensity).show().css('display', 'block')
                }
            }
        
        //Generates a Random Placement of distractor
            function randomPlacement() {
                randNum1 = Math.floor(Math.random() * 220) + 10;
                randNum2 = Math.floor(Math.random() * 220) + 10;
            };
            function letterPlacement(letter, number, trial, id){
            
                //generates new placement
                randomPlacement();
    
                //adds letter
                $(id).append("<div class='letters trial_" + trial + "'  style=' top:" + randNum1 + "px; left:" + randNum2 + "px'>" + letter + "</div>")                
            }
        
        //Sends data to server for analysis
            function analysis(){
                $('.experiment').hide();
    
                //show text body
                $('.body_outer_container').show();
                
                $('#experiment-results').show();
                
                $.ajax({
                    type: 'POST',
                    url: '../cgi-bin/pattern_density.py',
                    data: {
                        exp_data: JSON.stringify(global.trials),
                        option: JSON.stringify('analysis')
                    }
                }).done(function (analysis) {
    
                    //stores JSON data from server in global object
                    global['time'] = analysis
                    
                    $('#plot_1').append('<img class="plot" src="tmp_graphics/plot_1_' + global.time + '.png" alt="Plot 1" />')
                    $.ajax({
                        type:'POST',
                        url:'tmp_graphics/summary_1_' + global.time + '.txt',
                    }).done(function(text){
                        $('#plot_1').append('<pre>' + text + '</pre>');
                    });
                    
                    $('#plot_2').append('<img class="plot" src="tmp_graphics/plot_2_' + global.time + '.png" alt="Plot 1" />')
                    
                    $.ajax({
                        type:'POST',
                        url:'tmp_graphics/summary_2_' + global.time + '.txt',
                    }).done(function(text){
                        $('#plot_2').append('<pre>' + text + '</pre>');
                    });
                    
                    $('#plot_3').append('<img class="plot" src="tmp_graphics/plot_3_' + global.time + '.png" alt="Plot 1" />')
                    
                    $.ajax({
                        type:'POST',
                        url:'tmp_graphics/summary_3_' + global.time + '.txt',
                    }).done(function(text){
                        $('#plot_3').append('<pre>' + text + '</pre>');
                    });
                    
                    //Send Data to Server for Download as a CSV file        
                    $('#download').click(function () {
                        $.fileDownload("../cgi-bin/pattern_density.py", {
                            httpMethod: 'POST',
                            data: {
                                exp_data: JSON.stringify(global.trials),
                                option: JSON.stringify('csv')
                            }
                        });
                    });
    
                }); 
            };
                        
            $('document').ready(function(){
                varSet();
                initializeForm();
            });