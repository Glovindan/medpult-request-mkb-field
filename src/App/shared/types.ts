import { ItemData, ItemDataString } from '../../UIKit/CustomList/CustomListTypes'

export interface JsonDataType {
  /** Идентификатор записи */
  id: string;
  /** Идентификатор родительской записи */
  parentID?: string;
  /** Код записи */
  code?: string;
  /** Краткое наименование записи */
  shortname?: string;
  /** Полное наименование записи */
  fullname?: string;
  /** Дата начала действия записи */
  startDate?: Date;
  /** Дата окончания действия записи */
  endDate?: Date | null;
  /** Статус */
  status?: string;
  /** Внешний Идентификатор версии справочника */
  versionId?: string;
  /** Комментарий */
  comment?: string;

  children?: JsonDataType[];
}

export interface IInputData<DataType = any> {
	value: string
	data?: DataType
}

export class SelectTaskData {
	// Дата рождения
	dataBt?: ItemDataString
	// Номер задачи - строчька
	number?: ItemData
	// Статус задачи - флажки
	status?: ItemData
	// Тип задачи - флажки
	type?: ItemData
	// Вид задачи - поиск по названию
	sort?: ItemData
	// Дата создания - дата с по
	createdAt?: ItemDataString
	// Дата контроля - дата с по
	controledAt?: ItemDataString
	// Автор - поиск по названию
	author?: ItemData
	// Исполнитель - поиск по названию
	executor?: ItemData
	// Обращение - формы отбора
	request?: ItemData
	// Застрахованный - формы отбора
	insured?: ItemData
	// Страхователь
	insurer?: ItemData
	// Согласованные услуги
	servicesApproved?: ItemDataString

	isCollective?: ItemData

	constructor({
		dataBt,
		number,
		status,
		type,
		sort,
		createdAt,
		controledAt,
		author,
		executor,
		request,
		insured,
		insurer,
		servicesApproved,
		isCollective,
	}: SelectTaskData) {
		this.dataBt = dataBt
		this.number = number
		this.status = status
		this.type = type
		this.sort = sort
		this.createdAt = createdAt
		this.controledAt = controledAt
		this.author = author
		this.executor = executor
		this.request = request
		this.insured = insured
		this.insurer = insurer
		this.servicesApproved = servicesApproved
		this.isCollective = isCollective
	}
}
