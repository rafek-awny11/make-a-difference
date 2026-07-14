import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { DetailsComponent } from './features/details/details.component';
import { EventComponent } from './features/event/event.component';
import { MeetingComponent } from './features/meeting/meeting.component';
import { BlankLayoutsComponent } from './core/layouts/blank-layouts/blank-layouts.component';
import { StudentComponent } from './features/student/student.component';
import { AttendanceComponent } from './features/attendance/attendance.component';
import { StudentDetailsComponent } from './features/student/student-details/student-details.component';
import { UpdateComponent } from './features/student/update/update.component';
import { CreateMeetingComponent } from './features/meeting/create-meeting/create-meeting/create-meeting.component';
import { DetailsMeetingComponent } from './features/meeting/details-meeting/details-meeting/details-meeting.component';
import { UpdateMeetingComponent } from './features/meeting/update-meeting/update-meeting/update-meeting.component';
import { DetailsAttendanceComponent } from './features/attendance/details.attendance/details-attendance/details-attendance.component';
import { ShowDetailsComponent } from './features/attendance/show-details/show-details/show-details.component';
import { MainLayoutsComponent } from './core/layouts/main-layouts/main-layouts.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';

export const routes: Routes = [
    {path: '' , redirectTo: 'home' , pathMatch: 'full'},
    {path: '', component:MainLayoutsComponent,canActivate:[isLoggedGuard], children:[
        {path:'login', component:LoginComponent,title: 'Login'},
        {path:'register', component:RegisterComponent,title:'Register'},
        
    ]},
    {path: '' , component:BlankLayoutsComponent , canActivate:[authGuard], children:[
    {path: 'home' , component:HomeComponent, title: 'Make A Difference Mission' },
    {path: 'student' , component:StudentComponent, title:'Make A Difference Mission'},
    {path: 'studentDetails/:slug /:id' , component:StudentDetailsComponent , title:'Make A Difference Mission'},
    {path: 'studentDetails/:id' , component:StudentDetailsComponent , title:'Make A Difference Mission'},
    {path: 'update/:slug /:id' , component:UpdateComponent , title:'Make A Difference Mission'},
    {path: 'update/:id' , component:UpdateComponent , title:'Make A Difference Mission'},

    {path: 'attendance' , component:AttendanceComponent, title:'Make A Difference Mission'},
        {path: 'show-details' , component:ShowDetailsComponent, title:'Make A Difference Mission'},
        {path: 'show-details/:slug /:id' , component:ShowDetailsComponent, title:'Make A Difference Mission'},

    {path: 'details-attendance' , component:DetailsAttendanceComponent, title:'Make A Difference Mission'},
    {path: 'event' , component:EventComponent, title: 'Event'},
    {path: 'meeting' , component:MeetingComponent, title: 'Make A Difference Mission'},
    {path: 'create-meeting' , component:CreateMeetingComponent, title: 'Make A Difference Mission'},
    {path: 'update-meeting/:slug /:id' , component:UpdateMeetingComponent, title: 'Make A Difference Mission'},
    {path: 'update-meeting/:id' , component:UpdateMeetingComponent, title: 'Make A Difference Mission'},


    {path: 'details-meeting/:slug /:id' , component:DetailsMeetingComponent, title: 'Make A Difference Mission'},
    {path: 'details-meeting/:id' , component:DetailsMeetingComponent, title: 'Make A Difference Mission'},



    {path: 'details/:slug/:id' , component:DetailsComponent, title: 'Make A Difference Mission'},
     {path: 'details/:id' , component:DetailsComponent, title: 'Make A Difference Mission'},
    
    ]},
    {path: '**' , component:NotfoundComponent, title:'NotFound Page' },
];
