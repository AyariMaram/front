import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../services/conge/conge.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: '08:00',
      endTime: '18:00'
    },
    events: [],
  };

  private serviceColors: { [service: string]: string } = {};
  public selectedEvent: any;

  constructor(private chefService: CongeService, private router: Router) { }

  ngOnInit() {
    this.loadConges();
  }

  loadConges() {
    this.chefService.getCongesConfirmes().subscribe({
      next: (conges) => {
        this.calendarOptions.events = this.mapCongesToEvents(conges);
      },
      error: (error) => {
        console.error('Error loading conges:', error);
        // Handle error gracefully
      }
    });
  }

  mapCongesToEvents(conges: any[]): any[] {
    const events: any[] = [];

    conges.forEach((conge) => {
      const service = conge.user.service;
      const matricule = conge.user.matricule;
     

      if (!this.serviceColors[service]) {
        this.serviceColors[service] = this.generateRandomColor();
      }

      events.push({
        title: `Congé - ${matricule} (${service})`,
        start: new Date(conge.date_debut),
        end: new Date(conge.date_fin),
        backgroundColor: this.serviceColors[service],
        extendedProps: {
          conge: conge,
          user: conge.user
        }
      });
    });

    return events;
  }

  generateRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  redirectToHome() {
    this.router.navigate(['/homee']);
  }

  handleEventClick(clickInfo: any) {
    this.selectedEvent = clickInfo.event;
  }

  closeModal() {
    this.selectedEvent = null;
  }
}
