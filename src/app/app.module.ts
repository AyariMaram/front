import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifierPersonnelComponent } from './personnel/modifier-personnel/modifier-personnel.component';
import { PersonnelDetailsComponent } from './personnel/personnel-details/personnel-details.component';
import { LoginComponent } from './login/login/login.component';
import { AccountsComponent } from './personnel/accounts/accounts.component';
import { ChefAccountsComponent } from './personnel/chef-accounts/chef-accounts.component';
import { EmployeeAccountsComponent } from './personnel/employee-accounts/employee-accounts.component';
import { LogoutComponent } from './login/logout/logout.component';
import { ChangePasswordComponent } from './personnel/change-password/change-password.component';
import { ForgotPasswordComponent } from './login/password/forgot-password/forgot-password.component';
import { SetPasswordComponent } from './login/password/set-password/set-password.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './Acceuil/navigation/navigation.component';
import { HeaderComponent } from './Acceuil/header/header.component';
import { AboutComponent } from './Acceuil/about/about.component';
import { ContactComponent } from './Acceuil/contact/contact.component';
import { FooterComponent } from './Acceuil/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { ContentComponent } from './components/content/content.component';
import { HomeeComponent } from './components/homee/homee.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { AfficheremployesComponent } from './components/interface_admin/afficherusers/afficheremployes/afficheremployes.component';
import { AfficherchefsComponent } from './components/interface_admin/afficherusers/afficherchefs/afficherchefs.component';
import { AjouteruserComponent } from './components/interface_admin/ajouteruser/ajouteruser.component';
import { GererUsersComponent } from './components/interface_admin/gerer-users/gerer-users.component';
import { ModifieruserComponent } from './components/interface_admin/modifieruser/modifieruser.component';
import { AffichercongesComponent } from './components/interface_chef/afficherconges/afficherconges.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MesemployesComponent } from './components/interface_chef/mesemployes/mesemployes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DemandeCongeComponent } from './components/interface_employe/demande-conge/demande-conge.component';
import { MescongesComponent } from './components/interface_employe/mesconges/mesconges.component';
import en from '@angular/common/locales/en';
import { ChangermdpComponent } from './components/changermdp/changermdp.component';

import { AbsencesComponent } from './components/interface_chef/absences/absences.component';
import { SidebarAdminComponent } from './components/interface_admin/sidebar-admin/sidebar-admin.component';
import { SidebarChefComponent } from './components/interface_chef/sidebar-chef/sidebar-chef.component';
import { SidebarEmployeComponent } from './components/interface_employe/sidebar-employe/sidebar-employe.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CongechartComponent } from './components/charts/congechart/congechart.component';
import { PercongechartComponent } from './components/charts/percongechart/percongechart.component';


registerLocaleData(en);





@NgModule({
  declarations: [
    AppComponent,
    ModifierPersonnelComponent,
    PersonnelDetailsComponent,
    LoginComponent,
    AccountsComponent,
    ChefAccountsComponent,
    EmployeeAccountsComponent,
    LogoutComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
     ContentComponent,
    HomeComponent,
    NavigationComponent,
    HeaderComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    ParametresComponent,
    HomeeComponent,
    ProfileComponent,
    AfficheremployesComponent,
    AfficherchefsComponent,
    AjouteruserComponent,
    GererUsersComponent,
    ModifieruserComponent,
    AffichercongesComponent,
     ArchiveComponent,
    NotificationsComponent,
   NotificationComponent,
   MesemployesComponent,
    CalendarComponent,

DemandeCongeComponent,
     MescongesComponent,

     ChangermdpComponent,

     AbsencesComponent,
       SidebarAdminComponent,
       SidebarChefComponent,
       SidebarEmployeComponent,
LayoutComponent,
CongechartComponent,
PercongechartComponent

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
   CommonModule,
   CalendarModule,
   BrowserAnimationsModule,

   FullCalendarModule,
   BrowserAnimationsModule,
   MatTooltipModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent]

})

export class AppModule { }
