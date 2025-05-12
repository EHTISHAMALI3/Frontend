import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InstitutionService } from '../services/institution.service';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from '../../../../Shared/shared.module';
import { NotificationsService } from '../../../../Shared/services/notifications.service';
const phonePattern = /^(03[0-9]{9}|0[4-9][0-9]{8,9})$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const webPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/i;
@Component({
  selector: 'app-add-institute',
  standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule,NgSelectModule,ReactiveFormsModule,SharedModule],
  templateUrl: './add-institute.component.html',
  styleUrl: './add-institute.component.css'
})
export class AddInstituteComponent implements OnInit,OnDestroy {
  private subscription$: Subscription = new Subscription(); // handling memory leackage

  institutionTypes: any[] = [];
  citieList :any[]=[];
  countriesList:any[]=[]
  activeTab: string = 'institutions';
  
  selectTab(tab: string) {
    this.activeTab = tab;
  }
  institutionForm!: FormGroup;

  addressFields = [
    { label: 'Head Office Address', control: 'addressLine' },
    { label: 'Street', control: 'street' },
    { label: 'State/Province', control: 'state' },
    { label: 'Postal Code', control: 'postalCode' },
  ];

  contactFields = [
    { label: 'Primary Contact Person', control: 'primaryContactPerson', type: 'text' },
    { label: 'Primary Contact Full Name', control: 'primaryContactFullName', type: 'text' },
    { label: 'Primary Contact Job Title', control: 'primaryContactJobTitle', type: 'text' },
    { label: 'Primary Contact Email', control: 'primaryContactEmail', type: 'email' },
    { label: 'Primary Contact Phone Number', control: 'primaryContactPhoneNumber', type: 'text' }
  ];

  constructor(
    private fb: FormBuilder,
    private institution:InstitutionService,
    private spinner: NgxSpinnerService,
    // private toastr: ToastrService,
    private notificationService:NotificationsService
  ) {}

  ngOnInit(): void {
    this.institutionForm = this.fb.group({
      institutionId: [{ value: '', disabled: true }],
      institutionName: ['', Validators.required],
      institutionTypeId: ['', Validators.required],
      institutionEmail: ['', [Validators.required, Validators.pattern(emailPattern)]],
      institutionPhone: ['', [Validators.required, Validators.pattern(phonePattern)]],
      websiteUrl: ['', Validators.pattern(webPattern)],
      dateOfEstablishment: ['',Validators.required],
      addressLine: ['',Validators.required],
      street: [''],
      countryId: [''],
      state: [''],
      postalCode: [''],
      cityId: [''],
      primaryContactPerson: ['',Validators.required],
      primaryContactFullName: ['',Validators.required],
      primaryContactJobTitle: [''],
      primaryContactEmail: ['', [Validators.required, Validators.pattern(emailPattern)]],
      primaryContactPhoneNumber: ['',[Validators.required, Validators.pattern(phonePattern)]],
      institutionStatus: [true, Validators.required]
    });
    this.getInstituteType();
    this.getCity();
    this.getCountry()
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  get f() {
    return this.institutionForm.controls;
  }

  onSubmit() {
    if (this.institutionForm.invalid) return;
    this.spinner.show(); // Show loader before making the request
    this.subscription$=this.institution.saveInstitute(this.institutionForm.value).subscribe({
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
  getInstituteType(){
    this.subscription$=this.institution.getAllInstituteTypes().subscribe({
      next: (res) => {
        if (res?.respCode === 200) {
          this.institutionTypes = res.respData;
        }
      },
      error: (err) => {
        // this.toastr.error(err.error.message)
      }
    });
  }
  getCity(){
    this.subscription$=this.institution.getAllCity().subscribe({
      next: (res) => {
        if (res?.respCode === 200) {
          this.citieList = res.respData;
        }
      },
      error: (err) => {
        // this.toastr.error(err.error.message)
      }
    });
  }
  getCountry(){
    this.subscription$=this.institution.getAllCountry().subscribe({
      next: (res) => {
        if (res?.respCode === 200) {
          this.countriesList = res.respData;
        }
      },
      error: (err) => {
        // this.toastr.error(err.error.message)

      }
    });
  }
  onDiscard() {
    this.institutionForm.reset();
  }
}