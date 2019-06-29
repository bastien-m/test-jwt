import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { TableDataSource } from './table-datasource';
import { TokenCrudService } from '../../token-crud.service';
import { UserTokenModel } from '../../model/user-token.model';
import { InfoService } from 'app/shared/services/info.service';

@Component({
  selector: 'fjwt-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable, {static: false}) table: MatTable<UserTokenModel>;
  dataSource: TableDataSource;

  constructor(
    private tokenService: TokenCrudService,
    private infoService: InfoService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['_id', 'user_id', 'row_created', 'revoke'];

  ngOnInit() {
    this.dataSource = new TableDataSource(this.tokenService);
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
    this.changeDetectorRef.detectChanges()
  }

  revoke(token: UserTokenModel) {
    this.tokenService.delete(token._id).subscribe(
      () => {
        this.dataSource.refresh.next(true)
        this.infoService.showInfo('Token has been deleted')
      },
      (err) => this.infoService.showInfo('Error while deleting token')
    )
  }
}
