const ItemList = require('../models/ItemList.js')

module.exports = {
    getEdit: (req, res) => {
        //console.log(req)
        const id = req.params.id;
        console.log(id)
        ItemList.find({}, (err, items) => {
             res.render("edit.ejs", { ItemList: items, idItem: id });
        });
     },
    deleteTask: (req, res) => {
                 const id = req.params.id;
                 ItemList.findByIdAndRemove(id, err => {
                     if (err) return res.send(500, err);
                     res.redirect('back');
                 })
    },
    // updateTask: (req, res) => {
    //              const id = req.params.id;
    //              ItemList.findByIdAndUpdate(
    //                  id,
    //                  {
    //                     vehicleBumperNumber: req.body.vehicleBumperNumber,
    //                     numinput: req.body.numinput,
    //                     mechanic: req.body.mechanic
    //                  },
    //             err => {
    //                      if (err) return res.status(500).send(err);
    //                      res.redirect('/');
    //                  })
    // }

    // In this example, the function is using the ItemList.findOne() method to check if there is an item that has the same vehicleBumperNumber and numinput as the updated item, but a different _id. If an item is found, it will log a message and redirect the user to the '/' route without updating the item. If no item is found, it will proceed to update the item by calling the ItemList.findByIdAndUpdate() method, passing the ID of the item to update, the new data, and a callback function to handle any error.
    updateTask: (req, res) => {
        return new Promise((resolve, reject) => {
            const id = req.params.id;
            ItemList.findOne({
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
                    ItemList.findByIdAndUpdate(
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

    // In this example, the function is using the ItemList.findOne() method to check if there is an item that has the same vehicleBumperNumber and numinput as the updated item, but a different _id. If an item is found, it will use the req.flash('error', 'Please use a different numinput') to store the error message in the session, then render the same update page again, with the ID of the item passed in. The error message is then displayed on the same page to alert the user to use a different numinput. If no item is found, it will proceed to update the item by calling the ItemList.findByIdAndUpdate() method, passing the ID of the item to update, the new data, and a callback function to handle any error.
    // updateTask: (req, res) => {
    //     return new Promise((resolve, reject) => {
    //         const id = req.params.id;
    //         ItemList.findOne({
    //             $and: [
    //                 { vehicleBumperNumber: req.body.vehicleBumperNumber },
    //                 { numinput: req.body.numinput },
    //                 { _id: { $ne: id } }
    //             ]
    //         }, (err, existingItem) => {
    //             if (err) {
    //                 reject(err);
    //             } else if (existingItem) {
    //                 console.log("Item already exists");
    //                 req.flash('error', 'Please use a different numinput');
    //                 res.render('update-page', { id: id });
    //                 resolve();
    //             } else {
    //                 ItemList.findByIdAndUpdate(
    //                     id,
    //                     {
    //                         vehicleBumperNumber: req.body.vehicleBumperNumber,
    //                         numinput: req.body.numinput,
    //                         mechanic: req.body.mechanic
    //                     },
    //                     err => {
    //                         if (err) return res.status(500).send(err);
    //                         res.redirect('/');
    //                         resolve();
    //                     });
    //             }
    //         });
    //     });
    // }
    
    // updateTask: (req, res) => {
    //     return new Promise((resolve, reject) => {
    //         const id = req.params.id;
    //         ItemList.findOne({
    //             vehicleBumperNumber: req.body.vehicleBumperNumber,
    //             _id: { $ne: id }
    //         }, (err, existingItem) => {
    //             if (err) {
    //                 reject(err);
    //             } else if (existingItem && existingItem.numinput == req.body.numinput) {
    //                 console.log("Item already exists");
    //                 req.flash('error', 'Please use a different numinput');
    //                 res.render('update-page', { id: id });
    //                 resolve();
    //             } else {
    //                 ItemList.findByIdAndUpdate(
    //                     id,
    //                     {
    //                         vehicleBumperNumber: req.body.vehicleBumperNumber,
    //                         numinput: req.body.numinput,
    //                         mechanic: req.body.mechanic
    //                     },
    //                     {new: true},
    //                     (err, updatedItem) => {
    //                         if (err) return res.status(500).send(err);
    //                         res.redirect('/');
    //                         resolve();
    //                     });
    
    //             }
    //         });
    //     });
    // }
    

}
