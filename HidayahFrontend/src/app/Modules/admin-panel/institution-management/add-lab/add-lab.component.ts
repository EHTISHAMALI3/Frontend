import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LabService } from '../services/lab.service';
import { SharedModule } from '../../../../Shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from '../../../../Shared/services/notifications.service';

@Component({
  selector: 'app-add-lab',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule,SharedModule],
  templateUrl: './add-lab.component.html',
  styleUrl: './add-lab.component.css'
})
export class AddLabComponent implements OnInit {
  labForm!: FormGroup;
  branches = [{ id: '001', name: 'Main Campus Branch' },
    { id: '002', name: 'Bagh Kashmir Branch' },
    { id: '003', name: 'Gulshan Campus' },
    { id: '004', name: 'Clifton Branch' },
    { id: '005', name: 'Lahore City Branch' }]; // to be loaded from API
  staff = [
    { id: '101', name: 'Zahid Kamran' },
  { id: '102', name: 'Zain Malik' },
  { id: '103', name: 'Abdul Sattar' },
  { id: '104', name: 'Usman Qureshi' },
  // { id: '105', name: 'Hina Tariq' }
  ];    // to be loaded from API
  equipmentOptions = ['Computers', 'Headsets', 'Projector', 'Whiteboard'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private fb: FormBuilder,private labservice:LabService, private toastr:ToastrService,private notificationService:NotificationsService) {}

  ngOnInit(): void {
    this.labForm = this.fb.group({
      labId: [{ value: '', disabled: true }],
      labName: ['', Validators.required],
      branchId: ['', Validators.required],
      numberOfSeats: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      labEquipment: [[], Validators.required],
      labDays: [[], Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      labManagerId: ['', Validators.required],
      status: ['Active', Validators.required]
    });
  }

  get f() {
    return this.labForm.controls;
  }

  onEquipmentChange(event: any) {
    const selected = this.labForm.value.labEquipment || [];
    if (event.target.checked) {
      selected.push(event.target.value);
    } else {
      const index = selected.indexOf(event.target.value);
      if (index >= 0) selected.splice(index, 1);
    }
    this.labForm.patchValue({ labEquipment: selected });
    this.labForm.get('labEquipment')?.markAsTouched();
  }

  onDayChange(event: any) {
    const selected = this.labForm.value.labDays || [];
    if (event.target.checked) {
      selected.push(event.target.value);
    } else {
      const index = selected.indexOf(event.target.value);
      if (index >= 0) selected.splice(index, 1);
    }
    this.labForm.patchValue({ labDays: selected });
    this.labForm.get('labDays')?.markAsTouched();
  }

  onSubmit() {
    if (this.labForm.valid) {
      this.labForm.get('labId')?.enable();
  
      const payload = {
        labName: this.labForm.value.labName,
        branchId: this.labForm.value.branchId,
        numberOfSeats: Number(this.labForm.value.numberOfSeats),
        labEquipment: this.labForm.value.labEquipment.join(','),
        operationalDays: this.labForm.value.labDays.join(','),
        startTime: this.labForm.value.startTime ,
        endTime: this.labForm.value.endTime,
        labManagerId: this.labForm.value.labManagerId,
        status: this.labForm.value.status === 'Active',
        isDeleted: false
      };
  
      this.labForm.get('labId')?.disable();
  
      console.log('Submitting:', payload);
  
      this.labservice.saveLab({ model: payload }).subscribe({
        next: (response) => {
          console.log('Lab saved successfully', response);
          this.notificationService.success('Lab saved successfully!');
          this.labForm.reset({ status: 'Active' }); // optional: reset with default status
        },
        error: (err) => {
          console.error('Save failed', err);
          this.toastr.error('Failed to save lab. Please try again.', 'Error');
        }
      });
    } else {
      this.toastr.warning('Please complete the form correctly.', 'Validation');
    }
  }
  
  

  
}