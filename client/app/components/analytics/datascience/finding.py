
from ebaysdk.finding import Connection as finding
from bs4 import BeautifulSoup
import json
from lxml import etree
from lxml import objectify


def searchFinding(search):
   
   api = finding(domain='svcs.sandbox.ebay.com',appid="Gilmarom-ebayanal-SBX-d8e06383e-a6744a2e", debug=True, config_file= None)
   api_request = { 'keywords': search, 'outputSelector': 'SellerInfo'}
   print(api_request['keywords'])
   response = api.execute('findItemsByKeywords', api_request)
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
print('hello')
Keywords = input('Enter keyword: ')
print(type(Keywords))
api = finding(domain='svcs.sandbox.ebay.com',appid="Gilmarom-ebayanal-SBX-d8e06383e-a6744a2e", debug=True, config_file= None)
api_request = { 'keywords': Keywords , 'outputSelector': 'SellerInfo'}
print(api_request['keywords'])
response = api.execute('findItemsByKeywords', api_request)
soup = BeautifulSoup(response.content , 'lxml')
string = ((response.content).decode("utf-8"))
totalentries = int(soup.find('totalentries').text)
items = soup.find_all('item')
print('enter')

print('finish')
length = len(items)
print(type(items))

finding_json = { }

for i in range(0,length):
 print("gil ",items[i].find_all("title")[0].text) 
 for item in items[i]:
   print("hllo " ,item)
   
   print(len(items[i]))
   print(index)
   index= index+1
for i in range(0,length):
 index = 0
 print(items[i].find_all("itemid"))
 finding_json[i] = {
 "itemid": items[i].find_all("itemid")[0].text,
 "title": items[i].find_all("title")[0].text,
 "globle": items[i].find_all("globalid")[0].text,
 "category": { "categoryid" : items[i].find_all("categoryid")[0].text,
	             "categoryname": items[i].find_all("categoryname")[0].text 		
             },
 "viewitemurl": items[i].find_all("viewitemurl")[0].text,
 "autopay": items[i].find_all("autopay")[0].text,
 "location": items[i].find_all("location")[0].text,
 "country": items[i].find_all("country")[0].text,
 "sellerinfo": { "sellerusername": items[i].find_all("sellerusername")[0].text,
		 "feedbackscore": items[i].find_all("feedbackscore")[0].text,			
		"feedbackratingstar": items[i].find_all("feedbackratingstar")[0].text,
		"topratedseller": items[i].find_all("topratedseller")[0].text		
            },
 "shippinginfo": { "convertedcurrentprice":items[i].find_all("convertedcurrentprice")[0].text }               
 } 
for i in range(len(finding_json)):
  print(finding_json[i])

for item in items[i]:
  print(items[i].find_all("topratedlisting"))
  print(item)
  print(len(items[i]))
  print(index)
  index = index+1
return(finding_json)   


     