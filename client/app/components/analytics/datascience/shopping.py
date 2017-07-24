from ebaysdk.shopping import Connection as shopping
from bs4 import BeautifulSoup
import json
from lxml import etree
from lxml import objectify

def searchSopping():
       
   api = shopping(domain='svcs.sandbox.ebay.com',appid="Gilmarom-ebayanal-SBX-d8e06383e-a6744a2e", debug=True, config_file= None)
   api_request = { 'keywords': search, 'outputSelector': 'SellerInfo'}
   print(api_request['keywords'])
   response = api.execute('findpopularitem', api_request)
   soup = BeautifulSoup(response.content , 'lxml')
   string = ((response.content).decode("utf-8"))
   totalentries = int(soup.find('totalentries').text)
   items = soup.find_all('item')
   length = len(items)
   finding_json ={}
   for i in range(0,length):
     index = 0
     print(items[i].find_all("itemid"))
     finding_json[i] = 
     {
        "itemid": items[i].find_all("itemid")[0].text,
        "title": items[i].find_all("title")[0].text,
        "globle": items[i].find_all("globalid")[0].text,
        "category": { 
                      "categoryid" : items[i].find_all("categoryid")[0].text,
	                    "categoryname": items[i].find_all("categoryname")[0].text 		
                    },
        "viewitemurl": items[i].find_all("viewitemurl")[0].text,
        "autopay": items[i].find_all("autopay")[0].text,
        "location": items[i].find_all("location")[0].text,
        "country": items[i].find_all("country")[0].text,
        "sellerinfo": { 
                        "sellerusername": items[i].find_all("sellerusername")[0].text,
		                    "feedbackscore": items[i].find_all("feedbackscore")[0].text,			
		    "feedbackratingstar": items[i].find_all("feedbackratingstar")[0].text,
		    "topratedseller": items[i].find_all("topratedseller")[0].text		
            },
        "shippinginfo": { 
                         "convertedcurrentprice": items[i].find_all("convertedcurrentprice")[0].text 
          }               
     }
   print(finding_json)   
   return(finding_json)
