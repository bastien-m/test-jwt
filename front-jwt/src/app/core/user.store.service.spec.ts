import { TestBed } from '@angular/core/testing';

import { User.StoreService } from './user.store.service';

describe('User.StoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: User.StoreService = TestBed.get(User.StoreService);
    expect(service).toBeTruthy();
  });
});
