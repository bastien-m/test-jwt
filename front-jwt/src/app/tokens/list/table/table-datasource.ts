import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { TokenCrudService } from '../../token-crud.service';
import { UserTokenModel } from '../../model/user-token.model';
import { merge, map, switchMap, startWith } from 'rxjs/operators';


/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<UserTokenModel> {

  refresh: Subject<boolean>;

  constructor(private service: TokenCrudService) {
    super();
    this.refresh = new Subject();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserTokenModel[]> {
    return this.refresh.pipe(
      startWith(this.service.list()),
      switchMap(refresh => {
      if (refresh) {
        return this.service.list()
      }
    }));
    // return this.service.list()
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {

  }
}