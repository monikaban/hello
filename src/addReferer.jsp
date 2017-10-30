<html>
	<head>
		<%@page import="referer.TrackRefererDomain"%>		
		<link href="css/bootstrap.min.css" rel="stylesheet">	
	</head>
	
	<body>
		<H2>Adding Referrers ...</H2>
		<%
			TrackRefererDomain tRef = new TrackRefererDomain();
			
			tRef.addRefererDomain("www.google.com/xyz");
			tRef.addRefererDomain("www.google.com/xyz222");
			tRef.addRefererDomain("www.google.com/xyz222/33");
			tRef.addRefererDomain("www.yahoo.com/xyz");		
			tRef.addRefererDomain("www.paypal.com:9090/xyz");
			tRef.addRefererDomain("www.paypal.com/99");	
			tRef.addRefererDomain("www.linkedin.com/abc");	
			tRef.addRefererDomain("www.paypal.com");
		%>
		<p> Referrers added </p>	
	</body>
</html>