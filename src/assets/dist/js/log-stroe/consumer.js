const { Kafka } = require("kafkajs");

//const topicName = process.argv[2] || "Test2";

createConsumer();

async function createConsumer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_log_store",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({
      groupId: "logStoreGroupId",
    });
    console.log("Consumer'a bağlanılıyor...");

    await consumer.connect();
    console.log("Bağlanıldı");

    await consumer.subscribe({
      topic: "Test4",
      fromBeginning: true,
      enableAutoCommit:true
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
