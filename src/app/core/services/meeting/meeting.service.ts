import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {

  private readonly httpClient = inject(HttpClient);

  getAllMeeting():Observable<any>{
    return this.httpClient.get(environment.baseUrl + 'Meeting/GetAllMeetingsAsync')
  }

  meetingDetails():Observable<any>{
    return this.httpClient.get(environment.baseUrl + 'Meeting/MeetingDetails')

  }
  meetingCreat(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'Meeting/Create',data)
  }

  detailsMeeting(id:number):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `Meeting/MeetingDetails/${id}`)
  }
  updateDate(id:number):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `Meeting/Update/${id}`,{})
  }
  updateAll(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'Meeting/Update',data)
  }
  removeMeeting(id:number):Observable<any>{
    return this.httpClient.post(environment.baseUrl +`/Meeting/Delete/${id}`,{})
  }
  
}
