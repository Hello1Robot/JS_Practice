import { StickerItem } from './stickerItem.js';

let now_x = 50;
let now_y = 50;
let index = 1;
const stickerList = [];

class Sticker {
    index;
    title;
    x;
    y;
    rgb;
    stickerItemList = [];

    constructor() {
        this.index = index++;
        this.title = "Sticker" + this.index;
        this.x = now_x;
        this.y = now_y;
        now_x += 5;
        now_y += 5;

        const red = 200 - Math.ceil(Math.random() * 50)
        const green = 200 - Math.ceil(Math.random() * 50)
        const blue = 200 - Math.ceil(Math.random() * 50)

        this.rgb = "rgb(" + red + ", " + green + ", " + blue + ")";

    }

    createStickerItem() {
        const stickerItem = new StickerItem("메세지를 입력하세요");
        this.stickerItemList.push(stickerItem);
        this.stickerItemRender();
    }

    stickerItemRender() {
        const sticker = document.getElementById("StickerContents" + this.index);
        sticker.innerHTML = '';
        this.stickerItemList.forEach((item) => {
            const content = document.createElement("div");
            content.classList.add("sticker-item");
            content.id = "StickerItem" + item.index;

            const textBox = document.createElement("div");
            textBox.classList.add("itemContent");
            textBox.innerText = item.content;
            content.appendChild(textBox);

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("itemDelete");
            deleteBtn.innerText = "삭제";
            content.appendChild(deleteBtn);

            // 텍스트 수정 및 삭제 버튼 기능 구현
            content.addEventListener("click", (e) => {
                if (e.target.tagName === "BUTTON") {
                    const stickerItem = e.target.parentNode;
                    const id = +(stickerItem.id.replace("StickerItem", ""));
                    this.stickerItemList = this.stickerItemList.filter((item) => +item.index != id);
                    stickerItem.remove();
                }
            })

            sticker.appendChild(content);
        })



    }



    deleteItem(index) {
        this.stickerItemList = this.stickerItemList.filter((item) => item.index != index);
    }

}

export function createSticker() {
    const sticker = new Sticker();
    stickerList.push(sticker);
    return sticker;
}

export function getSticker(id) {
    return stickerList.find((item) => item.index === id);
}