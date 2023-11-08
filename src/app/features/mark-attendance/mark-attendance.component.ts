import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/shared/models/interfaces/Student';
import { DataService } from 'src/shared/services/data.service';
import { Attendance } from 'src/shared/models/interfaces/Attendance';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss']
})
export class MarkAttendanceComponent implements OnInit {

  // Properties
  students: Student[] = [];
  attendanceForm: FormGroup;

  // Constructor
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.attendanceForm = this.fb.group({
      selectedStudent: [null, Validators.required],
      date: ['', Validators.required],
      status: [null, Validators.required]
    });
  }

  // Initialization
  ngOnInit(): void {
    this.dataService.getStudentList().subscribe((students) => {
      this.students = students;
    });
  }

  // Event handlers
  onSelect(): void {
    if (this.attendanceForm) {
      this.attendanceForm.patchValue({
        selectedStudent: this.attendanceForm.get('selectedStudent')?.value
      });
    }
  }

  setAttendance(status: string): void {
    this.attendanceForm.get('status')?.setValue(status);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const {selectedStudent, date, status} = this.attendanceForm.value;

    if (selectedStudent) {
      // Create a new instance of Attendance
      const attendance: Attendance = {
        studentId: selectedStudent.id,
        name: selectedStudent.name,
        date,
        status
      };
    
      // Call the addAttendance() method of the DataService to add it to the API
      this.dataService.addAttendance(attendance).subscribe(() => {
        // Reset the form and show an alert to confirm the attendance has been marked
        console.log('Attendance record added: ', attendance);
        this.attendanceForm.reset();
        alert('Attendance has been marked for ' + selectedStudent.name);
      });

    }
  }
}