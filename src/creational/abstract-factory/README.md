# Abstract Factory

## Intención

Permitir la creación de **familias de objetos relacionados o
dependientes** sin especificar sus clases concretas, garantizando que los
objetos producidos por una misma fábrica sean **compatibles entre sí**.

## Problema que resuelve

Cuando una aplicación necesita trabajar con distintas "familias" o
"variantes" de un conjunto de productos (por ejemplo, muebles de estilo
moderno vs. victoriano), y esos productos deben combinarse de forma
consistente, instanciar cada objeto por separado con `new` en el código
cliente trae riesgos:

- El cliente queda acoplado a clases concretas específicas.
- Es fácil mezclar por error productos de familias distintas (una silla
  moderna con un sofá victoriano), rompiendo la coherencia visual o
  funcional.
- Agregar una nueva familia obliga a tocar el código cliente en muchos
  lugares.

## Cómo lo resuelve

1. Se definen **interfaces de producto abstractas** (`Silla`, `Sofa`) que
   declaran las operaciones comunes a todas las variantes.
2. Se define una **interfaz de fábrica abstracta** (`FabricaDeMuebles`)
   con un método de creación por cada tipo de producto.
3. Cada **familia concreta** (`FabricaDeMueblesModernos`,
   `FabricaDeMueblesVictorianos`) implementa la fábrica y decide qué
   variante concreta de cada producto instanciar, garantizando que todos
   los productos que entrega pertenezcan a la misma familia.
4. El código cliente (`amueblarSala`) solo conoce la interfaz abstracta:
   recibe una fábrica y no necesita saber qué variante concreta está
   usando.

## Ejemplo en este repo

`index.ts` define productos abstractos `Silla` y `Sofa`, dos familias
concretas (Moderno y Victoriano) y una función cliente `amueblarSala` que
arma una sala completa a partir de cualquier `FabricaDeMuebles` que
reciba, sin acoplarse a las clases concretas.

Ejecutar:

```bash
npm run pattern -- src/creational/abstract-factory/index.ts
```

o con el script corto:

```bash
npm run abstract-factory
```

## Cuándo usarlo

- Cuando el sistema debe ser independiente de cómo se crean, componen y
  representan sus productos.
- Cuando existen varias familias de productos relacionados y hace falta
  garantizar que los objetos de una familia se usen juntos.
- Cuando se quiere poder agregar una nueva familia completa sin modificar
  el código cliente existente (solo agregando una nueva fábrica
  concreta).

## Cuándo evitarlo / riesgos

- Agrega varias interfaces y clases nuevas; para pocos productos o una
  sola familia es sobre-ingeniería.
- Agregar un **nuevo tipo de producto** (no una nueva familia) obliga a
  modificar la interfaz de la fábrica abstracta y todas sus
  implementaciones concretas.

## Relación con otros patrones

- Suele implementarse con **Factory Method**: cada método de creación de
  la fábrica abstracta puede delegar en un factory method.
- Una fábrica concreta suele implementarse como **Singleton**, ya que
  alcanza con una única instancia de cada familia.
