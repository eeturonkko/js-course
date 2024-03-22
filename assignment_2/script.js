const fetchProducts = async () => {
  try {
    const response = await fetch("products.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching the products:", error);
  }
};

const renderProducts = async () => {
  const data = await fetchProducts();
  const tableBody = document
    .getElementById("productTable")
    .getElementsByTagName("tbody")[0];

  data.forEach((product) => {
    const row = tableBody.insertRow();

    const cellId = row.insertCell();
    cellId.textContent = product.id;

    const cellImage = row.insertCell();
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = `Image of ${product.name}`;
    image.style.width = "100px";
    cellImage.appendChild(image);

    const cellName = row.insertCell();
    cellName.textContent = product.name;

    const cellPrice = row.insertCell();
    cellPrice.textContent = `$${product.price}`;

    const cellInventory = row.insertCell();
    cellInventory.textContent = product.inventory;

    const cellProductCode = row.insertCell();
    cellProductCode.textContent = product.productCode;
  });
};

renderProducts();
