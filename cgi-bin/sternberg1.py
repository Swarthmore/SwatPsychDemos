#!/usr/bin/python

#This script will take a JSON from the vision experiment and return a
#propery formatted CSV file.  

import sys
import cgi
import cgitb
import json
from scipy import stats
import numpy as np
#import pdb
cgitb.enable() #for troubleshooting
## Regular Web Inputs
form = cgi.FieldStorage()
item = form.getvalue("exp_data")
item2 = form.getvalue("option")
Global =  json.loads(item)
option = 'analysis'

# Command Line Inputs -- use for Dev Purposes Only
#Global = json.loads(sys.argv[2]) 
#option = sys.argv[1]

## Run Analysis of Data
Global['analysis'] = {}

# run through each trial
for trial in Global['trials']:
    
    # check if their response was correct and should be included in data
    if trial['response'] == trial['testPresent']:
        
        # checks if that trial's list length has already come up before
        if str(len(trial['list'])) in Global['analysis'].keys():
            
            # counter
            Global['analysis'][str(len(trial['list']))]['number']+=1 
            
            # adds time
            Global['analysis'][str(len(trial['list']))]['mean']+=trial['time'] 
        
        # if it hasn't, create a new entry
        else:
            Global['analysis'][str(len(trial['list']))]={'number':1, 'mean':trial['time'], 'recallErrors':0}
        
        # counts the number of times subject recalled the list incorrectly
        if not trial['correctRecall']:
            Global['analysis'][str(len(trial['list']))]['recallErrors']+=1

# averages the time for each list length
for key in Global['analysis'].keys():
    if Global['analysis'][key]['number'] != 0:
        Global['analysis'][key]['mean'] = Global['analysis'][key]['mean']/Global['analysis'][key]['number']
    else:
        Global['analysis'][key]['mean'] = 0

# create empty arrays:
lengths = []
means=[]

# loops through the list-lengths and fills the arrays we just created
for key in Global['analysis'].keys():
    lengths.append(float(key))
    means.append(float(Global['analysis'][key]['mean']))

# changes the arrays into numpy arrays for the regression analysis
lengths = np.array(lengths)
means = np.array(means)

# run the regression analysis
list = stats.linregress(lengths,means)
list = np.array(list)

# assign each coeficient to the appropriate entry in the global dictionary
Global['analysis']['regression'] = {}
Global['analysis']['regression']['b'] = list[0]
Global['analysis']['regression']['a'] = list[1]
Global['analysis']['regression']['r2'] = list[2]
Global['analysis']['regression']['p'] = list[3]
Global['analysis']['regression']['err'] = list[4]


## Code for Analysis Mode
if option == 'analysis':
    print 'Content-Type: application/json\n'
    print json.dumps(Global['analysis'])  
    

##Code for CSV mode
if option == 'csv':
    print "Content-Type:application/csv"
    print "Content-Disposition:attachment;filename=dataResults.csv\n"