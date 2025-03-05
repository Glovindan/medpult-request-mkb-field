import React, { useEffect, useState } from 'react'
import CustomInputCheckbox from '../../../../UIKit/CustomInputCheckbox/CustomInputCheckbox'

interface MkbSelectRowProps {
	value: string,
	data: string,
	isSelected: boolean,
	/** Выбрать элемент */
	addItem: (id: string) => void,
	/** Убрать элемент */
	removeItem: (id: string) => void,
}

/** Элемент выпадающего списка МКБ */
function MkbSelectRow({ value, data, isSelected, addItem, removeItem}: MkbSelectRowProps) {
	const onClickRow = (ev: any) => {
		ev.stopPropagation();
	}
	
	return (
		<div className="mkb-select__row" onClick={onClickRow}>	
			<CustomInputCheckbox title={value} checked={isSelected} 
				setValue={(value: boolean) => {
					console.log(value)
					if(value) {
						addItem(data)
					} else {
						removeItem(data)
					}
				}
			} />
			{/* {value} */}
		</div>
	)
}

export default MkbSelectRow
