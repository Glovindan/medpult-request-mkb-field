import React, { useState } from 'react'
import { FetchInputData } from '../../../UIKit/shared/types/types'
import MkbSelectedElement from './MkbSelectedElement/MkbSelectedElement'
import { JsonDataType } from '../../shared/types'
import {
    findItemByCode,
	findItemById,
	flattenTree,
	getAllChildrenIds,
	getAllParentsIds,
	getAllSelectedCodes,
	removeChildNodes,
	searchMkbItems,
} from '../../shared/utils/utils'
import Scripts from '../../shared/utils/clientScripts'
import { ObjectItem } from '../../../UIKit/Filters/FiltersTypes'
import MkbSearch from '../MkbSearch/MkbSearch'

/** Элемент мкб */
export interface MkbItem {
	/** Наименование */
	value: string
	/** Идентификатор */
	code: string
}

interface MkbFieldProps {
	/** Элементы списка */
	values: MkbItem[]
	/** Изменить значение массива элемента списка */
	setValues: (values: MkbItem[]) => void
}

/** Выпадающий список с множественным выбором и поиском */
function MkbField({ values, setValues }: MkbFieldProps) {
	const [mkbData, setMkbData] = useState<JsonDataType[]>([])
	const [searchQuery, setSearchQuery] = useState<string>('')

    /** Обновить значения по строке с разделителем ";" */
	const updateValueByString = (codes: string) => {
		const codesSplit = codes.split(";");
		const mkbItems = codesSplit
			.map(code => code.trim())
			.map(code => findItemByCode(code, mkbData))
            .filter(item => Boolean(item))
            .map(item => getMkbItemFromJsonData(item!));

		setValues(mkbItems)
	}

    /** Получить значения как строку с разделителем ";" */
    const getValueAsString = (): string => {
        const items = values
            .map(value => findItemById(value.code, mkbData))
            .map(item => item?.code)
            .filter(code => Boolean(code))
            .join(";")

        return items
    }
    
    // Установить колбэки
	React.useLayoutEffect(() => {
        if(!mkbData) return;

		Scripts.setUpdateValueCallback(updateValueByString)
		Scripts.setGetValueCallback(getValueAsString)
	}, [mkbData])

	// Получить список МКБ
	React.useLayoutEffect(() => {
		Scripts.getDiseaseList().then((mkbList) => setMkbData(mkbList))
	}, [])

	const getDataHandler = (page: number, query?: string): Promise<FetchInputData> => {
		const batchSize = 20

		// Поиск элементов списка
		const items = searchMkbItems(query ?? '', mkbData)
		// Количество найденных элементов
		const length = items.length
		// Получение части элементов и преобразование к типу
		const itemsSlice: ObjectItem[] = items
			.slice(page * batchSize, page * batchSize + batchSize)
			.map((item) => {
				return {
					code: item.id,
					value: `${item.code ?? ''} ${item.fullname ?? ""}`,
				}
			})

		return new Promise((res) => {
			res({
				items: itemsSlice,
				hasMore: length > page * batchSize + batchSize,
			})
		})
	}

	/** Выбор элемнта выпадающего списка */
	const setSearchValue = (value: string, data: string | undefined) => {
        if(!data) return;
		addItem(data)
	}

    const getMkbItemFromJsonData = (item: JsonDataType): MkbItem => {
        return {code: item!.id, value: item!.code ?? ""}
    }

    /** Выбор элемента */
    const addItem = (id: string) => {
        let item = findItemById(id, mkbData);
        if(!item) return;

        const selectedItemsIds = values.map(value => value.code);
        // Если выбран - ничего не делать
        if(selectedItemsIds.includes(id)) return;
        // Добавить текущий элемент
        selectedItemsIds.push(id);
        console.log("selectedItemsIds", JSON.stringify(selectedItemsIds))

        // id родительских элементов
        const parentsIds = getAllParentsIds(item, mkbData);
        // Если указан родительский элемент - не добавлять текущий
        if(selectedItemsIds.find(selectedId => parentsIds.find(parentId => selectedId == parentId))) return;
        
        // Родительский элемент
        const parentItem = item!.parentID ? findItemById(item!.parentID, mkbData) : undefined;
        // id дочерних элементы
        const parentItemChildrenIds = parentItem?.children?.map(child => child.id);
        // Выбранные дочерние элементы
        const includedChildrenIds = selectedItemsIds.filter(id => parentItemChildrenIds?.find(childId => childId === id));
        // Если выбраны все дочерние элементы родительского элемента, то работать с родительским элементом
        if(parentItem && includedChildrenIds.length === parentItemChildrenIds?.length) {
            item = parentItem;
            selectedItemsIds.push(parentItem.id);
        }

        // Удалить все дочерние элементы
        const childrenIds = getAllChildrenIds(item);
        const childrenFilteredItemsIds = selectedItemsIds.filter(selectedId => !childrenIds.includes(selectedId));

        // Преобразование типа
        const mkbItems: MkbItem[] = childrenFilteredItemsIds
            .map(id => findItemById(id, mkbData))
            .filter(item => Boolean(item))
            .map(item => getMkbItemFromJsonData(item!))
        
        setValues(mkbItems);
    }

    /** Удаление элемента */
    const removeItem = (id: string) => {
        let item = findItemById(id, mkbData);
        if(!item) return;
        
        const selectedItemsIds = values.map(value => value.code);
        
        // Фильтрация родительских элементов
        // id родительских элементов (по порядку с родительского до корневого)
        const parentsIds = getAllParentsIds(item, mkbData);

        // Найти индекс самого старшего выбранного элемента
        const rootItemIndex = parentsIds.findIndex(parentId => selectedItemsIds.find(selectedId => selectedId === parentId))
        
        // Отрезок id родительских элементов до корневого
        const parentsIdsSlice = parentsIds.slice(0, rootItemIndex + 1)
        // Перевернуть массив
        parentsIdsSlice.reverse()
        let parentsFilteredItems: string[] = selectedItemsIds;
        for(const parentId of parentsIdsSlice) {
            // Удалить текущий родительский элемент
            parentsFilteredItems = parentsFilteredItems.filter(selectedId => selectedId != parentId);

            // Добавить все дочерние элементы
            const parentItem = findItemById(parentId, mkbData);
            const childrenIds = parentItem?.children?.map(child => child.id).filter(childId => childId != id).filter(childId => childId != id) ?? [];
            parentsFilteredItems = [...parentsFilteredItems, ...childrenIds]
        }

        // Фильтрация текущего элемента
        // Убрать текущий элемент
        const filteredItems = parentsFilteredItems.filter(selectedId => selectedId != id);

        // Преобразование типа
        const mkbItems: MkbItem[] = filteredItems
            .map(id => findItemById(id, mkbData))
            .filter(item => Boolean(item))
            .map(item => getMkbItemFromJsonData(item!))

        setValues(mkbItems);  
    }

	return (
		<div className="mkb-field-wrapper">
			<div className="mkb-search">
				<MkbSearch<string>
					setValue={setSearchValue}
					value={searchQuery}
					getDataHandler={getDataHandler}

                    values={values}
                    addItem={addItem}
                    removeItem={removeItem}
                    mkbData={mkbData}
				/>
			</div>
			<div className="mkb-selected-list">
				{values.map((item) => (
					<MkbSelectedElement
						key={item.code}
						name={item.value}
						deleteHandler={() => removeItem(item.code)}
					/>
				))}
			</div>
		</div>
	)
}

export default MkbField
