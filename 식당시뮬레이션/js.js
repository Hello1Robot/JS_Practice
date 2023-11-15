let index = 1;

let orders = [];
let cooks = [];
const results = [];
const chefs = [];
const serves = [];

const order_list = document.getElementById("orders");
const chef_list = document.getElementById("chefs");
const serve_list = document.getElementById("serves");
const result_list = document.getElementById("results");

const btns = document.getElementById("orderBtns");

const cook_times = {
  "순댓국": 2000,
  "해장국": 1000,
}


class Order {

  no;
  name;
  timer;
  isCooked;

  constructor(num, name, timer) {
    this.no = num;
    this.name = name;
    this.timer = timer;
    this.isCooked = false;
  }
}


class Chef {
  name = "요리사";
  isWorked = false;
  nowCook = "";
  constructor(name) {
    this.name = name;
  }



  cook(order) {
    return new Promise(resolve => {
      order.isCooked = true;
      this.isWorked = true;
      this.nowCook = `${order.no}번 ${order.name}`;

      updateChefList();
      updateOrderList();

      setTimeout(() => {
        this.isWorked = false;
        this.nowCook = '';
        cooks.push(order);
        orders = orders.filter(item => item != order);

        updateChefList();
        updateOrderList();

        resolve(order);
      }, order.timer);


    })

  };
}

class Server {
  name = "웨이터";
  isWorked = false;
  speed = 1000;
  nowServe = "";
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }

  serve(order) {
    return new Promise(resolve => {
      this.isWorked = true;
      this.nowServe = `${order.no}번 ${order.name}`;

      updateServeList()

      setTimeout(() => {
        this.isWorked = false;
        this.nowServe = '';
        results.push(order);
        cooks = cooks.filter(item => item != order);

        updateServeList()
        updateResultList()

        resolve(order);
      }, this.speed);

    })

  };
}



function setOrder(name) {
  let order = new Order(index++, name, cook_times[name]);
  orders.push(order);

  updateOrderList();

  return order;
}

function updateOrderList() {

  order_list.innerHTML = '';

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
    order_list.appendChild(order);
  }
}

function updateChefList() {

  chef_list.innerHTML = '';

  for (let item of chefs) {
    const chef = document.createElement('tr');
    chef.innerHTML = `
      <td>
        ${item.name}
      </td>
      <td>
        ${item.isWorked ? "요리중" : "대기중"}
      </td>
      <td>
        ${item.nowCook}
      </td>
    `
    chef_list.appendChild(chef);
  }
}

function updateServeList() {
  serve_list.innerHTML = '';

  for (let item of serves) {
    const serve = document.createElement('tr');
    serve.innerHTML = `
      <td>
        ${item.name}
      </td>
      <td>
        ${item.isWorked ? "서빙중" : "대기중"}
      </td>
      <td>
        ${item.nowServe}
      </td>
    `
    serve_list.appendChild(serve);
  }
}

function updateResultList() {
  result_list.innerHTML = '';

  for (let i = results.length - 1; i > -1; i--) {
    const item = results[i]
    const result = document.createElement('tr');
    result.innerHTML = `
      <td>
        ${item.no}
      </td>
      <td>
        ${item.name}
      </td>
    `
    result_list.appendChild(result);
  }
}

function findChef() {
  for (let chef of chefs) {
    if (chef.isWorked === false) {
      return chef;
    }

  }
  return null;
}

function findServe() {
  for (let serve of serves) {
    if (serve.isWorked === false) {
      return serve;
    }

  }
  return null;
}

function getChef(order) {
  return new Promise(resolve => {
    // setInteval로 셰프 찾기
    const chefInteval = setInterval(async () => {
      const chef = await findChef();
      if (chef) {
        clearInterval(chefInteval);
        resolve({ chef, order })
      }
    }, 50);
  }).then(({ chef, order }) => chef.cook(order))
}

function getServe(order) {
  // setInterval로 서버 찾기
  return new Promise(resolve => {
    const serveInteval = setInterval(async () => {
      const server = findServe();
      if (server) {
        clearInterval(serveInteval);
        resolve({ server, order })
      }
    }, 50)
  }).then(({ server, order }) => server.serve(order))
}

function orderExecute(name) {
  // Order 생성하기
  const order = setOrder(name);

  getChef(order)
    .then((order) => getServe(order))



}




btns.addEventListener("click", (e) => {

  if (e.target.tagName !== "BUTTON") {
    return;
  }
  let value = e.target.value;
  orderExecute(value);
});


chefs.push(new Chef("이연복"));
chefs.push(new Chef("김풍"));
serves.push(new Server("서빙로봇1", 1000));
serves.push(new Server("서빙로봇2", 2000));

updateChefList();
updateOrderList();
updateServeList();



