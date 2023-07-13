import React, {useEffect, useState} from 'react'
import axios from 'axios'

const buildFilterString = (filters) => {
  let filterArray = []

  for(let key in filters) {
    filterArray.push(key + '=' + filters[key])
  }

  return filterArray.join('&')
}

function GuideFilter (props) {
  const {type, setGuideData} = props

  const [filters, setFilters] = useState({name: ''})

  useEffect(() => {
    axios.get(`/api/${type}?${buildFilterString(filters)}`)
      .then(res => {
        const {data} = res
        console.log(data)
        setGuideData(data)
      })
  }, [])

  const sendFilters = (e) => {
    e.preventDefault()

    axios.get(`/api/${type}?${buildFilterString(filters)}`)
      .then(res => {
        const {data} = res
        setGuideData(data)
      })
  }

  const resetFilters = () => {
    setFilters({name: ''})

    axios.get(`/api/${type}`)
      .then(res => {
        const {data} = res
        setGuideData(data)
      })
  }

  const createForm = () => {
    switch(type) {
      case 'monsters':

        return (
          <>
            <input
              placeholder='Challenge Rating'
              type='number'
              min='0'
              max='30'
              value={filters.challenge_rating}
              onChange={e => setFilters({...filters, challenge_rating: e.target.value})}
            />
            <select value={filters.size} onChange={e => setFilters({...filters, size: e.target.value})}>
              <option selected value=''>Select Size</option>
              <option>Tiny</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>Huge</option>
              <option>Gargantuan</option>
            </select>
          </>
        )

      case 'spells':

        return (
          <>
            <select value={filters.casting_time} onChange={e => setFilters({...filters, casting_time: e.target.value})}>
              <option selected value=''>Select Casting Time</option>
              <option>1 action</option>
              <option>1 bonus action</option>
              <option>1 reaction</option>
              <option>1 minute</option>
              <option>10 minutes</option>
              <option>1 hour</option>
              <option>8 hours</option>
              <option>12 hours</option>
              <option>24 hours</option>
            </select>
            <select value={filters.school} onChange={e => setFilters({...filters, school: e.target.value})}>
              <option selected value=''>Select School</option>
              <option>Evocation</option>
              <option>Conjuration</option>
              <option>Abjuration</option>
              <option>Transmutation</option>
              <option>Enchantment</option>
              <option>Necromancy</option>
              <option>Divination</option>
              <option>Illusion</option>
            </select>
            <select value={filters.minLevel} onChange={e => setFilters({...filters, minLevel: e.target.value})}>
              <option selected value=''>Select Min Level</option>
              <option value='0'>Cantrip</option>
              <option value='1'>1st</option>
              <option value='2'>2nd</option>
              <option value='3'>3rd</option>
              <option value='4'>4th</option>
              <option value='5'>5th</option>
              <option value='6'>6th</option>
              <option value='7'>7th</option>
              <option value='8'>8th</option>
              <option value='9'>9th</option>
            </select>
            <select value={filters.maxLevel} onChange={e => setFilters({...filters, maxLevel: e.target.value})}>
              <option selected value=''>Select Max Level</option>
              <option value='0'>Cantrip</option>
              <option value='1'>1st</option>
              <option value='2'>2nd</option>
              <option value='3'>3rd</option>
              <option value='4'>4th</option>
              <option value='5'>5th</option>
              <option value='6'>6th</option>
              <option value='7'>7th</option>
              <option value='8'>8th</option>
              <option value='9'>9th</option>
            </select>
            <select value={filters.classSelect} onChange={e => setFilters({...filters, classSelect: e.target.value})}>
              <option selected value=''>Select Class</option>
              <option>Wizard</option>
              <option>Sorcerer</option>
              <option>Cleric</option>
              <option>Paladin</option>
              <option>Ranger</option>
              <option>Bard</option>
              <option>Druid</option>
              <option>Warlock</option>
            </select>
          </>
        )
    }
  }

  return (
    <section id='guide-filters'>
      <p>Filters</p>
      <form onSubmit={sendFilters} onReset={resetFilters}>
        <input placeholder='Name' value={filters.name} onChange={(e) => setFilters({...filters, name: e.target.value})}/>
        {createForm()}
        <button type='submit'>Filter</button>
        <button type='reset'>Clear Filters</button>
      </form>
    </section>
  )
}

export default GuideFilter