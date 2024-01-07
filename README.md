# ReactiveForms
Reactive Form Task

  async deletHotelData(id:any){
    let endpoint="HotelDetails";
    await this.apiCall.deleteApiCall(endpoint,id).toPromise();
  };

 async editRecord(id:any){
   this.commonService.id=id;
   let endpoint="HotelDetails";
   this.getHotelDataById=await this.apiCall.getApiCall(endpoint,id).toPromise()
   this.commonService.HotelDataById=this.getHotelDataById;

   this.route.navigateByUrl("owner/HotelRegistration")

  };

