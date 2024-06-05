import { Injectable } from '@nestjs/common';
import * as ampq from 'amqplib/callback_api';

@Injectable()
export class AppService {
  constructor() {
    const exchange = 'exchange';
    const receiverQueue = 'publisher-queue';
    const publisherQueue = 'receiver-queue';

    const receivingRoutingKey = '#';

    const message = 'From workspace to planning';

    ampq.connect('amqp://localhost', function (err, conn) {
      // receiver channel
      conn.createChannel(function (err, ch) {
        ch.assertExchange(exchange, 'topic', {
          durable: true,
          autoDelete: false,
        });

        ch.assertQueue(receiverQueue, { durable: true, autoDelete: false });
        console.log(
          ' [*] Waiting for messages in %s. To exit press CTRL+C',
          receiverQueue,
        );

        ch.bindQueue(receiverQueue, exchange, receivingRoutingKey);

        ch.consume(
          receiverQueue,
          function (msg) {
            console.log(' [x] Received %s', msg.content.toString());
          },
          { noAck: false },
        );
      });

      // sender channel
      conn.createChannel(function (err, ch) {
        ch.assertExchange(exchange, 'topic', {
          durable: true,
          autoDelete: false,
        });

        ch.assertQueue(publisherQueue, { durable: true, autoDelete: false });

        ch.publish(exchange, 'planning.post', Buffer.from(message));

        console.log("Workspace sent '%s'", message);
      });
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
