import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Personnel } from '../../models/Personnel';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/profile/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  personnel: Personnel = new Personnel();
  userId: number | undefined;
  userProfile: any = null;
  userRole: string | undefined; 

  constructor(private router: Router, private httpClient: HttpClient, private profileService: UserService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });

    this.profileService.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data;
        this.userId = this.userProfile.id;
        this.userRole = this.userProfile.role; 
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}


