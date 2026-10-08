// Base Endpoint Declarations (Supports K8s Ingress path mapping or direct ports)
const AUTH_API = 'http://localhost:5001/api/auth';
const FEED_API = 'http://localhost:5002/api/feed';
const CART_API = 'http://localhost:5003/api/cart';

let token = localStorage.getItem('token') || null;

function showSection(sectionId) {
  document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
  document.getElementById(`${sectionId}-section`).classList.add('active');
  if (sectionId === 'feed') fetchProducts();
  if (sectionId === 'cart') fetchCart();
}

async function handleAuth(type) {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const msgEl = document.getElementById('auth-msg');

  try {
    const res = await fetch(`${AUTH_API}/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Auth failed');

    token = data.token;
    localStorage.setItem('token', token);
    msgEl.innerText = `${type} successful! Redirecting...`;
    document.getElementById('auth-tab-btn').innerText = 'Logged In';
    setTimeout(() => showSection('feed'), 1000);
  } catch (err) {
    msgEl.innerText = err.message;
  }
}

async function fetchProducts() {
  const grid = document.getElementById('product-grid');
  try {
    const res = await fetch(FEED_API);
    const products = await res.json();
    grid.innerHTML = products.map(p => `
      <div class="product-card">
        <img src="${p.imageUrl}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <h4>$${p.price}</h4>
        <button class="btn btn-primary" onclick="addToCart('${p._id}', '${p.name}', ${p.price})">Add to Cart</button>
      </div>
    `).join('');
  } catch (err) {
    grid.innerHTML = '<p>Error loading catalog</p>';
  }
}

async function addToCart(productId, name, price) {
  if (!token) return alert('Please login first');
  try {
    const res = await fetch(`${CART_API}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, name, price })
    });
    if (res.ok) {
      alert('Added to cart');
      fetchCart();
    }
  } catch (err) {
    alert('Failed to add item');
  }
}

async function fetchCart() {
  if (!token) {
    document.getElementById('cart-items').innerHTML = '<p>Please login to view cart</p>';
    return;
  }
  try {
    const res = await fetch(CART_API, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const cart = await res.json();
    const items = cart.items || [];
    
    document.getElementById('cart-count').innerText = items.reduce((acc, i) => acc + i.quantity, 0);
    
    let total = 0;
    document.getElementById('cart-items').innerHTML = items.map(item => {
      total += item.price * item.quantity;
      return `
        <div class="cart-row">
          <span>${item.name} (x${item.quantity})</span>
          <span>$${item.price * item.quantity}</span>
        </div>
      `;
    }).join('');
    
    document.getElementById('cart-total').innerText = total.toFixed(2);
  } catch (err) {
    document.getElementById('cart-items').innerHTML = '<p>Error loading cart</p>';
  }
}

// Initial state load
if (token) document.getElementById('auth-tab-btn').innerText = 'Logged In';
showSection('feed');
