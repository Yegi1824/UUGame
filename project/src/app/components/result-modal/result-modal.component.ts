import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-result-modal',
  templateUrl: './result-modal.component.html',
  styleUrl: './result-modal.component.scss'
})
export class ResultModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ResultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public oData: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
