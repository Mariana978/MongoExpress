const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto'); // Import the Producto model

//Registrar un nuevo producto
router.post('/', async (req, res) => {//Handle requerimiento y respuesta
    //req es el objeto de la solicitud, res es el objeto de respuesta
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Consultar todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Consultar un producto por ID
router.get('/:ident', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.ident);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Modificar datos de un producto
router.put('/:ident', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.ident, req.body, { new: true });//El body es un json que trae las propiedades a modificar
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//Eliminar un producto
router.delete('/:ident', async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.ident);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router; // Export the router