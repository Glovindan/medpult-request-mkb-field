import React, { useState } from 'react';	
import MkbField, { MkbItem } from './components/MkbField/MkbField'

export default function App() {
	const [values, setValues] = useState<MkbItem[]>([
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	  {
		value: "test",
		code: "test1"
	  },
	  {
		value: "test",
		code: "test11"
	  },
	]);
  
	return (
	  <>
		<MkbField values={values} setValues={(values: MkbItem[]) => {setValues(values)}}/>
	  </>
	)
}
