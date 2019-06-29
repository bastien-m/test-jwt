import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokensRoutingModule } from './tokens-routing.module';
import { ListComponent } from './list/list.component';
import { TableComponent } from './list/table/table.component';
import { MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'app/shared/shared.module';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [ListComponent, TableComponent, NewComponent],
  imports: [
    CommonModule,
    SharedModule,
    TokensRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ],
  entryComponents: [NewComponent]
})
export class TokensModule { }
