// Установка значения в МКБ
type UpdateValueCallback = (value: string) => void
let updateValueCallback: UpdateValueCallback | undefined = undefined;
const setUpdateValueCallback = (callback: UpdateValueCallback) => {
	updateValueCallback = callback;
}

// Получение значения МКБ
type GetValueCallback = () => string
let getValueCallback: GetValueCallback | undefined = undefined;
/** Установить функцию обратьного вызова для получения значения */
const setGetValueCallback = (callback: GetValueCallback) => {
	getValueCallback = callback;
}

// Установка состояния "disabled"
type UpdateIsDisabledCallback = (isDisabled: true) => void
let updateIsDisabledCallback: UpdateIsDisabledCallback | undefined = undefined;
/** Установить функцию обратьного вызова для получения значения */
const setUpdateIsDisabledCallback = (callback: UpdateIsDisabledCallback) => {
	updateIsDisabledCallback = callback;
}