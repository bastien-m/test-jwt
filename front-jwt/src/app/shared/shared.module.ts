import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LengthPipe } from './pipes/length.pipe';
import { MatSnackBarModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LengthPipe
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [
    LengthPipe,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
