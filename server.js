import { Contenedor, Product } from './controllers/index.js'
import express from 'express';
import Router from 'express';


const app = express();
const router = Router();



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api', router);



////Instancio la clase 
const productos = new Contenedor();
let producto1 = new Product("Teclado", 2500, "loremipsum.com")
let producto2 = new Product("Mouse", 1000, "loremipsum.com")
let producto3 = new Product("Monitor", 7000, "loremipsum.com")
productos.save(producto1);
productos.save(producto2);
productos.save(producto3);



////ROUTER

//Trae el array completo
router.get('/productos', (req, res) => {
    res.json(productos.getAll());
});


//Trae un producto por id
router.get('/productos/:id', (req, res) => {
    res.json(productos.getByID(req.params.id))
});

//Agrega un elemento al array, y devuelvo el id
router.post('/productos', (req, res) => {
    console.log(req.body);
    let id = productos.save(req.body);
    res.json(id);
});



//Actualiza un elemento segun id
router.put('/productos/:id', (req, res) => {
    res.json(productos.editById(req.params.id, req.body))
});

//Elimino un elemento por id
router.delete('/productos/:id', (req, res) => {
    res.json(productos.deleteById(req.params.id))
});






const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en el servidor: ${error}`));