const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

//Registrar un nuevo producto
router.post('/', async (req, res) => {//Handle requerimiento y respuesta
    //req es el objeto de la solicitud, res es el objeto de respuesta
    try {
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save();
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Consultar todos los productos
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Consultar un producto por ID
router.get('/:ident', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.ident);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Modificar datos de un producto
router.put('/:ident', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.ident, req.body, { new: true });//El body es un json que trae las propiedades a modificar
        if (!cliente) {
            return res.status(404).json({ error: 'cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//Eliminar un producto
router.delete('/:ident', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.ident);
        if (!cliente) {
            return res.status(404).json({ error: 'cliente no encontrado' });
        }
        res.status(200).json({ message: 'cliente eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router; // Export the router