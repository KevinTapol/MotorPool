const ItemList = require('../models/ItemList')

module.exports = {
    getEdit: (req, res) => {
        //console.log(req)
        const id = req.params.id;
        console.log(id)
        ItemList.find({}, (err, workorders) => {
             res.render("edit.ejs", { itemList: workorders, idItem: id });
        });
     },
    deleteTask: (req, res) => {
                 const id = req.params.id;
                 ItemList.findByIdAndRemove(id, err => {
                     if (err) return res.send(500, err);
                     res.redirect('back');
                 })
    },
    updateTask: (req, res) => {
                 const id = req.params.id;
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
                     })
    }
}
