import { Component } from '@angular/core';
import { CountSexe } from '../../../models/charts/CountSexe';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-sexe-chart',
  templateUrl: './sexe-chart.component.html',
  styleUrl: './sexe-chart.component.css'
})
export class SexeChartComponent {
  chart: any;
  countsexe: CountSexe[] = [];

  constructor(private congeService: DashboardService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.congeService.getPercentageGroupBySexe()
      .subscribe(data => {
        this.countsexe = data;
        console.log('Percentage data:', this.countsexe);
        this.renderChart();
      });
  }

  renderChart(): void {
    Chart.register(...registerables);

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'pie', // Change chart type to pie
        data: {
          labels: this.countsexe.map(countType => countType.sexe),
          datasets: [{
            label: 'Count by Type',
            data: this.countsexe.map(countType => countType.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)'
            ]
          }]
        },
        options: {
          responsive: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          }
        }
      });
    } else {
      console.error('Failed to acquire context from the canvas element.');
    }
  }
}
