import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: number;
  restaurant: string;
  customer: string;
  address: string;
  total: number;
  status: 'pending' | 'accepted' | 'delivered';
}

const MOCK_ORDERS: Order[] = [
  { id: 101, restaurant: 'Burger Palace', customer: 'Juan Pérez', address: 'Calle 123 #45-67', total: 20000, status: 'pending' },
  { id: 102, restaurant: 'Luigi Pizza', customer: 'María Gómez', address: 'Cra. 50 #10-20', total: 25000, status: 'pending' }
];

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  const handleAcceptOrder = (order: Order) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'accepted' } : o));
    setActiveOrder({ ...order, status: 'accepted' });
  };

  const handleDeliverOrder = () => {
    if (activeOrder) {
      setOrders(prev => prev.filter(o => o.id !== activeOrder.id));
      setActiveOrder(null);
      alert('¡Pedido entregado con éxito!');
    }
  };

  return (
    <div className="container" style={{ alignItems: 'flex-start', maxWidth: '800px', margin: '0 auto' }}>
      <header className="dashboard-header" style={{ width: '100%', marginTop: '20px' }}>
        <h2>Repartidor</h2>
        <button className="btn-secondary" onClick={() => navigate('/login')}>Cerrar Sesión</button>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', width: '100%', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3>Pedidos Pendientes</h3>
          {activeOrder && <p style={{ color: 'var(--primary-color)' }}>Tienes un pedido activo en curso. Entrégalo para aceptar más.</p>}
          <div style={{ display: 'grid', gap: '15px' }}>
            {orders.filter(o => o.status === 'pending').map((order) => (
              <div key={order.id} className="card" style={{ padding: '15px', maxWidth: 'none', opacity: activeOrder ? 0.5 : 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>Pedido #{order.id} - {order.restaurant}</h4>
                <p style={{ margin: '5px 0' }}>Para: {order.customer}</p>
                <p style={{ margin: '5px 0' }}>Dirección: {order.address}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <strong>${order.total}</strong>
                  <button onClick={() => handleAcceptOrder(order)} disabled={!!activeOrder}>Aceptar Pedido</button>
                </div>
              </div>
            ))}
            {orders.filter(o => o.status === 'pending').length === 0 && (
              <p style={{ color: '#666' }}>No hay pedidos pendientes en este momento.</p>
            )}
          </div>
        </div>

        <div className="card" style={{ flex: '1 1 300px', position: 'sticky', top: '20px', backgroundColor: activeOrder ? '#fff3f3' : 'var(--card-bg)' }}>
          <h3>Pedido Activo</h3>
          {activeOrder ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               <h4 style={{ margin: '0' }}>Pedido #{activeOrder.id} - {activeOrder.restaurant}</h4>
               <div>
                  <strong>Cliente:</strong> {activeOrder.customer}<br/>
                  <strong>Entregar en:</strong> {activeOrder.address}
               </div>
               <div style={{ borderTop: '2px solid #eee', paddingTop: '10px' }}>
                 <h3 style={{ margin: 0 }}>Total Cobrar: ${activeOrder.total}</h3>
               </div>
               <button onClick={handleDeliverOrder} style={{ width: '100%', marginTop: '10px' }}>
                 Marcar como Entregado
               </button>
            </div>
          ) : (
            <p style={{ color: '#666' }}>No has aceptado ningún pedido aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}
