import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class SearchService {
  kb_key = '38E90518AF713B54E9A192535210EABC'
  inc_key = 'B52565FE4DF6A3C4B311E11CF169632C'
  kp_key = '5e739f897c8d4341a1c26dd2399a3220'
  constructor(public http: HttpClient) { }

  searchKB(query){    
    const httpOptions = {
      headers : new HttpHeaders({
        'api-key': this.kb_key
      })
    }
    console.log(query)
    return this.http.get('https://kbarticlesearch.search.windows.net/indexes/azureblob-index/docs?api-version=2019-05-06&search='+query+'&$top=5', httpOptions)
  
  }

  searchInc(query){    
    const httpOptions = {
      headers : new HttpHeaders({
        'api-key': this.inc_key
      })
    }
    console.log(query)
    return this.http.get('https://historicalsearch.search.windows.net/indexes/incidentindex/docs?api-version=2019-05-06&search='+query+'&$top=5', httpOptions)
  }

  getKeywords(query){
    var document ={
        "documents": [{
                "language": "en",
                "id": "1",
                "text": query
            },]}
    const url = "https://centralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases" 
    const httpOptions = {
      headers : new HttpHeaders({
        "Ocp-Apim-Subscription-Key" : this.kp_key,
        "Content-Type": "application/json",
        "Accept": "application/json"
      })
    }

    return this.http.post(url, document, httpOptions)
  }
}