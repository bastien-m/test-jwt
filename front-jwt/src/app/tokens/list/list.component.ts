import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewComponent } from '../new/new.component';
import { InfoService } from 'app/shared/services/info.service';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'fjwt-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  constructor(private dialog: MatDialog, private infoService: InfoService) { }

  ngOnInit() {
  }

  addToken() {
    const dialogRef = this.dialog.open(NewComponent, {
      width: '300px'
    })

    dialogRef.afterClosed().subscribe((response) => {
      if (response && response.action) {
        this.table.dataSource.refresh.next(true);
        this.infoService.showInfo('Token has been added');
      } else {
        this.infoService.showInfo(response.err);
      }
    },
    err => this.infoService.showInfo('An error occured while trying to add new token'))
  }

}
