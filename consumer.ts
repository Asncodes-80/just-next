import { Kafka } from "kafkajs";

import prisma from "./prisma/client";

const TOPIC: string = "test";

const kafka: Kafka = new Kafka({
  clientId: "434",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "group_1" });

const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (message.value) {
        await prisma.whishlist.create({
          data: {
            userId: 12,
            title: message.value.toString(),
            link: "unknown",
          },
        });
        console.log(`> $${partition} ${message.value}`);
      }
    },
  });
};

consume();
