import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';

// Components
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminReservationListComponent } from './reservation-list/reservation-list.component';
import { AdminPendingRequestComponent } from './pending-request/pending-request.component';
import { AdminReportComponent } from './report/report.component';
import { GuestHouseMasterComponent } from './guest-house-master/guest-house-master.component';

// Routing
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminNavComponent,
    AdminDashboardComponent,
    AdminReservationListComponent,
    AdminPendingRequestComponent,
    AdminReportComponent,
    GuestHouseMasterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AdminRoutingModule,
    // Material Modules
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule
  ],
  exports: [
    AdminNavComponent
  ]
})
export class AdminModule { } 