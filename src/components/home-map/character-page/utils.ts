import { defaultCharacter } from "./constants";

export const getCharacter = () => {
    const character = localStorage.getItem('character');

    return character ? JSON.parse(character) : structuredClone(defaultCharacter);
}

export const editNicknameHandler = (e: any) => {
    const currentText = e?.target?.innerText;
    if (currentText.length > 9) {
        e.target.innerText = currentText.slice(0, 12);
        // Позиція курсора переміщується в кінець, коли змінюється текст
        // const range = document.createRange();
        const sel = window.getSelection();
        // // range.setStart(editableRef.current.childNodes[0], 12);
        // range.collapse(true);
        //
        // @ts-ignore
        sel.removeAllRanges();
        // @ts-ignore
        // sel.addRange(range);
    }
}
