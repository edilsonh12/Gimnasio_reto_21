import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {MatInputModule} from '@angular/material/input';

import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';

import {MatMenuModule} from '@angular/material/menu';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatTableModule} from '@angular/material/table';

import {MatPaginatorModule} from '@angular/material/paginator';

import {MatCheckboxModule} from '@angular/material/checkbox';

import {DragDropModule} from '@angular/cdk/drag-drop';

import {MatStepperModule} from '@angular/material/stepper';

import {MatRadioModule} from '@angular/material/radio';

import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,

    MatCheckboxModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatBadgeModule

  ],
  exports: [
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,

    MatCheckboxModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatTableModule,
    DragDropModule,
    MatStepperModule,
    MatRadioModule,
    MatBadgeModule
  ]
})
export class MaterialModule { }
