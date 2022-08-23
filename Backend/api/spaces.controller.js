import SpacesDAO from '../dao/spacesDAO.js';

export default class SpacesController {

    static async apiAddSpaces(req, res, next) {
        try {
            const spaceTitle = req.body.spaceTitle;
            const spaceDescription = req.body.spaceDescription;

            const date = new Date();

            const spaceResponse = await SpacesDAO.addSpaces(
                spaceTitle,
                spaceDescription,
                date
            );

            var { error } = spaceResponse;
            console.log(error);
            if (error) {
                res.status(500).json({ error: "Unable to add spaces." });
            } else {
                res.json({ status: "success" });
            }

        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetSpaces(req, res, next) {
        try {
            console.log("call successful")
            let space = await SpacesDAO.getSpaces();
            if (!space) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(space);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

}