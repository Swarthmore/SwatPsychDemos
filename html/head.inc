        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="">
        <link rel="shortcut icon" href="favicon.ico">
        
        <link href="lib/bootstrap/docs/assets/css/bootstrap.css" rel="stylesheet">
        <link href="lib/jquery-ui/css/ui-lightness/jquery-ui-1.8.21.custom.css" rel="stylesheet">
        <link href="lib/stylesheet.css" rel="stylesheet">
        
        <script src="lib/bootstrap/docs/assets/js/jquery.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-tab.js"></script>
        <script src='lib/jquery-ui/js/jquery-ui-1.8.21.custom.min.js'></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-button.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-typeahead.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-transition.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-alert.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-modal.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-dropdown.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-scrollspy.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-tooltip.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-popover.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-collapse.js"></script>
        <script src="lib/bootstrap/docs/assets/js/bootstrap-carousel.js"></script>
        <script src="lib/jquery.fileDownload.js"></script>  
        
        <script src="https://www.google.com/jsapi"></script>
        
        <!--[if lt IE 9]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
        
        <script>            
            initializeButtons = function(){
                //load the experiment form
                $("#tryit").click(function(){
					$(".exp-pane").hide();
					$("#experiment-form").show();
                });
                //start the experiemnt
                $("#start").click(function(){
                	$(".exp-pane").hide();
                	startExperiment();
                	return false;
                });
                //restart the experiment
                $('#restart').click(function () {
                    location.reload(true);
                });
           
                
                $('#rsvp-btn').click(function(){
                    window.location = 'RSVP.html#RSVP';
                });
            };
            
            $(document).ready(function(){
                initializeButtons();

               	$('#myTab a.tab-link').click(function(e) {
                        e.preventDefault();
                        $(this).tab('show');
                });
                if (window.location.hash != ''){
                        $('#myTab a[href="index.php' + window.location.hash +'"]').tab('show');
                } else{
                        $('#myTab a[href="index.php#home"]').tab('show');
                }
            });
        </script>