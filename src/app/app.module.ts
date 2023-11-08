import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './features/add-student/add-student.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MarkAttendanceComponent } from './features/mark-attendance/mark-attendance.component';
import { HomeComponent } from './layout/home/home.component';
import { SharedModule } from 'src/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceComponent } from './features/attendance/attendance.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SidebarComponent } from 'src/shared/components/sidebar/sidebar.component';
import { ChartsComponent } from './features/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    DashboardComponent,
    MarkAttendanceComponent,
    HomeComponent,
    AttendanceComponent,
    SidebarComponent,
    ChartsComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  exports:[ BrowserModule,
    AppRoutingModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
