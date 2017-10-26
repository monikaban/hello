<html>
	<head>
		<%@page import="referer.TrackRefererDomain"%>		
		<link href="css/bootstrap.min.css" rel="stylesheet">	
	</head>
	
	<body>
		<H2>Adding Referrers ...</H2>
		<%
			TrackRefererDomain tRef = new TrackRefererDomain();
			
			tRef.addRefererDomain("https://www.google.com/xyz");
			tRef.addRefererDomain("https://www.google.com/xyz222");
			tRef.addRefererDomain("https://www.google.com/xyz222/33");
			tRef.addRefererDomain("https://www.yahoo.com/xyz");		
			tRef.addRefererDomain("https://www.paypal.com:9090/xyz");
			tRef.addRefererDomain("https://www.paypal.com/99");	
			tRef.addRefererDomain("http://www.linkedin.com/abc");	
			tRef.addRefererDomain("https://www.paypal.com");
		%>
		<p> Referrers added </p>	
	</body>
</html>