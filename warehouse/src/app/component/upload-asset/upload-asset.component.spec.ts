import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAssetComponent } from './upload-asset.component';

describe('UploadAssetComponent', () => {
  let component: UploadAssetComponent;
  let fixture: ComponentFixture<UploadAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
