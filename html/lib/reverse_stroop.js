    google.load('visualization', '1', {
        packages: ['table']
    });
        
    function drawTable(data){
    	 var dataTable = new google.visualization.DataTable();

    	 
         //declare columns
         dataTable.addColumn('number', 'Trial Number');
         dataTable.addColumn('number', 'Reaction Time (ms)');
         dataTable.addColumn('string', 'Word Displayed');
         dataTable.addColumn('string', 'Color of Text');
         dataTable.addColumn('string', 'Text Color in Set');
         dataTable.addColumn('string', 'Correct');
         
         
         //Add data
         for (key in data) {
             dataTable.addRow([
                 parseInt(key, 10) + 1, 
                 data[key].time,
                 data[key].printed,
                 data[key].trueColor, 
                 data[key].inSet,
                 data[key].correct
             ]);
         }
         
         //create specialized instance of table
         var tableView = new google.visualization.DataView(dataTable);
         
         //set columns and rows to show
         //tableView.setColumns([0, 1, 2, 3, 4])
         //tableView.setRows(0, 6)
         
         //create table object
         var table = new google.visualization.Table(document.getElementById('table_div'));
         
         //print table
         table.draw(tableView, {
             allowHtml: true,
             showRowNumber: false,
             width: 600,
         });
    	
    }
        
    function shuffle(array) {
        var tmp, current, top = array.length;

        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

        return array;
    }

	// creates the title and the instruction 
	function drawTandI(){
        //Ttext = title_canvas.text(pic_width/2, text_height/2, "Reaction Time Test");
        //Ttext.attr("font-size", 40)
        //	 .attr("fill", "#000")
        //	 .attr("font-weight", 900)
       	// 	 .attr("font-family", "Courier New");

		Itext = instruction_canvas.text(pic_width/2, text_height/2, "Instruction: \n Click the word in the center \n and then bring your cursor over the circle \n that has the color indicated by the word.");
        Itext.attr("font-size", 20) 
        	 .attr("fill", "#000")
        	 .attr("font-weight", 900)
        	 .attr("font-family", "Courier New");
    }

	// creates the time
	function drawtime(){
	    var time_text = time_canvas.text(pic_width/2, text_height/2, elapsed + " ms");
	    time_text.attr("font-size", 40)
	             .attr("fill", "#000000")
                 .attr("font-weight", 900)
                 .attr("font-family", "Courier New");
	}

	// creates the colorKV pair for use later
	function colorKV(name, value){
        colorobj = new Object();
        colorobj.name = name;
        colorobj.color = value;
        return colorobj;
	}

	function ExportDataToCSV(data){
		$.fileDownload("../cgi-bin/reverse_stroop.py", {
			httpMethod: "POST",
			data:{
				exp_data: JSON.stringify(data),
				option: JSON.stringify('csv')
            }
		});
	}

	// draws the circles and color them
	function drawcircle(trial){
		var truecenter = trial.pop();
		var centerKV = trial.splice(0,1);
		var centerKV = centerKV[0];
        var name = centerKV.name;
        var color = centerKV.color;

		// shuffle the array
		var trial = shuffle(trial);
		var inSet = "false"; //default
        // create the Raphael object
        text = canvas.text(x_cent, y_cent, name);
        text.attr("font-size", 40)
        	.attr("fill", color)
			.attr("font-weight", 900)
			.attr("font-family", "Courier New");
							
        // use an array to hold the circles
        circle_array = new Array();

        // draw all the circles around the center circle
		for (var i=0; i<shown_pop; i++){

	        // get the position of the circle
            var dtheta = 2*Math.PI/shown_pop;
            var angle = dtheta*i;
            var x = dist*Math.sin(angle);
            var y = dist*Math.cos(angle);

			// draw it and give it different colors
            circle_array[i] = canvas.circle(x + x_cent, y + y_cent, radius);
	        var colorobj = trial.pop();
            var circ_color = colorobj.color;
            if (color == circ_color){
            	inSet = "true";
            }
            circle_array[i].attr("fill", circ_color)
                           .attr("stroke", "#000");

            // attach mouseover event to it
	        circle_array[i].mouseover(function() {
				if (started == 1){
                    circ_fill = this.attr("fill");
                    if (circ_fill == truecenter){
	                    check = "true";
                    } else {
                        check = "false";
                    }
                    d = new Date();
	                stop_time = d.getTime();
			        elapsed = stop_time - start_time;
		            //time_canvas.clear();
					canvas.clear();
                    //drawtime();
  
                    exportdata[trialnum] = {"trialNumber": trialnum + 1, 
                                            "time": elapsed,
                                            "printed": name,
                                            "inSet": inSet,
                                            "trueColor": colorRGBtoWord(color),
                                            "correct": check};
                    trialnum = trialnum + 1;
					init();
                    if (trialnum > numoftrials-1){
						canvas.clear();
                       	$('#holder').hide();
                       	$('.body_outer_container').show();
                       	$('#experiment-results').show();
                        drawTable(exportdata);
                       	$('#download').click(function(){ExportDataToCSV(exportdata)});
					}
				}
			}
	        );
			d = new Date(); 
            start_time = d.getTime();
            started = 1;
		}
    }
		
	function colorRGBtoWord(RGBvalue){
		for (var i in colorlist_full){
			if (RGBvalue == colorlist_full[i].color){
				return colorlist_full[i].name;	
			}
		}
		return RGBvalue; //not found?
	}
	
	function clonecolorarray(list){
		var clone = new Array();
		for (var i=0; i<list.length; i++){
			clone[i] = colorKV(list[i].name, list[i].color);
		}
		return clone;
	}

	function createtrials(numoftrials, colorlist1, colorlist2){
		// ok this is crazy but it has to be done
		// this array contains the color combinations for each trial
		// the first element of the array is the center colorKV,
		// and the rest 6 are the color of the circles on the side
		// so alltrials is numoftrials x 7 2D matrix
		var counter = 0;
		var alltrials = new Array();
		var senarios_vec = ["set_present", "set_absent", "nonset_present", "nonset_absent"];

		for(var i=0; i<4; i++){
			var senario = senarios_vec[i];
			for(var j=0; j<numoftrials/4; j++){

                // need to do this because we don't want to modify the original array
                var list1 = clonecolorarray(colorlist1);
                var list2 = clonecolorarray(colorlist2);

				list1 = shuffle(list1);
				var center = list1.splice(0,1);
				var truecenter = center[0].color;

				list2 = shuffle(list2);			
				list2.splice(0,2);

                switch (senario){
                    case "set_present":
                        var color_printed = list1[0].color
						list1[1].color = color_printed;
                        list1[0].color = center[0].color;
                        center[0].color = color_printed;
                        break;

                    case "set_absent":
                        var color_printed = list1[0].color;
                        list1[0].color = center[0].color;
                        center[0].color = color_printed;
                        break;

                    case "nonset_present":
                        var color_printed = list2[0].color;
						list2[1].color = color_printed;
                        list2[0].color = center[0].color
                        center[0].color = color_printed;
                        break;

                    case "nonset_absent":
                        var color_printed = list2[0].color;
                        list1[0].color = center[0].color;
                        center[0].color = color_printed;
                        break;
                }

                // add them together
                var trial_colors = center.concat(list1, list2);
				trial_colors.push(truecenter);
				alltrials[counter] = trial_colors;
				counter = counter+1; 
			}
		}
		alltrials = shuffle(alltrials);
		return alltrials;
	}

	function init(){
        start = canvas.text(x_cent, y_cent, "Click to Start");
	    start.attr("font-size", 20)
	         .attr("fill", "#000000")
             .attr("font-weight", 900)
             .attr("font-family", "Courier New");
		started = -1;
		start.click(function() {
			canvas.clear();
			var trial = alltrials.splice(0,1)[0];
			drawcircle(trial);
		});
	}
	
	function startExperiment(){
		if (!$('#trialnum').parent().parent().hasClass('error') && $('#trialnum').val() != ''){
        	
        	$(document).keydown(function (e) {
                 
                 //sets keycode according to the downpress
                 var code = (e.keyCode ? e.keyCode : e.which);
                 
                 //Escape key ends experiment
                 if (code == 27) {
                     document.location.reload(true);
                 }
            });
        	
            $('.body_outer_container').hide();
            $('#holder').show();
            
            
            // this is the main function
            // we have a database of 9 colors and
            // there are only 6 colors present on the peripherals
        
            total_pop = 9;
            shown_pop = 6;
        
            // set the parameters first
            radius = 95;
            dist = 200;
            pic_height = dist*2 + radius*2 + 20;
            pic_width = pic_height;
            text_height = 100;
        
            // get the position of the center
            x_cent = pic_width/2;
            y_cent = pic_height/2;
        
            // this is our color database(global, used later)
            colorlist_full = [colorKV("gray","#808080"),
                              colorKV("red","#FF0000"), 
                              colorKV("yellow","#FFFF00"), 
                              colorKV("orange","#FFA500"),
                              colorKV("green","#008000"), 
                              colorKV("blue","#0000FF"),
                              colorKV("brown","#8B4513"), 
                              colorKV("pink","#FF1493"),
                              colorKV("purple","#800080")];
            //copy of DB which is sliced
            var colorlist_split = [colorKV("gray","#808080"),
                                   colorKV("red","#FF0000"), 
                                   colorKV("yellow","#FFFF00"), 
                                   colorKV("orange","#FFA500"),
                                   colorKV("green","#008000"), 
                                   colorKV("blue","#0000FF"),
                                   colorKV("brown","#8B4513"), 
                                   colorKV("pink","#FF1493"),
                                   colorKV("purple","#800080")];
        
            // gives two lists of colors to work with
            colorlist_split = shuffle(colorlist_split);
            colorlist1 = colorlist_split.splice(0,4);
            colorlist2 = colorlist_split;
        
            // create the Raphael canvases for drawing
            //title_canvas = Raphael("title", pic_width, text_height);
            //instruction_canvas = Raphael("instruction", pic_width, text_height); 
            //time_canvas = Raphael("time", pic_width, text_height);
            canvas = Raphael("canvas", pic_width, pic_height);
        
            // put down instructions first
            //drawTandI();
        
            numoftrials = $('#trialnum').val();
        
            // create trials
            alltrials = createtrials(numoftrials, colorlist1, colorlist2);
            // and initialize the experiment
            init();
            trialnum = 0;
            exportdata = new Array();
        }
	}
	
	$(document).ready(function(){
	    
	  //Initialize trialSlider
        $('#trialSlider').slider({
            value: 4,
            min:4,
            max:400,
            step:4,
            animate:true,
            slide: function(event,ui){
                //Resets associated field value when slider is changed:
                $('#trialnum').val(ui.value);

            }
        });
	  
	    $('#trialnum').change(function(){
	        if (this.value % 4 == 0 && this.value >=1 && Math.floor(this.value) == this.value){   
	            //Remove Error Message if it exists attached to elt's grandparent in the DOM
	            if ($(this).parent().parent().hasClass('error')){
	                $(this).parent().parent().removeClass('error');
	                $(this).siblings('.help-inline').remove();
	            }
	        }            
	        else if (!$(this).parent().parent().hasClass('error')){
	            $(this).parent().parent().addClass('error');
	            $(this).parent()
	                .append('<span class="help-inline"> Please submit a positive multiple of 4 </span>')
	        }
	
	    });
	});