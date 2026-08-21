# Adapter

## Intención

Convertir la **interfaz de una clase** en otra interfaz que el cliente
espera. El Adapter permite que clases con interfaces incompatibles
trabajen juntas, sin modificar el código existente.

## Problema que resuelve

Cuando se quiere integrar una clase nueva (o externa) a un sistema ya
funcionando, pero su interfaz no es compatible con lo que el sistema
espera, surgen problemas:

- El código cliente queda **acoplado** a la API concreta de cada proveedor.
- Agregar un segundo proveedor obliga a **reescribir** el código que ya
  funciona con el primero.
- No se puede reutilizar código existente porque las firmas de los
  métodos son distintas (nombres, parámetros, tipos de retorno).

En resumen: se necesita que dos cosas que hablan "distinto" se entiendan
sin cambiar a ninguno de los dos.

## Cómo lo resuelve

1. Se define una **interfaz común** (`PasarelaPago`) que declara las
   operaciones que el cliente necesita.
2. La clase que ya funciona (`MercadoPago`) implementa esa interfaz
   directamente.
3. Para la clase nueva (`ModoAPI`), que tiene otra interfaz, se crea un
   **Adaptador** (`AdaptadorModo`) que:
   - Implementa la interfaz común que el cliente espera.
   - Internamente delega en la clase adaptada, traduciendo las llamadas.
4. El cliente usa siempre la interfaz común. Puede cambiar de proveedor
   solo inyectando un adaptador distinto, sin tocar una sola línea de su
   lógica.

## Ejemplo en este repo

`index.ts` muestra un sistema de e-commerce que ya cobra con MercadoPago.
Luego se integra Modo (que tiene métodos como `iniciarPago()` y
`verificarPago()`) creando un `AdaptadorModo` que traduce esas llamadas
a la interfaz `PasarelaPago` que la tienda ya conoce. La clase `Tienda`
no se modifica en absoluto.

Ejecutar:

```bash
npm run pattern -- src/structural/adapter/index.ts
```

## Cuándo usarlo

- Cuando se necesita integrar una clase nueva a un sistema existente y
  **no se puede modificar** la clase nueva (API externa, librería de
  terceros) ni el código cliente.
- Cuando se quiere **reutilizar** una clase existente cuya interfaz no
  es exactamente la que se necesita.
- Cuando se quieren **unificar bajo una misma interfaz** varias clases
  con interfaces distintas (por ejemplo, distintos proveedores de pago,
  de envío, de notificaciones).

## Cuándo evitarlo / riesgos

- Agrega una capa de complejidad extra. Si la interfaz de la clase
  adaptada es similar a la esperada, puede no valer la pena.
- Si se necesita adaptar muchas clases, conviene considerar si el
  diseño base está bien pensado antes de crear Adaptadores para todo.
- No es ideal cuando se puede **modificar la clase adaptada** directamente
  para que implemente la interfaz necesaria (en ese caso, es mejor
  refactorizar).

## Relación con otros patrones

- Un **Facade** simplifica una interfaz compleja; un **Adapter** la
  traduce de una forma a otra. Ambos agregan una capa, pero con
  distinta intención.
- **Decorator** agrega responsabilidades a un objeto sin cambiar su
  interfaz; **Adapter** cambia la interfaz.
- Se suele usar junto con **Factory Method** para crear los adaptadores
  en el momento que se necesite el proveedor correcto.
