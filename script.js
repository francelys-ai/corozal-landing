const whatsappPhone = "18132149276";
const whatsappBase = `https://wa.me/${whatsappPhone}`;

const products = [
  {
    name: "Tenderloin",
    description:
      "Corte fino, suave y elegante, ahumado lentamente para lograr una textura delicada y un sabor profundo.",
    sauce: "Reducción de vino tinto y especias",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=82",
  },
  {
    name: "Picanha",
    description:
      "Corte jugoso y lleno de carácter, reconocido por su sabor intenso y su equilibrio entre suavidad y grasa natural.",
    sauce: "Chimichurri premium",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=82",
  },
  {
    name: "Roast Beef",
    description:
      "Preparación clásica de carne ahumada, ideal para disfrutar en platos fríos, calientes o combinaciones gourmet.",
    sauce: "Mantequilla de ajo rostizado y hierbas",
    image: "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&fit=crop&w=900&q=82",
  },
  {
    name: "Ribeye",
    description:
      "Corte marmoleado, intenso y jugoso, ahumado en barril para resaltar su riqueza natural.",
    sauce: "Mantequilla de ajo rostizado y hierbas o reducción de vino tinto",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=82",
  },
  {
    name: "Cerdo",
    description:
      "Carne de cerdo ahumada lentamente, tierna, aromática y perfecta para comidas prácticas con sabor artesanal.",
    sauce: "Teriyaki ahumada con miel y jengibre",
    image: "assets/corozal-hero-ribs.png",
  },
  {
    name: "Costillas de cerdo",
    description:
      "Costillas ahumadas en barril hasta lograr una textura jugosa, aroma profundo y sabor auténtico.",
    sauce: "BBQ bourbon ahumada",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=82",
  },
];

const presentations = [
  { label: "Individual 250 g", message: "Individual 250 g" },
  { label: "Dúo 500 g", message: "Dúo 500 g" },
  { label: "Familiar 1000 g", message: "Familiar 1000 g" },
];

const styleOptions = [
  "Plain / Natural",
  "Con salsa premium recomendada",
];

const premiumSauces = [
  {
    name: "Reducción de vino tinto y especias",
    description: "Profunda, elegante y aromática. Ideal para cortes de res.",
    tone: "wine",
  },
  {
    name: "Mantequilla de ajo rostizado y hierbas",
    description: "Cremosa, brillante y suave. Perfecta para realzar la jugosidad.",
    tone: "butter",
  },
  {
    name: "Chimichurri premium",
    description: "Fresco, herbal y balanceado. Ideal para picanha y cortes a la parrilla.",
    tone: "herb",
  },
  {
    name: "BBQ bourbon ahumada",
    description: "Intensa, dulce y ahumada. Perfecta para cerdo y costillas.",
    tone: "bbq",
  },
  {
    name: "Teriyaki ahumada con miel y jengibre",
    description: "Dulce-salada, brillante y moderna. Ideal para cerdo.",
    tone: "teriyaki",
  },
];

const cart = [];
const productGrid = document.querySelector("#productGrid");
const sauceGrid = document.querySelector("#sauceGrid");
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
  const styleId = `style-${index}`;
  const grassId = `grass-${index}`;
  const qtyId = `qty-${index}`;
  const sauceId = `sauce-${index}`;

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
        <label class="field-full" for="${styleId}">
          Estilo
          <select id="${styleId}">
            ${styleOptions.map((item) => `<option value="${item}">${item}</option>`).join("")}
          </select>
        </label>
        <p class="style-copy">
          Cada corte puede servirse Plain / Natural o acompañado con un potecito de salsa premium de la casa, seleccionada para realzar el sabor ahumado sin cubrir la esencia de la carne.
        </p>
        <p class="sauce-line" id="${sauceId}" hidden>
          Incluye potecito de: <strong>${product.sauce}</strong>
        </p>
        <label class="check-line" for="${grassId}">
          <input id="${grassId}" type="checkbox" />
          Grass-fed bajo pedido
        </label>
        <button class="btn product-order" type="button">Agregar al pedido</button>
      </div>
    </div>
  `;

  const styleSelect = card.querySelector(`#${styleId}`);
  const sauceLine = card.querySelector(`#${sauceId}`);

  styleSelect.addEventListener("change", () => {
    sauceLine.hidden = styleSelect.value !== "Con salsa premium recomendada";
  });

  card.querySelector(".product-order").addEventListener("click", () => {
    const presentation = card.querySelector(`#${selectId}`).value;
    const style = styleSelect.value;
    const sauce = style === "Con salsa premium recomendada" ? product.sauce : "";
    const grassFed = card.querySelector(`#${grassId}`).checked ? "Sí" : "No";
    const quantity = Math.max(1, Number(card.querySelector(`#${qtyId}`).value) || 1);

    cart.push({
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      type: "cut",
      name: product.name,
      presentation,
      style,
      sauce,
      quantity,
      grassFed,
    });

    renderCart();
    showAlert("Agregado al pedido");
    openCart();
  });

  return card;
}

