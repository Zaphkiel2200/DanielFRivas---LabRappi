

export default function StoreDashboard() {
  return (
    <div className="container">
      <header className="dashboard-header">
        <h2>Mi Tienda</h2>
        <button className="btn-secondary">Cerrar Sesión</button>
      </header>
      
      <div className="card">
        <h3>Administrar Productos</h3>
        <p>Aquí agregaremos el formulario para crear productos de tu restaurante.</p>
        <button>+ Crear nuevo producto</button>
      </div>

      <div className="card mt-2">
        <h3>Órdenes Entrantes</h3>
        <p>Aquí verás los pedidos de los consumidores.</p>
      </div>
    </div>
  );
}
