const workOrderList = require('../models/workOrderList.js')

module.exports = {
    getEdit: async (req, res) => {
        //console.log(req)
        const id = req.params.id;
        console.log(id)
        try {
            const workOrders = await workOrderList.find()
            res.render("edit.ejs", {workOrderList: workOrders, idItem: id})
        } catch (err){
            if (err) return res.status(500).send(err)
        }
     },
    deleteItem: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await workOrderList.findByIdAndDelete(id)
            console.log(result)
            res.redirect('back') // using back here instead of ('/') but hey if it works another tool in the tool belt
        } catch (err) {
            if (err){ return res.status(500).send(err)}
        }       
    },

    // In this example, the function is using the workOrderList.findOne() method to check if there is an item that has the same vehicleBumperNumber and numinput as the updated item, but a different _id. If an item is found, it will log a message and redirect the user to the '/' route without updating the item. If no item is found, it will proceed to update the item by calling the workOrderList.findByIdAndUpdate() method, passing the ID of the item to update, the new data, and a callback function to handle any error.
    updateItem: (req, res) => {
        return new Promise((resolve, reject) => {
            const id = req.params.id;
            workOrderList.findOne({
                $and: [
                    { vehicleBumperNumber: req.body.vehicleBumperNumber },
                    { numinput: req.body.numinput },
                    { _id: { $ne: id } }
                ]
            }, (err, existingItem) => {
                if (err) {
                    reject(err);
                } else if (existingItem) {
                    console.log("Item already exists");
                    res.redirect("/");
                    resolve();
                } else {
                    workOrderList.findByIdAndUpdate(
                        id,
                        {
                            vehicleBumperNumber: req.body.vehicleBumperNumber,
                            numinput: req.body.numinput,
                            mechanic: req.body.mechanic
                        },
                        err => {
                            if (err) return res.status(500).send(err);
                            res.redirect('/');
                            resolve();
                        });
                }
            });
        });
    }
}
