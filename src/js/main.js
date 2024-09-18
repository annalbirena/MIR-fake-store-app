let productsData = [];

function startTimer(timerElement, buttonElement, availableTime) {
  const timerInterval = setInterval(() => {
    const minutes = Math.floor((availableTime % 3600000) / 60000);
    const seconds = Math.floor((availableTime % 60000) / 1000);

    // Actualizar el temporizador visible en formato HH:MM:SS
    timerElement.textContent = `00:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    // Disminuir el tiempo restante
    availableTime -= 1000;

    // Si el tiempo llega a 0, detener el temporizador y deshabilitar el botón
    if (availableTime <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "00:00:00";
      buttonElement.disabled = true;
      buttonElement.textContent = "Unavailable";
    }
  }, 1000);
}

function renderProducts() {
  const productsContainer = document.querySelector(".list");

  productsData.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.classList.add("card");

    const cardImageDiv = document.createElement("div");
    cardImageDiv.classList.add("card__image");

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.classList.add("card__image-photo");

    cardImageDiv.appendChild(img);

    const cardDetailsDiv = document.createElement("div");
    cardDetailsDiv.classList.add("card__details");

    const title = document.createElement("h2");
    title.classList.add("card__title");
    title.textContent = product.title;

    const description = document.createElement("p");
    description.classList.add("card__description");

    const truncatedDescription = product.description.slice(0, 56);
    const lastSpaceIndex = truncatedDescription.lastIndexOf(" ");
    const finalDescription =
      lastSpaceIndex === -1
        ? truncatedDescription
        : truncatedDescription.slice(0, lastSpaceIndex);

    description.textContent = finalDescription + "...";

    const cardInfoDiv = document.createElement("div");
    cardInfoDiv.classList.add("card__info");

    const price = document.createElement("span");
    price.classList.add("card__price");
    price.textContent = `$${product.price}`;

    const category = document.createElement("span");
    category.classList.add("card__category");
    category.textContent = product.category;

    cardInfoDiv.appendChild(price);
    cardInfoDiv.appendChild(category);

    const timer = document.createElement("p");
    timer.classList.add("card__timer");
    timer.textContent = "Temporizador";

    const button = document.createElement("button");
    button.classList.add("card__button");
    button.textContent = "Add to bag";

    cardDetailsDiv.appendChild(title);
    cardDetailsDiv.appendChild(description);
    cardDetailsDiv.appendChild(cardInfoDiv);
    cardDetailsDiv.appendChild(timer);
    cardDetailsDiv.appendChild(button);

    productCard.appendChild(cardImageDiv);
    productCard.appendChild(cardDetailsDiv);

    productsContainer.appendChild(productCard);

    // Timer
    const randomTime = Math.floor(Math.random() * 120000) + 60000;
    startTimer(timer, button, randomTime);
  });
}

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    productsData = data;
    renderProducts();

    console.log(data);
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}

document.addEventListener("DOMContentLoaded", getProducts);
