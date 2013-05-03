<!DOCTYPE html>
<html lang="en">
    
    <head>
        <meta charset="utf-8">
        <title>Cognitive Psychology Demos</title>
        <meta name="description" content="">
		<?php include("head.inc"); ?>
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
                    <h2>
                    Swarthmore Cognitive Psychology Demos
                    </h2>
                </div>
                <div class="module_content">
                <div class="tab-content">
                    <div class="tab-pane active" id="home">
                    <p> Welcome to the Swarthmore College Cognitive Psychology Experiment page!</p>
                    
                    <p> Cognitive Psychology, the study of human cognition by means of the quantitative analysis of behavior, is based on experimental methods. Experiencing the application of those methods is a powerful supplement to reading about them. </p>
                    <img src="lib/bootstrap/img/hom.gif" alt="About Location" style="float: right">

                    <p> This page was developed with the goal of making a few high quality cognitive psychology experiments available online.  Many of the experiments we have developed here could be used to collect data for a class lab, and several are modifiable (e.g., the visual search experiment) such that you could devise your own version of the experiment to test specific alternative hypotheses. </p>
        
                    <p> Although aimed at college level, the experiments here could easily be incorporated into a high-school curriculum or (because they can be modified) be used as part of a high school science project. </p>
        
                    <p> At present we have implemented the three experiments found on the left. We hope to add more as time goes forward. We have also made our javascript code available. Your comments and suggestions are welcome. Please send to Prof. Frank Durgin.  </p>

                    <p> Many thanks to the development team including Doug Willen, Andrew Reuther, Jacob Adenbaum, David Nahmias and Xingda Zhai. </p>
                    
                    <p> Please note that these experiments work best in the Chrome, Firefox, Safari, or Opera browsers. <p>
                    </div>
                    
                    <div class="tab-pane" id="visionSearch">
                    
                    <img src="lib/bootstrap/img/visualsearch.png" alt="About Location" style="float: right">

                    <p> How does the brain find something in the visual world that it is seeking? Triesman and Gelade (XXX) did an elegant experiment designed to show that it was easy to search for distinct features, but much harder to search for the absence of a feature.  For example, searching for a Q among O's is easy, but searching for an O among Q's is much harder.  In this version of the experiment, you can choose to simply replicate this basic finding, or, if you wish, you can design your own version of the experiment by choosing any characters you wish as target and distracter(s).  Does search become harder when you have more different types of distractors? </p>

                    <p> To practice the task and see how it works, click the "Try it" button below.  By default you should press "F" when the target is present and "J" when the target is not present. Press the space bar to start each new trial.  Try to go as quickly as you can without making more than a couple mistakes. </p>
                    
                        <input type="button" id="search-btn" class="btn btn-primary tryit" value="Try it!">
                    </div>
                    
                    <div class="tab-pane" id="sternberg">
                    
                    <p> If you are holding a list in your memory, how can you check to see if an item is on the list? </p>

                    <img src="lib/bootstrap/img/sternberg.png" alt="About Location" style="float: left">

                    <p> Sternberg (1966) proposed that we could measure mental operations using an "additive factors" approach.  He gave people lists of numerals of different lengths. Then a probe digit would follow. People had to indicate whether the item was in the list or not. Does it take time to search immediate memory? </p>

                    <p> To emulate Sternberg's auditory presentation technique, we will present number words one at a time. You will get a list to store of between 1 and 6 numbers. Then a warning signal will tell you that the probe will be presented. You should respond as quickly as you can to indicate whether the probe was in the list or not by pressing "F" if it was present and "J" if it was not. After each trial you have to type in the entire list in order to show that you stored it all.  Press return when you have finished entering the list. </p>
                                       
                    <p> Do the task diligently and we'll discuss the data once you're finished. </p>

                    
                    <input type="button" id="sternberg-btn" class="btn btn-primary tryit" value="Try it!">
                    </div>
                    
                    <div class="tab-pane" id="stroop">

                    <img src="lib/bootstrap/img/reversestroop.png" alt="About Location" style="float: right">
                    <p> Stroop (1935) showed that there was large processing cost for naming the ink color of incongruently named color words. For example if the word "blue" is printed in red, trying to say "red" in response is rendered more difficult by the fact that the word "blue" is staring you in the face. In contrast, saying "blue" to such a word is easy. Many textbooks illustrate this phenomenon because it illustrates ways in which our ability to control the flow of information is limited. Short of blurring our eyes, it is hard to avoid processing the verbal information even when we know it isn't relevant.  Here we implement a variant designed to show that this phenomenon is not simply based on the precedence of verbal information. </p>

                    <p> In this reverse Stroop task you have to point to a color patch corresponding to the verbal part of a Stroop word. That is, if presented with the word "blue", depicted in red light, your task is to point to the blue color patch in the surround.  Because this is a visual search task in which one is searching for a sensory color, you may find that the color in which the word is printed is now quite interfering. </p>

                    <p> The present implementation of this task is designed to mimic an experiment reported by Durgin (2003) in which only four different color words ever appeared (these words were selected at random from a set of 9 colors), and the distractor color (printed color) could either belong to this set of four or not (In the Set or Not in the Set), and could also be present or absent as one of the surrounding response patches available. </p>

                    <p> To do the task you simply click the mouse in the center to show the display and then move the mouse to the color named by the central word (as quickly as possible without sacrificing accuracy). </p>

                    <input type="button" id="stroop-btn" class="btn btn-primary tryit" value="Try it!">

                    </div>
                    
                    <div class="tab-pane" id="density">
                    
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis dui quis libero imperdiet ac dapibus velit dignissim. Nunc suscipit nulla et nunc luctus posuere. Curabitur placerat elit nec ipsum porta in bibendum neque mattis. Nullam tristique pharetra massa, et eleifend libero pulvinar a. Nunc et nisl eros, id porta turpis. Morbi consequat vulputate lacus, mollis semper lorem facilisis vel. Sed sit amet risus augue, quis sagittis felis. Nam ac arcu convallis metus vulputate porta a in erat. Etiam tortor elit, volutpat et vulputate quis, semper vel diam. </p>

                    <p>Curabitur tincidunt augue sit amet est ullamcorper ac dictum nisl imperdiet. Suspendisse id felis in risus lacinia rutrum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam faucibus nunc a turpis volutpat rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque id rhoncus risus. Pellentesque sapien sem, ornare vel euismod a, condimentum id nisi. Aenean a augue quis purus gravida faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec nisl quis quam hendrerit euismod. Phasellus lacinia, tortor vitae facilisis lobortis, lorem lorem sagittis tortor, nec facilisis felis est nec nisl.</p>

                    <p>Ut condimentum fermentum enim vitae porttitor. Nulla mollis dignissim dolor non aliquam. Ut orci libero, gravida id euismod eu, aliquam eu tellus. Vestibulum gravida iaculis nisl eu egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam est justo, eleifend consequat aliquam cursus, pulvinar id metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas a sapien at massa venenatis gravida sed eu metus. Vestibulum ultrices imperdiet venenatis. Nunc sed felis eget ipsum tincidunt aliquam elementum in est.</p>

                    <p>Suspendisse aliquet pretium mattis. Sed rhoncus nibh vel eros sodales blandit. Proin eleifend pharetra tristique. Curabitur eget nunc diam. Morbi urna urna, rutrum sed convallis ut, gravida vitae quam. Praesent et ornare eros. Fusce ultricies ultricies gravida.</p>

                    <p>Curabitur porta pellentesque lorem quis dapibus. Phasellus et ullamcorper est. In hendrerit facilisis justo, quis ornare ligula tincidunt a. In vel ipsum vel lacus tempus laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti. Curabitur non elementum nulla.</p>
                    
                    <input type="button" id="density-btn" class="btn btn-primary tryit" value="Try it!">
                    </div>
                    <div class="tab-pane" id="RSVP">
                    
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida augue ac dolor hendrerit dictum vestibulum arcu auctor. Nullam volutpat massa ut arcu semper nec luctus nisl venenatis. Cras feugiat nisl in nulla vestibulum a euismod ante ornare. Sed nunc lorem, vestibulum nec sagittis quis, facilisis consequat neque. Duis tristique varius pellentesque. Quisque adipiscing turpis ac mauris blandit tincidunt ut id felis. Aenean in lacus felis. Nulla dictum ultricies pretium. Aenean dapibus auctor luctus. Cras vel magna in dolor blandit aliquet quis ac tortor. Nam malesuada tempor purus nec elementum. Sed tristique purus quis felis pellentesque ac sagittis metus posuere. Duis rutrum congue felis eget convallis. Mauris id felis nec lectus ultricies gravida id vitae lacus. Curabitur volutpat orci dapibus orci ultrices accumsan. </p>
                    <p> Etiam erat justo, suscipit vitae varius quis, tincidunt ac sem. Donec hendrerit faucibus erat, sit amet lobortis risus volutpat eu. Nunc tempus metus nec massa blandit viverra. Maecenas fringilla nunc nec mauris semper pellentesque. Suspendisse potenti. Nam fringilla porttitor auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In faucibus sem at ante mollis in pulvinar libero sollicitudin. Integer purus leo, malesuada sit amet porta ac, euismod ut diam.</p>
                    <p> Proin pharetra lorem id metus accumsan vitae blandit nisi aliquet. Aenean fringilla placerat urna, ut suscipit diam bibendum sit amet. Ut in elit arcu. Sed faucibus cursus metus at molestie. Proin vel pulvinar metus. Curabitur sapien sapien, rhoncus id laoreet et, bibendum vehicula nisl. Curabitur commodo sapien et erat imperdiet vel auctor sem rhoncus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat condimentum massa nec cursus. Sed porttitor neque sed erat lacinia vulputate. Morbi sagittis mi at lectus placerat at molestie mauris fermentum. Nunc vitae sagittis enim. Nulla facilisi. Maecenas blandit libero eget sapien ornare et varius erat tincidunt. Maecenas ut mi id mauris lobortis consectetur. Aliquam pharetra metus sed lacus elementum dapibus.</p>
                    <p> Quisque placerat risus ac augue varius pretium. Nulla ac adipiscing lectus. Morbi sed lacus diam, non sodales urna. In in erat lectus. Maecenas et nulla a leo tempus eleifend. Mauris eu lacus eget risus mollis elementum. Maecenas eleifend tortor a nisl eleifend quis molestie nisi dignissim. Pellentesque at pharetra augue. Mauris congue, nulla sit amet iaculis rutrum, magna lacus convallis tortor, consequat varius arcu dolor eget augue. Morbi nunc diam, bibendum ut condimentum mattis, malesuada ut nisi. Integer sollicitudin faucibus semper. Nulla a urna ligula, vitae imperdiet mauris. Curabitur nec sapien ut arcu placerat ornare. Etiam elementum metus in augue venenatis adipiscing. Donec ac iaculis diam. Aenean quis felis diam, commodo scelerisque purus.</p>
                    <p> Vestibulum in ligula risus. Vivamus elementum dignissim dui et aliquam. Suspendisse ornare laoreet blandit. Proin laoreet luctus dui, at dignissim orci viverra eget. Aliquam cursus nisl sed nibh porttitor blandit. Praesent arcu nisi, pharetra quis placerat sit amet, laoreet quis leo. Proin at odio massa. Nulla fringilla, nisl porttitor accumsan tincidunt, diam enim tristique diam, eu fringilla ligula urna eu justo.</p>
                    <input type="button" id="rsvp-btn" class="btn btn-primary tryit" value="Try it!">
                    </div>
                </div>
                
                <div id="experiment" class="hide">
    
                </div>
                
            </div>
        </div>
        </div>
    </div>
    </div>
    </body>

</html>