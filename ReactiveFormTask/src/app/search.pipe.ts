import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(Data:any,searchText:any):any {

    if(!searchText){
      
      return Data;

    };

    let search=searchText?.toLowerCase();

      return Data.filter((element:any)=>{

      return JSON.stringify(element).toLowerCase().includes(search)

    });
    
  }

}
