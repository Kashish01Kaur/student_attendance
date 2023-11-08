import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from 'src/shared/models/interfaces/Attendance';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  displayedColumns: string[] = ['date', 'status'];
  dataSource!: MatTableDataSource<Attendance>;
  studentId!: number;
  studentName!: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentName = this.route.snapshot.paramMap.get('name')!;

    this.dataService.getAttendanceList(this.studentId).subscribe((attendanceData) => {
      this.dataSource = new MatTableDataSource<Attendance>(attendanceData);
    });
  }

  goBack(): void {
    window.history.back();
  }
}