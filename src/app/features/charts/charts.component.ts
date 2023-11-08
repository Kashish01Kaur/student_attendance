import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/shared/services/data.service';
import { Attendance } from 'src/shared/models/interfaces/Attendance';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements AfterViewInit {
  studentAttendance: Attendance[] = [];

  constructor(private dataService: DataService) { }

  ngAfterViewInit() {
    this.dataService.getAttendanceChart().subscribe(attendanceData => {
      this.studentAttendance = attendanceData;
  
      // Count the number of students present each day
      const countMap = new Map();
      this.studentAttendance.forEach(a => {
        if (a.status === 'Present') {
          try {
            const [day, month, year] = a.date!.split('/');
            const dateStr = `${year}-${month}-${day}`;
            if (countMap.has(dateStr)) {
              countMap.set(dateStr, countMap.get(dateStr) + 1);
            } else {
              countMap.set(dateStr, 1);
            }
          } catch (error) {
            console.error(`Invalid date format for ${a.date}`);
          }
        }
      });
  
      // Convert date and count values to arrays for chart.js
      const labels = Array.from(countMap.keys());
      const data = Array.from(countMap.values());
  
      // Get the canvas element
      const canvas: any = document.getElementById('myChart');
      const ctx = canvas.getContext('2d');
  
      // Create chart
      let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Attendance',
            data: data,
            backgroundColor: 'rgb(103,58,183)', // purple color
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Dates' // label for x-axis
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'No of students present' // label for y-axis
              },
              ticks: {
                beginAtZero: true,
                stepSize: 2,
                suggestedMax: Math.ceil(Math.max(...data) / 2) * 2,
              }
            }]
          }
        }
      });
    });
  }
}