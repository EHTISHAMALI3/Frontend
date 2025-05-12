import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bulk-users-import',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bulk-users-import.component.html',
  styleUrl: './bulk-users-import.component.css'
})
export class BulkUsersImportComponent {

}
