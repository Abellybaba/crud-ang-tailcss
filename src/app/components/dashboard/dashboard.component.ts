import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { catchError, Observable, throwError } from 'rxjs';
import { Iemployee } from 'src/app/interface/iemployee';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  empFormValue!: FormGroup;
  empModelObject: Iemployee = {} as Iemployee;
  errorMessage: any;
  empData: any;


  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService) { }

  //When the page loads
  ngOnInit(): void {
    this.formsMethod();
    this.getAllEmployee();
    this.postEmployeeDetails();
  } // End of ngOnInit


 //method for form building and form validations
 formsMethod() {
  this.empFormValue = this.formBuilder.group({
    fullname: ["", Validators.required],
    salary: ["", Validators.required],
    email: ["", Validators.required],
    website: ["", Validators.required],
    mobile: ["", Validators.required],
    photo: ["", Validators.required],
    status: ["", Validators.required],
  });
}


  //post/ADD employee data - Bind to click method in form
  postEmployeeDetails(){
    if (this.empFormValue.valid) {
      this.apiService.createEmployee(this.empFormValue.value)
      .subscribe((res)=>{
        alert("Employee added successfully");
        this.empFormValue.reset();
        let ref = document.getElementById('cancel')
        ref?.click();
        this.getAllEmployee();
      },
      (error: any) => {
        this.errorMessage = error;
        alert("Employee added successfully");
        console.log(error);
      }
      )
    }
  }
 
  //getAll Employee
  getAllEmployee()
  {
    return this.apiService.getAllEmployee().subscribe((res)=>{
      this.empData = res;
      console.log(res);
    })
  }

  deleteEmployeeDetails(row: any){
    return this.apiService.deleteEmployee(row.id).subscribe(res=>
    {
      alert("Employee Record deleted")
      this.getAllEmployee();
    })
  }
  //edit method calls all forms and populate with data
  editEmployeeDetails(row: any)
  {
    this.empModelObject.id = row.id;
    this.empFormValue.controls['fullname'].setValue(row.fullname);
    this.empFormValue.controls['salary'].setValue(row.salary);
    this.empFormValue.controls['email'].setValue(row.email);
    this.empFormValue.controls['website'].setValue(row.website);
    this.empFormValue.controls['mobile'].setValue(row.mobile);
    this.empFormValue.controls['photo'].setValue(row.photo);
    this.empFormValue.controls['status'].setValue(row.status);
    
  }

  updateEmployeeDetails(){
    //return this.apiService.updateEmployee(row.id)
    if (this.empFormValue.valid) {
      this.apiService.updateEmployee(this.empFormValue.value,this.empModelObject.id)
      .subscribe(res=>{alert("Employee Updated")})
      let ref = document.getElementById('cancel')
        ref?.click();
        this.empFormValue.reset();
        this.getAllEmployee();
    }
  }


} //end of class
