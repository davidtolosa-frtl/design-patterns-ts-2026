# Patrones de diseño en TypeScript

Proyecto simple para estudiar y ejecutar ejemplos de patrones de diseño en TypeScript.

## Requisitos

- Node.js
- npm

## Instalación

```bash
npm install
```

## Ejecutar un patrón

```bash
npm run pattern -- src/creational/abstract-factory/index.ts
```

También hay scripts cortos para algunos patrones:

```bash
npm run abstract-factory
npm run singleton
```

## Verificar TypeScript

```bash
npm run typecheck
```

## Estructura

```text
src/
├── creational/
│   ├── abstract-factory/
│   ├── builder/
│   ├── factory-method/
│   ├── prototype/
│   └── singleton/
├── structural/
│   ├── adapter/
│   ├── bridge/
│   ├── composite/
│   ├── decorator/
│   ├── facade/
│   ├── flyweight/
│   └── proxy/
└── behavioral/
    ├── chain-of-responsibility/
    ├── command/
    ├── iterator/
    ├── mediator/
    ├── memento/
    ├── observer/
    ├── state/
    ├── strategy/
    ├── template-method/
    └── visitor/
```

Cada patrón tiene su propio `index.ts`.

## Ejemplo de flujo

1. Entrá a la carpeta del patrón.
2. Copiá o desarrollá el ejemplo en su `index.ts`.
3. Ejecutalo con `npm run pattern -- <archivo>`.
4. Hacé commit del patrón cuando lo termines.

Ejemplo:

```bash
npm run pattern -- src/behavioral/strategy/index.ts
```

## GitHub

```bash
git init
git add .
git commit -m "Initial design patterns project"
```

Después creá un repositorio vacío en GitHub y vinculalo con:

```bash
git remote add origin URL_DE_TU_REPOSITORIO
git branch -M main
git push -u origin main
```
