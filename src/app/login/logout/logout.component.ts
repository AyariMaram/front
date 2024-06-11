import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../../services/logout/logout.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personnel } from '../../models/Personnel';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  personnel: Personnel = new Personnel();

constructor(private logoutService: LogoutService, private router: Router, private httpClient: HttpClient){}
  ngOnInit(): void {
  }
  private url = "http://localhost:8080/logout";

  userLogout(personnel: Personnel): Observable<Personnel> {
    return this.httpClient.post<Personnel>(this.url, personnel); // Send POST request to logout endpoint
  }

  onLogout() {!
    this.userLogout(this.personnel).subscribe(
      () => {
        console.log('Logged out successfully!');
        // Clear token from local storage
        localStorage.removeItem('token');
        // Redirect to login page or any other page as needed
        this.router.navigate(['/auth/login']);
      },
      error => {
        console.error('Logout failed:', error);
        // Handle logout error
      }
    );
    }
}
