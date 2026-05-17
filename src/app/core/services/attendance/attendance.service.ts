import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly httpClient =inject(HttpClient);

  getAllAttendance():Observable<any>{
    return this.httpClient.get(environment.baseUrl+ 'Attendance/GetAllAttendancesAsync')
  }

  getStudentData(id:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `Student/GetStudentData/${id}`,{})
  }
  
  creat(data:any):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'Attendance/CreateAttendance' , data )
  }



exportFile(
  eventId: number,
  meetingId?: number,
  studentPhone?: string
): Observable<Blob> {

  let params: any = {};

  if (eventId) {
    params.EventId = eventId;
  }

  if (meetingId) {
    params.MeetingId = meetingId;
  }

  if (studentPhone && studentPhone.trim() !== '') {
    params.StudentPhone = studentPhone;
  }

  return this.httpClient.get(
    environment.baseUrl + 'Attendance/GetAllAttendancesByFilters',
    {
      params,
      responseType: 'blob'
    }
  );
}


}
