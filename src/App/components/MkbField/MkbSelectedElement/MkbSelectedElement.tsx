import React from 'react';
import icons from '../../../../UIKit/shared/icons';

interface MkbSelectedElementProps {
	/** Значение элемента */
	name: string,
	/** Обработчик удаления элемента */
	deleteHandler: () => void
	/** Неактивно */
	isDisabled: boolean
}

/** Список выбранных мкб */
export default function MkbSelectedElement({ name, deleteHandler, isDisabled }: MkbSelectedElementProps) {
	return (
		<div className="mkb-selected-element">
			<div className="mkb-selected-element__name">{name}</div>
			{!isDisabled && <div className='mkb-selected-element__close-button' onClick={() => deleteHandler()}>{icons.DeleteSearchItem}</div>}
		</div>
	)
}