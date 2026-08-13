# Singleton

## Intención

Garantizar que una clase tenga **una única instancia** en toda la
aplicación y proveer un **punto de acceso global** a ella.

## Problema que resuelve

Hay recursos que no tiene sentido duplicar: una conexión a base de datos,
un logger, la configuración de la aplicación, un caché compartido. Si
cualquier parte del código puede hacer `new` libremente, se corre el
riesgo de:

- Crear instancias distintas que pierden sincronía entre sí (por ejemplo,
  dos "conexiones" que no ven los mismos datos).
- Desperdiciar recursos (abrir múltiples conexiones cuando alcanza con
  una).
- Tener múltiples fuentes de verdad para un mismo estado global.

## Cómo lo resuelve

1. El **constructor se marca como `private`**, así ninguna clase externa
   puede instanciarlo con `new`.
2. La propia clase guarda una referencia estática a su única instancia.
3. Se expone un método estático (por convención, `obtenerInstancia()` /
   `getInstance()`) que crea la instancia la primera vez que se la pide
   (*lazy initialization*) y devuelve siempre esa misma referencia en
   los llamados siguientes.

## Ejemplo en este repo

`index.ts` simula una `ConexionBaseDeDatos` pedida desde dos módulos
distintos (`moduloDeVentas` y `moduloDeInventario`). Ambos llaman a
`ConexionBaseDeDatos.obtenerInstancia()` sin coordinarse entre sí, y sin
embargo terminan compartiendo la misma conexión: la cantidad de consultas
ejecutadas queda centralizada en un solo contador.

Ejecutar:

```bash
npm run pattern -- src/creational/singleton/index.ts
```

## Cuándo usarlo

- Cuando debe existir **exactamente una** instancia de una clase y esa
  instancia debe ser accesible desde distintos puntos del código.
- Recursos compartidos y costosos de crear: conexiones, pools, loggers,
  configuración global.

## Cuándo evitarlo / riesgos

- Introduce **estado global**, lo que dificulta testear (los tests
  pueden "contaminarse" entre sí si no se resetea el estado).
- Puede ocultar dependencias: una clase que usa un Singleton internamente
  no deja explícito en su firma que depende de ese recurso compartido.
- En general se prefiere **inyectar** la instancia (por ejemplo, pasarla
  por constructor) antes que acceder a un Singleton global, salvo que la
  unicidad sea un requisito real del dominio.

## Relación con otros patrones

- Muchas **Fábricas Abstractas**, **Builders** o **Facades** se
  implementan como Singleton cuando solo se necesita una instancia de
  ellos.
