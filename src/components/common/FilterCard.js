import React, {useState} from 'react'

export const FilterCard = ({setKeyword, setFrom, setTo, setSource, setCategory, setSearch}) => {
    const [keyword, setKeywordVal] = useState('');
    const [from, setFromVal] = useState('');
    const [to, setToVal] = useState('');
    const [source, setSourceVal] = useState('');
    const [category, setCategoryVal] = useState('');
    const handleKeyword = (e) =>{
        setKeyword(e);
        setKeywordVal(e)
    }
    const handleFrom = (e) =>{
        setFrom(e);
        setFromVal(e)
    }
    const handleTo = (e) =>{
        setTo(e);
        setToVal(e)
    }
    const handleSource = (e) =>{
        setSource(e);
        setSourceVal(e)
    }
    const handleCategory = (e) =>{
        setCategory(e);
        setCategoryVal(e)
    }
    const handleSearch = (e) =>{
        setSearch(e);
    }
  return (
    <>
        <h2 className="text-xl font-semibold mb-4">Filter Articles</h2>
        <div className="mb-4">
        <label className="block mb-1">Keyword</label>
        <input
            type="text"
            value={keyword}
            onChange={(e) => handleKeyword(e.target.value)}
            className="input input-bordered w-full"
        />
        </div>
        <div className="mb-4">
        <label className="block mb-1">From</label>
        <input
            type="date"
            value={from}
            onChange={(e) => handleFrom(e.target.value)}
            className="input input-bordered w-full"
        />
        </div>
        <div className="mb-4">
        <label className="block mb-1">To</label>
        <input
            type="date"
            value={to}
            onChange={(e) => handleTo(e.target.value)}
            className="input input-bordered w-full"
        />
        </div>
        <div className="mb-4">
        <label className="block mb-1">Source</label>
        <input
            type="text"
            value={source}
            onChange={(e) => handleSource(e.target.value)}
            className="input input-bordered w-full"
        />
        </div>
        <div className="mb-4">
        <label className="block mb-1">Category</label>
        <input
            type="text"
            value={category}
            onChange={(e) => handleCategory(e.target.value)}
            className="input input-bordered w-full"
        />
        </div>
        <button
        onClick={handleSearch}
        className="btn btn-primary w-full"
        // disabled={loading}
        >
        {/* {loading ? 'Searching...' : 'Search'} */}
        </button>
    </>
  )
}
