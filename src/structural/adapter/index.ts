/**
 * Patrón: Adapter
 *
 * Tenés un sistema de e-commerce que ya funciona con MercadoPago.
 * Ahora querés integrar Modo como segunda opción de cobro SIN tocar
 * el código existente. El Adapter permite que Modo se "traduzca"
 * a la misma interfaz que ya usa tu tienda.
 *
 * Ejecutar:
 * npm run pattern -- src/structural/adapter/index.ts
 */

// ── Interfaz que usa tu tienda (ya existente) ──────────────────────────
interface PasarelaPago {
  cobrar(monto: number): string;
  consultarEstado(idTransaccion: string): "pendiente" | "aprobado" | "rechazado";
}

// ── Tu integración con MercadoPago (ya funcionando) ─────────────────────
class MercadoPago implements PasarelaPago {
  private transacciones: Record<string, "pendiente" | "aprobado" | "rechazado"> = {};

  cobrar(monto: number): string {
    console.log(`  [MercadoPago] Iniciando cobro de $${monto}...`);
    const id = `mp_${Date.now()}`;
    this.transacciones[id] = "aprobado";
    console.log(`  [MercadoPago] Cobro aprobado ✓ (${id})`);
    return id;
  }

  consultarEstado(idTransaccion: string): "pendiente" | "aprobado" | "rechazado" {
    return this.transacciones[idTransaccion] ?? "rechazado";
  }
}

// ── API de Modo (nueva, interfaz diferente) ─────────────────────────────
class ModoAPI {
  iniciarPago(importe: number, concepto: string): { referencia: string; estado: string } {
    console.log(`  [Modo] Creando pago de $${importe} por "${concepto}"...`);
    const ref = `modo_${Date.now()}`;
    console.log(`  [Modo] Pago registrado ✓ (${ref})`);
    return { referencia: ref, estado: "completado" };
  }

  verificarPago(referencia: string): string {
    console.log(`  [Modo] Verificando ${referencia}...`);
    return "completado";
  }
}

// ── Adaptador: hace que Modo se parezca a PasarelaPago ──────────────────
class AdaptadorModo implements PasarelaPago {
  constructor(private api: ModoAPI) {}

  cobrar(monto: number): string {
    const resultado = this.api.iniciarPago(monto, "Compra en tienda");
    return resultado.referencia;
  }

  consultarEstado(idTransaccion: string): "pendiente" | "aprobado" | "rechazado" {
    const estado = this.api.verificarPago(idTransaccion);
    if (estado === "completado") return "aprobado";
    if (estado === "pendiente") return "pendiente";
    return "rechazado";
  }
}

// ── Tu tienda (código existente, NO se toca) ───────────────────────────
class Tienda {
  constructor(private pasarela: PasarelaPago) {}

  finalizarCompra(producto: string, precio: number) {
    console.log(`\n--- Comprando "${producto}" ---`);
    const id = this.pasarela.cobrar(precio);
    const estado = this.pasarela.consultarEstado(id);
    console.log(`  Resultado: ${estado} (id: ${id})`);
  }
}

// ── Demostración ────────────────────────────────────────────────────────
console.log("=== Adapter: Agregar Modo a un sistema que ya usa MercadoPago ===\n");

console.log("--- Antes (solo MercadoPago) ---");
const tienda = new Tienda(new MercadoPago());
tienda.finalizarCompra("Remera", 4500);
tienda.finalizarCompra("Mochila", 12000);

console.log("\n--- Después (agregamos Modo sin tocar la Tienda) ---");
const tiendaConModo = new Tienda(new AdaptadorModo(new ModoAPI()));
tiendaConModo.finalizarCompra("Camisa", 8500);
tiendaConModo.finalizarCompra("Zapatillas", 25000);

console.log("\n=== La clase Tienda no cambió en absoluto ===");
console.log("Solo se creó AdaptadorModo para que Modo cumpla la interfaz PasarelaPago.");
