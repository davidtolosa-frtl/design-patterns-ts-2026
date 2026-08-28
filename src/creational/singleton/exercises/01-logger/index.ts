/**
 * Ejercicio 1: Logger como Singleton
 *
 * Transformar la clase Logger para garantizar que exista una única instancia.
 *
 * Ejecutar:
 * npm run pattern -- src/creational/singleton/exercises/01-logger/index.ts
 */

class Logger {
  private static instancia: Logger | undefined;

  private constructor() {
    console.log("Se creó un objeto Logger");
  }

  static obtenerInstancia(): Logger {
    if (!Logger.instancia) {
      Logger.instancia = new Logger();
    }

    return Logger.instancia;
  }

  private abrirArchivoLog(): boolean {
    console.log("Archivo Log Abierto");
    return true;
  }

  private cerrarArchivoLog(): boolean {
    console.log("Archivo Log Cerrado");
    return true;
  }

  log(mensaje: string): void {
    if (this.abrirArchivoLog()) {
      console.log(`Guardado en log: ${mensaje}`);
    }

    this.cerrarArchivoLog();
  }
}

class PruebaLogger {
  static ejecutar(): void {
    const loggerA = Logger.obtenerInstancia();
    loggerA.log("Logger 1");

    console.log();

    const loggerB = Logger.obtenerInstancia();
    loggerB.log("Logger 2");

    console.log("\n¿Es la misma instancia?", loggerA === loggerB);
  }
}

PruebaLogger.ejecutar();
