

print("--- Bắt đầu triển khai Schema ---");

// --- Cấu hình Shard (Chỉ chạy một lần trên mongos shell) ---
sh.addShard("rs-shard01/shard01-a:27017,shard01-b:27017,shard01-c:27017");
sh.addShard("rs-shard02/shard02-a:27017,shard02-b:27017,shard02-c:27017");


sh.enableSharding("race_db");


// --- Giảm kích thước Chunk (Chỉ chạy một lần trên mongos shell) ---
// Để quan sát Range Sharding rõ hơn, giảm kích thước chunk.
// Trong môi trường sản xuất, giá trị này thường lớn hơn (ví dụ: 64MB hoặc 128MB).
// sh.stopBalancer();
db.settings.update(
   { _id: "chunksize" },
   { $set: { value: 1 } }, 
   { upsert: true }
);
// sh.startBalancer();
// print("Chunk size set to 1MB. Balancer started.");


// --- Tạo Collections và Indexes ---


db.createCollection("licenses");


db.createCollection("racers");
sh.shardCollection("race_db.racers", { _id: "hashed" });



db.createCollection("races");
sh.shardCollection("race_db.races", { _id: 1 });

