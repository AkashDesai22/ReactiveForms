import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  url:string="http://localhost:3000/"

 

  constructor(private http:HttpClient){};


     //Post API Call
  postData(endPoint:string,requestData:any){

    let postDataUrl=this.url+endPoint;

    return this.http.post(postDataUrl,requestData)

  };

   //GET API Call
   getApi(endPoint:any,id?:any){

    let getUrl=id?this.url+endPoint+'/'+id : this.url+ endPoint;

    return this.http.get(getUrl);

   };
   
   //Patch API Call
   patchApiCall(endpoint:any,id:any,requestData:any){
    
    let patchUrl=this.url+endpoint+'/'+id;

   return this.http.patch(patchUrl,requestData)

   };


   //Delete API Call
   deleteApiCall(endPoint:any,id:any){
    let delitUrl=this.url+endPoint+'/'+id;
    return this.http.delete(delitUrl);

   };


}
