const Financial = require("../models/financial.models")

//Create a new Financial record
exports.create = async (req, res) =>{
    const { userId, description, amount, date, category, paymentMethod } = req.body
    if (!userId || !description || !amount || !date || !category || !paymentMethod) {
        res.status(400).send({ message: "somting can not be empty" });
        return;
    }
    const newRecord ={
        userId,
        description,
        amount,
        date,
        category,
        paymentMethod,
    }
    Financial.create(newRecord)
    .then((data) =>{
        res.send(data);
    })
    .catch((err) =>{
        res.status(500).send({
          message:
            err.message || "Some error occurred while saving record.",
        });
    })
   
}

 //getAll
exports.getAll = async (req, res) =>{
    await Financial.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while saving record.",
        });
      });
}

// Get User By Id
exports.getByUserId = async (req, res) => {
  const userId = req.params.userId;
  await Financial.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving record.",
      });
    });
};

//Get By Id
exports.getById = async (req, res) =>{
    const id = req.params.id;
    await Financial.findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while saving record.",
        });
      });
}
//update 
exports.update = async (req, res) =>{
    const id = req.params.id;
    await Financial.update(req.body, { where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "financial was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update financial with id=${id}. Maybe financial was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating financial with id=" + id,
        });
      });
}
//delete by id
exports.delete = async (req, res) =>{
    const id = req.params.id;
    await Financial.destroy({ where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "financial was deleted successfully.",
          });
        } else {
          res.send({
            message: `Cannot deleted financial with id=${id}. Maybe financial was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error deleted financial with id=" + id,
        });
      });
}