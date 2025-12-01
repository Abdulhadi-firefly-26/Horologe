document.addEventListener("input", function(e) {
    if (e.target.id === "search") {
        let query = e.target.value.toLowerCase();
        let products = document.querySelectorAll(".product");
        let i;
        for (i = 0; i < products.length; i++) {
            let product = products[i];
            let title = product.querySelector(".product_title").textContent.toLowerCase();
            if (title.includes(query)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        }
    }
});