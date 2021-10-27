import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Produce } from 'src/app/models/produceModel';
import { Topic } from 'src/app/models/topic';
import { KafkaService } from 'src/app/services/kafka.service';

@Component({
  selector: 'app-kafka-main',
  templateUrl: './kafka-main.component.html',
  styleUrls: ['./kafka-main.component.css'],
})
export class KafkaMainComponent implements OnInit {
  messageProduceForm: FormGroup;
  topicCreateForm: FormGroup;
  messageModule: Produce
  topicModule: Topic
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private kafkaService: KafkaService
  ) { }

  ngOnInit(): void {
    this.createMessageProduceForm();
    this.createTopicCreateForm();
  }

  createTopicCreateForm() {
    this.topicCreateForm = this.formBuilder.group({
      topicName: ['', Validators.required],
      maxPartition: ['', Validators.required]
    });
  }

  createMessageProduceForm() {
    this.messageProduceForm = this.formBuilder.group({
      topic: ['', Validators.required],
      message: ['', Validators.required],
      partition: [, Validators.required]
    });
  }

  createTopicOnKafka() {
    if (this.topicCreateForm.valid) {
      this.topicModule = Object.assign({}, this.topicCreateForm.value)
      this.kafkaService.createTopicOnKafka(this.topicModule).subscribe(response => {
        this.toastService.success(response.message, "Success")
      }, responseError => {
        this.toastService.error(responseError.err, "Error")
      })
    } else {
      this.toastService.error("Your form is missing", "Missing Form")
    }
  }

  produceMessageToKafka() {
    console.log(this.messageProduceForm)
    if (this.messageProduceForm.valid) {
      this.messageModule = Object.assign({}, this.messageProduceForm.value);
      console.log(this.messageModule)

      this.kafkaService.sendMessageToKafka(this.messageModule).subscribe(response => {
        this.toastService.success(response.message, "Success")
      })

    } else {
      this.toastService.error("Your form is missing", "Missing Form")
    }
  }

  produceMessagesToKafka() {

    if (this.messageProduceForm.valid) {
      this.messageModule = Object.assign({}, this.messageProduceForm.value);
      console.log(this.messageModule)

      this.kafkaService.sendMessagesToKafka(this.messageModule).subscribe(response => {
        this.toastService.success(response.message, "Success")
      })

    }
  }
}
