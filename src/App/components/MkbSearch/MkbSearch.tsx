import React, { useDeferredValue, useEffect, useRef, useState } from 'react';
import CustomInput from '../../../UIKit/CustomInput/CustomInput';
import CustomSelectList from '../../../UIKit/CustomSelect/CustomSelectList/CustomSelectList';
import CustomSelectRow from '../../../UIKit/CustomSelect/CustomSelectRow/CustomSelectRow';
import InputButton from '../../../UIKit/InputButton/InputButton';
import icons from '../../../UIKit/shared/icons';
import { CustomInputProps, FetchInputData } from '../../../UIKit/shared/types/types';
import { ObjectItem } from '../../../UIKit/Filters/FiltersTypes';
import useDebounce from '../../../UIKit/shared/utils/hooks';
import MkbSelectRow from './MkbSelectRow/MkbSelectRow';
import { findItemById, getAllParentsIds } from '../../shared/utils/utils';
import { JsonDataType } from '../../shared/types';
import { MkbItem } from '../MkbField/MkbField';
import Scripts from '../../shared/utils/clientScripts';

interface CustomInputSearchProps<DataType = string> extends CustomInputProps {
	/** Измение состояния */
	setValue: (value: string, data?: DataType) => any
	/** Получение данных выпадающего списка */
	getDataHandler: (page: number, query?: string) => Promise<FetchInputData>,
	/** Дополнительные данные (напр. идентификатор) */
	data?: DataType
	/** Флажок режима просмотра */
	isViewMode?: boolean,
	/** Обработчик выбора элемента списка */
	optionClickHandler?: ({ value, data, closeCallback }: { value: string, data?: DataType, closeCallback: () => void }) => void,
	/** Элементы списка */
	values: MkbItem[]
	/** Список МКБ */
	mkbData: JsonDataType[]
	/** Выбрать элемент */
	addItem: (id: string) => void
	/** Убрать элемент */
	removeItem: (id: string) => void
}

/** Выпадающий список с поиском */
function MkbSearch<DataType>(props: CustomInputSearchProps<DataType>) {
	const { value, setValue, optionClickHandler, getDataHandler, values, mkbData, addItem, removeItem, ...restProps } = props;

	// Страница
	const [page, setPage] = useState<number>(0);
	// Параметр остановки подгрузки элементов
	const [hasMore, setHasMore] = useState<boolean>(true);
	// Флажок открытости списка
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// Флажок загрузки
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// Ширина списка
	const [listWidth, setListWidth] = useState<number>(0);
	// Значения списка
	const [listValues, setListValues] = useState<ObjectItem[]>([]);
	// Ссылка на обертку поля
	const rootRef = useRef<HTMLDivElement>(null);
	// Ссылка на поле
	const wrapperRef = useRef<HTMLDivElement>(null);
	// Значение поискового запроса
	const [query, setQuery] = useState<string>("");
	// Значение поискового запроса с debounce
	const deferredQuery = useDebounce(query, 500);

	/** Загрузка данных списка */
	const loadData = async (query?: string, values: ObjectItem[] = [], page: number = 0, hasMore: boolean = true) => {
		if (isLoading) return;
		if (!hasMore) return;

		// Показать лоадер
		setIsLoading(true)

		// Получение данных
		const fetchData = await getDataHandler(page, query);
		setHasMore(fetchData.hasMore)

		// Запись данных
		setListValues([...values, ...fetchData.items])
		setPage(page + 1);

		// Скрыть лоадер
		setIsLoading(false)
	}

	/** Перезагрузка данных списка */
	const reloadData = (query?: string) => {
		setListValues([]);

		loadData(query)
	}

	// debounce
	useEffect(() => {
		// Загрузить элементы по введенной строке
		reloadData(query);
	}, [deferredQuery])


	/** Обработчик ввода в поле поиска */
	const inputHandler = (ev) => {
		setQuery(ev.target.value)

		// Открыть список
		setIsOpen(true)
	}

	/** Обработчик нажатия на поле ввода */
	const clickHandler = (ev) => {
		// Открыть список
		setIsOpen(true)

		// Загрузить данные
		reloadData()
	}

	/** Обработчик закрытия списка */
	const closeHandler = () => {
		// Закрыть список
		setIsOpen(false)

		// Стереть текущее значение поискового запроса
		setQuery("")
	}

	/** Обработчик нажатия на вариант списка */
	const handleOptionClick = (value: string, data?: DataType) => {
		// Функция обратного вызова закрытия списка
		const closeCallback = () => setIsOpen(false);
		// Если в пропсах есть обработчик - вернуть его
		if (optionClickHandler) return optionClickHandler({ value, data, closeCallback })

		// Установить значение
		setValue(value, data)
		setQuery("")

		// Скрыть список
		closeCallback()
	}

	/** Вычисление размера выпадающего списка */
	useEffect(() => {
		const wrapper = wrapperRef.current!;
		setListWidth(wrapper.getBoundingClientRect().width);
	}, [isOpen])

	/** Обработчик скролла по вертикали */
	const scrollCallback = () => {
		loadData(query, listValues, page, hasMore)
	}
	
	/** Является ли элемент выбранным */
	const isItemChecked = (id: string): boolean => {
        const selectedItemsIds = values.map(value => value.code);
		// Если элемент явно выбран - является выбранным
		if(selectedItemsIds.includes(id)) return true;

		const item = findItemById(id, mkbData);
		// Если элемент не найден в справочнике - не является выбранным
		if(!item) return false;

		// Если выбран один из цепочки родителей - является выбранным
		const parentsIds = getAllParentsIds(item, mkbData);
        if(selectedItemsIds.find(selectedId => parentsIds.find(parentId => parentId === selectedId))) return true

		// Иначе - не является выбранным
		return false
	}

	return (
		<div className="custom-select" ref={rootRef}>
			<CustomInput
				{...restProps}
				value={isOpen ? query : value}
				setValue={v => setQuery(v)}
				onInput={inputHandler}
				clickHandler={clickHandler}
				wrapperRef={wrapperRef}
				cursor={props.isViewMode ? 'text' : 'pointer'}
				isOpen={isOpen}
				buttons={[<InputButton svg={icons.Search} clickHandler={Scripts.openMkbModal()} />]}
			/>
			{isOpen &&
				<CustomSelectList
					rootRef={rootRef}
					isOpen={isOpen}
					closeHandler={closeHandler}
					isLoading={isLoading}
					listWidth={listWidth}
					scrollCallback={scrollCallback}
				>
					{listValues.map(item =>
						<MkbSelectRow
							value={item.value}
							data={item.code}
							isSelected={isItemChecked(item.code)}
							addItem={addItem}
							removeItem={removeItem}
						/>
					)}
				</CustomSelectList>
			}
		</div>
	)
}

export default MkbSearch
