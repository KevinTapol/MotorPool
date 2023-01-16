// logic related to home page
const workOrderList = require('../models/workOrderList.js') // require model schema

module.exports = {
    getIndex : async (req, res) => {
        try {
            const workOrders = await
            workOrderList.find() // in the model find the collection workOrders
            res.render("index.ejs", { workOrderList: workOrders }); // render page index.ejs send data as a list of key value pair workOrders
        } catch (err) {
            if (err) return res.status(500).send(err); // exact internal error and location logged out to browser not sure why if (err) is needed but it is
        }
    },
   
    // In this example, the workOrderList.findOne() method is now searching for an item that matches both vehicleBumperNumber and numinput in the request's body, instead of just one of them. If an item is found, it will log a message and redirect the user to the '/' route without creating a new item. If no item is found, it will proceed to create a new item and save it to the database.
    createItem: (req, res) => {
        return new Promise((resolve, reject) => {
            workOrderList.findOne({ 
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
                    const newItem = new workOrderList({
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