import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/profile/user.service';
import { Personnel } from '../../models/Personnel';
import { Notification } from '../../models/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notifications: Notification[] = [];
  loggedInUserId: number | undefined;
  user: Personnel | undefined;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private profile: UserService
  ) {}

  ngOnInit(): void {
    this.profile.getUserProfile().subscribe(
      (data: Personnel) => {
        this.user = data;
        this.loggedInUserId = this.user.id;
        this.afficherNotifications();
      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  private afficherNotifications() {
    if (this.loggedInUserId) {
      this.notificationService.affichernotifications().subscribe(notifications => {
        this.notifications = notifications
          .filter(notification => notification.recipient_id === this.loggedInUserId)
          .sort((a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime());
      });
    } else {
      this.notifications = [];
    }
  }

  redirectToHome() {
    this.router.navigate(['/homee']);
  }

  deleteNotification(notification: Notification): void {
    this.notificationService.supprimerNot(notification.id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n !== notification);
    });
  }
}
