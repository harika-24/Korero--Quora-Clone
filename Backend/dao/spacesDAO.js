import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let spaces;

export default class SpacesDAO {
    static async injectDB(conn) {
        if (spaces) {
            return;
        }
        try {
            spaces = await conn.db(process.env.KORERO_DB)
                .collection('Spaces');
        } catch (e) {
            console.error(`Unable to connect in SpacesDAO: ${e}`);
        }
    }

    static async addSpaces(spaceTitle, spaceDescription, date) {
        try {
            const spacesDoc = {
                spaceTitle,
                spaceDescription,
                date
            }
            return await spaces.insertOne(spacesDoc)
        } catch (e) {
            console.error(`Unable to add spaces: ${e}`)
            return {
                error: e
            };
        }
    }
    
    static async getSpaces() {
        let cursor;
        try{
            cursor = await spaces.find({});
            const spacesList = await cursor.toArray();
            return spacesList;
        } catch(e) {
            console.error(`Unable to getSpaces: ${e}`);
            return {spacesList: []};
        }
    } 

}