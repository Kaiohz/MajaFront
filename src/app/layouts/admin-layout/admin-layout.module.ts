import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { DialogComponent, UserProfileComponent } from '../../withdrawal/user-profile.component';
import { TypographyComponent } from '../../news/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NiceHashService } from 'app/services/nicehash.service';
import { BddService } from 'app/services/bdd.service';
import { MaterialModule } from 'app/material-module';
import { RigsComponent } from 'app/rigs/rigs.component';
import { StatisticsComponent } from 'app/statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TypographyComponent,
    DialogComponent,
    IconsComponent,
    RigsComponent,
    StatisticsComponent
  ],
  providers: [NiceHashService, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminLayoutModule {}
