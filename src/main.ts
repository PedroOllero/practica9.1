import { LineaTicket, Producto, ResultadoLineaTicket } from "./model";

const sacarIva = (producto: Producto): number => {
    if (producto.tipoIva === "general"){
        return producto.precio * 0.21;
    }
    if (producto.tipoIva === "reducido"){
        return producto.precio * 0.10;
    }
    if (producto.tipoIva === "sinIva"){
        return producto.precio * 0.00;
    }
    if (producto.tipoIva === "superreducidoA"){
        return producto.precio * 0.05;
    }
    if (producto.tipoIva === "superreducidoB"){
        return producto.precio * 0.04; 
    }
    if (producto.tipoIva === "superreducidoC"){
        return producto.precio * 0.00;
    }

    return 0;
}

const precioConIva = (producto: LineaTicket) => {
    if (producto !== undefined || producto !== null) {
        const precioIva: number = sacarIva(producto.producto);
        let precioConIva = ((precioIva) + producto.producto.precio) * producto.cantidad
        return precioConIva;
    }
    return 0;
}

export const calculaTicket = (lineasTicket: LineaTicket[]): ResultadoLineaTicket[] => {
    let resultadoLineasTicket: ResultadoLineaTicket[] = lineasTicket.map((lineaTicket) => {
        return {
            nombre: lineaTicket.producto.nombre,
            cantidad: lineaTicket.cantidad,
            precionSinIva: calcularPrecioProducto(lineaTicket),
            tipoIva: lineaTicket.producto.tipoIva,
            precioConIva: precioConIva(lineaTicket)
        };
    });
    return resultadoLineasTicket;
};


export const calcularPrecioProducto = (producto: LineaTicket): number => {
    const totalProducto = producto.cantidad * producto.producto.precio
    return totalProducto;
}
