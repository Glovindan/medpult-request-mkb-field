import React, { useEffect, useRef, useState } from 'react'
import { ItemData, ListColumnData } from '../CustomListTypes'
import { icon } from '../../../App/shared/iconsCol'

interface ListColumnProps extends ListColumnData {
	data: ItemData<any>

	listRef: React.RefObject<HTMLDivElement>
}

/** Столбец одной строки таблицы */
function CustomListRowColumn(props: ListColumnProps) {
const { fr, data, isLink, onClick, listRef, isIcon, isRollable } = props;

	const onClickColumn =
		isLink && onClick
			? () => {
					onClick(data)
			  }
			: () => {}

	const iconToShow = data.value === 'collective' ? icon.collective : icon.individ

	const wrapperRef = useRef<HTMLDivElement>(null);
	const spanRef = useRef<HTMLSpanElement>(null);

	const [isShowMore, setIsShowMore] = useState<boolean>(false);

	const showMore = () => {
		if (!isRollable) return;

		setIsShowMore(true);

		if (!spanRef.current) return
		if (!wrapperRef.current) return
		if (!listRef.current) return

		spanRef.current.style.width = wrapperRef.current.getBoundingClientRect().width + "px"

		// const moreWrapperBottom = spanRef.current.getBoundingClientRect().bottom;
		// const listWrapperBottom = listRef.current.getBoundingClientRect().bottom

		// console.log(moreWrapperBottom)
		// console.log(listWrapperBottom)
		// console.log(spanRef.current.getBoundingClientRect())

		// if (moreWrapperBottom > listWrapperBottom) {
		// 	console.log("иди ты нахуй сука")
		// 	// spanRef.current.style.removeProperty("margin-top")
		// 	// spanRef.current.style.marginBottom = "0"
		// }
	}

	useEffect(() => {
		if (!isShowMore) return;
		if (!spanRef.current) return
		if (!wrapperRef.current) return
		if (!listRef.current) return

		const moreWrapperBottom = spanRef.current.getBoundingClientRect().bottom;
		const listWrapperBottom = listRef.current.getBoundingClientRect().bottom

		console.log(moreWrapperBottom)
		console.log(listWrapperBottom)
		console.log(spanRef.current.getBoundingClientRect())

		if (moreWrapperBottom > listWrapperBottom) {
			spanRef.current.style.marginTop = 52 - (spanRef.current.getBoundingClientRect().height) + "px";
		}
	}, [isShowMore])

	const hideMore = () => {
		setIsShowMore(false);

		if (!spanRef.current) return
		spanRef.current.style.removeProperty("margin-top")
	}

	return (
		<div
			className={
				isLink ? 'custom-list-row-column custom-list-row-column__link' : 'custom-list-row-column'
			}
			style={{ flex: fr }}
      ref={wrapperRef}
		>
			<span onMouseEnter={showMore} onMouseOut={hideMore} ref={spanRef} title={isRollable ? "" : data.value} onClick={onClickColumn} className={isShowMore ? 'custom-list-row-column__more' : 'custom-list-row-column__less'}>
				{isIcon && iconToShow}
				{!isIcon && data.value}
			</span>
		</div>
	)
}

export default CustomListRowColumn
