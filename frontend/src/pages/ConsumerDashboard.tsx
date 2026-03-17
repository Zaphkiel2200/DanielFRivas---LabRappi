import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  storeName: string;
}

interface CartItem extends Product {
  quantity: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Hamburguesa Sencilla', price: 15000, storeName: 'Burger Palace' },
  { id: 2, name: 'Papas Fritas', price: 5000, storeName: 'Burger Palace' },
  { id: 3, name: 'Pizza Pepperoni', price: 25000, storeName: 'Luigi Pizza' },
];

export default function ConsumerDashboard() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`Compra realizada con éxito! Total a pagar: $${total}`);
    setCart([]); 
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container" style={{ alignItems: 'flex-start', maxWidth: '800px', margin: '0 auto' }}>
      <header className="dashboard-header" style={{ width: '100%', marginTop: '20px' }}>
        <h2>Consumidor</h2>
        <button className="btn-secondary" onClick={handleLogout}>Cerrar Sesión</button>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', width: '100%', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h3>Restaurantes y Productos disponibles</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {MOCK_PRODUCTS.map((prod) => (
              <div key={prod.id} className="card" style={{ padding: '15px', maxWidth: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{prod.name}</h4>
                    <small style={{ color: '#666' }}>de {prod.storeName}</small>
                    <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>${prod.price}</p>
                  </div>
                  <button onClick={() => addToCart(prod)}>+ Agregar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ flex: '1 1 300px', position: 'sticky', top: '20px' }}>
          <h3>Mi Carrito</h3>
          {cart.length === 0 ? (
            <p style={{ color: '#666' }}>Tu carrito está vacío.</p>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <div>
                      <strong style={{ display: 'block' }}>{item.quantity}x {item.name}</strong>
                      <small>${item.price * item.quantity}</small>
                    </div>
                    <button 
                      className="btn-secondary" 
                      style={{ padding: '4px 8px', fontSize: '12px', height: 'fit-content' }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '2px solid #eee', paddingTop: '10px', marginBottom: '20px' }}>
                <h3 style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
                  <span>Total:</span>
                  <span>${total}</span>
                </h3>
              </div>
              <button style={{ width: '100%' }} onClick={handleCheckout}>
                Realizar Pedido
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
