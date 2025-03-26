import {
  calcularPrecioProducto,
  calculaTicket,
  calculaTotales,
  dosDecimales,
  LineaTicket,
} from "./main";
import { ResultadoTotalTicket } from "./model";

describe("calcularPrecioProducto", () => {
  it("Debe calcular bien el valor total", () => {
    // Arrange
    let productoEjemplo: LineaTicket = {
      producto: {
        nombre: "Legumbres",
        precio: 2,
        tipoIva: "general",
      },
      cantidad: 2,
    };

    // Act
    const resultado = calcularPrecioProducto(productoEjemplo);

    // Assert
    expect(resultado).toBe(4);
  });
  it("Debe calcular bien el valor total", () => {
    // Arrange
    let productoEjemplo: LineaTicket = {
      producto: {
        nombre: "Perfume",
        precio: 20,
        tipoIva: "general",
      },
      cantidad: 3,
    };

    // Act
    const resultado = calcularPrecioProducto(productoEjemplo);

    // Assert
    expect(resultado).toBe(60);
  });
});

describe("calculaTicket", () => {
  it("Caso con 1 elemento", () => {
    // Arrange
    let ejemploProductos: LineaTicket[] = [
      {
        producto: {
          nombre: "Legumbres",
          precio: 2,
          tipoIva: "general",
        },
        cantidad: 2,
      },
    ];

    // Act
    const resultado = calculaTicket(ejemploProductos);

    const expectResultado = [
      {
        nombre: "Legumbres",
        cantidad: 2,
        precionSinIva: 4,
        tipoIva: "general",
        precioConIva: 4.84,
      },
    ];

    // Assert
    expect(resultado).toStrictEqual(expectResultado);
  });

  it("Caso con mas de 1 elemento", () => {
    // Arrange
    let ejemploProductos: LineaTicket[] = [
      {
        producto: {
          nombre: "Perfume",
          precio: 20,
          tipoIva: "general",
        },
        cantidad: 3,
      },
      {
        producto: {
          nombre: "Leche",
          precio: 1,
          tipoIva: "superreducidoC",
        },
        cantidad: 6,
      },
    ];

    // Act
    const resultado = calculaTicket(ejemploProductos);

    const expectResultado = [
      {
        nombre: "Perfume",
        cantidad: 3,
        precionSinIva: 60,
        tipoIva: "general",
        precioConIva: 72.6,
      },
      {
        nombre: "Leche",
        cantidad: 6,
        precionSinIva: 6,
        tipoIva: "superreducidoC",
        precioConIva: 6,
      },
    ];

    // Assert
    expect(resultado).toStrictEqual(expectResultado);
  });
});

describe("calculaTotales", () => {
  it("Comrpobacion", () => {
    // Arrange
    let ejemploProductos: LineaTicket[] = [
      {
        nombre: "Perfume",
        cantidad: 3,
        precionSinIva: 60,
        tipoIva: "general",
        precioConIva: 72.6,
      },
      {
        nombre: "Leche",
        cantidad: 6,
        precionSinIva: 6,
        tipoIva: "superreducidoC",
        precioConIva: 6,
      },
    ];

    // Act
    const resultado = calculaTotales(ejemploProductos);

    const expectResultado: ResultadoTotalTicket = {
      totalConIva: 78.6,
      totalSinIva: 66,
      totalIva: 12.6,
    };

    // Assert
    expect(resultado).toStrictEqual(expectResultado);
  });
});

describe("dosDecimales", () => {
  it("Prueba", () => {
    let valor: number = 4.12341;

    let resultado = dosDecimales(valor)
    let expectResultado = 4.12;

    expect(resultado).toStrictEqual(expectResultado);
  });
});
