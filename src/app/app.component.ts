import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  kb : any;
  incident : any;
  kp : any;

  constructor(public search:SearchService){
    
  }
  
  press(query){
    this.getDataKb(query).then(res=>{
      // this.data = res
      this.kb = res['value'].filter((el, i, a) => i === a.indexOf(el))
      console.log(res['value'])
    }).catch(err=>{
      console.log(err)
    })

    this.getDataIncident(query).then(res=>{
      // this.data = res
      this.incident = res['value'].filter((el, i, a) => i === a.indexOf(el))
      console.log(res['value'])
    }).catch(err=>{
      console.log(err)
    })
    this.getKeyPhrases(query).then(data=>{
      this.kp = data['documents'][0]['keyPhrases']
      console.log(this.kp)
    }).catch(err=>{
      console.log(err)
    })
  }

  keyDownFunction(event, query){
    if(event.keyCode == 13) {
      this.press(query)      
    }   
  }

  async getDataIncident(query){
    return await this.search.searchInc(query).toPromise()
    // this.search.searchQuery(query)
  }

  async getDataKb(query){
    return await this.search.searchKB(query).toPromise()
    // this.search.searchQuery(query)
  }

  async getKeyPhrases(query){
    return await this.search.getKeywords(query).toPromise()
  }
}
