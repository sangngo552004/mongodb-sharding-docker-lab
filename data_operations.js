

print("--- Bắt đầu chèn dữ liệu ---");

function insertLicenses(count) {
    print("Inserting " + count + " documents into 'licenses'...");
    const bulkOps = [];
    for (let i = 1; i <= count; i++) {
        bulkOps.push({
            insertOne: {
                "document": {
                    _id: "LIC-" + i.toString().padStart(6, '0'), 
                    city: "City " + (i % 50),
                    date_issued: new Date(2023, i % 12, (i % 28) + 1), 
                    issues: "Issue Type " + (i % 10),
                    contact: "contact_" + i + "@example.com",
                    dept: "Dept " + (i % 5),
                    cost: Math.floor(Math.random() * 100) + 50
                }
            }
        });
        // Chèn theo lô 1000 để hiệu quả hơn
        if (bulkOps.length === 1000) {
            db.licenses.bulkWrite(bulkOps);
            bulkOps.length = 0; // Clear array
        }
    }
    if (bulkOps.length > 0) {
        db.licenses.bulkWrite(bulkOps);
    }
    print("Finished inserting " + count + " documents into 'licenses'.");
}

insertLicenses(5000);

function insertRacers(count) {
    print("Inserting " + count + " documents into 'racers' (Hash Shard)...");
    const bulkOps = [];
    for (let i = 1; i <= count; i++) {
        bulkOps.push({
            insertOne: {
                "document": {
                    name: "Racer_" + i,
                    address: "Address_" + (i % 100), // Nhiều racers có thể có cùng địa chỉ
                    mem_num: "MEM-" + i.toString().padStart(7, '0'), // Membership number
                    age: 18 + (i % 40),
                    gender: (i % 2 === 0) ? "Male" : "Female"
                }
            }
        });
        if (bulkOps.length === 1000) {
            db.racers.bulkWrite(bulkOps);
            bulkOps.length = 0;
        }
    }
    if (bulkOps.length > 0) {
        db.racers.bulkWrite(bulkOps);
    }
    print("Finished inserting " + count + " documents into 'racers'.");
}
insertRacers(2000);

function insertRaces(count) {
    print("Inserting " + count + " documents into 'races' (Range Shard)...");
    const bulkOps = [];
    for (let i = 1; i <= count; i++) {
        bulkOps.push({
            insertOne: {
                "document": {
                    // _id sẽ được MongoDB tự động tạo (ObjectId) và sharded theo phạm vi
                    r_no: "RACE-" + i.toString().padStart(8, '0'), // Race Number
                    race_name: "Annual Race " + (i % 50),
                    date: new Date(2025, Math.floor(i / 5000), (i % 28) + 1), // Phân bổ qua các tháng năm 2025
                    location: "Location " + (i % 20),
                    sp_name_fk: "Sponsor_" + (i % 10), // Foreign key to organizations
                    director_name_fk: "Director_" + (i % 5), // Foreign key to directors
                    license_no_fk: "LIC-" + (Math.floor(Math.random() * 50000) + 1).toString().padStart(6, '0'), // FK to licenses
                    frm_win: "Winner_F_" + (i % 50), // Field for "Female Winner"
                    mal_win: "Winner_M_" + (i % 50) // Field for "Male Winner"
                }
            }
        });
        if (bulkOps.length === 1000) {
            db.races.bulkWrite(bulkOps);
            bulkOps.length = 0;
        }
    }
    if (bulkOps.length > 0) {
        db.races.bulkWrite(bulkOps);
    }
    print("Finished inserting " + count + " documents into 'races'.");
}

insertRaces(2000);
