import React from 'react'
import { initGlobalContext } from './GlobalContext'
import {
	AppFilter,
	DateFilter,
	IFiltersData,
	ListFilter,
	StringFilter,
} from '../../UIKit/Filters/FiltersTypes'

/** Данные обращения */
export class SelectTaskData {
	/** Фильтры поиска */
	filters: SelectTaskFilters
	/** Состояние оберток фильтров */
	filterStates: SelectTaskFiltersStates
	/** Обработчик нажатия на кнопку поиск */
	onClickSearch: () => Promise<void>
	/** Количество отобранных элементов */
	elementsCount: number

	constructor() {
		this.filters = new SelectTaskFilters()
		this.filterStates = new SelectTaskFiltersStates()
		this.onClickSearch = async () => {
			console.log('onClickSearch is not mounted')
		}
		this.elementsCount = 0
	}
}

/** Состояние оберток фильтров */
export class SelectTaskFiltersStates {
	/** Номер задачи */
	number: boolean
	/** Статус задачи */
	status: boolean
	/** Тип задачи */
	type: boolean
	/** Вид задачи */
	sort: boolean
	/** Дата создания */
	createdAt: boolean
	/** Дата контроля */
	controledAt: boolean
	/** Автор */
	author: boolean
	/** Исполнитель */
	executor: boolean
	/** Обращение */
	request: boolean
	/** Застрахованный */
	insured: boolean
	/** Страхователь */
	insurer: boolean
	/** Группа автора */
	authorGroup: boolean
	/** Группа исполнителя */
	executorGroup: boolean

	constructor() {
		this.number = false
		this.status = false
		this.type = false
		this.sort = false
		this.createdAt = false
		this.controledAt = false
		this.author = false
		this.executor = false
		this.request = false
		this.insured = false
		this.insurer = false
		this.authorGroup = false
		this.executorGroup = false
	}
}

/** Значения фильтров формы отбора задач */
export class SelectTaskFilters implements IFiltersData {
	/** Дата рождения */
	dataBt: DateFilter
	/** Номер задачи */
	number: StringFilter
	/** Статус задачи */
	status: ListFilter
	/** Тип задачи */
	type: ListFilter
	/** Вид задачи */
	sort: ListFilter
	/** Дата создания */
	createdAt: DateFilter
	/** Дата контроля */
	controledAt: DateFilter
	/** Автор */
	author: ListFilter
	/** Группа автора */
	authorGroup: ListFilter
	/** Исполнитель */
	executor: ListFilter
	/** Группа исполнителя */
	executorGroup: ListFilter
	/** Обращение */
	request: AppFilter
	/** Согласованные услуги */
	servicesApproved: StringFilter
	/** Застрахованный */
	insured: StringFilter
	/**Страхователь */
	insurer: StringFilter
	/** */
	isCollective: ListFilter

	constructor(selectTaskFilters?: SelectTaskFilters) {
		this.dataBt = new DateFilter('dataBt', 'дата рождения', {
			valueFrom: selectTaskFilters?.dataBt.valueFrom,
			valueTo: selectTaskFilters?.dataBt.valueTo,
		})
		this.number = new StringFilter('number', 'номер задачи', selectTaskFilters?.number.value)
		this.status = new ListFilter('status', 'статус задачи', selectTaskFilters?.status.values)
		this.type = new ListFilter('type', 'тип задачи', selectTaskFilters?.type.values)
		this.sort = new ListFilter('sort', 'вид задачи', selectTaskFilters?.sort.values)

		this.createdAt = new DateFilter('createdAt', 'дата создания', {
			valueFrom: selectTaskFilters?.createdAt.valueFrom,
			valueTo: selectTaskFilters?.createdAt.valueTo,
		})

		this.controledAt = new DateFilter('controledAt', 'дата контроля', {
			valueFrom: selectTaskFilters?.controledAt.valueFrom,
			valueTo: selectTaskFilters?.controledAt.valueTo,
		})

		this.author = new ListFilter('author', 'автор', selectTaskFilters?.author.values)
		this.authorGroup = new ListFilter(
			'authorGroup',
			'группа автора',
			selectTaskFilters?.authorGroup.values
		)
		this.executor = new ListFilter('executor', 'исполнитель', selectTaskFilters?.executor.values)
		this.executorGroup = new ListFilter(
			'executorGroup',
			'группа исполнителя',
			selectTaskFilters?.executorGroup.values
		)
		this.request = new AppFilter('request', 'обращение', selectTaskFilters?.request.value)
		this.servicesApproved = new StringFilter(
			'servicesApproved',
			'согласованные услуги',
			selectTaskFilters?.servicesApproved.value
		)
		this.insured = new StringFilter('insured', 'застрахованный', selectTaskFilters?.insured.value)
		this.insurer = new StringFilter('insurer', 'страхователь', selectTaskFilters?.insurer.value)
		this.isCollective = new ListFilter('isCollective', '', selectTaskFilters?.isCollective?.values)
	}

	reset() {
		this.dataBt.reset()
		this.number.reset()
		this.status.reset()
		this.type.reset()
		this.sort.reset()
		this.createdAt.reset()
		this.controledAt.reset()
		this.author.reset()
		this.authorGroup.reset()
		this.executor.reset()
		this.executorGroup.reset()
		this.request.reset()
		this.insured.reset()
		this.insurer.reset()
	}
}

export const selectTaskContext = initGlobalContext<SelectTaskData>(new SelectTaskData())
