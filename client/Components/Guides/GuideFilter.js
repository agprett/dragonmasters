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
            <div class="form-piece">
              <label for="filter-cr-min">Challenge Rating Min</label>
              <input
              id="filter-cr-min"
              placeholder='ex: 2'
              type='number'
              min='0'
              max='30'
              />
            </div>
            <div class="form-piece">
              <label for="filter-cr-max">Challenge Rating Max</label>
              <input
                id="filter-cr-max"
                placeholder='ex: 14'
                type='number'
                min='0'
                max='30'
              />
            </div>
            <div class="form-piece">
              <label for="filter-size">Size</label>
              <select id="filter-size">
                <option selected value=''>Select Size</option>
                <option>Tiny</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>Huge</option>
                <option>Gargantuan</option>
              </select>
            </div>
          </>
        )

      case 'spells':

        return (
          <>
            <div class="form-piece">
              <label for="filter-casting-time">Casting Time</label>
              <select id="filter-casting-time">
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
            </div>
            <div class="form-piece">
              <label for="filter-school">School</label>
              <select id="filter-school">
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
            </div>
            <div class="form-piece">
              <label for="filter-min-level">Min Level</label>
              <select id="filter-min-level">
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
            </div>
            <div class="form-piece">
              <label for="filter-max-level">Max Level</label>
              <select id="filter-max-level">
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
            </div>
            <div class="form-piece">
              <label for="filter-class">Class</label>
              <select id="filter-class">
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
            </div>
          </>
        )
    }
  }

  return (
    <form id='guide-filters' onSubmit={sendFilters} onReset={resetFilters}>
      <p className='form-header'>Filters</p>
      <div class="form-piece">
        <label for="filter-name">Name</label>
        <input id="filter-name" placeholder='ex: Dragon'/>
      </div>
      {createForm()}
      <button class="btn btn-type-2 btn-type-2-hover" type='submit'>Filter</button>
      <button class='btn btn-type-2 btn-type-2-hover' type='reset'>Clear Filters</button>
    </form>
  )
}

export default GuideFilter