import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produce } from '../models/produceModel';
import { ResponseModel } from '../models/responseModel';
import { Topic } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class KafkaService {
  private apiUrl=environment.apiUrl+"messages/"
  constructor(private httpClient:HttpClient) { }

  sendMessageToKafka(produce:Produce):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"sendmessage",produce)
  }

  sendMessagesToKafka(produce:Produce):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"sendmessages",produce)
  }

  createTopicOnKafka(topic:Topic):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"createtopic",topic)
  }

}
