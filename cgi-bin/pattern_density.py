#!/usr/bin/python

def main():
    try:
        import json
    except ImportError:
        import simplejson as json
    import time
    import subprocess

    ##Regular Web Inputs
    import cgi
    import cgitb
    cgitb.enable() #for troubleshooting
    form = cgi.FieldStorage()
    item = form.getvalue("exp_data")
    item2 = form.getvalue("option")
    trials =  json.loads(item)
    option = json.loads(item2)
    
    # Command Line Inputs -- use for Dev Purposes Only
    #import pdb
    #f = open('patterndensitydata.txt')
    #trials = json.loads(f.read())
    #option = 'analysis'
    
    time = str(time.time())
    
    if option == 'analysis':
        staircase = [   {"density":[] , "response": []},
                        {"density":[] , "response": []},
                        {"density":[] , "response": []},
                    ]
            
        
        for trial in trials:
            staircase[int((trial['staircase'] - 1)/2)]['density'].append(int(trial['density']))
            staircase[int((trial['staircase'] - 1)/2)]['response'].append(int(trial['response']))
        
        subprocess.call(["Rscript", "test_script.R", "--args", json.dumps(staircase[0]['response']), json.dumps(staircase[0]['density']), '1',time],stdout=subprocess.PIPE)
        subprocess.call(["Rscript", "test_script.R", "--args", json.dumps(staircase[1]['response']), json.dumps(staircase[1]['density']), '2',time],stdout=subprocess.PIPE)
        subprocess.call(["Rscript", "test_script.R", "--args", json.dumps(staircase[2]['response']), json.dumps(staircase[2]['density']), '3',time],stdout=subprocess.PIPE)

        print 'Content-Type: application/json\n'
        print json.dumps(time)
    elif option == 'csv':
        print "Content-Type:application/csv"
        print "Content-Disposition:attachment;filename=dataResults.csv\n"
        
if __name__ == "__main__":
    main()
