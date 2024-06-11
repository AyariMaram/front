import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/profile/user.service';
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent  implements OnInit{


 userProfile: any = null;
 userId: number | undefined;
  constructor(  private router: Router,private userService:UserService,private dashboardService: DashboardService) {}
  ngOnInit(): void {




      this.userService.getUserProfile().subscribe(
        (data: any) => {
          this.userProfile = data;
          this.userId = this.userProfile.id;
        },
        (error: any) => {
          console.error('Error fetching user profile:', error);
        }
      );

    }

  redirectToHome() {
    this.router.navigate(['/homee']);
  }


























 




}

