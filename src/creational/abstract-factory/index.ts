/**
 * Abstract Factory
 *
 * Permite crear familias de objetos relacionados (por ejemplo, sillas y
 * sofás de un mismo estilo) sin acoplar el código cliente a sus clases
 * concretas. Cada fábrica concreta garantiza que las variantes producidas
 * sean compatibles entre sí.
 *
 * Ejecutar:
 * npm run pattern -- src/creational/abstract-factory/index.ts
 */

// Productos abstractos

interface Silla {
  sentarse(): string;
}

interface Sofa {
  recostarse(): string;
}

// Familia de productos: Moderno

class SillaModerna implements Silla {
  sentarse(): string {
    return "Te sentás en una silla moderna, minimalista y de líneas rectas.";
  }
}

class SofaModerno implements Sofa {
  recostarse(): string {
    return "Te recostás en un sofá moderno de cuero.";
  }
}

// Familia de productos: Victoriano

class SillaVictoriana implements Silla {
  sentarse(): string {
    return "Te sentás en una silla victoriana, tallada en madera.";
  }
}

class SofaVictoriano implements Sofa {
  recostarse(): string {
    return "Te recostás en un sofá victoriano tapizado en terciopelo.";
  }
}

// Fábrica abstracta

interface FabricaDeMuebles {
  crearSilla(): Silla;
  crearSofa(): Sofa;
}

// Fábricas concretas

class FabricaDeMueblesModernos implements FabricaDeMuebles {
  crearSilla(): Silla {
    return new SillaModerna();
  }

  crearSofa(): Sofa {
    return new SofaModerno();
  }
}

class FabricaDeMueblesVictorianos implements FabricaDeMuebles {
  crearSilla(): Silla {
    return new SillaVictoriana();
  }

  crearSofa(): Sofa {
    return new SofaVictoriano();
  }
}

// Código cliente: solo conoce la interfaz abstracta

function amueblarSala(fabrica: FabricaDeMuebles): void {
  const silla = fabrica.crearSilla();
  const sofa = fabrica.crearSofa();

  console.log(silla.sentarse());
  console.log(sofa.recostarse());
}

console.log("-- Sala moderna --");
amueblarSala(new FabricaDeMueblesModernos());

console.log("\n-- Sala victoriana --");
amueblarSala(new FabricaDeMueblesVictorianos());
