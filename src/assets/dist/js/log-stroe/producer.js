const { Kafka } = require("kafkajs");
const log_data = require("./system-logs.json");

//const topicName = process.argv[2] || "Test2";
//const partition = process.argv[3] || 0;

createProducer();

async function createProducer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_log_store",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer();
    console.log("Producer'a bağlanılıyor...");

    await producer.connect();
    console.log("Bağlanıldı");

    let messages = log_data.map((item) => {
      return { value: JSON.stringify(item), partition:item.type=="system"?0:1};
    });

    const message = await producer.send({
      topic: "LogStroe",
      messages: [messages == 1 ? {value:"MSG1",partition:1}:{value:"MSG",partition:0}]
    });
    console.log("Gönderim başarılı", JSON.stringify(message));
    await producer.disconnect();
  } catch (err) {
    console.log("Hata", err);
  } finally {
    process.exit(0);
  }
}
