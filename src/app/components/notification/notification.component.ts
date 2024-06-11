import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { Notification } from '../../models/Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  selectedNotification: Notification | undefined;
  notification: Notification = new Notification();

  constructor(private notificationService: NotificationService,    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.notificationService.afficherNot(parseInt(id, 10)).subscribe(
        (data: any) => {
          this.selectedNotification = data;
        },
        (error: any) => {
          console.error('Error fetching notification details:', error);
        }
      );
    }
  }
}
