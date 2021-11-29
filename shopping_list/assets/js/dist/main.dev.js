"use strict";

var CART = [{
  name: 'milk',
  qty: 2,
  price: 28,
  total: 56,
  buy: false
}, {
  name: 'bread',
  qty: 1,
  price: 12,
  total: 12,
  buy: false
}, {
  name: 'beer',
  qty: 2,
  price: 36,
  total: 74,
  buy: false
}, {
  name: 'cheese',
  qty: 1,
  price: 48,
  total: 48,
  buy: false
}];
var cartSort = "asc";

function checkAndAddProduct() {
  var name = document.getElementById('prod_name').value,
      qty = document.getElementById('prod_qty').value,
      price = document.getElementById('prod_price').value,
      valid = true;

  if (name == "") {
    valid = false;
  }

  if (qty == "") {
    valid = false;
  } else {
    qty = parseInt(qty);

    if (qty <= 0) {
      valid = false;
    }
  }

  if (price == "") {
    valid = false;
  } else {
    price = parseFloat(price);

    if (price <= 0) {
      valid = false;
    }
  }

  if (valid) {
    addToCard(name, qty, price);
  } else {
    panel.warning('Please fill correct all fields', true);
  }
}

function addToCard(name, qty, price) {
  //TODO: add product to CART
  console.log(name, qty, price);
  var ind = CART.findIndex(function (el) {
    return el.name == name;
  });
  console.log(ind);

  if (ind == -1) {
    CART.push({
      name: name,
      qty: qty,
      price: price,
      total: qty * price,
      buy: false
    });
  } else {
    CART[ind].buy = false;
    CART[ind].qty += qty;
    CART[ind].total = CART[ind].qty * CART[ind].price;
  }

  console.log(CART);
  document.getElementById('prod_name').value = '';
  document.getElementById('prod_qty').value = '1';
  document.getElementById('prod_price').value = '';
  panel.success('Product successefully added', true);
  shoppingList();
}

var productRow = function productRow(item, i) {
  return "\n    <tr>\n    <td>".concat(item.name, "</td>\n    <td class=\"text-center\">").concat(item.buy ? '<span class="badge bg-success">yes</span>' : '<span class="badge bg-danger">no</span>', "\n    </td>\n    <td class=\"text-end\">").concat(item.price.toFixed(2), "</td>\n    <td class=\"text-center\">").concat(item.qty, "</td>\n    <td class =\"text-end\">").concat(item.total.toFixed(2), "</td>\n    <td class=\"text-end\">\n        ").concat(!item.buy ? "<button type=\"button\" class=\"btn btn-success btn-sm\" onclick=\"buyProduct(".concat(i, ")\">buy</button>") : "", "\n        <button type=\"button\" class=\"btn btn-danger btn-sm\"\n        onclick=\"deleteFromCart(").concat(i, ")\">Delete</button>\n    </td>\n    </tr>");
};

shoppingList();

function shoppingList() {
  var card_html = '';
  var total = CART.reduce(function (accumPrice, curItem) {
    return accumPrice + curItem.total;
  }, 0);
  var total_buyed = CART.filter(function (item) {
    return item.buy;
  }).reduce(function (accumPrice, curItem) {
    return accumPrice + curItem.total;
  }, 0);
  var total_notbuyed = CART.filter(function (item) {
    return item.buy;
  }).reduce(function (accumPrice, curItem) {
    return accumPrice + curItem.total;
  }, 0);

  if (cartSort == "asc") {
    CART.sort(function (a, b) {
      return a.total - b.total;
    });
  } else {
    CART.sort(function (a, b) {
      return b.total - a.total;
    });
  }

  CART.forEach(function (item, i) {
    card_html += !item.buy ? productRow(item, i) : '';
  });
  CART.forEach(function (item, i) {
    card_html += item.buy ? productRow(item, i) : '';
  });
  document.getElementById('cart_list').innerHTML = card_html;
  document.getElementById('total').innerHTML = total.toFixed(2);
  document.getElementById('total_buyed').innerHTML = total_buyed.toFixed(2);
  document.getElementById('total_notbuyed').innerHTML = total_notbuyed.toFixed(2);
}

function changeSort() {
  cartSort = cartSort == "asc" ? "desc" : "asc";
  shoppingList();
}

var buyProduct = function buyProduct(ind) {
  if (typeof CART[ind] !== 'undefined') {
    CART[ind].buy = true;
    shoppingList();
    panel.info('Product buyed', true);
  } else {
    panel.danger('no product for buy', true);
  }
};

var deleteFromCart = function deleteFromCart(ind) {
  if (typeof CART[ind] !== 'undefined') {
    if (confirm("remove ".concat(CART[ind].name, " from cart?"))) {
      CART.splice(ind, 1);
      shoppingList();
      panel.success("Product removed from cart", true);
    }
  } else {
    panel.danger('not found product for remove', true);
  }
};

function productInBill(product) {
  return "<div class=\"name\">".concat(product.name, " (").concat(product.qty, ")</div> <div class=\"price\">").concat(product.price, " pc</div><div class=\"total\">").concat(product.total, "</div>");
}

function totalBill() {
  var sum = 0;

  for (i = 0; i < CART.length; i++) {
    sum = sum + CART[i].total;
  }

  return sum;
}

function shoppingBill() {
  var result = '';

  for (i = 0; i < CART.length; i++) {
    result += "\n        <li class=\"prod_item\">".concat(productInBill(CART[i]), "</li>");
  }

  result = result + "<li class=\"sum\"><div class=\"total_title\">Total sum:</div><div>".concat(totalBill(), "</div></li>");
}