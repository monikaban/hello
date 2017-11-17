/* 
 * Schedules the specified meeting event
 * 
 */
function scheduleMeeting(remove){
	
	var sdate = document.getElementById("sdate");
	var start = document.getElementById("start");
	var end = document.getElementById("end");
	
	if(remove != undefined && remove == false){
		if(start === undefined || sdate === undefined || start.value.length <= 0){
	        alert("Please specify both start time and date."); 
	        return;
		}
		removeMeeting(sdate.value, start.value);
	}else{
		
		if(start === undefined || end === undefined || sdate === undefined){
	        alert("Please specify all 3 start , end time and date."); 
	        return;
		}
		if(parseInt(start) > parseInt(end)) {
			alert("Start time cannot be > end time"); 
			return;
		}
		sdate = sdate.value;
		start = start.value;
		end = end.value;
	
	 	for(var i=0; i<localStorage.length; i++){
	    	
			var dkey = localStorage.key(i);
			var dKeyArr = dkey.split(':');
			
			if(dKeyArr[0] === sdate ){  
				var meet = localStorage.getItem(dkey);			
				var meetArr = meet.split(",");
				
				if(start < meetArr[2] && end > meetArr[1]){ // overlapping meeting
					alert("Conflicting schedules found for this Event, please select another date/time");
					return;
				}
			}
	 	}
		addMeeting([sdate, start, end]);
	}
}

/* 
 * Adds the specified meeting event
 */
function addMeeting(currMeeting) {

    if(typeof(Storage) !== "undefined") {
        if (localStorage) {     	        	
        	localStorage.setItem(currMeeting[0]+':'+currMeeting[1], currMeeting); // Key : date + start time            
        } else {
            localStorage =  new Array([]);
        }
        document.getElementById("result").innerHTML = "Meeting added";
    } else {
        document.getElementById("result").innerHTML = "Error";
    }
}

/* 
 * Renders the specified meeting event
 */
function renderMeetingForDate(){

	 $("#show").empty();
	 $("#show").empty();
	 //localStorage.clear();
	  var sdate = document.getElementById("sdate");
		if(sdate === undefined){
	        alert("Please specify date."); 
	        return;
		}
		if(parseInt(start) > parseInt(end)) {
			alert("Start time cannot be > end time"); 
			return;
		}
		sdate = sdate.value;
		
	  var mshow = ""; 
	  if(typeof(Storage) !== "undefined") {
	        if (localStorage) {
	        	console.log(">sdate:" + sdate);	        	
	        	$("#show").append("<table>");
	        	
	        	for(var i=0; i<localStorage.length; i++){
	        	
	        			console.log(">sdate" + sdate);
	        			var dkey = localStorage.key(i);
	        			var dKeyArr = dkey.split(':');
	        			
	        			if(dKeyArr[0] === sdate){  
	        				var meet = localStorage.getItem(localStorage.key(i));
	        				var meetArr = meet.split(",");
	        				console.log("showing sdate:" + sdate + " . " + meet); 	
        					$("#show").append(	"<tr><td>" +
        					  							"<div><strong>Scheduled Date:    " + sdate + "</strong></div>" +
        											"</td>" +
        											"<td>" +
        					  							"<div><strong>Start Time:    " +  meetArr[1] + "</strong></div>" +
        					  						"</td>" +
        											"<td>" +
    					  								"<div><strong>End Time:    " +  meetArr[2] + "</strong></div>" +
    					  							"</td></tr>" );       				
	        			}        		
	        	}
	        	$("#show").append("</table>");
	        } else {
	            alert("Meeting to be shown does not exist ! ");
	        }
	    } else {
	        document.getElementById("result").innerHTML = "Error";
	    }
}

/* 
 * Removes the specified meeting event
 */
function removeMeeting(sdate, start) {

    if(typeof(Storage) !== "undefined") {
        if (localStorage) {
        	console.log("rem existing len :" + localStorage.length +" " +  sdate + " " + start);
        	
        	for(var i=0; i<localStorage.length; i++){       		
        		if(localStorage.key(i) === (sdate + ':' + start)){      			
        			localStorage.removeItem(localStorage.key(i));
        		}        		
        	}
        } else {
            alert("Meeting to be removed does not exist ! ");
        }
        document.getElementById("result").innerHTML = "Meeting removed";
    } else {
        document.getElementById("result").innerHTML = "Error..";
    }
}

/* Loads the Calendar Dates for the current month 
 * 
 */
function onLoad(){

	    var d = new Date();
	    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	    var month = d.getMonth();   //0-11
	    var year = d.getFullYear(); //2017
	    var first_date = month_name[month] + " " + 1 + " " + year;
	    //Nov 1 2017
	    var tmp = new Date(first_date).toDateString();
	    //Wed Nov 01 2017 ...
	    var first_day = tmp.substring(0, 3);    //Wed
	    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	    var day_no = day_name.indexOf(first_day);   //1
	    var days = new Date(year, month+1, 0).getDate();    //30
	    //Wed Nov 01 2017  ...
	    var calendar = get_calendar(day_no, days);
	    document.getElementById("calendar-month-year").innerHTML = month_name[month]+" "+year;
	    document.getElementById("calendar-dates").appendChild(calendar);
	}

	function get_calendar(day_no, days){
	    var table = document.createElement('table');
	    var tr = document.createElement('tr');
	    
	    //row for the day letters
	    for(var c=0; c<=6; c++){
	        var td = document.createElement('td');
	        td.innerHTML = "SMTWTFS"[c];
	        tr.appendChild(td);
	    }
	    table.appendChild(tr);
	    
	    //create 2nd row
	    tr = document.createElement('tr');
	    var c;
	    for(c=0; c<=6; c++){
	        if(c == day_no){
	            break;
	        }
	        var td = document.createElement('td');
	        td.innerHTML = "";
	        tr.appendChild(td);
	    }
	    
	    var count = 1;
	    for(; c<=6; c++){
	        var td = document.createElement('td');
	        td.innerHTML = count;
	        count++;
	        tr.appendChild(td);
	    }
	    table.appendChild(tr);
	    
	    //rest of the date rows
	    for(var r=3; r<=7; r++){
	        tr = document.createElement('tr');
	        for(var c=0; c<=6; c++){
	            if(count > days){
	                table.appendChild(tr);
	                return table;
	            }
	            var td = document.createElement('td');
	            td.innerHTML = count;
	            count++;
	            tr.appendChild(td);
	        }
	        table.appendChild(tr);
	    }
	    return table;
	}
	




