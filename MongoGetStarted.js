const {MongoClient} = require("mongodb");

async function findOneListingByName(client) {
    const cursor = await client.db("sample_airbnb").collection("listingsAndReviews")
        .find({ 
            bedrooms: { $gte: 1 },
            bathrooms: { $gte: 1}
        })
        .sort({ last_review: -1 })
        .limit(3);
    const result = await cursor.toArray();
    if (result.length > 0) {
        console.log(`Found results`);
        result.forEach((result, i) => {
            console.log(`name: ${result.name}`);
            i++;
        });
    } else {
        console.log(`No listings found`);
    }
}

async function main () {

    const uri = "mongodb+srv://Elman:qzwx1234@cluster0-6ktt3.mongodb.net/Cluster0?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        //await listDatabases(client);
        await findOneListingByName(client, "Nice room in Barcelona Center");
    }

    catch (e) {
        console.error(e);
    }

    finally {
        await client.close();
    }
};

main().catch(console.error);


// async function updateListingByName(client, nameOfListing, updatedListing) {
//     result = await client.db("sample_airbnb").collection("listingsAndReviews")
//         .updateOne({ name: nameOfListing }, { $set: updatedLising });

//         console.log(`${result.matchedCount} document(s) matched the query criteria.`);
//         console.log(`${result.modifiedCount} document(s) was/were updated.`);
// }

// await updateListingByName(client, "Infinite Views", { bedrooms: 6, beds: 8});

// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// async function createListing(client, newListing) {
//     const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
//     console.log(`New listings created with the following id: ${result.insertedId}`);
// };

// await createListing(client, {
//     name: "Lovely Loft",
//     summary: "A charming loft in Paris",
//     bedrooms: 1,
//     bathrooms: 1
// });

// async function createMultipleListingsI(client, newListings){
//     const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
//     console.log(`${result.insertedCount} new listings created with the following ids:`);
//     console.log(result.insertedIds);
// };

// await createMultipleListingsI(client, [
//     {
//         name: "Infinite Views",
//         summary: "Modern home with infinite views from the infinity pool",
//         property_type: "House",
//         bedrooms: 5,
//         bathrooms: 4,
//         beds: 5
//     },
//     {
//         name: "Private room in London",
//         property_type: "Apartment",
//         bedrooms: 1,
//         bathroom: 1
//     },
//     {
//         name: "Beautiful Beach House",
//         summary: "Enjoy relaxed beach living in this house with a private beach",
//         bedrooms: 4,
//         bathrooms: 2,
//         beds: 2,
//         last_review: new Date()
//     }
// ]);

// async function findOneListingByName(client, nameOfListing) {
//     result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });
//     if (result) {
//         console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
//         console.log(result);
//     } else {
//         console.log(`No listings found with the name '${nameOfListing}'`);
//     }
// }

//await findOneListingByName(client, "Nice room in Barcelona Center");
