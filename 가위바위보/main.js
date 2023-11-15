const gbb_list = ["가위", "바위", "보"]
const gbb_picture = {
  0: '0.jpg',
  1: '1.jpg',
  2: '2.jpg',
}

function gbb() {
  const computer = Math.floor(Math.random() * 3);
  const user = document.querySelector('input[name="유저"]:checked');
  const result = document.getElementById('result');
  if (user === null) {
    result.innerText = "가위바위보 중 하나를 선택해주세요."
    return;
  }
  document.getElementById('user_result').src = gbb_picture[user.value]
  document.getElementById('computer_result').src = gbb_picture[computer]
  document.getElementById('default_img').style.display = 'none';
  document.getElementById('img-container').style.display = 'flex';
  const gap = user.value - computer;
  document.getElementById('selected').innerText = `컴퓨터 : ${gbb_list[computer]}`
  if (user.value == computer) {
    result.innerText = "비겼습니다."
    result.className = 'draw';
  }
  else if (gap === -2 || gap === 1) {
    result.innerText = "이겼습니다."
    result.className = 'winner';
  } else {
    result.innerText = "졌습니다."
    result.className = 'loser';
  }

}
