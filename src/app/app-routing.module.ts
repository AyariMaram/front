import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AboutComponent } from './Acceuil/about/about.component';
import { ContactComponent } from './Acceuil/contact/contact.component';
import { FooterComponent } from './Acceuil/footer/footer.component';
import { HeaderComponent } from './Acceuil/header/header.component';
import { NavigationComponent } from './Acceuil/navigation/navigation.component';
import { HomeeComponent } from './components/homee/homee.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GererUsersComponent } from './components/interface_admin/gerer-users/gerer-users.component';
import { AfficherchefsComponent } from './components/interface_admin/afficherusers/afficherchefs/afficherchefs.component';
import { AfficheremployesComponent } from './components/interface_admin/afficherusers/afficheremployes/afficheremployes.component';
import { ModifieruserComponent } from './components/interface_admin/modifieruser/modifieruser.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { AffichercongesComponent } from './components/interface_chef/afficherconges/afficherconges.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MesemployesComponent } from './components/interface_chef/mesemployes/mesemployes.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MescongesComponent } from './components/interface_employe/mesconges/mesconges.component';
import { DemandeCongeComponent } from './components/interface_employe/demande-conge/demande-conge.component';
import { ChangermdpComponent } from './components/changermdp/changermdp.component';

import { AbsencesComponent } from './components/interface_chef/absences/absences.component';
import { LayoutComponent } from './components/layout/layout.component';



const routes: Routes = [
{path: 'details/:id', component:  PersonnelDetailsComponent },
{path: 'auth/login', component: LoginComponent},
{path: 'auth/logout', component: LogoutComponent},
{path: 'password', component: ChangePasswordComponent},
{path: 'mail/forgot-password', component: ForgotPasswordComponent},
{path: 'mail/set-password' , component: SetPasswordComponent},
{path: 'conge/demandeconge' , component: DemandeCongeComponent},
{path: 'home' , component: HomeComponent},
{path: 'about' , component: AboutComponent},
{path: 'contact' , component: ContactComponent},
{path: 'footer' , component: FooterComponent},
{path: 'header' , component: HeaderComponent},
{path: 'navigation' , component: NavigationComponent},
{path: 'auth/profile' , component: ProfileComponent},











{path: 'homee' , component: HomeeComponent},
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{path:'admin/gererusers',component:GererUsersComponent},
{ path:"admin/afficherchefs",component:AfficherchefsComponent},
{path:"admin/afficheremployes",component:AfficheremployesComponent},
{path:"admin/afficheruser/:id",component:ModifieruserComponent},
{path:"parametre",component:ParametresComponent},
{ path:"conge/afficherconges",component:AffichercongesComponent},
{ path:'archive',component:ArchiveComponent},
{ path:"notifications",component:NotificationsComponent},
{ path:"notification/:id",component:NotificationComponent},
{ path:"mesemployes",component:MesemployesComponent},
{path:"calendrier",component:CalendarComponent},
{path:"mesconges",component:MescongesComponent},
{path:"parametre/changermdp", component:ChangermdpComponent},
{path:"absences", component:AbsencesComponent},{path:"personnels/accounts",component: AccountsComponent},
{path:"chef-accounts",component: ChefAccountsComponent},
{path:"employee-accounts",component: EmployeeAccountsComponent},
{path:'',redirectTo:'home',pathMatch:'full'},
{path: "modifier/:id", component: ModifierPersonnelComponent },
{path: 'details/:id', component:  PersonnelDetailsComponent },
{path: 'auth/login', component: LoginComponent},
{path: 'auth/logout', component: LogoutComponent},
{path: 'password', component: ChangePasswordComponent},
{path: 'mail/forgot-password', component: ForgotPasswordComponent},
{path: 'mail/set-password' , component: SetPasswordComponent},
{path: 'conge/demandeconge' , component: DemandeCongeComponent},

{
  path: '',
  component: LayoutComponent,
  children: [

  ],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
