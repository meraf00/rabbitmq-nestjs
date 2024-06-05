import { Injectable } from '@nestjs/common';
import * as ampq from 'amqplib/callback_api';
import { PreService } from './pre/pre.service';
import { PostService } from './post/post.service';

@Injectable()
export class AppService {
  constructor(
    readonly preService: PreService,
    readonly postService: PostService,
  ) {
    const exchange = 'exchange';
    const publisherQueue = 'publisher-queue';
    const receiverQueue = 'receiver-queue';

    const receivingRoutingKey = 'planning.*';

    const message = 'From planning to workspace';

    ampq.connect('amqp://localhost', function (err, conn) {
      // sender channel
      conn.createChannel(function (err, ch) {
        ch.assertExchange(exchange, 'topic', {
          durable: true,
          autoDelete: false,
        });

        ch.assertQueue(publisherQueue, { durable: true, autoDelete: false });

        const routingKey = 'planning.pre';

        ch.publish(exchange, routingKey, Buffer.from(message));
        console.log('[x] Sent %s', message);
      });

      // receiver channel
      conn.createChannel(function (err, ch) {
        ch.assertExchange(exchange, 'topic', {
          durable: true,
          autoDelete: false,
        });

        ch.assertQueue(receiverQueue, { durable: true, autoDelete: false });

        ch.bindQueue(receiverQueue, exchange, receivingRoutingKey);
        console.log(
          ' [*] Waiting for messages in %s. To exit press CTRL+C',
          receiverQueue,
        );

        ch.consume(
          receiverQueue,
          function (msg) {
            if (msg.fields.routingKey === 'planning.pre') {
              preService.hello();
            } else if (msg.fields.routingKey === 'planning.post') {
              postService.hello();
            }
            console.log(
              ' [x] Received %s',
              msg.content.toString(),
              msg.fields.routingKey,
            );
          },
          { noAck: false },
        );
      });
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
