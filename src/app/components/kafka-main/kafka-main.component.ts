import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Produce } from 'src/app/models/produceModel';
import { KafkaService } from 'src/app/services/kafka.service';

@Component({
  selector: 'app-kafka-main',
  templateUrl: './kafka-main.component.html',
  styleUrls: ['./kafka-main.component.css'],
})
export class KafkaMainComponent implements OnInit {
  messageProduceForm: FormGroup;
  messageModule:Produce
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private kafkaService: KafkaService
  ) {}

  ngOnInit(): void {
    this.createMessageProduceForm();
  }

  createMessageProduceForm() {
    this.messageProduceForm = this.formBuilder.group({
      topic: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  produceMessageToKafka() {
    
    if (this.messageProduceForm.valid) {
      this.messageModule = Object.assign({}, this.messageProduceForm.value);
      console.log(this.messageModule)
    for (let i = 0; i < 100; i++) {
      this.kafkaService.sendMessageToKafka(this.messageModule.topic,this.messageModule.message+i).subscribe(response=>{
        this.toastService.success(response.message,"Success")
      })
    }
      
    }
  }
}
