import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CountRole } from '../../../models/charts/CountRole';
import { CountSexe } from '../../../models/charts/CountSexe';
import { CountType } from '../../../models/charts/CountType';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-role-chart',
  templateUrl: './role-chart.component.html',
  styleUrl: './role-chart.component.css'
})
export class RoleChartComponent implements OnInit {
  roleChart: any;
  sexeChart: any;
  countTypes: CountType[] = [];
  countRoles: CountRole[] = [];
  countSexe: CountSexe[] = [];

  constructor(private congeService: DashboardService) { }

  ngOnInit(): void {
    this.fetchData();
    this.fetchRoleData();
    this.fetchSexeData();
  }

  fetchData(): void {
    this.congeService.getPercentageGroupByType()
      .subscribe(data => {
        this.countTypes = data;
        console.log('Type data:', this.countTypes);
        this.renderChart();
      });
  }

  fetchRoleData(): void {
    this.congeService.getCountByRole()
      .subscribe(data => {

        this.countRoles = data.filter(countRole => countRole.type !== 'ADMIN');
        console.log('Role data:', this.countRoles);
        this.renderRoleChart();
      });
  }

  fetchSexeData(): void {
    this.congeService.getPercentageGroupBySexe()
      .subscribe(data => {
        this.countSexe = data;
        console.log('Sexe data:', this.countSexe);
        this.renderSexeChart();
      });
  }

  renderChart(): void {
    Chart.register(...registerables);

    const canvas = document.getElementById('typeCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.roleChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.countTypes.map(countType => countType.type),
          datasets: [{
            label: 'Count by Type',
            data: this.countTypes.map(countType => countType.count),
            backgroundColor: [
              'rgba(153, 102, 255, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(75, 192, 192, 0.6)'
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
      console.error('Failed to acquire context from the type canvas element.');
    }
  }

  renderRoleChart(): void {
    Chart.register(...registerables);

    const roleCanvas = document.getElementById('roleCanvas') as HTMLCanvasElement;
    const roleCtx = roleCanvas.getContext('2d');

    if (roleCtx) {
      this.roleChart = new Chart(roleCtx, {
        type: 'line', // Change type to line
        data: {
          labels: this.countRoles.map(countRole => countRole.type),
          datasets: [{
            label: 'Count by Role',
            data: this.countRoles.map(countRole => countRole.count),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
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
      console.error('Failed to acquire context from the role canvas element.');
    }
  }

  renderSexeChart(): void {
    Chart.register(...registerables);

    const sexeCanvas = document.getElementById('sexeCanvas') as HTMLCanvasElement;
    const sexeCtx = sexeCanvas.getContext('2d');

    if (sexeCtx) {
      this.sexeChart = new Chart(sexeCtx, {
        type: 'pie',
        data: {
          labels: this.countSexe.map(countSexe => countSexe.sexe),
          datasets: [{
            label: 'Count by Sexe',
            data: this.countSexe.map(countSexe => countSexe.count),
            backgroundColor: [
              'rgba(153, 102, 255, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(75, 192, 192, 0.6)'
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
      console.error('Failed to acquire context from the sexe canvas element.');
    }
  }
}
