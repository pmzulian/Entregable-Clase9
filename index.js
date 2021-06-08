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
console.log(nuevosProductos)

app.post("/api/productos/guardar", (req, res) => {
    nuevosProductos.guardar({
        ...req.body,
        id: nuevosProductos.getId()
    })
    res.send(req.body)
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
    let found = nuevosProductos.listarIndividual(req.params.id)
    console.log(found)
    if(found){
        res.send(found);
    }else{
        res.json({error: "No hay producto con el id indicado"})
    }
})

//Creamos la estructura con express.router

const router = express.Router();

app.use("/api", router);

router.put("/productos/actualizar/:id", (req, res) => {
    res.json({
        estado: "Actualización correcta",
        ...req.params
    })
})

router.delete("/productos/actualizar/:id", (req, res) => {
    res.json({
        estado: "Borrado",
        ...req.params
    })
})