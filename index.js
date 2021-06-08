import express from 'express';
import crearProd from './productos.js';

const app = express();

const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
    .listen(puerto, () =>
        console.log(`Escuchando peticiones puerto localhost${puerto}`)
    )
    .on("error", (error) => console.log(`Error en servidor ${error}`));

const nuevosProductos = new crearProd();

app.post("/api/productos/guardar", (req, res) => {
    nuevosProductos.guardar({
        id: nuevosProductos.getId(),
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    })
    res.send(nuevosProductos)
})

app.get("/api/productos/listar", (req, res) => {
    const todos = nuevosProductos.listarTodos()
    if(todos.length > 0){
        res.send(todos);
    }else{
        res.json({error: "No hay productos cargados"})
    }
})

app.get("/api/productos/listar/:id", (req, res) => {
    const producto = nuevosProductos.listarIndividual(req.params.id)
    if(producto){
        res.send(producto);
    }else{
        res.json({error: "No hay producto con el id indicado"})
    }
})