import React, { useState } from 'react'
import { useParams, Link, useLoaderData } from 'react-router-dom'
import { Button, Collapse, Container } from 'react-bootstrap'

import './Guide.css'
import GuideFilter from './GuideFilter.js'
import GuideResult from './GuideResult.js'
import MonsterPopout from '../Popout/MonsterPopout.js'
import SpellPopout from '../Popout/SpellPopout.js'

const capFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)

function Guide () {
  const data = useLoaderData()
  const {guide_type: type} = useParams()

  const [popoutInfo, setPopoutInfo] = useState(false)
  const [info, setInfo] = useState(data)
  const [showFilter, setShowFilter] = useState(false)

  const viewGuides = info.map(data => <GuideResult key={data.index} data={data} setPopoutInfo={setPopoutInfo} type={type} />)

  const renderPopout = () => {
    switch(type) {
      case 'monsters':
        return <MonsterPopout specs={popoutInfo} setPopoutInfo={setPopoutInfo} />

      case 'spells':
        return <SpellPopout specs={popoutInfo} setPopoutInfo={setPopoutInfo} />
    }
  }

  const showFilters = () => {
    setShowFilter(!showFilter)
  }

  const resultsHead = () => {
    switch(type) {
      case 'monsters':
        return (
          <tr className="guide-result" id="guide-result-head">
            <th>Name</th>
            <th>Size</th>
            <th>HP</th>
            <th>AC</th>
            <th>CR</th>
            <th>XP</th>
          </tr>
        )
      
      case 'spells':
        return (
          <tr className="guide-result" id="guide-result-head">
            <th>Name</th>
            <th>Casting Time</th>
            <th>Range</th>
            <th>Level</th>
            <th>School</th>
            <th>Save DC</th>
          </tr>
        )
    }
  }

  return (
    <section className='page-layout-2'>
      <Link to='../' className='btn btn-type-2 btn-color-1 back-btn'>{'< Back'}</Link>

      <header className='guide-title'>
        <h1>{capFirst(type)}</h1>
      </header>

      <Container
        fluid
        id='guide-filter-wrap'
      >
        <Collapse className='w-100 px-3' in={showFilter}>
          <Container
            fluid
            className={`align-items-center guide-filters ${showFilter ? "" : "collapsed-filter"}`}
            id="guide-filter-collapse"
          >
            <GuideFilter type={type} setInfo={setInfo} showFilter={showFilter} />
            
          </Container>
        </Collapse>

        <Button
          onClick={showFilters}
          aria-controls="guide-filter-collapse"
          aria-expanded={showFilter}
          id="filter-collapse-btn"
        >
          {showFilter ? "Show Less" : 'Show More'} Filters
        </Button>
      </Container>

      <section className='guide-body'>
        {popoutInfo && renderPopout()}
        
        <table className='guide-results'>
          <thead>
            {resultsHead()}
          </thead>
          <tbody>
            {info[0] ? viewGuides : <tr className='guide-result'><td>No Data to Show</td></tr>}
          </tbody>
        </table>

      </section>
    </section>
  )
}

export default Guide