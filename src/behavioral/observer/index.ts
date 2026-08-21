/**
 * Patrón: Observer
 *
 * Define una dependencia uno a muchos entre objetos, de modo que cuando un
 * objeto cambia de estado, todos sus dependientes son notificados y se
 * actualizan automáticamente. Útil cuando necesitás que múltiples componentes
 * reaccionen a cambios de estado sin acoplarlos directamente al sujeto.
 *
 * Ejecutar:
 * npm run pattern -- src/behavioral/observer/index.ts
 */

// ---------- Interfaz del observador ----------

interface ObservadorClima {
  actualizar(temperatura: number): void;
}

// ---------- Sujeto observable ----------

class ServicioClima {
  private observadores: ObservadorClima[] = [];
  private temperaturaActual: number = 0;
  private historial: number[] = [];
  private readonly MAX_HISTORIAL = 12;

  suscribir(observador: ObservadorClima): void {
    this.observadores.push(observador);
  }

  desuscribir(observador: ObservadorClima): void {
    this.observadores = this.observadores.filter(o => o !== observador);
  }

  private notificar(): void {
    for (const observador of this.observadores) {
      observador.actualizar(this.temperaturaActual);
    }
  }

  setTemperatura(temperatura: number): void {
    this.temperaturaActual = temperatura;
    this.historial.push(temperatura);
    if (this.historial.length > this.MAX_HISTORIAL) {
      this.historial.shift();
    }
    console.log(`\n--- Clima cambiado a ${temperatura}°C ---`);
    this.notificar();
  }

  getHistorial(): number[] {
    return [...this.historial];
  }
}

// ---------- Observadores concretos ----------

class MostrarTemperaturaActual implements ObservadorClima {
  actualizar(temperatura: number): void {
    console.log(`[Temperatura Actual] Ahora hace ${temperatura}°C`);
  }
}

class MostrarHistorial implements ObservadorClima {
  private servicio: ServicioClima;

  constructor(servicio: ServicioClima) {
    this.servicio = servicio;
  }

  actualizar(_temperatura: number): void {
    const historial = this.servicio.getHistorial();
    console.log(`[Historial Últimas 12h] ${historial.join("°C → ")}°C`);
  }
}

// ---------- Demostración ----------

const clima = new ServicioClima();

const mostrarActual = new MostrarTemperaturaActual();
const mostrarHistorial = new MostrarHistorial(clima);

clima.suscribir(mostrarActual);
clima.suscribir(mostrarHistorial);

clima.setTemperatura(22);
clima.setTemperatura(25);
clima.setTemperatura(19);
clima.setTemperatura(30);
clima.setTemperatura(17);

console.log("\n--- Desuscribiendo el observer de temperatura actual ---");
clima.desuscribir(mostrarActual);

clima.setTemperatura(14);
