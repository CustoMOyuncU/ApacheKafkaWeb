const { Kafka } = require("kafkajs");

const topicName = process.argv[2] || "Test55";

createConsumer();

async function createConsumer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_example",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({
      groupId: "test1GroupId",
    });
    console.log("Consumer'a bağlanılıyor...");

    await consumer.connect();
    console.log("Bağlanıldı");

    await consumer.subscribe({
      topic: "Test55",
      fromBeginning: true,
      partition:1
    });

    await consumer.run({
      autoCommit: true,
      eachMessage: async (result) => {
        console.log(
          `Gelen Mesaj: ${result.message.value} Partition: ${result.partition}`
        );
      },
    });
  } catch (err) {
    console.log("Hata", err);
  }
}
