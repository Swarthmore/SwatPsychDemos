#!/usr/bin/python

#This script will take a JSON from the vision experiment and return a
#propery formatted CSV file.  

try:
    import json
except ImportError:
    import simplejson as json
from scipy import stats
import numpy as np

##Regular Web Inputs
import cgi
import cgitb
cgitb.enable() #for troubleshooting
form = cgi.FieldStorage()
item = form.getvalue("exp_data")
item2 = form.getvalue("option")
Global =  json.loads(item)
option = json.loads(item2)

# Command Line Inputs -- use for Dev Purposes Only
#import sys
#import pdb
#f = open('sternberg_test_data.txt')
#Global = json.loads(f.read()) 
#option = sys.argv[1]

## Run Analysis of Data
analysis = {'present':  {}, 
            'absent':   {}, 
            'errors':   {},
            'regression':{
                'present':  {},
                'absent':   {},
                },
            }

# run through each trial
for trial in Global['trials']:
    
    #if probe was present in the list:
    if trial['testPresent']:
    
        # checks if that trial's list length has already come up before
        if str(len(trial['list'])) not in analysis['present'].keys():

            # if it hasn't, create a new entry 
            analysis['present'][str(len(trial['list']))]={
                'number':0, 
                'mean':0,
                'recallErrors':0,
                'responseErrors': 0,
            }
        if str(len(trial['list'])) not in analysis['absent'].keys():

            # if it hasn't, create a new entry 
            analysis['absent'][str(len(trial['list']))]={
                'number':0, 
                'mean':0,
                'recallErrors':0,
                'responseErrors': 0,
            }
            
        # check if their response was correct and should be included in data
        if trial['response'] == trial['testPresent']:     
            # counter
            analysis['present'][str(len(trial['list']))]['number']+=1 
            
            # adds time
            analysis['present'][str(len(trial['list']))]['mean'] +=trial['time']             
           
            # counts the number of times subject recalled the list incorrectly
            if not trial['correctRecall']:
                analysis['present'][str(len(trial['list']))]['recallErrors'] +=1
    
            #replaces True with dummy number 1
            trial['correctResponse'] = 1
        else:
            # counts response errors
            analysis['present'][str(len(trial['list']))]['responseErrors'] +=1

    #if probe was not present in the list:
    if not trial['testPresent']:
    
        # checks if that trial's list length has already come up before
        if str(len(trial['list'])) not in analysis['absent'].keys():

            # if it hasn't, create a new entry 
            analysis['absent'][str(len(trial['list']))]={
                'number':0, 
                'mean':0,
                'recallErrors':0,
                'responseErrors': 0,
            }
        if str(len(trial['list'])) not in analysis['present'].keys():

            # if it hasn't, create a new entry 
            analysis['present'][str(len(trial['list']))]={
                'number':0, 
                'mean':0,
                'recallErrors':0,
                'responseErrors': 0,
            }

        # check if their response was correct and should be included in data
        if trial['response'] == trial['testPresent']:     
            # counter
            analysis['absent'][str(len(trial['list']))]['number']+=1 
            
            # adds time
            analysis['absent'][str(len(trial['list']))]['mean'] +=trial['time']             
           
            # counts the number of times subject recalled the list incorrectly
            if not trial['correctRecall']:
                analysis['absent'][str(len(trial['list']))]['recallErrors'] +=1    
        else:
            # counts response errors
            analysis['absent'][str(len(trial['list']))]['responseErrors'] +=1
        
    # replaces True and False with dummy numbers 0 and 1

    if trial['correctRecall']:
        trial['correctRecall'] = 1
    else:   
        trial['correctRecall'] = 0

    if trial['response']:
        trial['response'] = 1
    else:   
        trial['response'] = 0
    
    if trial['response'] == trial['testPresent']:
        trial['correctResponse'] = 1
    else:
        trial['correctResponse'] = 0



# averages the time for each list length
for key in analysis['present'].keys() or analysis['absent'].keys():

    #handles analysis for probe present
    if key not in analysis['present']:
        analysis['present'][key] = {}
    if analysis['present'][key]['number'] != 0:
        analysis['present'][key]['mean'] = analysis['present'][key]['mean']/analysis['present'][key]['number']
    else:
        analysis['present'][key]['mean'] = 0
    
    #handles analysis['absent'] for probe absent
    if key not in analysis['absent']:
        analysis['absent'][key] = {}
    if analysis['absent'][key]['number'] != 0:
        analysis['absent'][key]['mean'] = analysis['absent'][key]['mean']/analysis['absent'][key]['number']
    else:
        analysis['absent'][key]['mean'] = 0
    
    #handle response/recall errors
    if key not in analysis['errors']:
        analysis['errors'][key] = {}
    if (analysis['present'][key]['number'] + analysis['present'][key]['responseErrors'] + analysis['absent'][key]['number'] + analysis['absent'][key]['responseErrors']) != 0:
        analysis['errors'][key]['responseErrors'] = (float(analysis['absent'][key]['responseErrors']) + analysis['present'][key]['responseErrors']) / (analysis['present'][key]['number'] + analysis['present'][key]['responseErrors'] + analysis['absent'][key]['number'] + analysis['absent'][key]['responseErrors'])
    else:
    	analysis['errors'][key]['responseErrors'] = 0
    if (analysis['present'][key]['number'] + analysis['present'][key]['recallErrors'] + analysis['absent'][key]['number'] + analysis['absent'][key]['recallErrors']) != 0:
		analysis['errors'][key]['recallErrors'] = (float(analysis['absent'][key]['recallErrors']) + analysis['present'][key]['recallErrors']) / (analysis['present'][key]['number'] + analysis['present'][key]['recallErrors'] + analysis['absent'][key]['number'] + analysis['absent'][key]['recallErrors'])
    else:
        analysis['errors'][key]['recallErrors'] = 0
    
