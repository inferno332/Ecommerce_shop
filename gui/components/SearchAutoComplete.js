import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import httpRequest from '../ultis/axios'
import { useState } from 'react'
import axios from 'axios'

const SearchAutoComplete = ({products}) => {
  // note: the id field is mandatory
  const [searchResult, setSearchResult] = useState([])
  

  const handleOnSearch = async(string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string,results);
    if (string.length > 0) {
      try {
        const res = await axios.get(`${process.env.BASE_URL}/products/search/${string}`)
        let data = res.data.map(({_id, name}) => ({id: _id, name}))
        results = data
        setSearchResult(results)
        console.log(results);
      } catch (error) {
        
      }
    }
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
        <div className='w-full md:w-[180px] focus-within:w-full duration-500 z-10'>
          <ReactSearchAutocomplete
            items={searchResult}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            formatResult={formatResult}
            maxResults={7}
            inputDebounce='500'
            styling={{
                width: '100%',
            }}
          />
        </div>
  )
}


export default SearchAutoComplete
