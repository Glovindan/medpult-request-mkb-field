import React from 'react';
import CustomInputSearch from '../../../UIKit/CustomInputSearch/CustomInputSearch';
import { FetchInputData } from '../../../UIKit/shared/types/types';
import MkbSelectedElement from './MkbSelectedElement/MkbSelectedElement';

/** Элемент мкб */
export interface MkbItem {
    /** Наименование */
    value: string,
    /** Идентификатор */
    code: string
}

interface MkbFieldProps {
	/** Элементы списка */
    values: MkbItem[],
	/** Изменить значение массива элемента списка */
    setValues: (values: MkbItem[]) => void
}


/** Выпадающий список с множественным выбором и поиском */
function MkbField({values, setValues}: MkbFieldProps) {
    const deleteHandler = (code: string) => {
        const valuesFiltered = values.filter(value => value.code != code);
        setValues(valuesFiltered);
    }

    const mock: FetchInputData = {items: [{value: "test", code: "tst"},{value: "test", code: "tst"},{value: "test", code: "tst"},{value: "test", code: "tst"},{value: "test", code: "tst"},{value: "test", code: "tst"},{value: "test", code: "tst"},], hasMore: false};
    const getMock = async (page: number, query?: string): Promise<FetchInputData> => {return mock}
	return (
		<div className="mkb-field-wrapper">
			<div className="mkb-search">{<CustomInputSearch setValue={() => { } } value={''} getDataHandler={getMock} />} </div>
			<div className="mkb-selected-list">
				{values.map(item => <MkbSelectedElement key={item.code} name={item.value} deleteHandler={() => deleteHandler(item.code)} />)}
			</div>
		</div>
	)
}

export default MkbField