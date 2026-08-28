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

interface Silla {
  sentarse(): string;
}

interface Sofa {
  recostarse(): string;
}

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

interface FabricaDeMuebles {
  crearSilla(): Silla;
  crearSofa(): Sofa;
}

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

function amueblarSala(fabrica: FabricaDeMuebles): void {
  console.log(fabrica.crearSilla().sentarse());
  console.log(fabrica.crearSofa().recostarse());
}

console.log("-- Sala moderna --");
amueblarSala(new FabricaDeMueblesModernos());

console.log("\n-- Sala victoriana --");
amueblarSala(new FabricaDeMueblesVictorianos());
