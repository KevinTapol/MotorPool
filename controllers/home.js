// logic related to home page
// don't allow duplicates to be created
const ItemList = require('../models/ItemList') // require model schema

module.exports = {
    getIndex : async (req, res) => {
        try {
            const items = await
            ItemList.find() // in the model find the collection items
            res.render("index.ejs", { ItemList: items }); // render page index.ejs send data as a list of key value pair items
        } catch (err) {
            if (err) return res.status(500).send(err); // exact internal error and location logged out to browser not sure why if (err) is needed but it is
        }
    },
    // createItem: async (req, res) => {
    //     const newItem = new ItemList(
    //         { // when request gets sent up to the server, all we want is the fields in the form which live in the body of the request then look in the specific fields like vehicleBumperNumber and mechanic respectively
    //             vehicleBumperNumber: req.body.vehicleBumperNumber, // grab user vehicleBumperNumber form data field request body and put save as new item vehicleBumperNumber
    //             numinput: req.body.numinput,
    //             mechanic: req.body.mechanic // grab user mechanic form data field request body and save as new item mechanic
    //         });
    //     try {
    //             await newItem.save(); // for success save item through model to see if vehicleBumperNumber is a string mechanic is a num
    //             console.log(newItem)
    //             res.redirect("/"); // reload the homepage with the new item
    //     } catch (err) {
    //             if (err) return res.status(500).send(err); // exact internal error and location logged out to the browser if (err) required otherwise res.redirect('/') won't run
    //             res.redirect("/");
    //     }
    // }

    // Async of createItem
    // createItem: async (req, res) => {
    //     const newItem = new ItemList(
    //         {
    //             vehicleBumperNumber: req.body.vehicleBumperNumber,
    //             numinput: req.body.numinput,
    //             mechanic: req.body.mechanic 
    //         });
    //     try {
    //             await newItem.save(); 
    //             console.log(newItem)
    //             res.redirect("/"); 
    //     } catch (err) {
    //             if (err) return res.status(500).send(err); 
    //             res.redirect("/");
    //     }
    // }

    // Promise of createItem
    // createItem: (req, res) => {
    //     return new Promise((resolve, reject) => {
    //         const newItem = new ItemList(
    //             {
    //                 vehicleBumperNumber: req.body.vehicleBumperNumber,
    //                 numinput: req.body.numinput,
    //                 mechanic: req.body.mechanic 
    //             });
    //         try {
    //                 newItem.save().then(() => {
    //                     console.log(newItem)
    //                     res.redirect("/"); 
    //                     resolve();
    //                 }).catch((err) => {
    //                     if (err) return res.status(500).send(err); 
    //                     res.redirect("/");
    //                     reject(err);
    //                 }); 
    //         } catch (err) {
    //                 reject(err);
    //         }
    //     });
    // }

    // In this example, the function is using the ItemList.findOne() method to check if an item with the same vehicleBumperNumber already exists in the database. If an item is found, it will log a message and redirect the user to the '/' route without creating a new item. If no item is found, it will proceed to create a new item and save it to the database.
    // createItem: (req, res) => {
    //     return new Promise((resolve, reject) => {
    //         ItemList.findOne({ vehicleBumperNumber: req.body.vehicleBumperNumber}, (err, existingItem) => {
    //             if (err) {
    //                 reject(err);
    //             } else if (existingItem) {
    //                 console.log("Item already exists");
    //                 res.redirect("/");
    //                 resolve();
    //             } else {
    //                 const newItem = new ItemList({
    //                     vehicleBumperNumber: req.body.vehicleBumperNumber,
    //                     numinput: req.body.numinput,
    //                     mechanic: req.body.mechanic 
    //                 });
    //                 try {
    //                     newItem.save().then(() => {
    //                         console.log(newItem);
    //                         res.redirect("/");
    //                         resolve();
    //                     }).catch((err) => {
    //                         if (err) return res.status(500).send(err);
    //                         res.redirect("/");
    //                         reject(err);
    //                     });
    //                 } catch (err) {
    //                     reject(err);
    //                 }
    //             }
    //         });
    //     });
    // }
    

    // In this example, the ItemList.findOne() method is now searching for an item that matches both vehicleBumperNumber and numinput in the request's body, instead of just one of them. If an item is found, it will log a message and redirect the user to the '/' route without creating a new item. If no item is found, it will proceed to create a new item and save it to the database.
    createItem: (req, res) => {
        return new Promise((resolve, reject) => {
            ItemList.findOne({ 
                vehicleBumperNumber: req.body.vehicleBumperNumber,
                numinput: req.body.numinput 
            }, (err, existingItem) => {
                if (err) {
                    reject(err);
                } else if (existingItem) {
                    console.log("Item already exists");
                    res.redirect("/");
                    resolve();
                } else {
                    const newItem = new ItemList({
                        vehicleBumperNumber: req.body.vehicleBumperNumber,
                        numinput: req.body.numinput,
                        mechanic: req.body.mechanic 
                    });
                    try {
                        newItem.save().then(() => {
                            console.log(newItem);
                            res.redirect("/");
                            resolve();
                        }).catch((err) => {
                            if (err) return res.status(500).send(err);
                            res.redirect("/");
                            reject(err);
                        });
                    } catch (err) {
                        reject(err);
                    }
                }
            });
        });
    }
    

}