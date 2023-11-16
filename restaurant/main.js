import { findRemainChef, startCook } from './class/chef.js';
import { setOrder, findFirstOrder } from './class/order.js';
import { findRemainServe, startServe } from './class/server.js';

const $orderBtns = document.getElementById("orderBtns");

async function orderExecute(name) {
  // Order 생성하기
  setOrder(name);

  // 가능한 쉐프 찾기
  const chef = await findRemainChef()
  // 최신 오더 찾기
  const order = findFirstOrder()
  // 요리 진행하기
  await startCook(chef, order)
  // 가능한 서버 찾기
  const server = await findRemainServe();
  // 서빙 진행하기
  await startServe(server, order)

}

$orderBtns.addEventListener("click", (e) => {

  if (e.target.tagName !== "BUTTON") {
    return;
  }
  let value = e.target.value;
  orderExecute(value);
});



