#!/usr/bin/python

#This script will take a JSON from the vision experiment and return a
#propery formatted CSV file.  

import sys
import cgi
import cgitb
import json
from scipy import stats
import numpy as np


cgitb.enable() #for troubleshooting
form = cgi.FieldStorage()
item = form.getvalue("exp_data")
json_data =  json.loads(item)

option='csv'

if option == 'csv':
	# print some headers so that we know what data is what
	print "Content-Type:application/csv"
	print "Content-Disposition:attachment;filename=dataResults.csv\n"
	print 'Trial Results:'
	print 'Trial Number',",", 'Reaction Time',",", 'Color Word Printed',",","True Color",",", 'Correct?'
	for i in range(len(json_data)):
		trialresults = json_data[i]
		print (str(trialresults["trial number"]) + ',' + 
		       str(trialresults["time"]) + ',' + 
		       str(trialresults["printed"]) + ',' + 
		       str(trialresults["true color"]) + ',' + 
		       str(trialresults["correct?"])  
		      )
