import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from './user-data.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ReactiveFormTask';

  userForm!:FormGroup;
  password!:string;
  showPassword: boolean = false;
  endPoint:string="posts";
  postData:any;
  getUserData:any;
  userData: any[] = [];
  editUserId: any;
  editUserData:any;
  showForm:boolean=false;
  serachTextValue!:any;
  searchText:any;
 

  constructor(private formBuilder:FormBuilder,
              private apiCallService:UserDataService,){};
  
  ngOnInit(){

    this.usersData();
    this.getApiData();

  };



  addUser(){

    this.showForm=!this.showForm;

  };

  usersData(){

    this.userForm=this.formBuilder.group({

      firstName : ["",[Validators.required,Validators.pattern("[a-zA-z]*$"),Validators.minLength(2)]],

      lastName  : [ "",[Validators.required,Validators.pattern("[a-zA-z]*$"),Validators.minLength(2)]],

      email  : ["",[Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],

      phone : ["",[Validators.required,Validators.pattern(/^\d{10}$/)]],

      company : ["",[Validators.required,Validators.minLength(2)]],

      gender : ['',[Validators.required]],

      birthDate : ["",[Validators.required]],

      password : ['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/)]],

      confirmPassword : ['',[Validators.required]],

      
    },{ validator: this.passwordMismatchValidator })

  };

  // Password & Confirm Password Matching
  passwordMismatchValidator(userData: any) {
    const passwordValue = userData.get('password').value;
    const confirmPasswordValue = userData.get('confirmPassword').value;

    if (passwordValue !== confirmPasswordValue) {
      userData.get('confirmPassword').setErrors({ mismatch: true });
    } else {
      userData.get('confirmPassword').setErrors(null);
    };
  };

  // Hide or Show Password
  showPass(){
    this.showPassword = !this.showPassword;
  };

   //Register Button

  async register() {
    // Get the user data from the form
    const requestData = {
      FirstName: this.userForm.value.firstName?.replace(/\s+/g, " ").trim(),
      LastName: this.userForm.value.lastName?.replace(/\s+/g, " ").trim(),
      Email: this.userForm.value.email?.replace(/\s+/g, " ").trim(),
      Phone: this.userForm.value.phone?.replace(/\s+/g, " ").trim(),
      Company: this.userForm.value.company?.replace(/\s+/g, " ").trim(),
      Gender: this.userForm.value.gender,
      BirthDate: this.userForm.value.birthDate,
      Password: this.userForm.value.password?.replace(/\s+/g, " ").trim(),
      ConfirmPassword: this.userForm.value.confirmPassword?.replace(/\s+/g, " ").trim(),
    };
  
    // Patch the Data For Existing User(PATCH API Call)
    if (this.editUserData) {
      
      await this.apiCallService.patchApiCall(this.endPoint, this.editUserData.id, requestData).toPromise();
      console.log('User data updated successfully!');
    } else {
      this.postData=await this.apiCallService.postData(this.endPoint, requestData).toPromise();
      console.log('New user created successfully!');
    };
  
    // Get the updated data from the API
    this.getApiData();
  
    // Reset the form Data
    this.userForm.reset();
  };



   //To Get the Data
  getApiData():any{

    this.apiCallService.getApi(this.endPoint).subscribe((response)=>{
      this.getUserData=response;
   
      
    });
  };


  //Cancel or Reset the Form
  cancel(){

    //To Reset Form Data
    this.userForm.reset();

  };

    //To Edit Record in Table
    async editRecord(id:any){

     this.editUserId=id;
     
    this.editUserData = await this.apiCallService.getApi(this.endPoint,id).toPromise();

 // Assign the retrieved user data to the form fields
 this.userForm.patchValue({
  firstName: this.editUserData.FirstName,
  lastName: this.editUserData.LastName,
  email: this.editUserData.Email,
  phone: this.editUserData.Phone,
  company: this.editUserData.Company,
  gender: this.editUserData.Gender,
  birthDate: this.editUserData.BirthDate,
  password: this.editUserData.Password,
  confirmPassword: this.editUserData.ConfirmPassword
});

  //To Open the Form when Click On Edit Button with Prefill Fields. 
this.showForm=true;
  };



  //To Delit Record in Table
  async delitRecord(id:any){
    console.log(id);
    
    await this.apiCallService.deleteApiCall(this.endPoint,id).toPromise();

    this.userData =await this.getApiData()

  };


  //To Search User Data In Record

  searchData(){

    this.searchText=this.serachTextValue;

    this.serachTextValue="";
    
    
  };

}
