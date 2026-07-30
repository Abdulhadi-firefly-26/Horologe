document.addEventListener("click", function(e) {
    let clicked_el = e.target;
    if (clicked_el.classList.contains("button")) {
        let product_box = clicked_el.closest(".product");
        let prod_title = product_box.querySelector(".product_title").innerText;
        let price_txt = product_box.querySelector(".product_price").innerText;
        let real_price = parseInt(price_txt.replace("Price= ", ""));
        let q_input = product_box.querySelector(".qty");
        let quantity = parseInt(q_input.value);

        if (isNaN(quantity)) {
            console.error("Invalid");
            return;
        }
        if (quantity <= 0) {
            console.error("Invalid");
            return;
        }

        let store_data = localStorage.getItem("cart");
        let cart_list;

        if (store_data == null) {
            cart_list = [];
        } else {
            cart_list = JSON.parse(store_data);
        }

        let found_prod = null;
        let i = 0;
        for (i = 0; i < cart_list.length; i++) {
            if (cart_list[i].title === prod_title) {
                found_prod = cart_list[i];
                break;
            }
        }

        if (found_prod) {
            found_prod.qty = found_prod.qty + quantity;
        } else {
            cart_list.push({
                title: prod_title,
                price: real_price,
                qty: quantity
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart_list));
        q_input.value = "1";
        console.log("Added to cart");
    }
});