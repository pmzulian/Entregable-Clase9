import express from 'express';
import crearProd from './productos.js';

const app = express();

const puerto = 8080;

const router = express.Router();

app.use("/api", router);

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

router.put("/productos/actualizar/:id", (req, res) => {

    const ubicacion = req.params.id;
    const actualizar = req.body

    if(ubicacion <= nuevosProductos.productos.length){
        nuevosProductos.productos = nuevosProductos.productos.map(p => {
            if(p.id == ubicacion){
                p = Object.assign(p, actualizar)
            }
            return p
        })
        res.json({
            ...nuevosProductos.productos
        })
    }else{
        res.send("No hay producto con el índice " + ubicacion)
    }

})

router.delete("/productos/borrar/:id", (req, res) => {

    let id = req.params.id;

    let productoBuscado = nuevosProductos.productos.find(p => {
        return p.id == id
    })

    if(productoBuscado){
        let borrado = nuevosProductos.borrar(id)

        res.send(borrado)
    }else{
        res.send("No exite el produco")
    }

})

app.use("/formulario", express.static('public'))