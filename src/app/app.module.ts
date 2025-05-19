import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { BookingPageComponent } from './user/booking-page/booking-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MybookingsComponent } from './user/mybookings/mybookings.component';
import { AppRoutingModule } from './app-routing.module';


import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminReservationListComponent } from './admin/reservation-list/reservation-list.component';
import { AdminPendingRequestComponent } from './admin/pending-request/pending-request.component';
import { AdminReportComponent } from './admin/report/report.component';
import { GuestHouseMasterComponent } from './admin/guest-house-master/guest-house-master.component';
import { HomeComponent } from './home/home.component';
import { AdminNavComponent } from './shared/admin-nav/admin-nav.component';
import { UserNavComponent } from './shared/user-nav/user-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingPageComponent,
    MybookingsComponent,
    AdminDashboardComponent,
    AdminReservationListComponent,
    AdminPendingRequestComponent,
    AdminReportComponent,
    GuestHouseMasterComponent,
    HomeComponent,
    AdminNavComponent,
    UserNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatOptionModule,
    MatPaginatorModule,
    MatStepperModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSortModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
