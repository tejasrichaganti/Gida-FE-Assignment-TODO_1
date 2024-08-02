import { NgModule } from '@angular/core';
import { ChecklistComponent } from './checklist.component';
import { CheckListRoutingModule } from './checklist-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CheckListRoutingModule,FormsModule,CommonModule
  ],
  declarations: [ChecklistComponent]
})
export class CheckListModule {}
