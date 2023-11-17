let index = 1;

export class StickerItem {
    index;
    content;

    constructor(content) {
        this.index = index++;
        this.content = content;
    }

}