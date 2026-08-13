/**
 * Patrón: Singleton
 *
 * Garantiza que una clase tenga una única instancia y provee un punto de
 * acceso global a ella. Es útil cuando un recurso debe ser compartido y
 * coordinado por toda la aplicación (por ejemplo, una conexión a base de
 * datos, un logger o la configuración global): crear más de una instancia
 * llevaría a estados inconsistentes o a desperdiciar recursos.
 *
 * Ejecutar:
 * npm run pattern -- src/creational/singleton/index.ts
 */

class ConexionBaseDeDatos {
  private static instancia: ConexionBaseDeDatos | undefined;
  private consultasEjecutadas = 0;

  // El constructor es privado: nadie puede hacer "new" desde afuera.
  private constructor(private readonly cadenaConexion: string) {
    console.log(`Abriendo conexión a la base de datos: ${cadenaConexion}`);
  }

  static obtenerInstancia(): ConexionBaseDeDatos {
    if (!ConexionBaseDeDatos.instancia) {
      ConexionBaseDeDatos.instancia = new ConexionBaseDeDatos(
        "postgres://localhost:5432/tienda"
      );
    }

    return ConexionBaseDeDatos.instancia;
  }

  ejecutarConsulta(sql: string): void {
    this.consultasEjecutadas++;
    console.log(`[${this.cadenaConexion}] [consulta #${this.consultasEjecutadas}] ${sql}`);
  }

  obtenerCantidadDeConsultas(): number {
    return this.consultasEjecutadas;
  }
}

// Código cliente: distintos módulos piden la conexión de forma independiente,
// pero siempre reciben la misma instancia.

function moduloDeVentas(): void {
  const conexion = ConexionBaseDeDatos.obtenerInstancia();
  conexion.ejecutarConsulta("SELECT * FROM ventas");
}

function moduloDeInventario(): void {
  const conexion = ConexionBaseDeDatos.obtenerInstancia();
  conexion.ejecutarConsulta("SELECT * FROM productos");
}

moduloDeVentas();
moduloDeInventario();

const conexionA = ConexionBaseDeDatos.obtenerInstancia();
const conexionB = ConexionBaseDeDatos.obtenerInstancia();

console.log("\n¿Es la misma instancia?", conexionA === conexionB);
console.log("Consultas totales ejecutadas:", conexionA.obtenerCantidadDeConsultas());
