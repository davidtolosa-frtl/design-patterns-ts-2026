# Decorator

## Intención

Agregar responsabilidades adicionales a un objeto **de forma dinámica**.
Los decoradores ofrecen una alternativa flexible a la herencia para
extender funcionalidad, ya que envuelven al objeto original en vez de
crear una subclase por cada combinación posible.

## Problema que resuelve

Un sistema envía notificaciones por email. Con el tiempo se pide poder
avisar también por SMS, Facebook o Slack, y en **cualquier combinación**
(email + SMS, email + Slack + Facebook, todos juntos, etc.).

Si se resolviera con herencia, habría que crear una subclase por cada
combinación posible (`NotificadorEmailSMS`, `NotificadorEmailSlackFacebook`,
`NotificadorTodos`...), lo que provoca:

- Una **explosión de subclases** que crece exponencialmente con cada
  canal nuevo que se agrega.
- Código duplicado entre subclases que comparten canales.
- Imposibilidad de decidir la combinación de canales **en tiempo de
  ejecución** (la combinación queda fija en la clase elegida).

## Cómo lo resuelve

1. Se define una interfaz común (`Notifier`) con el método `enviar(mensaje)`
   que deben cumplir tanto el notificador base como los decoradores.
2. `NotificadorEmail` es el componente concreto: la funcionalidad base,
   sin decorar.
3. `DecoradorBase` es una clase abstracta que también implementa `Notifier`,
   guarda una referencia al objeto que envuelve (`wrappee`) y delega en él
   por defecto.
4. Cada canal extra (`DecoradorSMS`, `DecoradorFacebook`, `DecoradorSlack`)
   extiende `DecoradorBase`: llama a `super.enviar()` (el canal envuelto) y
   después agrega su propio envío.
5. Como cada decorador implementa la misma interfaz `Notifier` que envuelve,
   se pueden anidar en cualquier orden y cantidad: el objeto final sigue
   siendo un `Notifier` válido para quien lo use.

## Ejemplo en este repo

`index.ts` simula un sistema de notificaciones donde el email siempre se
envía, y el usuario elige por consola (mediante un menú interactivo con
`readline`) qué canales extra sumar: SMS, Facebook, Slack, o cualquier
combinación de ellos.

Según lo elegido, el programa arma la cadena de decoradores dinámicamente:

```ts
let notificador: Notifier = new NotificadorEmail();
notificador = new DecoradorSMS(notificador);
notificador = new DecoradorSlack(notificador);
notificador.enviar(mensaje); // envía por Email, luego por SMS, luego por Slack
```

Ejecutar:

```bash
npm run pattern -- src/structural/decorator/index.ts
```

o con el script corto:

```bash
npm run decorator
```

## Cuándo usarlo

- Cuando se necesita agregar responsabilidades a objetos individuales de
  forma **dinámica y combinable**, sin afectar a otros objetos de la
  misma clase.
- Cuando la herencia no es práctica porque generaría demasiadas subclases
  para cubrir todas las combinaciones posibles.
- Cuando se quiere poder **quitar** una responsabilidad agregada en tiempo
  de ejecución, algo que con herencia no es posible.

## Cuándo evitarlo / riesgos

- Puede resultar en muchos objetos pequeños y similares, difíciles de
  depurar si la cadena de decoradores es larga.
- El orden de los decoradores puede importar (por ejemplo, comprimir antes
  o después de encriptar da resultados distintos), y eso no siempre es
  evidente para quien lee el código.
- Si solo existe una combinación fija de responsabilidades, agregar
  decoradores es complejidad innecesaria; alcanza con una clase concreta.

## Relación con otros patrones

- **Adapter** cambia la interfaz de un objeto; **Decorator** la conserva y
  solo agrega responsabilidades.
- **Composite** compone objetos en estructuras de árbol; un Decorator puede
  verse como un Composite con un solo hijo, enfocado en agregar
  comportamiento en vez de representar una jerarquía.
- **Strategy** cambia el comportamiento interno de un objeto reemplazando
  un algoritmo completo; Decorator agrega comportamiento envolviendo al
  objeto por fuera, sin reemplazar lo que ya hace.
