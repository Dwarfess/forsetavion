import {IOption, IOptions} from "./types";

export const getOptions = (): IOptions => {
    let options = localStorage.getItem('options');

    if (!options) {
        const defaultOptions = JSON.stringify({
            music: '50',
            sounds: '50',
            language: 'uk'
        });

        localStorage.setItem('options', defaultOptions);
        options = defaultOptions;
    }

    return JSON.parse(options);
}

export const updateOptions = (option: IOption) => {
    const options = JSON.parse(localStorage.getItem('options') as any);
    localStorage.setItem('options', JSON.stringify({...options, [option.name]: option.value}));
}
