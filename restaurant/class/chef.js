import { updateOrderList, removeOrder } from './order.js'

const $chef_list = document.getElementById("chefs");

export class Chef {
  name = "요리사";
  isWorked = false;
  nowCook = "";
  constructor(name) {
    this.name = name;
  }

  cook(order) {
    return new Promise(resolve => {
      order.startCook();
      this.isWorked = true;
      this.nowCook = `${order.no}번 ${order.name}`;

      updateChefList();
      updateOrderList();

      setTimeout(() => {
        this.isWorked = false;
        this.nowCook = '';

        removeOrder(order);

        updateChefList();
        updateOrderList();

        resolve(order);
      }, order.timer);

    })

  };
}

export function updateChefList() {

  $chef_list.innerHTML = '';

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
    $chef_list.appendChild(chef);
  }
}

function findChef() {
  return chefs.find((chef) => chef.isWorked === false);
}

export function findRemainChef() {
  return new Promise(resolve => {
    // setInteval로 셰프 찾기
    const chefInteval = setInterval(async () => {
      const chef = findChef();
      if (chef) {
        clearInterval(chefInteval);
        resolve(chef)
      }
    }, 50);
  })
}

export function startCook(chef, order) {
  console.log(chef);
  return chef.cook(order);
}

const chefs = [new Chef("이연복"), new Chef("김풍")];