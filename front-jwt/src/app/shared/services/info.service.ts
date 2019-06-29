import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Injectable({
    providedIn: 'root'
})
export class InfoService {
    constructor(private snackbar: MatSnackBar) {}

    showInfo(message: string) {
        this.snackbar.open(message, null, { duration: 5000 });
    }
}