package referer;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

@Path("/trd")
public class TrackRefererDomain {

	public static HashMap<String,Integer> refererHM = new HashMap<String,Integer>();
	
	public TrackRefererDomain() {
		super();
	}

/**
 * Service api to add referer by domain and keep count of the referers added by their domain.
 * The domain will be extracted from the the input URL and total count will be returned for the extracted domain.
 * @param url : the referer url string e.g: https://www.google.com/xyz
 * @return : total count of the referer domain
 *  http://localhost:8080/hello/ref/trd/www.yahoo.com/
 */
	@GET
	@Path("{add_url}")
	@Produces("application/json")
	public synchronized void addRefererDomain(@PathParam("add_url") String urlStr) {
		
		urlStr = "https://" + urlStr;
		 
		URL url = null;
		try {
			url = new URL(urlStr);            	// https://www.google.com/xyz
		} catch (MalformedURLException e) {
			e.printStackTrace();		
		} 
	    String host = url.getHost();			// www.google.com
	    Integer refCount = refererHM.get(host);	
	    
	    if(refCount == null) { refCount = 1;}else { refCount++;}
	    
	    refererHM.put(host, refCount);
	    System.out.println("Referer list size:" + refererHM.keySet().size());
	}
	
	/**
	 * Api returns the top 3 Referer domains with highest count
	 * @param topCount
	 * @return
	 * http://localhost:8080/hello/ref/trd/trd/get_url
	 */
	@GET
	@Path("get_url")
	@Produces("application/json")
	public JSONArray getTopRefererDomains() {

		Set domainSet = refererHM.entrySet();
		List<String> refList = new ArrayList(domainSet);

		// Sort refererHM Hashmap by value
		Collections.sort(refList,new Comparator<Object>(){			
			public int compare(Object obj1, Object obj2){
				return ((Comparable)((Map.Entry)obj1).getValue()).compareTo(((Map.Entry)obj2).getValue());
			}
		});
		
		// Construct Json Object to be returned
		int listSize = refList.size();		
	    JSONArray topRefList = new JSONArray();	    
	    if(listSize <= 0) {
			return topRefList;
	    }

	    constructJsonForDomainObject(refList.get(listSize-1), topRefList);
	    if(listSize > 1) {
		    constructJsonForDomainObject(refList.get(listSize-2), topRefList);
	    }
	    if(listSize > 2) {
	    	constructJsonForDomainObject(refList.get(listSize-3), topRefList); 
	    }
		return topRefList;
	}
	
	public void constructJsonForDomainObject(Object topDomain, JSONArray topRefList) {
	    JSONObject refererObj = new JSONObject();  
	    refererObj.put("domain", ((Map.Entry)topDomain).getKey());
	    refererObj.put("count", ((Map.Entry)topDomain).getValue());
	    topRefList.put(refererObj); 
	}
	
	public static void main(String[] args) {
		
		TrackRefererDomain tRef = new TrackRefererDomain(); 
		
		tRef.addRefererDomain("www.google.com/xyz");
		tRef.addRefererDomain("www.google.com/xyz222");
		tRef.addRefererDomain("www.google.com/xyz222/33");
		tRef.addRefererDomain("www.yahoo.com/xyz");		
		tRef.addRefererDomain("www.paypal.com:9090/xyz");
		tRef.addRefererDomain("www.paypal.com/99");	
		tRef.addRefererDomain("www.linkedin.com/99");	
		tRef.addRefererDomain("www.paypal.com");	
		
		System.out.println("Top 3 Referer Domains:" + tRef.getTopRefererDomains());		
	}
}
