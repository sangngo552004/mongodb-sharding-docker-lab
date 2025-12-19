
rs.initiate({
  _id: "rs-config",
  configsvr: true,
  members: [
    { _id: 0, host: "cfg01:27017" },
    { _id: 1, host: "cfg02:27017" },
    { _id: 2, host: "cfg03:27017" }
  ]
});


rs.initiate({
  _id: "rs-shard01",
  members: [
    { _id: 0, host: "shard01-a:27017" },
    { _id: 1, host: "shard01-b:27017" },
    { _id: 2, host: "shard01-c:27017" }
  ]
});


rs.initiate({
  _id: "rs-shard02",
  members: [
    { _id: 0, host: "shard02-a:27017" },
    { _id: 1, host: "shard02-b:27017" },
    { _id: 2, host: "shard02-c:27017" }
  ]
});

