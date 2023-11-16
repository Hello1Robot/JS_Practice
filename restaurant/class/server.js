const $serve_list = document.getElementById("serves");
const $result_list = document.getElementById("results");


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

        updateServeList()
        updateResultList()

        resolve(order);
      }, this.speed);

    })

  };
}

function updateServeList() {
  $serve_list.innerHTML = '';

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
    $serve_list.appendChild(serve);
  }
}





function updateResultList() {
  $result_list.innerHTML = '';

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
    $result_list.appendChild(result);
  }
}

function findServe() {
  return serves.find((serve) => serve.isWorked === false);
}

export function findRemainServe() {
  // setInterval로 서버 찾기
  return new Promise(resolve => {
    const serveInteval = setInterval(async () => {
      const server = findServe();
      if (server) {
        clearInterval(serveInteval);
        resolve(server)
      }
    }, 50)
  })
}

export function startServe(server, order) {
  return server.serve(order);
}


const serves = [new Server("서빙로봇1", 1000), new Server("서빙로봇2", 2000)];
const results = [];