function createSauceCard(sauce, index) {
  const card = document.createElement("article");
  card.className = "sauce-card";
  card.dataset.tone = sauce.tone;

  const qtyId = `sauce-qty-${index}`;

  card.innerHTML = `
    <div class="sauce-visual" aria-hidden="true">
      <span></span>
    </div>
    <div class="sauce-body">
      <div>
        <h3>${sauce.name}</h3>
        <p>${sauce.description}</p>
      </div>
      <p class="sauce-availability">Disponible como salsa adicional</p>
      <div class="sauce-actions">
        <label for="${qtyId}">
          Cantidad
          <input id="${qtyId}" type="number" min="1" value="1" inputmode="numeric" />
        </label>
        <button class="btn sauce-order" type="button">Agregar salsa</button>
      </div>
    </div>
  `;

  card.querySelector(".sauce-order").addEventListener("click", () => {
    const quantity = Math.max(1, Number(card.querySelector(`#${qtyId}`).value) || 1);

    cart.push({
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      type: "sauce",
      name: sauce.name,
      quantity,
    });

    renderCart();
    showAlert("Salsa agregada al pedido");
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
    const detailMarkup =
      item.type === "sauce"
        ? `
          <strong>${index + 1}. Salsa adicional</strong>
          <span>${item.name}</span>
          <span>Cantidad: ${item.quantity}</span>
        `
        : `
          <strong>${index + 1}. ${item.name}</strong>
          <span>Presentación: ${item.presentation}</span>
          <span>Estilo: ${item.style}</span>
          ${item.sauce ? `<span>Salsa: ${item.sauce}</span>` : ""}
          <span>Cantidad: ${item.quantity}</span>
          <span>Grass-Fed: ${item.grassFed}</span>
        `;

    row.innerHTML = `
      <div>${detailMarkup}</div>
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
  const lines = ["Hola COROZAL, quiero hacer este pedido:", ""];
  const cuts = cart.filter((item) => item.type !== "sauce");
  const sauces = cart.filter((item) => item.type === "sauce");

  lines.push("Cortes:");
  if (!cuts.length) {
    lines.push("- Sin cortes seleccionados");
  }

  cuts.forEach((item) => {
    const sauceText = item.sauce ? ` | Salsa: ${item.sauce}` : "";
    lines.push(`- ${item.quantity} x ${item.name} | ${item.presentation} | ${item.style}${sauceText} | Grass-Fed: ${item.grassFed}`);
  });

  if (sauces.length) {
    lines.push("");
    lines.push("Salsas adicionales:");
    sauces.forEach((item) => {
      lines.push(`- ${item.quantity} x ${item.name}`);
    });
  }

  lines.push("");
  lines.push("Por favor confírmenme disponibilidad, precio final y delivery.");

  return lines.join("\n");
}

products.forEach((product, index) => {
  productGrid.appendChild(createProductCard(product, index));
});

premiumSauces.forEach((sauce, index) => {
  sauceGrid.appendChild(createSauceCard(sauce, index));
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
  document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
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
