const cart = {};

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.parentElement.getAttribute("data-product-id");
    const price = parseFloat(button.parentElement.getAttribute("data-price"));
    const productName = button.parentElement.querySelector("h3").textContent;
    const imageUrl = button.parentElement.getAttribute("data-image");

    if (!cart[productId]) {
      cart[productId] = {
        quantity: 1,
        price: price,
        name: productName,
        image: imageUrl,
      };
    } else {
      cart[productId].quantity++;
    }
    updateCartDisplay();
  });
});

function updateCartDisplay() {
  const cartElement = document.getElementById("cart-items");
  cartElement.innerHTML = "";

  let totalPrice = 0;
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;

    const productElement = document.createElement("div");
    productElement.classList.add("cart-item");

    // เพิ่มรูปภาพสินค้า
    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.name;
    productElement.appendChild(imageElement);

    // เพิ่มข้อความรายละเอียดสินค้า
    const detailsElement = document.createElement("p");
    detailsElement.textContent = `${item.name}: ${item.quantity} x $${item.price} = $${itemTotalPrice}`;
    productElement.appendChild(detailsElement);

    // เพิ่มปุ่มลบสินค้า
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.classList.add("remove-from-cart");
    deleteButton.setAttribute("data-product-id", productId);
    deleteButton.addEventListener("click", () => {
      removeItemFromCart(productId);
    });
    productElement.appendChild(deleteButton);

    cartElement.appendChild(productElement);
  }

  if (Object.keys(cart).length === 0) {
    cartElement.innerHTML = "<p>No items in cart.</p>";
  } else {
    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
    cartElement.appendChild(totalPriceElement);
  }
}

function removeItemFromCart(productId) {
  if (cart[productId]) {
    if (cart[productId].quantity > 1) {
      cart[productId].quantity--;
    } else {
      delete cart[productId];
    }
    updateCartDisplay();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-product-id");
      removeItemFromCart(productId);
    });
  });
});
