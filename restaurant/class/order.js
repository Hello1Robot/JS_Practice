let index = 1;
let orders = [];
const $order_list = document.getElementById("orders");


const cook_times = {
  "순댓국": 2000,
  "해장국": 1000,
}

export class Order {

  no;
  name;
  timer;
  isCooked = false;

  constructor(num, name, timer) {
    this.no = num;
    this.name = name;
    this.timer = timer;
  }

  startCook() {
    this.isCooked = true;
  }

}

export function setOrder(name) {
  let order = new Order(index++, name, cook_times[name]);
  orders.push(order);
  updateOrderList();

}

export function findFirstOrder() {
  return orders.find((order) => order.isCooked === false);
}

export function removeOrder(order) {
  orders = orders.filter(item => item != order);
}

export function updateOrderList() {

  $order_list.innerHTML = '';

  for (let item of orders) {
    const order = document.createElement('tr');
    order.innerHTML = `
      <td>
        ${item.no}
      </td>
      <td>
        ${item.name}
      </td>
      <td>
        ${item.isCooked ? "요리중" : "대기중"}
      </td>
    `
    $order_list.appendChild(order);
  }
}