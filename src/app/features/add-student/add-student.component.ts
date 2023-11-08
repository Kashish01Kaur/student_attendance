import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Student } from 'src/shared/models/interfaces/Student';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})

export class AddStudentComponent implements OnInit {
  addStudentForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private dataService: DataService) { }
  
  ngOnInit(): void {
    this.addStudentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }
  
  onSubmit(): void {
    this.dataService.addStudent(this.addStudentForm.value).subscribe();
    this.addStudentForm.reset();
  }
}