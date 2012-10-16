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
#import pdb
cgitb.enable() #for troubleshooting
form = cgi.FieldStorage()
item = form.getvalue("exp_data")
item2 = form.getvalue("option")
json_data =  json.loads(item)
option = json.loads(item2)
#json_data = json.loads(sys.argv[2]) #for troubleshooting -- input fixed data on command line
errors = {}
x_present=[]
y_present=[]
x_absent=[]
y_absent =[]
for results in json_data['trials']:
	if not results['subjectResponse'] == results['targetPresent']:
		if results['numberDistractors'] in errors.keys():
			errors[results['numberDistractors']]['number'] += 1
		else:
			errors[results['numberDistractors']]={'number':1}

for key in json_dat
a['presentMeans'] or json_data['absentMeans']:
	if not errors.has_key(int(key)):
		errors[int(key)] = {'number': 0}
	if (errors[int(key)]['number'] + json_data['presentMeans'][key]['number'] + json_data['absentMeans'][key]['number'])	== 0:
		errors[int(key)]['rate'] =0
	else:
		errors[int(key)]['rate'] = float(errors[int(key)]['number'])/(errors[int(key)]['number'] + json_data['presentMeans'][key]['number'] + json_data['absentMeans'][key]['number'])	

for key in json_data['presentMeans']:
	y_present.append(json_data['presentMeans'][key]['time'])
	x_present.append(float(key))

for key in json_data['absentMeans']:
	y_absent.append(json_data['absentMeans'][key]['time'])
	x_absent.append(float(key))
#regress data for present
list = stats.linregress(x_present,y_present)
list = np.array(list)
json_data['regression']['present']['b'] = list[0]
json_data['regression']['present']['a'] = list[1]
json_data['regression']['present']['r2'] = list[2]**2
json_data['regression']['present']['p'] = list[3]
json_data['regression']['present']['err'] = list[4]
#now regress data for absent
list2 = stats.linregress(x_absent,y_absent)
json_data['regression']['absent']['b'] = list2[0]
json_data['regression']['absent']['a'] = list2[1]
json_data['regression']['absent']['r2'] = list2[2]**2
json_data['regression']['absent']['p'] = list2[3]
json_data['regression']['absent']['err'] = list2[4]

dataAnalysis = {'regression': json_data['regression'], 'errors': errors}

if option == 'analysis':
	print 'Content-Type: application/json\n'
	print json.dumps(dataAnalysis)
	
if option == 'csv':
	print "Content-Type:application/csv"
	print "Content-Disposition:attachment;filename=dataResults.csv\n"
	print 'Trial Results:'
	print 'Trial Number', ",", 'Number of Distractors',",", 'Target Present?',",","Subject's Response",",", 'Response Time',","
	for trial, results  in enumerate(json_data['trials'], start=0):
		print ('Trial ' + str(trial) + ',' + str(results['numberDistractors'])
						+ ',' + str(results['targetPresent']) + ',' + str(results['subjectResponse']) + ',' + str(results['responseTime']))
	print
	print 'Average Response Times'
	print (	'Number of Distractors' + ',' + 'Target Present' + ',' + 'Number of Trials Present' + ',' +
					'Target Absent' + ',' + 'Number of Trials Absent' + ',' + 'Number of Errors' + ',' + 
					'Error Rate (%)')
	
	for key in json_data['presentMeans']:
		#pdb.set_trace()
		print (	str(key) + ',' + 
				str(json_data['presentMeans'][key]['time']) + ',' + 
				str(json_data['presentMeans'][key]['number']) + ',' +
				str(json_data['absentMeans'][key]['time']) + ',' +
				str(json_data['absentMeans'][key]['number']) + ',' +
				str(errors[int(key)]['number']) + ',' +
				str(errors[int(key)]['rate']) )
	print

	
	print 'Least Squres Regression: (y = a + bx)'
	print ' ' + ',' + 'a' + ',' + 'b' + ',', 'R^2'+ ',' + 'p' + ',' + 'SE'
	print ('Present' + ',' + 
			str(json_data['regression']['present']['a']) + ',' +
			str(json_data['regression']['present']['b']) + ',' +
			str(json_data['regression']['present']['r2']) + ',' +
			str(json_data['regression']['present']['p']) + ',' +
			str(json_data['regression']['present']['err'])) 
	print ('Absent' + ',' + 
			str(json_data['regression']['absent']['a']) + ',' +
			str(json_data['regression']['absent']['b']) + ',' +
			str(json_data['regression']['absent']['r2']) + ',' +
			str(json_data['regression']['absent']['p']) + ',' +
			str(json_data['regression']['absent']['err']))
