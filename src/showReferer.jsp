<html>
	<head>
		<%@page import="referer.TrackRefererDomain"%>
		<%@page import="org.json.JSONObject"%>
		<%@page import="org.json.JSONArray"%>
		<script src="js/jquery.js"></script>
		<link href="css/bootstrap.min.css" rel="stylesheet">
	</head>
	
	<body>		
		<H2>Top 3 Referrer domains and their count </H2>
		<%
			TrackRefererDomain tRef = new TrackRefererDomain();		
			JSONArray reportData = (JSONArray)tRef.getTopRefererDomains();			
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
		
		function getData(){
			var url = "http://localhost:8080/RestWithJersey2/reverser/trd/get_url/"; //"http://localhost:8080/RestWithJersey2/reverser/trd/www.yahoo.com";
			$.ajax({
				url: url,
				dataType: 'json',
				async: true,
				type: 'GET',
				success: function(result) {
					console.log("after ajax jsonStr:" +  JSON.stringify(result));
					return result;
				},
				error: function(result){
					console.log("Error while refreshing variable values during the ajax call." + JSON.stringify(result));
				},
				timeout: 120000 // 2 min  
			});
		}
	</script>
</html>