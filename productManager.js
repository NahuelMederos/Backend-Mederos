var fs = require('fs')

const path = './productos.json'

 

var productsArray = []

 

class ProductManager{

    constructor(){
        this.products = productsArray
    }


    getProducts = async () =>{

        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path);
            const prods = JSON.parse(data);
            return prods;
        }

        else{
            return []
        }

 

    }

 

    addProduct = async (productoNuevo) =>{

        if ( !productoNuevo.title || !productoNuevo.description || !productoNuevo.price || !productoNuevo.thumbnail || !productoNuevo.code || !productoNuevo.stock ){
            return console.log("Debes completar todos los campos")
           }

        const prods = await this.getProducts();

        if (prods.length === 0 ) {
            productoNuevo.id=1
        } else{
            productoNuevo.id = prods.length + 1;
        }
 
        if( prods.find(prod => prod.code === productoNuevo.code)){
            return console.log('Ya existe este codigo')
        }

            prods.push(productoNuevo)
            await fs.writeFileSync(path, JSON.stringify(prods), (err) => err ? console.log('ERROR EN ESCRIBIR: '+err) : console.log("Producto añadido con éxito"))
            return prods
        }


    getProductById = async (id) =>{

        const prods = await this.getProducts();


        let oneProd = await prods.find((prod) => prod.id === id)
        if (!oneProd){
          console.log("no existe ningún producto con ese id")
          return
        }
        return JSON.stringify(oneProd)

    }
}


module.exports = ProductManager;


// const productos = new ProductManager()

// const proceso = async() =>{

//      let addUser = await productos.addProduct({
//         title: 'title3',
//         description: 'description3',
//         thumbnail: 'thumbnail3',
//         price: 300,
//         code: '005',
//         stock: 30
//     })

//     // let productosObtenidos = await productos.getProducts()
//     // console.log(productosObtenidos)

    
// }




// proceso();






// console.log('por id: ',productos.getProductById(1))