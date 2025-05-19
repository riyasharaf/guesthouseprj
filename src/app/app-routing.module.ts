import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingPageComponent } from './user/booking-page/booking-page.component';
import { MybookingsComponent } from './user/mybookings/mybookings.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminReservationListComponent } from './admin/reservation-list/reservation-list.component';
import { AdminPendingRequestComponent } from './admin/pending-request/pending-request.component';
import { AdminReportComponent } from './admin/report/report.component';
import { GuestHouseMasterComponent } from './admin/guest-house-master/guest-house-master.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  

  { path: 'booking', component: BookingPageComponent },
  { path: 'my-bookings', component: MybookingsComponent },
  

  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/reservation-list', component: AdminReservationListComponent },
  { path: 'admin/pending-request', component: AdminPendingRequestComponent },
  { path: 'admin/guest-house-master', component: GuestHouseMasterComponent },
  { path: 'admin/report', component: AdminReportComponent },
  
 
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


