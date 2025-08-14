import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DynamicDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog<T>(component: any, data?: T): MatDialogRef<any> {
    return this.dialog.open(component, {
      width: '500px',
      data: data || {}
    });
  }
}
