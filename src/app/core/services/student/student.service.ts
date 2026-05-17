import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly httpClient = inject(HttpClient);


  getDetails(id:number):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `Event/Details/${id}`)
  }
 

  AddStudent(eventId: number, studentId: number):Observable<any> {
  const body = {
    eventStudent: [
      {
        eventId: eventId,
        studentId: studentId,
      },
    ],
  };

    return this.httpClient.post(environment.baseUrl + 'Event/AddStudentToEvent',body,{})
  }

DeleteStudent(eventStudentId: number): Observable<any> {
  const body = {
    eventStudent: [
      { id: eventStudentId }
    ]
  };
  return this.httpClient.post(
    `${environment.baseUrl}Event/DeleteStudentToEvent`,
    body
  );
}


downloadExcel(): Observable<Blob> {
  return this.httpClient.post(
    environment.baseUrl + 'Attendance/GetAllAttendancesByFilters',
    {}, // مفيش body
    { responseType: 'blob' }
  );
}

  
}
