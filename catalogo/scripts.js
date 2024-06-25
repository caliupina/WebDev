document.addEventListener("DOMContentLoaded", () => {
    const expandButtons = document.querySelectorAll(".expand");
    const categoryLinks = document.querySelectorAll(".navbar a");
    const products = document.querySelectorAll(".product");
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");

    // Função para alternar a descrição do produto
    expandButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const description = e.target.closest(".product").querySelector(".description");
            description.style.display = description.style.display === "none" ? "block" : "none";
        });
    });

    // Função para filtrar produtos por categoria
    categoryLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = link.getAttribute("data-category");
            products.forEach(product => {
                const productCategory = product.querySelector(".categoriaProduto").textContent.trim();
                if (productCategory === category || category === "all") {
                    product.style.display = "flex";
                } else {
                    product.style.display = "none";
                }
            });
        });
    });

    // Função para buscar produtos pelo nome
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector(".nameProduto").textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = "flex";
            } else {
                product.style.display = "none";
            }
        });
    });
});
