#!/usr/bin/python

#This script will take a JSON from the vision experiment and return a
#propery formatted CSV file.  

import sys
import cgi
#import cgitb
import json
from scipy import stats
import numpy as np
import pdb
#cgitb.enable() #for troubleshooting

##Regular Form Input
#form = cgi.FieldStorage()
#item = form.getvalue("exp_data")
#item2 = form.getvalue("option")
#data =  json.loads(item)
#option = json.loads(item2)

##Development Purposes Only
data = json.loads(sys.argv[2]) 
option = sys.argv[1]


if option == 'analysis':
	print 'Content-Type: application/json\n'
	print json.dumps(data)
	
if option == 'csv':
	print "Content-Type:application/csv"
	print "Content-Disposition:attachment;filename=dataResults.csv\n"
	print 'Trial Results:'
	print 'Trial Number', ",", 'Number of Distractors',",", 'Target Present?',",","Subject's Response",",", 'Response Time',","
	for trial, results  in enumerate(data['trials'], start=0):
		print ('Trial ' + str(trial) + ',' + str(results['numberDistractors'])
						+ ',' + str(results['targetPresent']) + ',' + str(results['subjectResponse']) + ',' + str(results['responseTime']))
	print
	print 'Average Response Times'
	print (	'Number of Distractors' + ',' + 'Target Present' + ',' + 'Number of Trials Present' + ',' +
					'Target Absent' + ',' + 'Number of Trials Absent' + ',' + 'Number of Errors' + ',' + 
					'Error Rate (%)')
	
	for key in data['presentMeans']:
		#pdb.set_trace()
		print (	str(key) + ',' + 
				str(data['presentMeans'][key]['time']) + ',' + 
				str(data['presentMeans'][key]['number']) + ',' +
				str(data['absentMeans'][key]['time']) + ',' +
				str(data['absentMeans'][key]['number']) + ',' +
				str(errors[int(key)]['number']) + ',' +
				str(errors[int(key)]['rate']) )
	print

	
	print 'Least Squres Regression: (y = a + bx)'
	print ' ' + ',' + 'a' + ',' + 'b' + ',', 'R^2'+ ',' + 'p' + ',' + 'SE'
	print ('Present' + ',' + 
			str(data['regression']['present']['a']) + ',' +
			str(data['regression']['present']['b']) + ',' +
			str(data['regression']['present']['r2']) + ',' +
			str(data['regression']['present']['p']) + ',' +
			str(data['regression']['present']['err'])) 
	print ('Absent' + ',' + 
			str(data['regression']['absent']['a']) + ',' +
			str(data['regression']['absent']['b']) + ',' +
			str(data['regression']['absent']['r2']) + ',' +
			str(data['regression']['absent']['p']) + ',' +
			str(data['regression']['absent']['err']))