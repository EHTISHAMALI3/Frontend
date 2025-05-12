import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BranchService } from '../services/branch.service';
import { InstitutionService } from '../services/institution.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedModule } from '../../../../Shared/shared.module';
import { NotificationsService } from '../../../../Shared/services/notifications.service';
const pakPhoneRegex = /^(03[0-9]{9}|0[1-9]{2}-?[0-9]{6,7})$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-add-branch',
  standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule,ReactiveFormsModule,SharedModule],
  templateUrl: './add-branch.component.html',
  styleUrl: './add-branch.component.css'
})
export class AddBranchComponent implements OnInit,OnDestroy {
  branchForm!: FormGroup;
  institutionsList: any[] = [];
  countriesList:any[]=[]
  managers: any[] = [];
  citieList :any[]=[];
  private subscription$: Subscription = new Subscription(); // handling memory leackage

  constructor(
    private fb: FormBuilder,
     private branchService: BranchService,
     private institution:InstitutionService,
    private spinner: NgxSpinnerService,
    private notificationService:NotificationsService    
  ) {}

  ngOnInit(): void {
    this.branchForm = this.fb.group({
      branchId: [{ value: '', disabled: true }],
      institutionId: ['', Validators.required],
      branchName: ['', Validators.required],
      branchCode: [''],
      branchManagerId: ['', Validators.required],
      branchEmail: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      branchPhone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      branchAddress: ['', Validators.required],
      street: [''],
      cityId: [''],
      state: [''],
      postalCode: [''],
      countryId: [''],
      status: [true, Validators.required]
    });
    this.getCity();
    this.getCountry();
    this.getInstitutions();
    this.loadManagers();
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  loadManagers() {
    // This should come from an API — mocked here for demo
    this.managers = [
      { id: '001', name: 'Zahid Kamran' },
      { id: '002', name: 'Abdul Sattar' },
      // { id: 'mgr003', name: 'Z' }
    ];
  }

  getInstitutions() {
    this.subscription$=this.branchService.getInstitutes().subscribe({
      next:(response)=>{
        this.institutionsList = response.respData;
        // console.log("<-----Institutes Data----->",response.respData)
      },
      error:(err:any)=>{
        // this.toastr.error(err.error.message)
      }
    })
  }
  getCity(){
    this.subscription$=this.institution.getAllCity().subscribe({
      next: (res) => {
        if (res?.respCode === 200) {
          this.citieList = res.respData;
          // console.log("<------Institution Type------->",res.respData)
        }
      },
      error:(err:any)=>{
        // this.toastr.error(err.error.message)
      }
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
      error:(err:any)=>{
        // console.log("<-----Country Error------->",err)
        // this.toastr.error(err.error.message)
      }
    });
  }
  onSubmit() {
    this.spinner.show()
    if (this.branchForm.invalid) return;
    this.subscription$=this.branchService.saveBranch(this.branchForm.value).subscribe({
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
    })
  }

  get f() {
    return this.branchForm.controls;
  }

  onDiscard() {
    this.branchForm.reset();
  }
}