<html>
	<head>
		<%@page import="referer.TrackRefererDomain"%>		
		<link href="css/bootstrap.min.css" rel="stylesheet">	
		<script src="js/jquery.js"></script>
	</head>
	
	<body>
		<H2>Adding Referrer ...</H2>
		
		<form name='saveForm'>
			<p> Add Referrer: </p>
			<input id='ref' name='ref' value=''> </input>
			
			<input type="button" name="Save" value=" Save " title="Save" onClick="saveData();"></input>
		</form>			
	</body>
	
	<script>
	
	function saveData(){
		
		console.log('inside saveData');
		var usrRef = document.getElementById('ref');
			
		var url = "http://localhost:8080/RestWithJersey2/reverser/trd/" + usrRef.value;
		$.ajax({
			url: url,
			dataType: 'json',
			async: true,
			type: 'GET',
			success: function(result) {
				console.log("after ajax jsonStr:" +  JSON.stringify(result));
				
			},
			error: function(result){
				console.log("Error while refreshing variable values during the ajax call." + JSON.stringify(result));
			},
			timeout: 120000 // 2 min  
		});
	}
	</script>
	
	
</html>