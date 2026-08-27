/**
 * Práctico 1: Estación meteorológica
 * Patrón aplicado: Observer
 *
 * Una estación meteorológica recibe datos de sus sensores y notifica a las
 * pantallas suscriptas cada vez que cambian las condiciones del clima.
 *
 * Ejecutar:
 * npm run pattern -- src/behavioral/observer/exercises/01-estacion-meteorologica/index.ts
 */

interface CondicionesClimaticas {
  temperatura: number;
  humedad: number;
  presion: number;
}

interface ObservadorEstacion {
  actualizar(condiciones: CondicionesClimaticas): void;
}

class EstacionMeteorologica {
  private observadores: ObservadorEstacion[] = [];
  private condicionesActuales: CondicionesClimaticas = {
    temperatura: 0,
    humedad: 0,
    presion: 0,
  };

  suscribir(observador: ObservadorEstacion): void {
    this.observadores.push(observador);
  }

  desuscribir(observador: ObservadorEstacion): void {
    this.observadores = this.observadores.filter(actual => actual !== observador);
  }

  actualizarSensores(
    temperatura: number,
    humedad: number,
    presion: number,
  ): void {
    this.condicionesActuales = { temperatura, humedad, presion };
    console.log("\n--- Cambiaron las condiciones climáticas ---");
    this.notificar();
  }

  private notificar(): void {
    for (const observador of this.observadores) {
      observador.actualizar({ ...this.condicionesActuales });
    }
  }
}

class DisplayCondicionesActuales implements ObservadorEstacion {
  actualizar(condiciones: CondicionesClimaticas): void {
    console.log(
      `[Condiciones actuales] Temperatura: ${condiciones.temperatura}°C | ` +
        `Humedad: ${condiciones.humedad}% | Presión: ${condiciones.presion} hPa`,
    );
  }
}

class DisplayTemperaturasHistoricas implements ObservadorEstacion {
  private temperaturas: number[] = [];

  actualizar(condiciones: CondicionesClimaticas): void {
    this.temperaturas.push(condiciones.temperatura);
    console.log(
      `[Temperaturas históricas] ${this.temperaturas.join("°C, ")}°C`,
    );
  }
}

const estacion = new EstacionMeteorologica();
const displayActual = new DisplayCondicionesActuales();
const displayHistorico = new DisplayTemperaturasHistoricas();

estacion.suscribir(displayActual);
estacion.suscribir(displayHistorico);

estacion.actualizarSensores(22, 65, 1013);
estacion.actualizarSensores(25, 58, 1010);
estacion.actualizarSensores(19, 72, 1016);

console.log("\n--- Desuscribiendo el display histórico ---");
estacion.desuscribir(displayHistorico);

estacion.actualizarSensores(30, 45, 1008);

export {};
