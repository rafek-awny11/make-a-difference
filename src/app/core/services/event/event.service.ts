import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private readonly httpClient = inject(HttpClient);


  getAllEvent():Observable<any>{
    return this.httpClient.get(environment.baseUrl + 'Event/GetAllEventsAsync')
  }


  eventForm(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'Event/Create' , data)
  }

  removeEventId(id:number):Observable<any>{
    return this.httpClient.post(environment.baseUrl + `Event/Delete/${id}`,{})
  }



  
  
  
}
