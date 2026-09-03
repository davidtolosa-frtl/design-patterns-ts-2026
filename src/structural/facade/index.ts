/**
 * Patrón: Facade
 *
 * Proporciona una interfaz simplificada frente a un conjunto de clases de un
 * subsistema complejo. En lugar de que el cliente maneje directamente muchas
 * dependencias y pasos internos, la fachada expone métodos simples y de alto
 * nivel. Útil cuando querés ocultar la complejidad y reducir el acoplamiento
 * entre el cliente y las clases del subsistema.
 *
 * Ejecutar:
 * npm run pattern -- src/structural/facade/index.ts
 */

// ---------- Subsistema: componentes del cine en casa ----------

class Televisor {
  encender(): void {
    console.log("  Televisor: encendido.");
  }

  apagar(): void {
    console.log("  Televisor: apagado.");
  }

  configurarEntrada(hdmi: number): void {
    console.log(`  Televisor: entrada configurada en HDMI ${hdmi}.`);
  }
}

class SistemaSonido {
  encender(): void {
    console.log("  Sistema de sonido: encendido.");
  }

  apagar(): void {
    console.log("  Sistema de sonido: apagado.");
  }

  configurarVolumen(volumen: number): void {
    console.log(`  Sistema de sonido: volumen en ${volumen}.`);
  }
}

class ReproductorBluRay {
  encender(): void {
    console.log("  Reproductor Blu-ray: encendido.");
  }

  apagar(): void {
    console.log("  Reproductor Blu-ray: apagado.");
  }

  reproducir(pelicula: string): void {
    console.log(`  Reproductor Blu-ray: reproduciendo "${pelicula}".`);
  }

  detener(): void {
    console.log("  Reproductor Blu-ray: detenido.");
  }

  expulsarDisco(): void {
    console.log("  Reproductor Blu-ray: disco expulsado.");
  }
}

class LucesAmbientales {
  atenuar(intensidad: number): void {
    console.log(`  Luces ambientales: atenuadas al ${intensidad}%.`);
  }

  restablecer(): void {
    console.log("  Luces ambientales: restablecidas al 100%.");
  }
}

// ---------- Fachada: CineEnCasa ----------

/**
 * La fachada oculta todos los pasos internos (qué componente se enciende,
 * en qué orden y con qué configuración) y le ofrece al cliente un par de
 * métodos simples y de alto nivel.
 */
class CineEnCasa {
  private televisor: Televisor;
  private sonido: SistemaSonido;
  private reproductor: ReproductorBluRay;
  private luces: LucesAmbientales;

  constructor() {
    // La fachada construye y recuerda los componentes del subsistema.
    this.televisor = new Televisor();
    this.sonido = new SistemaSonido();
    this.reproductor = new ReproductorBluRay();
    this.luces = new LucesAmbientales();
  }

  verPelicula(pelicula: string): void {
    console.log(`\n>>> Preparando cine en casa para ver "${pelicula}"...`);
    this.luces.atenuar(10);
    this.televisor.encender();
    this.televisor.configurarEntrada(1);
    this.sonido.encender();
    this.sonido.configurarVolumen(35);
    this.reproductor.encender();
    this.reproductor.reproducir(pelicula);
  }

  apagarCine(): void {
    console.log("\n>>> Apagando cine en casa...");
    this.reproductor.detener();
    this.reproductor.apagar();
    this.sonido.apagar();
    this.televisor.apagar();
    this.luces.restablecer();
  }
}

// ---------- Demostración ----------

// El cliente solo conoce la fachada y no necesita saber cómo funciona cada
// componente interno ni en qué orden encenderlos.
const cine = new CineEnCasa();

cine.verPelicula("El Padrino");
cine.apagarCine();

// Podemos volver a usarla para otra película con el mismo método simple.
cine.verPelicula("Inception");
cine.apagarCine();
