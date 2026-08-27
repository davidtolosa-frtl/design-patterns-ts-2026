/**
 * Práctico 2: Display de temperatura máxima
 * Patrón aplicado: Observer
 *
 * Se agrega un display que observa las condiciones de la estación y conserva
 * la temperatura más alta recibida.
 *
 * Ejecutar:
 * npm run pattern -- src/behavioral/observer/exercises/02-temperatura-maxima/index.ts
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

class DisplayTemperaturaMaxima implements ObservadorEstacion {
  private temperaturaMaxima: number | null = null;

  actualizar(condiciones: CondicionesClimaticas): void {
    if (
      this.temperaturaMaxima === null ||
      condiciones.temperatura > this.temperaturaMaxima
    ) {
      this.temperaturaMaxima = condiciones.temperatura;
    }

    console.log(`[Temperatura máxima] ${this.temperaturaMaxima}°C`);
  }
}

const estacion = new EstacionMeteorologica();
const displayActual = new DisplayCondicionesActuales();
const displayHistorico = new DisplayTemperaturasHistoricas();
const displayMaximo = new DisplayTemperaturaMaxima();

estacion.suscribir(displayActual);
estacion.suscribir(displayHistorico);
estacion.suscribir(displayMaximo);

estacion.actualizarSensores(22, 65, 1013);
estacion.actualizarSensores(25, 58, 1010);
estacion.actualizarSensores(19, 72, 1016);
estacion.actualizarSensores(30, 45, 1008);
estacion.actualizarSensores(17, 80, 1020);

export {};
