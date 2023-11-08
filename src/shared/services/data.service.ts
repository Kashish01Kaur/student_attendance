import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/interfaces/Student';
import { Attendance } from '../models/interfaces/Attendance'
import { API_BASE_URL } from '../constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = `${API_BASE_URL}`;

  constructor(private http: HttpClient) {}

  getStudentList(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/studentDetails`);
  }

  addStudent(student: Student): Observable<any> {
    return this.http.post(`${this.apiUrl}/studentDetails`, student);
  }

  updateStudent(updatedStudent: Student, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/studentDetails/${id}`, updatedStudent);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/studentDetails/${id}`);
  }

  getAttendanceList(studentId: number): Observable<Attendance[]> {
    const apiUrl = `${this.apiUrl}/studentAttendance?studentId=${studentId}`;
    return this.http.get<Attendance[]>(apiUrl);
  }

  addAttendance(attendance: Attendance): Observable<any> {
    return this.http.post(`${this.apiUrl}/studentAttendance`, attendance);
  }
  getAttendanceChart():Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/studentAttendance`);
  }

 
}