# create empty arrays:
presentLengths = []
presentMeans=[]

absentLengths = []
absentMeans=[]


# loops through the list-lengths and fills the arrays we just created
for key in analysis['present'].keys() and analysis['absent'].keys():
    presentLengths.append(float(key))
    absentLengths.append(float(key))
    presentMeans.append(float(analysis['present'][key]['mean']))
    absentMeans.append(float(analysis['absent'][key]['mean']))

# changes the arrays into numpy arrays for the regression analysis
presentLengths = np.array(presentLengths)
absentMeans = np.array(absentMeans)
presentLengths = np.array(presentLengths)
absentMeans = np.array(absentMeans)

# run the regression analysis
list1 = stats.linregress(presentLengths,presentMeans)
list1 = np.array(list1)

list2 = stats.linregress(absentLengths,absentMeans)
list2 = np.array(list2)

# assign each coeficient to the appropriate entry in the global dictionary
analysis['regression']['present']['b'] = list1[0]
analysis['regression']['present']['a'] = list1[1]
analysis['regression']['present']['r2'] = list1[2]**2
analysis['regression']['present']['p'] = list1[3]
analysis['regression']['present']['err'] = list1[4]

analysis['regression']['absent']['b'] = list2[0]
analysis['regression']['absent']['a'] = list2[1]
analysis['regression']['absent']['r2'] = list2[2]**2
analysis['regression']['absent']['p'] = list2[3]
analysis['regression']['absent']['err'] = list2[4]

## Code for Analysis Mode
if option == 'analysis':
    print 'Content-Type: application/json\n'
    print json.dumps(analysis)  
    

##Code for CSV mode
if option == 'csv':
    print "Content-Type:application/csv"
    print "Content-Disposition:attachment;filename=dataResults.csv\n"
    
    ## Print out each individual trial
    print "Trial Number" + "," + "List Length" + "," + "List" + "," + "Recalled List" + "," + "Accuracy of Recall" + "," + "Probe Digit" + "," + "Response" + "," + "Accuracy of Response" + "," + "Response Latency (ms)"
    for trial in Global['trials']:
        list = ''
        for i in trial['list']:
            list += str(i[1])
            list += ' '
        list = list[:-1]
        recall = ''
        for i in trial['recall']:
            recall += str(i[1])
            recall += ' '
        recall = recall[:-1]
        print str(trial['trialNumber']) + "," + str(len(trial['list'])) + "," + list + "," + recall + "," + str(trial['correctRecall']) + "," +  str(trial['test'][1]) + "," + str(trial['response']) + "," + str(trial['correctResponse']) + "," + str(trial['time'])
    
    ## Print out Averages
    print
    print 'List Length' + "," + 'Average Latency Present (ms)' + "," + 'Average Latency Absent (ms)' + "," + 'Response Error Rate (%)' + "," + 'List Recall Error Rate (%)' 
    for key in analysis['present'].keys() or analysis['absent'].keys():
        print str(key) + "," + str(analysis['present'][key]['mean']) + "," + str(analysis['absent'][key]['mean']) + "," + str(analysis['errors'][key]['responseErrors']) + "," + str(analysis['errors'][key]['recallErrors']) 
    print
    print 'Least Squres Regression: (y = a + bx)'
    print ' ' + ',' + 'a' + ',' + 'b' + ',', 'R^2'+ ',' + 'p' + ',' + 'SE'
    print 'Present' + ',' + str(analysis['regression']['present']['a']) + ',' + str(analysis['regression']['present']['b']) + ',' + str(analysis['regression']['present']['r2']) + ',' + str(analysis['regression']['present']['p']) + ',' + str(analysis['regression']['present']['err'])
    print 'Absent' + ',' + str(analysis['regression']['absent']['a']) + ',' + str(analysis['regression']['absent']['b']) + ',' + str(analysis['regression']['absent']['r2']) + ',' + str(analysis['regression']['absent']['p']) + ',' + str(analysis['regression']['absent']['err'])
    
