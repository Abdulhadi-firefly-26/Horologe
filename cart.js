function get_cart() {
    let data = localStorage.getItem("cart");
    if (data == null) {
        return [];
    } else {
        return JSON.parse(data);
    }
}

function save_data(list) {
    localStorage.setItem("cart", JSON.stringify(list));
}

function do_math() {
    let list = get_cart();
    let total_sum = 0;
    let i = 0;
    for (i = 0; i < list.length; i++) {
        let obj = list[i];
        total_sum = total_sum + (obj.price * obj.qty);
    }
    document.getElementById("Total bill").value = total_sum;
}

function make_table() {
    let list = get_cart();
    let my_table = document.getElementById("table");
    
    while (my_table.children.length > 2) {
        my_table.removeChild(my_table.children[1]);
    }

    let i = 0;
    for (i = 0; i < list.length; i++) {
        let obj = list[i];
        let new_row = document.createElement("tr");
        let row_total = obj.price * obj.qty;
        
        let html_str = '<td>' + obj.title + '</td>' +
                       '<td>' + (1000 + i) + '</td>' +
                       '<td>' + obj.price + '</td>' +
                       '<td><input type="number" class="nos qty_change" data-index="' + i + '" value="' + obj.qty + '"></td>' +
                       '<td><input type="number" class="nos subtotal" value="' + row_total + '" readonly></td>' +
                       '<td><button class="remove_item_btn" data-index="' + i + '" style="background-color: rgb(78, 52, 27); color: beige; border-radius: 5px;">X</button></td>';
        
        new_row.innerHTML = html_str;
        my_table.insertBefore(new_row, my_table.lastElementChild);
    }
    do_math();
}

function wipe_cart() {
    localStorage.removeItem("cart");
    window.location.reload();
}

function send_fb() {
    let fb_box = document.getElementById("feedback");
    if (fb_box.value === "") {
        alert("Please write something.");
        return;
    }
    console.log("Thanks");
    fb_box.value = "";
}

function finish_order() {
    let n_input = document.getElementById("name");
    let p_input = document.getElementById("phone");
    let e_input = document.getElementById("email");
    let a_input = document.getElementById("address");

    if (get_cart().length === 0) {
        alert("Cart is empty.");
        return;
    }

    if (n_input.value === "") {
        alert("Need Name.");
        n_input.focus();
        return;
    }
    if (p_input.value === "") {
        alert("Need Phone.");
        p_input.focus();
        return;
    }
    if (e_input.value === "") {
        alert("Need Email.");
        e_input.focus();
        return;
    }
    if (a_input.value === "") {
        alert("Need Address.");
        a_input.focus();
        return;
    }

    alert("Order Confirmed! Total: " + document.getElementById("Total bill").value);

    wipe_cart();
    n_input.value = "";
    p_input.value = "";
    e_input.value = "";
    a_input.value = "";
}

document.addEventListener("DOMContentLoaded", function() {
    make_table();

    document.addEventListener("input", function(e) {
        if (e.target.classList.contains("qty_change")) {
            let input_el = e.target;
            let idx = parseInt(input_el.dataset.index);
            let val = parseInt(input_el.value);
            
            if (isNaN(val)) {
                let list = get_cart();
                let fresh_list = [];
                let k = 0;
                for (k = 0; k < list.length; k++) {
                    if (k !== idx) {
                        fresh_list.push(list[k]);
                    }
                }
                save_data(fresh_list);
                window.location.reload(); 
                return;
            }

            if (val <= 0) {
                 let list = get_cart();
                 let fresh_list = [];
                 let k = 0;
                 for (k = 0; k < list.length; k++) {
                     if (k !== idx) {
                         fresh_list.push(list[k]);
                     }
                 }
                 save_data(fresh_list);
                 window.location.reload();
                 return;
            }
            
            let list = get_cart();
            let cost = list[idx].price;
            
            list[idx].qty = val;
            save_data(list);

            let row_el = input_el.closest("tr");
            let sub_el = row_el.querySelector(".subtotal");
            if (sub_el) {
                sub_el.value = cost * val;
            }
            
            do_math();
        }
    });

    document.addEventListener("click", function(e) {
        let item = e.target;
        
        if (item.classList.contains("remove_item_btn")) {
            let idx = parseInt(item.dataset.index);
            let list = get_cart();
            let clean_list = [];
            let j = 0;
            for (j = 0; j < list.length; j++) {
                if (j !== idx) {
                    clean_list.push(list[j]);
                }
            }
            save_data(clean_list);
            window.location.reload(); 
            
        } else if (item.id === "button") {
            finish_order();
        } else if (item.id === "submitFeedbackButton") {
            send_fb();
        } else if (item.id === "clearCartButton") {
            wipe_cart();
        }
    });
});