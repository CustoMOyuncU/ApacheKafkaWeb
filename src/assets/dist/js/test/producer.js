const { Kafka } = require("kafkajs");

const topicName = process.argv[2] || "Test55";
const partition = process.argv[3] || 1;

createProducer();

async function createProducer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_example",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer();   
    console.log("Producer'a bağlanılıyor...");

    await producer.connect();
    console.log("Bağlanıldı");

    const message = await producer.send({
        topic:topicName,
        messages:[{value:"Test MSG",partition:partition}]
    })
    console.log("Gönderim başarılı",JSON.stringify(message))
    await producer.disconnect()
  } catch (err) {
    console.log("Hata", err);
  } finally {
    process.exit(0);
  }
}
