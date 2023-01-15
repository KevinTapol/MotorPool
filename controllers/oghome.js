// logic related to home page
// don't allow duplicates to be created
const ItemList = require('../models/ItemList') // require model schema

module.exports = {
    getIndex : async (req, res) => {
        try {
            const items = await
            ItemList.find() // in the model find the collection items
            res.render("index.ejs", { itemList: items }); // render page index.ejs send data as a list of key value pair items
        } catch (err) {
            if (err) return res.status(500).send(err); // exact internal error and location logged out to browser not sure why if (err) is needed but it is
        }
    },
    createItem: async (req, res) => {
        const newItem = new ItemList(
            { // when request gets sent up to the server, all we want is the fields in the form which live in the body of the request then look in the specific fields like vehicleBumperNumber and mechanic respectively
                vehicleBumperNumber: req.body.vehicleBumperNumber, // grab user vehicleBumperNumber form data field request body and put save as new item vehicleBumperNumber
                numinput: req.body.numinput,
                mechanic: req.body.mechanic // grab user mechanic form data field request body and save as new item mechanic
            });
        try {
                await newItem.save(); // for success save item through model to see if vehicleBumperNumber is a string mechanic is a num
                console.log(newItem)
                res.redirect("/"); // reload the homepage with the new item
        } catch (err) {
                if (err) return res.status(500).send(err); // exact internal error and location logged out to the browser if (err) required otherwise res.redirect('/') won't run
                res.redirect("/");
        }
    }
}