import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-browser-list',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './browser-list.component.html',
  styleUrl: './browser-list.component.css'
})
export class BrowserListComponent implements OnInit {
  institutions = [
    { id: '1', name: 'Institute A', status: 'Active', isEditable: false },
    { id: '2', name: 'Institute B', status: 'Inactive', isEditable: false },
  ];
  branches = [
    { id: '1', name: 'Branch A', institution: 'Institute A', status: 'Active', isEditable: false },
    { id: '2', name: 'Branch B', institution: 'Institute B', status: 'Inactive', isEditable: false },
  ];
  labs = [
    { id: '1', name: 'Lab A', branch: 'Branch A', status: 'Active', isEditable: false },
    { id: '2', name: 'Lab B', branch: 'Branch B', status: 'Inactive', isEditable: false },
  ];

  toggleStatus(entity: any) {
    entity.status = entity.status === 'Active' ? 'Inactive' : 'Active';
  }

  edit(entity: any, type: string) {
    entity.isEditable = true;
  }

  saveChanges(entity: any) {
    entity.isEditable = false;
    // You can call a service here to save changes to the backend
    console.log(`${entity.id} changes saved!`);
  }
  ngOnInit(): void {
    
  }
  delete(entity: any, list: any[]) {
    const index = list.indexOf(entity);
    if (index > -1) {
      list.splice(index, 1);
    }
    console.log(`${entity.id} deleted!`);
  }
}