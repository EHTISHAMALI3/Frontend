import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstitutionService } from '../../institution-management/services/institution.service';
import { UsersService } from '../services/users.service';
import { SharedModule } from '../../../../Shared/shared.module';
import { BranchService } from '../../institution-management/services/branch.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from '../../../../Shared/services/notifications.service';
import { User } from '../../../../Models/User';
const phonePattern = /^(03[0-9]{9}|0[1-9]{2}-?[0-9]{6,7})$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule,SharedModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit,OnDestroy {
  private subscription$: Subscription = new Subscription(); // handling memory leackage
  
  userForm!: FormGroup;
  institutionTypes: any[] = [];
  citieList :any[]=[];
  countriesList:any[]=[]
  institutionsList:any[]=[];
  branchList:any[]=[]
  labList = [
    { id: '1', name: 'Lab Alpha' },
    { id: '2', name: 'Lab Beta' }
  ];

  constructor(
    private fb: FormBuilder,
    private institution:InstitutionService,
    private user:UsersService,
    private branches:BranchService,
    private spinner: NgxSpinnerService,
    private notificationService:NotificationsService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userTypeId: ['', Validators.required],
      userId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(5)
        ]
      ],      
      firstName: ['', Validators.required],
      lastName: ['',Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      phoneNumber: ['',[Validators.required, Validators.pattern(phonePattern)]],
      cityId: ['',[Validators.required]],
      state: [''],
      province: [''],
      countryId: ['',[Validators.required]],
      address: ['',[Validators.required]],
      joiningDate: [''],
      PasswordHash:['ZahidKamran321@'],
      institutionId: ['',[Validators.required]],
      branchId: ['',[Validators.required]],
      // assignedLab: ['',Validators.required],
      roleId: ['', Validators.required],  // Array of strings for multiple select
      grade: [''],
      designation: ['']
    });

    this.handleUserTypeChanges(); // 👈 Add this line
    this.getInstituteType();
    this.getCity();
    this.getCountry();
    this.getInstitute();
    this.getBrnaches();
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  handleUserTypeChanges(): void {
    this.userForm.get('userTypeId')?.valueChanges.subscribe(type => {
      const gradeControl = this.userForm.get('grade');
      const designationControl = this.userForm.get('designation');

      if (type === '1') {
        gradeControl?.setValidators([Validators.required]);
        designationControl?.clearValidators();
        designationControl?.reset();
      } else if (type === '2') {
        designationControl?.setValidators([Validators.required]);
        gradeControl?.clearValidators();
        gradeControl?.reset();
      } else {
        gradeControl?.clearValidators();
        designationControl?.clearValidators();
        gradeControl?.reset();
        designationControl?.reset();
      }

      gradeControl?.updateValueAndValidity();
      designationControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    this.spinner.show()
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    const user: User = new User(this.userForm.value);
    this.user.createUsers(user).subscribe(
      {
        next: (res:any) => {
          if (res.respCode === 200) {
            this.spinner.hide();
            this.notificationService.success(res.respMsg)
          }
        },
        error: (err)  =>{
          this.notificationService.error(err.error.respMsg)
          this.spinner.hide(); // Hide loader after a delay
        }
      }
    )
  }

  get userType() {
    return this.userForm.get('userTypeId')?.value;
  }
  allowOnlyNumbers(event: KeyboardEvent): boolean {
  const charCode = event.charCode;
  if (charCode >= 48 && charCode <= 57) {
    return true;
  }
  event.preventDefault();
  return false;
}
get f() {
  return this.userForm.controls;
}
getInstituteType(){
  this.subscription$=this.institution.getAllInstituteTypes().subscribe({
    next: (res) => {
      if (res?.respCode === 200) {
        this.institutionTypes = res.respData;
        // console.log("<------Institution Type------->",res.respData)
      }
    },
    error: (err) => {
      // this.toastr.error(err.error.message)
    }
  });
}
getInstitute(){
  this.subscription$=this.institution.getAllInstitutes().subscribe({
    next: (res) => {
      if (res?.respCode === 200) {
        this.institutionsList = res.respData;
        console.log("<------Institutions------->",res.respData)
      }
    },
    error: (err) => console.error('Failed to fetch institution types', err)
  });
}
getCity(){
  this.subscription$=this.institution.getAllCity().subscribe({
    next: (res) => {
      if (res?.respCode === 200) {
        this.citieList = res.respData;
        console.log("<------Institution Type------->",res.respData)
      }
    },
    error: (err) => console.error('Failed to fetch institution types', err)
  });
}
getCountry(){
  this.subscription$=this.institution.getAllCountry().subscribe({
    next: (res) => {
      if (res?.respCode === 200) {
        this.countriesList = res.respData;
        // console.log("<------Country Name------->",res.respData)
      }
    },
    error: (err) => console.error('Failed to fetch institution types', err)
  });
}
getBrnaches(){
  this.branches.getAllBranches().subscribe({
    next: (res) => {
      if (res?.respCode === 200) {
        this.branchList = res.respData;
        console.log("<------Branches------->",res.respData)
      }
    },
    error: (err) => console.error('Failed to fetch Barnches types', err)
  }
  )
}
onDiscard() {
  this.userForm.reset();
}
}