import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const SearchAutoComplete = () => {
  // note: the id field is mandatory
  const items = [
    {
      id: 0,
      name: 'Cobol'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Basic'
    },
    {
      id: 3,
      name: 'PHP'
    },
    {
      id: 4,
      name: 'Java'
    }
  ]

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }


  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  }

  return (
        <div className='w-full md:w-[180px] focus-within:w-full duration-500 z-10'>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            formatResult={formatResult}
            styling={{
                width: '100%',
            }}
          />
        </div>
  )
}
export default SearchAutoComplete
