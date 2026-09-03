/**
 * Patrón: Decorator
 *
 * Un sistema manda notificaciones por email de forma simple. Con el
 * tiempo se pide poder avisar también por SMS, Facebook o Slack, y en
 * cualquier combinación (email + SMS, email + Slack + Facebook, etc.).
 *
 * En vez de crear una subclase por cada combinación posible, cada canal
 * extra se implementa como un decorador que envuelve al notificador
 * anterior: llama a su envío original y le suma el propio.
 *
 * Ejecutar:
 * npm run pattern -- src/structural/decorator/index.ts
 */

import { createInterface } from "node:readline/promises";

// ── Componente: interfaz común de cualquier notificador ──────────────────
interface Notifier {
  enviar(mensaje: string): void;
}

// ── Componente concreto: el notificador base (email) ─────────────────────
class NotificadorEmail implements Notifier {
  enviar(mensaje: string): void {
    console.log(`  [Email] Enviando mensaje: "${mensaje}"`);
  }
}

// ── Decorador base: envuelve un Notifier y delega en él ──────────────────
abstract class DecoradorBase implements Notifier {
  constructor(protected wrappee: Notifier) {}

  enviar(mensaje: string): void {
    this.wrappee.enviar(mensaje);
  }
}

// ── Decoradores concretos: cada uno agrega su propio canal ───────────────
class DecoradorSMS extends DecoradorBase {
  enviar(mensaje: string): void {
    super.enviar(mensaje);
    this.enviarSMS(mensaje);
  }

  private enviarSMS(mensaje: string): void {
    console.log(`  [SMS] Enviando mensaje: "${mensaje}"`);
  }
}

class DecoradorFacebook extends DecoradorBase {
  enviar(mensaje: string): void {
    super.enviar(mensaje);
    this.enviarFacebook(mensaje);
  }

  private enviarFacebook(mensaje: string): void {
    console.log(`  [Facebook] Publicando mensaje: "${mensaje}"`);
  }
}

class DecoradorSlack extends DecoradorBase {
  enviar(mensaje: string): void {
    super.enviar(mensaje);
    this.enviarSlack(mensaje);
  }

  private enviarSlack(mensaje: string): void {
    console.log(`  [Slack] Publicando mensaje: "${mensaje}"`);
  }
}

class DecoradorDiscord extends DecoradorBase {
  enviar(mensaje: string): void {
    super.enviar(mensaje);
    this.enviarDiscord(mensaje);
  }

  private enviarDiscord(mensaje: string): void {
    console.log(`  [Discord] Publicando mensaje: "${mensaje}"`);
  }
}

// ── Menú interactivo: el usuario arma su propia combinación de canales ───
const CANALES: Record<string, { etiqueta: string; decorador: new (n: Notifier) => Notifier }> = {
  "1": { etiqueta: "SMS", decorador: DecoradorSMS },
  "2": { etiqueta: "Facebook", decorador: DecoradorFacebook },
  "3": { etiqueta: "Slack", decorador: DecoradorSlack },
  "4": { etiqueta: "Discord", decorador: DecoradorDiscord },
};

async function main() {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  console.log("=== Decorator: sistema de notificaciones por múltiples canales ===\n");
  console.log("El email siempre se envía. Elegí canales extra para sumar:");
  console.log("  1) SMS");
  console.log("  2) Facebook");
  console.log("  3) Slack");
  console.log("  4) Discord");

  const seleccion = await rl.question(
    "\nIngresá los números separados por coma (ej: 1,3) o Enter para ninguno: "
  );
  const mensaje = await rl.question("Escribí el mensaje a enviar: ");

  rl.close();

  const opciones = seleccion
    .split(",")
    .map((op: string) => op.trim())
    .filter((op: string) => op in CANALES);

  let notificador: Notifier = new NotificadorEmail();
  for (const opcion of opciones) {
    notificador = new CANALES[opcion].decorador(notificador);
  }

  console.log("\n--- Enviando notificación ---");
  notificador.enviar(mensaje || "(mensaje vacío)");

  console.log("\n=== Clave del patrón ===");
  console.log("Cada canal elegido envuelve al notificador anterior: llama a");
  console.log("super.enviar() y agrega su propio canal, así se arman combinaciones");
  console.log("dinámicas sin crear una subclase por cada caso posible.");
}

main();
