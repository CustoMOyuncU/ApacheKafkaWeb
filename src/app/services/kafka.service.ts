import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class KafkaService {
  private apiUrl=environment.apiUrl+"messages/"
  constructor(private httpClient:HttpClient) { }

  sendMessageToKafka(topic:string,message:string):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"sendmessage",{topic,message})
  }

}
