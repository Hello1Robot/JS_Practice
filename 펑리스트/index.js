const addBtns = document.getElementById("addBtns");
const pungName = document.getElementById("pungName");
const pungList = document.getElementById("pungs");

const clearBtn = document.getElementById("clearBtn");
const multipleBtn = document.getElementById("multipleBtn");
const plusAllBtn = document.getElementById("plusAllBtn");
const stopAllBtn = document.getElementById("stopAllBtn");
const startAllBtn = document.getElementById("startAllBtn");

const plusBtns = document.getElementsByClassName("plusBtn");
const stopBtns = document.getElementsByClassName("stopBtn");
const removeBtns = document.getElementsByClassName("removeBtns");

const totalCnt = document.getElementById("totalCnt");
const avgTime = document.getElementById("avgTime");

let pungs = new Map();
let index = 1;

class Pung {
  index;
  name;
  timer;
  isStopped = false;

  constructor(name, timer) {
    this.index = index++;
    this.name = name;
    this.timer = +timer;
  }

  updateTimer() {
    this.timer += 5;
  }

  toggleTimer() {
    this.isStopped = !this.isStopped;
  }

}

addBtns.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON" || pungName.value.trim() === '') {
    return;
  }
  let value = e.target.value;
  const pung = new Pung(pungName.value.trim(), value);
  pungs.set(pung.index, pung);
  pungName.value = '';

  startTimer(pung);

  updatePungList()
})

function startTimer(pung) {
  const timerInterval = setInterval(function () {

    if (pung.isStopped) {
      return;
    }
    if (pung.timer <= 0) {
      clearInterval(timerInterval);
      removePung(pung.index);
    } else {
      pung.timer -= 1;
    }
    updatePungList()
  }, 1000);
}

// 정렬
function sorting() {
  pungs = new Map([...pungs].sort((a, b) => a[1].timer - b[1].timer));
}

// 화면 업데이트
function updatePungList() {
  totalCnt.innerText = `총 ${pungs.size} 건 `;
  let totalTime = 0;
  pungList.innerHTML = '';
  sorting();

  for (let [index, item] of pungs) {
    totalTime += item.timer;
    const pung = document.createElement('li');
    pung.innerHTML = `
      <span class="item">
        ${item.name}
      </span>
      <span class="item">
        ${item.timer}초
      </span>
      <button class="plusBtn" value="${index}">+5초</button>
      <button class="stopBtn" value="${index}">${item.isStopped ? "시작" : "중지"}</button>
      <button class="removeBtn" value="${index}">삭제</button>
    `
    pungList.appendChild(pung);
    // 시간 추가
    const plusBtn = pung.getElementsByClassName("plusBtn")[0];
    plusBtn.addEventListener("click", () => {
      let idx = plusBtn.value;
      let item = pungs.get(+idx);
      item.updateTimer();
      updatePungList();
    })

    // 정지 & 시작
    const stopBtn = pung.getElementsByClassName("stopBtn")[0];
    stopBtn.addEventListener("click", () => {
      let idx = stopBtn.value;
      pungs.get(+idx).toggleTimer();
      updatePungList();
    })

    // 삭제
    const removeBtn = pung.getElementsByClassName("removeBtn")[0];
    removeBtn.addEventListener("click", () => {
      let idx = removeBtn.value;
      removePung(+idx);
      updatePungList();
    })

  }
  avgTime.innerText = `평균 남은시간 : ${totalTime === 0 ? 0 : (totalTime / pungs.size).toFixed(1)} 초`

}

// 전체 시간 추가
plusAllBtn.addEventListener("click", () => {
  for (let [_, pung] of pungs) {
    pung.updateTimer();
  }
  updatePungList()
});

// 전체 멈춤
stopAllBtn.addEventListener("click", () => {
  for (let [_, pung] of pungs) {
    pung.isStopped = true;
  }
  updatePungList()
})

// 전체 시작
startAllBtn.addEventListener("click", () => {
  for (let [_, pung] of pungs) {
    pung.isStopped = false;
  }
  updatePungList()
})

// 삭제 기능
function removePung(index) {
  pungs.delete(index);
  updatePungList();
}

// 초기화
function removeAll() {
  pungs.clear();
  updatePungList();
}

clearBtn.addEventListener("click", removeAll);

// 복사 기능
// 인덱스를 새로 부여
function multiplePung() {
  const now = pungs.size;
  if (now > 100) {
    return;
  }
  let cnt = 0;
  for (let [_, pung] of pungs) {
    const newPung = new Pung(pung.name, pung.timer);
    newPung.isStopped = pung.isStopped;
    pungs.set(newPung.index, newPung);
    startTimer(newPung);
    if (++cnt >= now) {
      break;
    }
  }
  updatePungList();
}

multipleBtn.addEventListener("click", multiplePung)







