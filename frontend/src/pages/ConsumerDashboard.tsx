import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
  storeName: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ConsumerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

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
    
    // Simplification for the mockup: sending the first store available in the cart just to fulfill backend requirements.
    const orderData = {
      restaurant: cart[0].storeName,
      customer: 'Cliente Generico', // Usually we get this from Auth context/state
      address: 'Dirección Generica', // Usually we'd map this from a user form
      total
    };

    api.post('/orders', orderData)
      .then(() => {
        alert(`Compra realizada con éxito! Total a pagar: $${total}`);
        setCart([]); 
      })
      .catch((err) => {
        alert('Hubo un error al crear la orden');
        console.error(err);
      });
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
            {products.map((prod) => (
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
