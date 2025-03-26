import {
  LineaTicket,
  Producto,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TicketFinal,
  TotalPorTipoIva,
} from "./model";

const sacarIva = (producto: Producto): number => {
  if (producto.tipoIva === "general") {
    return producto.precio * 0.21;
  }
  if (producto.tipoIva === "reducido") {
    return producto.precio * 0.1;
  }
  if (producto.tipoIva === "sinIva") {
    return producto.precio * 0.0;
  }
  if (producto.tipoIva === "superreducidoA") {
    return producto.precio * 0.05;
  }
  if (producto.tipoIva === "superreducidoB") {
    return producto.precio * 0.04;
  }
  if (producto.tipoIva === "superreducidoC") {
    return producto.precio * 0.0;
  }

  return 0;
};

const precioConIva = (producto: LineaTicket) => {
  if (producto !== undefined || producto !== null) {
    const precioIva: number = sacarIva(producto.producto);
    let precioConIva = dosDecimales(
      (precioIva + producto.producto.precio) * producto.cantidad
    );
    return precioConIva;
  }
  return 0;
};

export const calcularPrecioProducto = (producto: LineaTicket): number => {
  const totalProducto = producto.cantidad * producto.producto.precio;
  return totalProducto;
};

export const calculaTicket = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  let resultadoLineasTicket: ResultadoLineaTicket[] = lineasTicket.map(
    (lineaTicket) => {
      return {
        nombre: lineaTicket.producto.nombre,
        cantidad: lineaTicket.cantidad,
        precionSinIva: calcularPrecioProducto(lineaTicket),
        tipoIva: lineaTicket.producto.tipoIva,
        precioConIva: precioConIva(lineaTicket),
      };
    }
  );
  return resultadoLineasTicket;
};

export const calculaTotales = (
  resultadoLineasTicket: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  let calculosTotales: ResultadoTotalTicket = {
    totalSinIva: sumadorSinIva(resultadoLineasTicket),
    totalConIva: sumadorConIva(resultadoLineasTicket),
    totalIva: dosDecimales(
      sumadorConIva(resultadoLineasTicket) -
        sumadorSinIva(resultadoLineasTicket)
    ),
  };
  return calculosTotales;
};

export const sumadorConIva = (items: ResultadoLineaTicket[]) => {
  let arrayConIva = items.map((item) => item.precioConIva);
  let resultado = arrayConIva.reduce((acc, n) => acc + n, 0);
  return resultado;
};

export const sumadorSinIva = (items: ResultadoLineaTicket[]) => {
  let arraySinIva = items.map((item) => item.precionSinIva);
  let resultado = arraySinIva.reduce((acc, n) => acc + n, 0);
  return resultado;
};

export const dosDecimales = (item: number): number => {
  let resultado = parseFloat(item.toFixed(2));
  return resultado;
};

export const totalTipoIva = (
  resultadoLineasTicket: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  let arrayTotalIva: TotalPorTipoIva[] = resultadoLineasTicket.map((item) => {
    return {
        tipoIva:item.tipoIva,
        cuantia:dosDecimales((item.precioConIva)-(item.precionSinIva))
    };
  });
  return arrayTotalIva;
};

const ticketFinal = (): TicketFinal => {};
