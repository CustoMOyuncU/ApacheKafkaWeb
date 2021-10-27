const { Kafka } = require("kafkajs");
createTopic();

async function createTopic() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_example",
      brokers: ["localhost:9092"],
    });

    const admin = kafka.admin();   
    console.log("Kafka Broker'a bağlanılıyor...");

    await admin.connect();
    console.log("Bağlanıldı");

    await admin.createTopics({
      topics: [
        { topic: "LogStroe", numPartitions: 2 }
      ],
    });
    console.log("Topic Oluşturuldu");
    await admin.disconnect();
  } catch (err) {
    console.log("Hata", err);
  } finally {
    process.exit(0);
  }
}
