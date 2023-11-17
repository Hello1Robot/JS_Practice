import { createSticker, getSticker } from "./sticker.js";

const createStickerBtn = document.getElementById("createSticker");
const stickerField = document.getElementById("stickerField");

createStickerBtn.addEventListener("click", () => {
    console.log("Create Sticker")
    const sticker = createSticker();
    const item = document.createElement("div");
    item.id = "Sticker" + sticker.index;
    item.classList.add("sticker");
    item.style.backgroundColor = sticker.rgb;
    item.style.left = sticker.x + "px";
    item.style.top = sticker.y + "px";
    // id 추가

    // 타이틀 추가
    const itemTitle = document.createElement("h1");
    itemTitle.innerText = sticker.title;
    item.appendChild(itemTitle);

    //생성 버튼 추가
    const createItemBtn = document.createElement("button");
    createItemBtn.innerText = "항목 추가";

    createItemBtn.addEventListener("click", (e) => {
        const id = +(e.target.parentNode.id.replace("Sticker", ""));
        const sticker = getSticker(id);
        sticker.createStickerItem();
    })

    item.appendChild(createItemBtn);

    // 삭제 버튼 추가
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "스티커 삭제";
    deleteBtn.addEventListener("click", (event) => {
        const sticker = event.target.parentNode;
        sticker.remove();
    });

    item.appendChild(deleteBtn);

    // Sticker Contents 추가
    const stickerContents = document.createElement("div");
    stickerContents.id = "StickerContents" + sticker.index;

    item.appendChild(stickerContents);

    stickerField.appendChild(item);

})



