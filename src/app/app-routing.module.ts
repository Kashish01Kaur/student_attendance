import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddStudentComponent } from './features/add-student/add-student.component';
import { MarkAttendanceComponent } from './features/mark-attendance/mark-attendance.component';
import { AttendanceComponent } from './features/attendance/attendance.component';
import { ChartsComponent } from './features/charts/charts.component';
import { HomeComponent } from './layout/home/home.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-student', component: AddStudentComponent },

  { path: 'mark-attendance', component: MarkAttendanceComponent },
  { path: 'attendance/:id/:name', component: AttendanceComponent }, // new route for AttendanceComponent
  { path: 'charts', component: ChartsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // default route to HomeComponent
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }