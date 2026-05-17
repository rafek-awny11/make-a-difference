import { Student } from './../../models/student.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AllstudentService {

  private readonly httpClient = inject(HttpClient);


  getAllStudent():Observable<any>{
    return this.httpClient.get(environment.baseUrl + 'Student/GetAllStudentsAsync')
  };
  studentCreat(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'Student/Create' , data)  
  }

  StudentDetailsId(id:number):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `Student/StudentDetails/${id}`)
  }
  removeStudentData(id:number):Observable<any>{
    return this.httpClient.post(environment.baseUrl + `Student/Delete/${id}`, {})
  }
  upDateStudent(id:number):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `Student/Update/${id}`)
  }
   update(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'Student/Update' , data)  
  }
  
}
