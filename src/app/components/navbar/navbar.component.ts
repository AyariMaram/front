import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/profile/user.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Notification } from '../../models/Notification';
import { Personnel } from '../../models/Personnel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  personnel: Personnel = new Personnel();
  dropdownOpen: boolean = false;
  userProfile: any = null;
  selectedNotification: any;


  notifications: Notification[] = [];
  user: Personnel | undefined;
  loggedInUserId: number | undefined;
  interval: any;




  constructor( private router: Router, private httpClient: HttpClient,private profile:UserService
    ,private renderer: Renderer2,private cookieService: CookieService , private notificationService: NotificationService,private elementRef: ElementRef){




  }



  ngOnInit(): void {

    this.profile.getUserProfile().subscribe(
      (data: Personnel) => {
        this.userProfile = data;
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );

    this.profile.getUserProfile().subscribe(
      (data: Personnel) => {
        this.user = data;
        this.loggedInUserId = this.user.id;
        this.afficherNotifications();
        this.startRefreshInterval();
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
    this.checkWindowSize();
  }









    private url = "http://localhost:8080/logout";

    userLogout(personnel: Personnel): Observable<Personnel> {
      return this.httpClient.post<Personnel>(this.url, personnel);
    }

    onLogout() {!
      this.userLogout(this.personnel).subscribe(
        () => {
          console.log('Logged out successfully!');

          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Logout failed:', error);
        }
      );
      }


  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }


      //notification
      showNotification: boolean = false;

      toggleNotification() {
        this.showNotification = !this.showNotification;
        this.dropdownOpen = false;

      }






      ngOnDestroy(): void {
        this.clearRefreshInterval();
      }

      unreadNotification: number = 0;

      private afficherNotifications() {
        if (this.loggedInUserId) {
          this.notificationService.affichernotifications()
            .subscribe(notifications => {
              this.notifications = notifications.filter(notification => notification.recipient_id === this.loggedInUserId);
              this.unreadNotification= this.notifications.filter(notification => notification.lu === 0).length;
            });
        } else {
          this.notifications = [];
        }
      }


      public showNotificationContent(notification: Notification): void {
        if (!notification.clicked) {
          notification.clicked = true;
          this.notificationService.markNotificationAsRead(notification.id)
            .subscribe(() => {
              console.log('Notification marked as read successfully');
              this.selectedNotification = notification;
              window.location.reload();

            }, error => {
              console.error('Failed to mark notification as read:', error);
              window.location.reload();

            });
        } else {
        }
      }





      private startRefreshInterval(): void {
        this.interval = setInterval(() => {
          this.afficherNotifications();
        }, 1000);
      }

      private clearRefreshInterval(): void {
        clearInterval(this.interval);
      }





      deleteNotification(notification: Notification): void {
        this.notificationService.supprimerNot(notification.id).subscribe(() => {
          this.notifications = this.notifications.filter(n => n !== notification);

        });
      }

      unreadNotificationCount: number = 0;

      getUnreadNotificationCount(): number {
        this.unreadNotificationCount  = this.notifications.filter(notification => !notification.clicked).length;
        return   this.unreadNotificationCount;
      }


      readNotificationCount: number = 0;



totalUnreadNotificationCount: number = 0;












      @HostListener('document:click', ['$event'])
      onClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;

        if (!this.elementRef.nativeElement.contains(target)) {
          this.dropdownOpen = false;
        }
      }







      //
      afficherNotification(){
        this.router.navigate(['/notification']);

      }




      disableMenuClick: boolean = false;

      checkWindowSize(): void {
        this.disableMenuClick = window.innerWidth < 768;
      }

      @HostListener('window:resize', ['$event'])
      onResize(event: any): void {
        this.checkWindowSize();
      }

    }