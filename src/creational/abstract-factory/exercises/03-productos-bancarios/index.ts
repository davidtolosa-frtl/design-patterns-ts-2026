/**
 * Ejercicio 3: productos bancarios con Abstract Factory
 *
 * Ejecutar:
 * npm run pattern -- src/creational/abstract-factory/exercises/03-productos-bancarios/index.ts
 */

interface CajaDeAhorro {
  conocerCaracteristicas(): string;
}

interface TarjetaDebito {
  conocerCaracteristicas(): string;
}

interface TarjetaCredito {
  conocerCaracteristicas(): string;
}

class CajaDeAhorroClassic implements CajaDeAhorro {
  conocerCaracteristicas(): string { return "Comisión: 1.5%"; }
}

class TarjetaDebitoClassic implements TarjetaDebito {
  conocerCaracteristicas(): string { return "Gratuita"; }
}

class TarjetaCreditoClassic implements TarjetaCredito {
  conocerCaracteristicas(): string { return "Límite: $100000"; }
}

class CajaDeAhorroPlatinium implements CajaDeAhorro {
  conocerCaracteristicas(): string { return "Comisión: 2.0%"; }
}

class TarjetaDebitoPlatinium implements TarjetaDebito {
  conocerCaracteristicas(): string { return "Gratuita"; }
}

class TarjetaCreditoPlatinium implements TarjetaCredito {
  conocerCaracteristicas(): string { return "Límite: $700000"; }
}

class CajaDeAhorroGold implements CajaDeAhorro {
  conocerCaracteristicas(): string { return "Comisión: 2.5%"; }
}

class TarjetaDebitoGold implements TarjetaDebito {
  conocerCaracteristicas(): string { return "$2000/mes"; }
}

class TarjetaCreditoGold implements TarjetaCredito {
  conocerCaracteristicas(): string { return "Límite: $2000000"; }
}

class CajaDeAhorroEstudiante implements CajaDeAhorro {
  conocerCaracteristicas(): string { return "Comisión: 0%"; }
}

class TarjetaDebitoEstudiante implements TarjetaDebito {
  conocerCaracteristicas(): string { return "Gratuita"; }
}

class TarjetaCreditoEstudiante implements TarjetaCredito {
  conocerCaracteristicas(): string { return "Límite: $60000"; }
}

interface FabricaDeProductosBancarios {
  crearCajaDeAhorro(): CajaDeAhorro;
  crearTarjetaDebito(): TarjetaDebito;
  crearTarjetaCredito(): TarjetaCredito;
}

class FabricaClassic implements FabricaDeProductosBancarios {
  crearCajaDeAhorro(): CajaDeAhorro { return new CajaDeAhorroClassic(); }
  crearTarjetaDebito(): TarjetaDebito { return new TarjetaDebitoClassic(); }
  crearTarjetaCredito(): TarjetaCredito { return new TarjetaCreditoClassic(); }
}

class FabricaPlatinium implements FabricaDeProductosBancarios {
  crearCajaDeAhorro(): CajaDeAhorro { return new CajaDeAhorroPlatinium(); }
  crearTarjetaDebito(): TarjetaDebito { return new TarjetaDebitoPlatinium(); }
  crearTarjetaCredito(): TarjetaCredito { return new TarjetaCreditoPlatinium(); }
}

class FabricaGold implements FabricaDeProductosBancarios {
  crearCajaDeAhorro(): CajaDeAhorro { return new CajaDeAhorroGold(); }
  crearTarjetaDebito(): TarjetaDebito { return new TarjetaDebitoGold(); }
  crearTarjetaCredito(): TarjetaCredito { return new TarjetaCreditoGold(); }
}

class FabricaEstudiante implements FabricaDeProductosBancarios {
  crearCajaDeAhorro(): CajaDeAhorro { return new CajaDeAhorroEstudiante(); }
  crearTarjetaDebito(): TarjetaDebito { return new TarjetaDebitoEstudiante(); }
  crearTarjetaCredito(): TarjetaCredito { return new TarjetaCreditoEstudiante(); }
}

function mostrarProductos(
  nombreCategoria: string,
  fabrica: FabricaDeProductosBancarios,
): void {
  console.log(`-- Productos ${nombreCategoria} --`);
  console.log(`Caja de Ahorro: ${fabrica.crearCajaDeAhorro().conocerCaracteristicas()}`);
  console.log(`Tarjeta Débito: ${fabrica.crearTarjetaDebito().conocerCaracteristicas()}`);
  console.log(`Tarjeta Crédito: ${fabrica.crearTarjetaCredito().conocerCaracteristicas()}`);
  console.log();
}

mostrarProductos("Classic", new FabricaClassic());
mostrarProductos("Platinium", new FabricaPlatinium());
mostrarProductos("Gold", new FabricaGold());
mostrarProductos("Estudiante", new FabricaEstudiante());
