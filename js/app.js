//seleccionamos el carrito id

// se crean las variables 
const carrito = document.querySelector('#carrito')
// tbody se va agg de forma dinamica a medida que se va llenando

const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];




// carga los eventos siempre hacer eso
cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos de carrito
    carrito.addEventListener('click', eliminarCurso);

    //variar carrito
    vaciarCarritoBtn.addEventListener('click', eliminarCurso);

    vaciarCarritoBtn.addEventListener('click', () => {
       // console.log('vaciando carrito....');
        articulosCarrito = []; // vaciar el carrito

        limpiarHTML(); //eliminamos el html
    })

}

//agg los cursos al carrito de compra al 
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

function eliminarCurso(e) {
    console.log('curso eliminado');
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        //console.log(e.target)
        //elimar del arreglo por data-id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}

//lee el contenido del html al que le dimos clcick y traer la informacion
function leerDatosCurso(curso) {
    //console.log(curso)

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }

        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(infoCurso)

    //add articulos al carrito
    // articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
    carritoHTML();

}


//muestra el carrito de compras en el html

function carritoHTML() {
    //limpiar el html
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src = "${imagen}" width="50">
         </td>

        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
        </td>

        `;
        // add el html del carrito en el tbody
        contenedorCarrito.appendChild(row);


    });

}


//elimina los curso del tbody
function limpiarHTML() {
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

