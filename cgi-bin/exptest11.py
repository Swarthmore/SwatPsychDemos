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
form = cgi.FieldStorage()
item = form.getvalue("exp_data")
item2 = form.getvalue("option")
data =  json.loads(item)
option = json.loads(item2)

##Development Purposes Only
#data = json.loads(sys.argv[2]) 
#option = sys.argv[1]

## RUN ANALYSIS ON DATA ##

## PARSE DATA INTO CORRECT FORMAT

## create empty dictionary
analysis = {
    'present':{},
    'absent': {},
    'errors': {},
    'regression': {
        'present': {}, 
        'absent': {},
    },
}


## puts in the proper structure
for number in data['trialDistractors']:
    analysis['present'][number] = {'total': 0, 'number': 0, 'mean': 0}
    analysis['absent'][number] = {'total': 0, 'number': 0,'mean': 0}
    analysis['errors'][number] = {'number': 0, 'rate': 0};

## populates the data dictionary with the actual data
for trial in data['trials']:
    if trial['targetPresent'] == True:
        if trial['subjectResponse'] == True:
            analysis['present'][trial['distractors']]['total'] += trial['time']
            analysis['present'][trial['distractors']]['number'] += 1
        else:
            analysis['errors'][trial['distractors']]['number'] += 1
    else:
        if trial['subjectResponse'] == False:
            analysis['absent'][trial['distractors']]['total'] += trial['time']
            analysis['absent'][trial['distractors']]['number'] += 1
        else:
            analysis['errors'][trial['distractors']]['number'] += 1

## Averages the times and error rates for each distractor
for distractor in analysis['present'] or analysis['absent']:
    
    ## makes local pointers for ease of notation
    presentTotal = analysis['present'][distractor]['total']
    presentNumber = analysis['present'][distractor]['number']    
    absentTotal = analysis['absent'][distractor]['total']
    absentNumber = analysis['absent'][distractor]['number']
    errors = analysis['errors'][distractor]['number']
    
    ## actuall analysis -- checks to make sure nonzero denominators
    if presentNumber != 0:
        analysis['present'][distractor]['mean'] = presentTotal/presentNumber
    else:
        analysis['present'][distractor]['mean'] = 0
    
    if absentNumber != 0:
        analysis['absent'][distractor]['mean'] = absentTotal/absentNumber
    else:
        analysis['absent'][distractor]['mean'] = 0
    
    if (presentNumber + absentNumber + errors) != 0:
        analysis['errors'][distractor]['rate'] = float(errors)/(presentNumber + absentNumber + errors)
    else:
        analysis['errors'][distractor]['rate'] = 0

## SETUP FOR REGRESSION ANALYSIS -- need to put the data into numpy arrays

## setup arrays
x_present=[]
y_present=[]
x_absent=[]
y_absent =[]

## populate arrays
for key in analysis['present']:
	y_present.append(analysis['present'][key]['mean'])
	x_present.append(float(key))

for key in analysis['absent']:
	y_absent.append(analysis['absent'][key]['mean'])
	x_absent.append(float(key))

## RUN REGRESSION

## actual regression
present = stats.linregress(x_present,y_present)
absent = stats.linregress(x_absent,y_absent)

## store regression data
analysis['regression']['present']['b'] = present[0]
analysis['regression']['present']['a'] = present[1]
analysis['regression']['present']['r2'] = present[2]**2
analysis['regression']['present']['p'] = present[3]
analysis['regression']['present']['err'] = present[4]
#now regress data for absent
analysis['regression']['absent']['b'] = absent[0]
analysis['regression']['absent']['a'] = absent[1]
analysis['regression']['absent']['r2'] = absent[2]**2
analysis['regression']['absent']['p'] = absent[3]
analysis['regression']['absent']['err'] = absent[4]

for key in analysis['regression']:
    for entry in analysis['regression'][key]:
        analysis['regression'][key][entry] = round(analysis['regression'][key][entry], 3)

## OUTPUT OF DATA ##

## PLAIN ANALYSIS MODE
if option == 'analysis':
    print 'Content-Type: application/json\n'
    print json.dumps(analysis)
## CSV OUTPUT MODE
    
if option == 'csv':
	print "Content-Type:application/csv"
	print "Content-Disposition:attachment;filename=dataResults.csv\n"
	print 'Trial Results:'
	print 'Trial Number', ",", 'Number of Distractors',",", 'Target Present?',",","Subject's Response",",", 'Response Time (ms)',","
	for trial, results  in enumerate(data['trials'], start=0):
		print (str(trial) + ',' + str(results['distractors']) + ',' + str(results['targetPresent']) + ',' + str(results['subjectResponse']) + ',' + str(results['time']))
	print
	print 'Average Response Times'
	print (	'Number of Distractors' + ',' + 'Target Present (ms)' + ',' + 'Number of Trials Present' + ',' + 'Target Absent (ms)' + ',' + 'Number of Trials Absent' + ',' + 'Number of Errors' + ',' + 'Error Rate (%)')
	
	for key in analysis['present'] or analysis['absent'] :
		#pdb.set_trace()
		print (	str(key) + ',' + 
				str(analysis['present'][key]['mean']) + ',' + 
				str(analysis['present'][key]['number']) + ',' +
				str(analysis['absent'][key]['mean']) + ',' +
				str(analysis['absent'][key]['number']) + ',' +
				str(analysis['errors'][key]['number']) + ',' +
				str(analysis['errors'][key]['rate']) )
	print

	
	print 'Least Squres Regression: (y = a + bx)'
	print ' ' + ',' + 'a' + ',' + 'b' + ',', 'R^2'+ ',' + 'p' + ',' + 'SE'
	print ('Present' + ',' + 
			str(analysis['regression']['present']['a']) + ',' +
			str(analysis['regression']['present']['b']) + ',' +
			str(analysis['regression']['present']['r2']) + ',' +
			str(analysis['regression']['present']['p']) + ',' +
			str(analysis['regression']['present']['err'])) 
	print ('Absent' + ',' + 
			str(analysis['regression']['absent']['a']) + ',' +
			str(analysis['regression']['absent']['b']) + ',' +
			str(analysis['regression']['absent']['r2']) + ',' +
			str(analysis['regression']['absent']['p']) + ',' +
			str(analysis['regression']['absent']['err']))