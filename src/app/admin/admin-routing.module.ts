import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminReservationListComponent } from './reservation-list/reservation-list.component';
import { AdminPendingRequestComponent } from './pending-request/pending-request.component';
import { AdminReportComponent } from './report/report.component';
import { GuestHouseMasterComponent } from './guest-house-master/guest-house-master.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'reservation-list', component: AdminReservationListComponent },
  { path: 'pending-request', component: AdminPendingRequestComponent },
  { path: 'guest-house-master', component: GuestHouseMasterComponent },
  { path: 'report', component: AdminReportComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { } 