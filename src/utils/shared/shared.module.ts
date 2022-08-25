import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardContainerComponent } from './card-container/card-container.component';
import { RouterModule } from '@angular/router';


@NgModule({
  exports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CardContainerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  declarations: [
    CardContainerComponent
  ],
})
export class SharedModule { }
