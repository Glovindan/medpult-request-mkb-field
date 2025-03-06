import moment from "moment";
import { JsonDataType } from "../types";

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
	window["getValueCallback"] = callback;
}

// Установка состояния "disabled"
type UpdateIsDisabledCallback = (isDisabled: true) => void
let updateIsDisabledCallback: UpdateIsDisabledCallback | undefined = undefined;
/** Установить функцию обратьного вызова для получения значения (Является disabled) */
const setUpdateIsDisabledCallback = (callback: UpdateIsDisabledCallback) => {
	updateIsDisabledCallback = callback;
	window["updateIsDisabledCallback"] = callback;
}

// Установка состояния isInvalid
type UpdateIsInvalidCallback = (isInvalid: true) => void
let updateIsInvalidCallback: UpdateIsInvalidCallback | undefined = undefined;
/** Установить функцию обратьного вызова для статуса валидации поля (Является не валидным) */
const setUpdateIsInvalidCallback = (callback: UpdateIsInvalidCallback) => {
	updateIsInvalidCallback = callback;
	window["updateIsInvalidCallback"] = callback;
}

/** Получение списка болезней */
async function getDiseaseList(): Promise<JsonDataType[]> {
  const mockDate = moment("23.08.2024", "DD.MM.YYYY").toDate();

  return [
    {
      id: "123456789",
      parentID: undefined,
      code: "G35-G37",
      shortname: "G00-G99",
      fullname: "Демиелинизирующие болезни нервной системы",
      startDate: mockDate,
      endDate: null,
      status: "действует",
      versionId: "",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      children: [
        {
          id: "1234567893",
          parentID: "123456789",
          code: "G35",
          shortname: "G35",
          fullname: "Множественный склероз",
          startDate: mockDate,
          endDate: null,
          status: "действует",
          versionId: "",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          children: [
            {
              id: "1234567896",
              parentID: "1234567893",
              code: "G35.0",
              shortname: "G35.0",
              fullname: "Множественный склероз с острым началом",
              startDate: mockDate,
              endDate: null,
              status: "действует",
              versionId: "",
              comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
              children: [
                {
                  id: "1234567899",
                  parentID: "1234567896",
                  code: "G35.00",
                  shortname: "G35.00",
                  fullname: "Множественный склероз, неуточненный",
                  startDate: mockDate,
                  endDate: null,
                  status: "действует",
                  versionId: "",
                  comment: "Lorem ipsum dolor sit amet",
                },
                {
                  id: "1234567898",
                  parentID: "1234567896",
                  code: "G35.01",
                  shortname: "G35.01",
                  fullname: "Множественный склероз, неуточненный",
                  startDate: mockDate,
                  endDate: null,
                  status: "действует",
                  versionId: "",
                  comment: "Lorem ipsum dolor sit amet",
                },
              ],
            },
          ],
        },
        {
          id: "1234567800",
          parentID: "123456789",
          code: "G36",
          shortname: "G36",
          fullname: "Эпилепсия и состояния, предшествующие эпилепсии",
          startDate: mockDate,
          endDate: null,
          status: "действует",
          versionId: "",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: "1234567810",
          parentID: "123456789",
          code: "G37",
          shortname: "G37",
          fullname: "Холера",
          startDate: mockDate,
          endDate: null,
          status: "действует",
          versionId: "",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    },
    {
      id: "1234567891",
      parentID: undefined,
      code: "G35-G37-1",
      shortname: "G00-G99",
      fullname: "Демиелинизирующие болезни нервной системы",
      startDate: mockDate,
      endDate: null,
      status: "действует",
      versionId: "",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      children: [
        {
          id: "12345678931",
          parentID: "1234567891",
          code: "G35-1",
          shortname: "G35",
          fullname: "Множественный склероз",
          startDate: mockDate,
          endDate: null,
          status: "действует",
          versionId: "",
          comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
          children: [
            {
              id: "12345678961",
              parentID: "12345678931",
              code: "G35.0-1",
              shortname: "G35.0",
              fullname: "Множественный склероз с острым началом",
              startDate: mockDate,
              endDate: null,
              status: "действует",
              versionId: "",
              comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
              children: [
                {
                  id: "12345678991",
                  parentID: "12345678961",
                  code: "G35.00-1",
                  shortname: "G35.00",
                  fullname: "Множественный склероз, неуточненный",
                  startDate: mockDate,
                  endDate: null,
                  status: "действует",
                  versionId: "",
                  comment: "Lorem ipsum dolor sit amet",
                },
                {
                  id: "12345678981",
                  parentID: "12345678961",
                  code: "G35.01-1",
                  shortname: "G35.01",
                  fullname: "Множественный склероз, неуточненный",
                  startDate: mockDate,
                  endDate: null,
                  status: "действует",
                  versionId: "",
                  comment: "Lorem ipsum dolor sit amet",
                },
              ],
            },
          ],
        },
        {
          id: "12345678001",
          parentID: "1234567891",
          code: "G36-1",
          shortname: "G36",
          fullname: "Эпилепсия и состояния, предшествующие эпилепсии",
          startDate: mockDate,
          endDate: null,
          status: "действует",
          versionId: "",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          id: "12345678101",
          parentID: "1234567891",
          code: "G37-1",
          shortname: "G37",
          fullname: "Холера",
          startDate: mockDate,
          endDate: null,
          status: "действует",
          versionId: "",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    }
  ];
}

/** Открыть модальное окно с выбором МКБ из дерева */
function openMkbModal() {
	alert("Open modal")
}

export default {
	setUpdateValueCallback,
	setGetValueCallback,
	setUpdateIsDisabledCallback,
	setUpdateIsInvalidCallback,
	getDiseaseList,
	openMkbModal
}