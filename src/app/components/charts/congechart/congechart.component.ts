import { Component, OnInit } from '@angular/core';
import { CountType } from '../../../models/charts/CountType';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { UserService } from '../../../services/profile/user.service';
import { service } from 'powerbi-client';

@Component({
  selector: 'app-congechart',
  templateUrl: './congechart.component.html',
  styleUrls: ['./congechart.component.css']
})
export class CongechartComponent implements OnInit {
  userProfile: any;
  userId: number | undefined;
  congesByType: CountType[] = [];
  congesByStatut: CountType[] = [];
  submitted: boolean = false;
  typeChart: any;
  statutChart: any;

  constructor(private profileService: UserService, private dataService: DashboardService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data;
        this.userId = this.userProfile.id;
        if (this.userProfile) {
          this.loadCongesByType();
          this.loadCongesByStatut();
          this.loadUserCounts(this.userProfile.service)
        } else {
          console.error('User profile data is not available.');
        }
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  loadCongesByType() {
    if (this.userProfile && this.userProfile.service) {
      const service = this.userProfile.service;
      this.dataService.congeBytypechef(service).subscribe(
        (data: CountType[]) => {
          this.congesByType = data;
          this.drawChartByType();
        },
        (error: any) => {
          console.error('Error fetching conges by type:', error);
        }
      );
    }
  }

  loadCongesByStatut() {
    if (this.userProfile && this.userProfile.service) {
      const service = this.userProfile.service;
      this.dataService.congeBystatutchef(service).subscribe(
        (data: CountType[]) => {
          this.congesByStatut = data;
          this.drawChartByStatut();
        },
        (error: any) => {
          console.error('Error fetching conges by statut:', error);
        }
      );
    }
  }

  drawChartByType() {
    Chart.register(...registerables);

    const canvas = document.getElementById('canvas3') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const labels = ['ANNUEL', 'MALADIE', 'EXCEPTIONNEL'];
      const chartData = this.congesByType.length > 0 ? this.congesByType[0] : [];

      if (this.userProfile && this.userProfile.sexe === 'femme') {
        labels.push('MATERNITE');
      }

      this.typeChart = new Chart(ctx, {
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

  drawChartByStatut() {
    Chart.register(...registerables);

    const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const chartData = this.congesByStatut.length > 0 ? this.congesByStatut[0] : [];

      this.statutChart = new Chart(ctx, {
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




  congesCount!: number;
  absencesCount!: number;


  loadUserCounts(service: string): void {
    this.dataService.getCountCongesBychef(service).subscribe(
      (count: number) => {
        this.congesCount = count;
      },
      (error) => {
        console.error('Error fetching conges count:', error);
      }
    );

    this.dataService.getCountAbsencesBychef(service).subscribe(
      (count: number) => {
        this.absencesCount = count;
      },
      (error) => {
        console.error('Error fetching absences count:', error);
      }
    );

  }
}
