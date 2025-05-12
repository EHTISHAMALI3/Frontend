import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-access-management',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './access-management.component.html',
  styleUrl: './access-management.component.css'
})
export class AccessManagementComponent {

}
