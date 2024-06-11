import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CountType } from '../../../models/charts/CountType';
import { UserService } from '../../../services/profile/user.service';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-percongechart',
  templateUrl: './percongechart.component.html',
  styleUrls: ['./percongechart.component.css']
})
export class PercongechartComponent implements OnInit {
  user: any;
  countTypesByType: CountType[] = [];
  countTypesByStatut: CountType[] = [];
  chart1: any;
  chart2: any;
  chart3: any;

  constructor(private profileService: UserService, private dataService: DashboardService) {}

  ngOnInit(): void {
    this.profileService.getUserId().subscribe(
      (userId: number) => {
        this.loadUserDetails(userId);
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  loadUserDetails(userId: number): void {
    this.profileService.getUserProfile().subscribe(
      (user: any) => {
        this.user = user;
        console.log('User details:', this.user);
        this.loadUserCounts(userId);
        this.loadChartData(userId);
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  loadChartData(userId: number): void {
    this.dataService.getPercentageBystatut(userId).subscribe(
      (data: CountType[]) => {
        this.countTypesByStatut = data;
        console.log('Data for Chart 2:', this.countTypesByStatut);
        this.renderChart2();
      },
      (error: any) => {
        console.error('Error fetching data for Chart 2:', error);
      }
    );

    this.dataService.congeBytype(userId).subscribe(
      (data: CountType[]) => {
        this.countTypesByType = data;
        console.log('Data for Chart 3:', this.countTypesByType);
        this.renderChart3();
      },
      (error: any) => {
        console.error('Error fetching data for Chart 3:', error);
      }
    );
  }

  renderChart2(): void {
    Chart.register(...registerables);

    const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const chartData = this.countTypesByStatut.length > 0 ? this.countTypesByStatut[0] : [];

      this.chart2 = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['En Attente', 'Confirmé', 'Refusé'],
          datasets: [{
            label: 'Status',
            data: chartData,
            backgroundColor: [
              'rgba(173, 216, 230, 0.6)',  // LightBlue
              'rgba(135, 206, 250, 0.6)',  // SkyBlue
              'rgba(70, 130, 180, 0.6)'    // SteelBlue
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: {
                  size: 14
                }
              }
            },
            title: {
              display: true,
              text: 'Congé(s) Par Statut',
              font: {
                size: 20,
                weight: 'bold'
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to acquire context from the canvas element for Chart 2.');
    }
  }

  renderChart3(): void {
    Chart.register(...registerables);

    const canvas = document.getElementById('canvas3') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const labels = ['ANNUEL', 'MALADIE', 'EXCEPTIONNEL'];
      const chartData = this.countTypesByType.length > 0 ? this.countTypesByType[0] : [];

      if (this.user && this.user.sexe === 'femme') {
        labels.push('MATERNITE');
      }

      this.chart3 = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Status',
            data: chartData,
            backgroundColor: [
              'rgba(173, 216, 230, 0.6)',  // LightBlue
              'rgba(135, 206, 250, 0.6)',  // SkyBlue
              'rgba(70, 130, 180, 0.6)',   // SteelBlue
              'rgba(0, 0, 255, 0.6)'       // Blue (for MATERNITE)
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: {
                  size: 14
                }
              }
            },
            title: {
              display: true,
              text: 'Congé(s) Par Type',
              font: {
                size: 20,
                weight: 'bold'
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to acquire context from the canvas element for Chart 3.');
    }
  }

  congesCount!: number;
  absencesCount!: number;
  sanctionsCount!: number;
  soldeCount!: number;

  loadUserCounts(userId: number): void {
    this.dataService.getCountCongesByUser(userId).subscribe(
      (count: number) => {
        this.congesCount = count;
      },
      (error) => {
        console.error('Error fetching conges count:', error);
      }
    );

    this.dataService.getCountAbsencesByUser(userId).subscribe(
      (count: number) => {
        this.absencesCount = count;
      },
      (error) => {
        console.error('Error fetching absences count:', error);
      }
    );

    this.dataService.getCountSanctionsByUser(userId).subscribe(
      (count: number) => {
        this.sanctionsCount = count;
      },
      (error) => {
        console.error('Error fetching sanctions count:', error);
      }
    );

    this.dataService.getSoldeByUserId(userId).subscribe(
      (count: number) => {
        this.soldeCount = count;
      },
      (error) => {
        console.error('Error fetching solde count:', error);
      }
    );
  }
}
