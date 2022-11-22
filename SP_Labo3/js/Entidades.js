

class Anuncio {
    id;
    titulo;
    transaccion;
    descripcion;
    precio;

    constructor(titulo, transaccion, descripcion, precio, id = null) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export class Anuncio_Auto extends Anuncio {
    puertas;
    kilometros;
    potencia;

    constructor(titulo, transaccion, descripcion, precio, puertas, kilometros, potencia, id = null) {
        super(titulo,transaccion,descripcion,precio,id);
        this.puertas = puertas;
        this.kilometros = kilometros;
        this.potencia = potencia;
    }
}


