
var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Category = require('../models').categories;  
categories = [];
    
//Rutas y Callbacks 

router.get('/', function (req, res, next) {

    Category.findAll()
      .then(result => {
        res.json(result);
      })
      .catch(error => res.status(400).send(error))
  
  });

  router.get('/:id', function (req, res, next) {

    let id = parseInt(req.params.id);
  
    Category.findOne({
      where: {
        CategoryID: id
      }
    })
      .then(result => {
        res.json(result);
      })
      .catch(error => res.status(400).send(error))
  
  });
  router.put('/:id', function (req, res, next) {
    let id = parseInt(req.params.id);
  
    Category.update(req.body, {
      where: {
        CategoryID: id
      }
    })
      .then(result => {
        if (result[0] === 1) {
          res.json({ message: 'Categoría actualizada correctamente' });
        } else {
          res.status(404).json({ message: 'Categoría no encontrada' });
        }
      })
      .catch(error => res.status(400).send(error));
  });
  router.delete('/:id', function (req, res, next) {
    let id = parseInt(req.params.id);
  
    Category.destroy({
      where: {
        CategoryID: id
      }
    })
      .then(result => {
        if (result === 1) {
          res.json({ message: 'Categoría eliminada correctamente' });
        } else {
          res.status(404).json({ message: 'Categoría no encontrada' });
        }
      })
      .catch(error => res.status(400).send(error));
  });  
  router.post('/', function (req, res, next) {

    let data = req.body;
  
    if (data) {
  
      Category.create({
        "CategoryID": data.CategoryID,
        "CategoryName": data.CategoryName,
        "Description": data.Description
      }).then(function (result) {
        res.json(result);
      }).catch(error => res.status(400).send(error))
  
    } else {
      res.status(400).send("NO DATA PAYLOAD INCLUDED");
    }
  
  
  });
  
router.put('/', function (req, res, next) {
  res.status(200).send('PUT request');
});

router.delete('/:id', function (req, res, next) {
  res.status(200).send('DELETE request ID');
});
    

module.exports = router;