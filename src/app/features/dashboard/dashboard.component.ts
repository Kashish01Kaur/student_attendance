import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from 'src/shared/models/interfaces/Student';
import { Attendance } from 'src/shared/models/interfaces/Attendance';
import { DataService } from 'src/shared/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';

function requiredIfNotEmpty(control: FormControl): { [s: string]: boolean } | null {
  if (control.value && control.value.trim().length === 0) {
    return { required: true };
  }
  return null;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MatPaginator]
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'action'];
  dataSource: MatTableDataSource<Student>;
  studentForm: FormGroup = new FormGroup({});

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input', { static: false }) filter!: ElementRef;

  students: Student[] = [];
  selectedStudent: Student | null = null;
  attendanceRecords: Attendance[] = [];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private dataService: DataService, private router: Router, private matPaginatorIntl: MatPaginatorIntl) {
    this.dataSource = new MatTableDataSource(this.students);
    this.matPaginatorIntl.itemsPerPageLabel = 'Students per page:';
    this.matPaginatorIntl.getRangeLabel = this.customRangeLabel;
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [requiredIfNotEmpty, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
    
    this.dataSource.sort = this.sort; 
    this.getStudentList();
  }

  
  getStudentList(): void {
    this.dataService.getStudentList().subscribe(students => {
      this.students = students;
      this.dataSource.data = this.students;
      this.dataSource.paginator = this.paginator; // set the paginator to the data source
      this.paginator.length = this.dataSource.filteredData.length; // set the length to the number of visible items
    });
  }

  applyFilter(): void {
    const filterValue = this.filter.nativeElement.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 

  viewAttendance(selectedStudent: Student): void {
    this.router.navigate(['/attendance', selectedStudent.id, selectedStudent.name]);
  }

  deleteStudent(student: Student): void {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      this.dataService.deleteStudent(student.id).subscribe(() => {
        this.snackBar.open('Student deleted successfully', 'Close', { duration: 2000 });
        this.students = this.students.filter(s => s.id !== student.id);
        this.dataSource.data = [...this.students];
        this.paginator.length = this.dataSource.filteredData.length; // update paginator length after deleting student
      });
    }
  }
  //!
  editStudent(student: Student): void {
    this.selectedStudent = student;

    if (this.selectedStudent) {
      this.studentForm.setValue({
        id: this.selectedStudent.id,
        name: this.selectedStudent.name,
        email: this.selectedStudent.email || '',
        phone: this.selectedStudent.phone
      });
    }
  }
  saveStudent(): void {
    if (this.studentForm.invalid) {
      this.snackBar.open('Please correct the errors in the form', 'Close', { duration: 2000 });
      return;
    }

    const updatedStudent: Student = this.studentForm.value;
    const studentIndex = this.students.findIndex(s => s.id === updatedStudent.id);

    if (this.selectedStudent) {
      this.dataService.updateStudent(updatedStudent, this.selectedStudent.id).subscribe(() => {
        this.snackBar.open('Student updated successfully', 'Close', { duration: 2000 });
        this.students[studentIndex] = updatedStudent;
        this.dataSource.data = [...this.students];
        this.cancel();
      }, error => {
        console.error(error); // log the error message
        this.snackBar.open('Error updating student', 'Close', { duration: 2000 });
      });
    } else {
      // this.dataService.addStudent(updatedStudent).subscribe(() => {
      //   this.snackBar.open('Student added successfully', 'Close', { duration: 2000 });
      //   this.students.push(updatedStudent);
      //   this.dataSource.data = [...this.students];
      //   this.cancel();
      // }, error => {
      //   console.error(error); // log the error message
      //   this.snackBar.open('Error adding student', 'Close', { duration: 2000 });
      // });
    }
    
  }
  
  

  cancel(): void {
    this.selectedStudent = null;
    this.studentForm.reset();
  }
//!
  customRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} of ${length}`;
  }
}