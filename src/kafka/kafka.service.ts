import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka = new Kafka({
    clientId:"notificationProducer",
    brokers: [process.env.KAFKA_URL_BROKER as string],
  });

  private producer = this.kafka.producer({allowAutoTopicCreation:true});

  async onModuleInit() {
    await this.producer.connect();
  }

  private async sendKafkaMessage(topic: string, message: string) {
    await this.producer.send({ topic, messages: [{ value: message }] });
  }

  sendNotification(message: string) {
    return this.sendKafkaMessage('notification', message);
  }
}
