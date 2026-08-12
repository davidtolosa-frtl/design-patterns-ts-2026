# AGENTS.md

Instrucciones para agentes de IA (Claude Code, Copilot, Cursor, etc.) que
trabajen en este repositorio.

## Qué es este proyecto

Laboratorio de patrones de diseño (GoF) en TypeScript, usado como material
didáctico para alumnos hispanohablantes que están aprendiendo a programar.
Cada carpeta bajo `src/` corresponde a un patrón, con un único `index.ts`
ejecutable de forma independiente.

## Regla de idioma (crítica)

- **Nombres de carpetas y archivos → en inglés**, igual que en la
  bibliografía estándar (GoF, refactoring.guru, Wikipedia):
  `abstract-factory`, `factory-method`, `chain-of-responsibility`, etc.
  No renombrar ni traducir estas carpetas: los alumnos las buscan afuera del
  proyecto con esos nombres.
- **Contenido de cada `index.ts` → en español**: interfaces, clases,
  métodos, variables, comentarios y textos de `console.log`. El objetivo es
  que el código se entienda sin depender de saber inglés.

No mezclar: no dejar identificadores en inglés dentro del código ni
traducir los nombres de carpeta.

## Estructura

```text
src/
├── creational/     (abstract-factory, builder, factory-method, prototype, singleton)
├── structural/     (adapter, bridge, composite, decorator, facade, flyweight, proxy)
└── behavioral/     (chain-of-responsibility, command, iterator, mediator, memento,
                      observer, state, strategy, template-method, visitor)
```

## Comandos

```bash
npm install
npm run pattern -- src/<categoria>/<patron>/index.ts   # ejecutar un ejemplo
npm run typecheck                                       # tsc --noEmit
```

## Al completar un ejemplo de patrón

1. Escribir un ejemplo simple, autocontenido y sin dependencias externas que
   demuestre la intención real del patrón (evitar ejemplos triviales tipo
   "Hola mundo" que no ilustren el problema que resuelve).
2. Todo el código en español (ver regla de idioma arriba); la carpeta se
   mantiene en inglés.
3. Mantener el comentario de cabecera existente con la descripción del
   patrón y el comando `npm run pattern -- ...` para ejecutarlo.
4. Verificar con `npm run pattern -- <archivo>` que corre y con
   `npm run typecheck` que no hay errores de tipos.
5. No introducir abstracciones, dependencias ni configuración adicional:
   la simplicidad es parte del valor didáctico del proyecto.

## Commits

- Mensajes en español, formato Conventional Commits: `tipo: descripción breve`
  (feat, fix, docs, refactor, test, chore, etc.).
- Primera línea en imperativo, máximo 50-72 caracteres.
- Cuerpo opcional (después de línea en blanco) explicando qué y por qué.
- No agregar menciones a asistentes de IA en el mensaje de commit.
