<html>
	<head>
		<%@page import="referer.TrackRefererDomain"%>
		<%@page import="org.json.simple.JSONObject"%>
		<%@page import="org.json.simple.JSONArray"%>
		<script src="js/jquery.js"></script>
		<link href="css/bootstrap.min.css" rel="stylesheet">
	</head>
	
	<body>		
		<H2>Top 3 Referrer domains and their count </H2>
		<%	
			TrackRefererDomain tRef = new TrackRefererDomain();		
			JSONArray reportData = (JSONArray)tRef.getTopRefererDomains();			
			System.out.println("Top 3 Referer Domains:" + reportData);			
		%>				
		<div id="rootDiv"></div>
	
		<p><%//reportData%></p>
	</body>
	
	<script>
		var refData = <%=reportData%>;
		console.log("Top Referer Data :" + JSON.stringify(refData));

		// Renders json results into html divs
		function renderResults(refData){			
			for (var i = 0; i < refData.length; i++) {            			
				$("#rootDiv").append("<div class='col-sm-12 row'>" +		
										"<div class='col-sm-3'>" +
				  							"<label>" + refData[i].domain + "</label>" +
										"</div>" +
										"<div class='col-sm-2'>" +
				  							"<div><strong>" +  refData[i].count + "</strong></div>" +
				  						"</div>" +
				  					  "</div>");
			}
		}
			
		$( document ).ready(function() {
		    console.log( "ready!" );
		    renderResults(refData);
		});		
	</script>
</html>