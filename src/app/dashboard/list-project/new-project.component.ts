import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SelectComponent } from 'src/app/dashboard/list-project/select.component';
export interface DialogData {
    animal: string;
    name: string;
    selectedAlgorithm:string
}   

@Component({
    selector: 'new-project.dialog',
    templateUrl: 'new-project.dialog.html',
})
export class DialogOverviewExample {

    animal: string;
    name: string;
    selectedValue = 1;

    constructor(public dialog: MatDialog) { }
    
    openDialog(): void {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '450px',
            data: {name: this.name, animal: this.animal, selectedValue: this.selectedValue}
        });
        
        dialogRef.afterClosed().subscribe(result => {
            this.animal = result;
        });
        
    }
}

export class ModalComponent {

    constructor(public dialogRef: MatDialogRef<ModalComponent>, public c:SelectComponent,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}



