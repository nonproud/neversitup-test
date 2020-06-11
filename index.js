const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

let products = []
let productId = 0

let orders = []
let orderId = 0

app.get('/products', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send(JSON.stringify(products))
})

app.get('/products/:id', (req, res) => {
    res.set('Content-Type', 'application/json')
    let product = products.find(x => x.id == req.params.id)
    if(product != undefined ){
        res.status(200).send(JSON.stringify(product))
    } else {
        res.status(404).send("Not found")
    }
})

app.post('/products', (req, res) => {
    products.push({id: productId, name: req.body.name, details: req.body.details})
    productId++
    res.send(200)
})

app.put('/products/:id', (req, res) => {
    let product = products.find(x => x.id == req.params.id)
    if(product != undefined ){
        product.name = req.body.name
        product.details = req.body.details
        res.status(200).send()
    } else {
        res.status(404).send("Not found")
    }
})

app.delete('/products/:id', (req, res) => {
    let product = products.find(x => x.id == req.params.id)
    if(product != undefined ){
        products = products.filter(function( p ) {
            return p.id !== product.id;
        });
        res.status(200).send()
    } else {
        res.status(404).send("Not found")
    }
})

app.get('/orders', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send(JSON.stringify(orders))
})

app.get('/orders/:id', (req, res) => {
    let product = orders.find(x => x.id == req.params.id)
    if(product != undefined ){
        res.set('Content-Type', 'application/json')
        res.status(200).send(JSON.stringify(product))
    } else {
        res.status(404).send("Not found")
    }
})

app.post('/orders', (req, res) => {
    res.send('hello world post delete')
})

app.delete('/orders', (req, res) => {
    res.send('hello world orders delete')
})

app.listen(3000, () => {
    console.log("On PORT: 3000")
    products.push({id: 0, name: "Product0", details: "Details of product 0"})
    products.push({id: 1, name: "Product1", details: "Details of product 1"})
    productId = 2
})
