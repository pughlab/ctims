import * as amqplib from 'amqplib';

const rabbitmqUrl = process.env.RABBITMQ_URL || 'localhost';
const rabbitmqPort = process.env.RABBITMQ_PORT || '5672';
const queue = 'test_queue';

describe('RabbitMQ Send and Receive', () => {
  it('should publish a message to RabbitMQ and able to consume', (done) => {
    // have to use then instead of async/await in order to use done to exit the test
    const message = 'Hello World'
    amqplib.connect(`amqp://${rabbitmqUrl}:${rabbitmqPort}`).then((conn) => {
      conn.createChannel().then((chReceive) => {
        chReceive.consume(queue, (msg) => {
          if (msg !== null) {
            console.log('Received:', msg.content.toString());
            chReceive.ack(msg);
            const gotMessage = JSON.parse(msg.content.toString());
            expect(gotMessage).toEqual(message);
            done();
          }
        });
        chReceive.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      });
    });
  });
});

