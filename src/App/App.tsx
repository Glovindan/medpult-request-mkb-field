import React, { useEffect, useState } from 'react';	
import MkbField, { MkbItem } from './components/MkbField/MkbField'
import Scripts from './shared/utils/clientScripts'
import { findItemByCode } from './shared/utils/utils';

export default function App() {
	const [values, setValues] = useState<MkbItem[]>([]);
	
	return (
		<MkbField values={values} setValues={(values: MkbItem[]) => {setValues(values)}}/>
	)
}
