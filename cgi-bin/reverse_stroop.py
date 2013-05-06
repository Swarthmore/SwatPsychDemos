#!/usr/bin/python

#This script will take a JSON from the vision experiment and return a
#propery formatted CSV file.  

import sys
import cgi
import cgitb
try:
	import json
except ImportError:
	import simplejson as json
from scipy import stats
import numpy as np
from datetime import datetime


cgitb.enable() #for troubleshooting
form = cgi.FieldStorage()
item = form.getvalue("exp_data")
json_data =  json.loads(item)

option = 'csv'
today = datetime.today()

if option == 'csv':
	# print some headers so that we know what data is what
	print "Content-Type:application/csv"
	print "Content-Disposition:attachment;filename=ReverseStroopResults_" + today.strftime("%Y-%m-%d_%H-%M")  + ".csv\n"
	print 'Reverse Stroop Trial Results'
	print 'Date: ' + today.strftime("%m/%d/%Y %I:%M%p")
	print 'Trial Number,Reaction Time (ms),Word Displayed,Color of Text,Text Color in Set,Correct'
	for i in range(len(json_data)):
		trialresults = json_data[i]
		print (str(trialresults["trialNumber"]) + ',' + 
		       str(trialresults["time"]) + ',' + 
		       str(trialresults["printed"]) + ',' + 
		       str(trialresults["trueColor"]) + ',' + 
		       str(trialresults["inSet"]) + ',' + 
		       str(trialresults["correct"])  
		      )