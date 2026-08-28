/**
 * Ejercicio 1: Adapter para servicio meteorológico
 * Patrón aplicado: Adapter
 *
 * El sistema ya usa una interfaz común para consultar clima, pero ahora
 * queremos incorporar Windguru sin tocar el código que ya funciona con
 * la API del Servicio Meteorológico Nacional.
 *
 * Ejecutar:
 * npm run pattern -- src/structural/adapter/exercises/01-api-clima/index.ts
 */

interface Clima {
  ciudad: string;
  temperatura: number;
  humedad: number;
  presion: number;
}

interface ClimaApi {
  obtenerClima(ciudad: string): Clima;
}

class ApiServicioMeteorologicoNacional implements ClimaApi {
  obtenerClima(ciudad: string): Clima {
    console.log(`Consultando clima en ${ciudad} desde la API nacional...`);

    return {
      ciudad,
      temperatura: 22.5,
      humedad: 65,
      presion: 1013,
    };
  }
}

class ApiWindguru {
  private ciudadSeleccionada: string = "";

  seleccionarCiudad(ciudad: string): void {
    this.ciudadSeleccionada = ciudad;
  }

  obtenerTemperatura(): number {
    switch (this.ciudadSeleccionada) {
      case "Buenos Aires":
        return 25;
      case "Córdoba":
        return 20;
      case "Rosario":
        return 23;
      default:
        return 18;
    }
  }

  obtenerHumedad(): number {
    switch (this.ciudadSeleccionada) {
      case "Buenos Aires":
        return 68;
      case "Córdoba":
        return 54;
      case "Rosario":
        return 61;
      default:
        return 50;
    }
  }

  obtenerPresion(): number {
    switch (this.ciudadSeleccionada) {
      case "Buenos Aires":
        return 1011;
      case "Córdoba":
        return 1017;
      case "Rosario":
        return 1014;
      default:
        return 1009;
    }
  }
}

class AdaptadorWindguru implements ClimaApi {
  constructor(private api: ApiWindguru) {}

  obtenerClima(ciudad: string): Clima {
    this.api.seleccionarCiudad(ciudad);

    return {
      ciudad,
      temperatura: this.api.obtenerTemperatura(),
      humedad: this.api.obtenerHumedad(),
      presion: this.api.obtenerPresion(),
    };
  }
}

class ServicioClima {
  constructor(private api: ClimaApi) {}

  consultar(ciudad: string): void {
    const clima = this.api.obtenerClima(ciudad);

    console.log(
      `Clima en ${clima.ciudad}: ${clima.temperatura}°C, ` +
        `${clima.humedad}% de humedad, ${clima.presion} hPa`,
    );
  }
}

console.log("=== Consulta de clima usando la API original ===");
const servicioNacional = new ServicioClima(new ApiServicioMeteorologicoNacional());
servicioNacional.consultar("Rosario");

console.log("\n=== Consulta de clima usando Windguru a través del Adapter ===");
const servicioConWindguru = new ServicioClima(new AdaptadorWindguru(new ApiWindguru()));
servicioConWindguru.consultar("Córdoba");
servicioConWindguru.consultar("Buenos Aires");

console.log("\n El cliente sigue usando la misma interfaz ClimaApi y no necesita conocer la API de Windguru.");
