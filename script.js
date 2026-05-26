const whatsappPhone = "18132149276";
const whatsappBase = `https://wa.me/${whatsappPhone}`;

const products = [
  {
    name: "Tenderloin",
    description:
      "Corte fino, suave y elegante, ahumado lentamente para lograr una textura delicada y un sabor profundo.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=82",
  },
  {
    name: "Picanha",
    description:
      "Corte jugoso y lleno de carácter, reconocido por su sabor intenso y su equilibrio entre suavidad y grasa natural.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=82",
  },
  {
    name: "Roast Beef",
    description:
      "Preparación clásica de carne ahumada, ideal para disfrutar en platos fríos, calientes o combinaciones gourmet.",
    image: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&fit=crop&w=900&q=82",
  },
  {
    name: "Ribeye",
    description:
      "Corte marmoleado, intenso y jugoso, ahumado en barril para resaltar su riqueza natural.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=82",
  },
  {
    name: "Cerdo",
    description:
      "Carne de cerdo ahumada lentamente, tierna, aromática y perfecta para comidas prácticas con sabor artesanal.",
    image: "assets/corozal-hero-ribs.png",
  },
  {
    name: "Costillas de cerdo",
    description:
      "Costillas ahumadas en barril hasta lograr una textura jugosa, aroma profundo y sabor auténtico.",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=82",
  },
];

const presentations = [
  { label: "Individual 250g", message: "Individual 250g" },
  { label: "Dúo 500g", message: "Dúo 500g" },
  { label: "Familiar 1000g", message: "Familiar 1000g" },
];

const cart = [];
const productGrid = document.querySelector("#productGrid");
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const orderDrawer = document.querySelector("#orderDrawer");
const orderFloat = document.querySelector(".order-float");
const drawerBackdrop = document.querySelector("#drawerBackdrop");
const closeCart = document.querySelector("#closeCart");
const cartList = document.querySelector("#cartList");
const cartEmpty = document.querySelector("#cartEmpty");
const cartCount = document.querySelector("#cartCount");
const cartAlert = document.querySelector("#cartAlert");
const continueShopping = document.querySelector("#continueShopping");
const clearCart = document.querySelector("#clearCart");
const sendCart = document.querySelector("#sendCart");

let alertTimer;

function createProductCard(product, index) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.style.setProperty("--image", `url("${product.image}")`);

  const selectId = `presentation-${index}`;
  const grassId = `grass-${index}`;
  const qtyId = `qty-${index}`;

  card.innerHTML = `
    <div class="product-image" role="img" aria-label="${product.name} servido en estilo gourmet"></div>
    <div class="product-body">
      <div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
      <div class="product-tags" aria-label="Características">
        <span>Ahumado lento</span>
        <span>Sellado al vacío</span>
        <span>Bajo pedido</span>
      </div>
      <div class="product-controls">
        <div class="field-row">
          <label for="${selectId}">
            Presentación
            <select id="${selectId}">
              ${presentations.map((item) => `<option value="${item.message}">${item.label}</option>`).join("")}
            </select>
          </label>
          <label for="${qtyId}">
            Cantidad
            <input id="${qtyId}" type="number" min="1" value="1" inputmode="numeric" />
          </label>
        </div>
        <label class="check-line" for="${grassId}">
          <input id="${grassId}" type="checkbox" />
          Grass-fed bajo pedido
        </label>
        <div class="price-line">
          <span>Precio</span>
          <strong>$00.00 USD</strong>
        </div>
        <p class="product-note">Grass-Fed disponible bajo pedido y según disponibilidad.</p>
        <button class="btn product-order" type="button">Agregar al pedido</button>
      </div>
    </div>
  `;

  card.querySelector(".product-order").addEventListener("click", () => {
    const presentation = card.querySelector(`#${selectId}`).value;
    const grassFed = card.querySelector(`#${grassId}`).checked ? "Sí" : "No";
    const quantity = Math.max(1, Number(card.querySelector(`#${qtyId}`).value) || 1);

    cart.push({
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      name: product.name,
      presentation,
      quantity,
      grassFed,
    });

    renderCart();
    showAlert("Agregado al pedido");
    openCart();
  });

  return card;
}

function renderCart() {
  cartCount.textContent = String(cart.length);
  cartEmpty.hidden = cart.length > 0;
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <strong>${index + 1}. ${item.name}</strong>
        <span>Presentación: ${item.presentation}</span>
        <span>Cantidad: ${item.quantity}</span>
        <span>Grass-Fed: ${item.grassFed}</span>
      </div>
      <button type="button" class="cart-remove" aria-label="Eliminar ${item.name}">Eliminar</button>
    `;

    row.querySelector(".cart-remove").addEventListener("click", () => {
      const position = cart.findIndex((cartItem) => cartItem.id === item.id);
      if (position >= 0) {
        cart.splice(position, 1);
        renderCart();
        showAlert("Producto eliminado");
      }
    });

    cartList.appendChild(row);
  });
}

function openCart() {
  orderDrawer.classList.add("is-open");
  orderDrawer.setAttribute("aria-hidden", "false");
  orderFloat.setAttribute("aria-expanded", "true");
  drawerBackdrop.hidden = false;
}

function closeCartDrawer() {
  orderDrawer.classList.remove("is-open");
  orderDrawer.setAttribute("aria-hidden", "true");
  orderFloat.setAttribute("aria-expanded", "false");
  drawerBackdrop.hidden = true;
}

function showAlert(message) {
  clearTimeout(alertTimer);
  cartAlert.textContent = message;
  cartAlert.classList.add("is-visible");
  alertTimer = setTimeout(() => {
    cartAlert.classList.remove("is-visible");
  }, 2600);
}

function buildWhatsappMessage() {
  const total = "00.00";
  const lines = ["Hola COROZAL, quiero hacer este pedido:", ""];

  cart.forEach((item) => {
    lines.push(`- ${item.quantity} x ${item.name} - ${item.presentation}`);
  });

  lines.push("");
  lines.push(`Total estimado: $${total}`);
  lines.push("");
  lines.push("Por favor confírmenme disponibilidad, precio final y delivery.");

  return lines.join("\n");
}

products.forEach((product, index) => {
  productGrid.appendChild(createProductCard(product, index));
});

renderCart();

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

orderFloat.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
drawerBackdrop.addEventListener("click", closeCartDrawer);

continueShopping.addEventListener("click", () => {
  closeCartDrawer();
  document.querySelector("#productos")?.scrollIntoView({ behavior: "smooth" });
});

clearCart.addEventListener("click", () => {
  if (!cart.length) {
    showAlert("Agrega al menos un producto antes de vaciar tu pedido.");
    return;
  }

  cart.splice(0, cart.length);
  renderCart();
  showAlert("Pedido vaciado");
});

sendCart.addEventListener("click", () => {
  if (!cart.length) {
    showAlert("Agrega al menos un producto al pedido antes de enviarlo por WhatsApp.");
    openCart();
    return;
  }

  const url = `${whatsappBase}?text=${encodeURIComponent(buildWhatsappMessage())}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
