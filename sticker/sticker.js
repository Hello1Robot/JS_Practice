import { StickerItem } from './stickerItem.js';
import { setZIndex } from './main.js';

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

            const textBox = document.createElement("span");
            textBox.classList.add("itemContent");
            textBox.innerText = item.content;
            content.appendChild(textBox);

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("itemDelete");
            deleteBtn.innerText = "삭제";
            content.appendChild(deleteBtn);

            // 텍스트 수정 및 삭제 버튼 기능 구현
            content.addEventListener("mousedown", (e) => {
                e.stopPropagation();
                if (e.target.tagName === "BUTTON") {
                    const stickerItem = e.target.parentNode;
                    const id = +(stickerItem.id.replace("StickerItem", ""));
                    this.stickerItemList = this.stickerItemList.filter((item) => +item.index != id);
                    stickerItem.remove();
                }
            })
            sticker.appendChild(content);

            content.addEventListener("mousedown", (e) => {
                const stickerItem = e.currentTarget;
                const mother = stickerItem.parentNode;
                const max_idx = setZIndex();
                mother.style.zIndex = max_idx;
                stickerItem.style.zIndex = max_idx;
                console.log(mother);
                let shiftX = e.clientX - stickerItem.getBoundingClientRect().left;
                let shiftY = e.clientY - stickerItem.getBoundingClientRect().top;

                const startX = e.pageX - shiftX;
                const startY = e.pageY - shiftY;

                stickerItem.style.position = "fixed";

                function moveAt(pageX, pageY) {
                    // 이동한 위치에 사용자가 클릭한 shift를 반영하여 위치 수정해주기
                    stickerItem.style.left = pageX - shiftX + "px";
                    stickerItem.style.top = pageY - shiftY + "px";
                }

                function onMouseMove(event) {
                    moveAt(event.pageX, event.pageY);
                }


                // 해당 위치로 이동
                moveAt(e.pageX, e.pageY);

                function checkMove() {

                }

                // mosemove = 해당 위치로 마우스 움직이기
                document.addEventListener("mousemove", onMouseMove);

                // mouseup이 되면, 기존 함수 삭제하기
                stickerItem.addEventListener("mouseup", (e) => {
                    document.removeEventListener("mousemove", onMouseMove);
                    // stickerItem.style.zIndex = "";
                    const targetSticker = document.elementsFromPoint(e.pageX, e.pageY).find(element => element.className === "sticker");
                    console.log(targetSticker);
                    if (targetSticker) {
                        // 옮길 대상 : item (순회중)

                        const targetStickerIndex = +(targetSticker.id.replace("Sticker", ""));
                        const targetStickerInstance = getSticker(targetStickerIndex);
                        const sourceSticker = stickerItem.parentNode.parentNode;
                        const sourceStickerIndex = +(sourceSticker.id.replace("Sticker", ""));
                        console.log(sourceSticker);
                        const sourceStickerInstance = getSticker(sourceStickerIndex);



                        sourceStickerInstance.stickerItemList = sourceStickerInstance.stickerItemList.filter((targetItem) => targetItem.index != item.index);
                        targetStickerInstance.stickerItemList.push(item);
                        this.stickerItemRender();
                        targetStickerInstance.stickerItemRender();
                    }
                    else {
                        stickerItem.style.left = startX + "px";
                        stickerItem.style.top = startY + "px";
                        this.stickerItemRender();
                    }

                });

                stickerItem.addEventListener("dragend", (e) => {
                    document.removeEventListener("mousemove", onMouseMove);
                    const targetSticker = document.elementsFromPoint(e.pageX, e.pageY).find(element => element.matches("div#Sticker1.sticker"));
                    stickerItem.style.zIndex = "";
                    if (targetSticker) {
                        // 옮길 대상 : item (순회중)
                        const targetStickerIndex = +(targetSticker.id.replace("Sticker", ""));
                        const targetStickerInstance = getSticker(targetStickerIndex);
                        const sourceSticker = stickerItem.closest(".sticker");
                        const sourceStickerIndex = +(sourceSticker.id.replace("Sticker", ""));
                        const sourceStickerInstance = getSticker(sourceStickerIndex);

                        sourceStickerInstance.stickerItemList = sourceStickerInstance.stickerItemList.filter((targetItem) => targetItem.index != item.index);
                        targetStickerInstance.stickerItemList.push(item);
                        this.stickerItemRender();
                        targetStickerInstance.stickerItemRender();
                    }
                    else {
                        stickerItem.style.left = startX + "px";
                        stickerItem.style.top = startY + "px";
                        this.stickerItemRender();
                    }

                });




            });


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