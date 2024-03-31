import React, { useState } from 'react'
import { useParams, Link, useLoaderData } from 'react-router-dom'

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

  const viewGuides = info.map(data => <GuideResult key={data.index} data={data} setPopoutInfo={setPopoutInfo} type={type} />)

  const renderPopout = () => {
    switch(type) {
      case 'monsters':
        return <MonsterPopout specs={popoutInfo} setPopoutInfo={setPopoutInfo} />

      case 'spells':
        return <SpellPopout specs={popoutInfo} setPopoutInfo={setPopoutInfo} />
    }
  }

  const resultsHead = () => {
    switch(type) {
      case 'monsters':
        return (
          <tr className="guide-result" id="guide-result-head">
            <th className='result-name'>Name</th>
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
            <th className='result-name'>Name</th>
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
      <header className='guide-title'>
        <Link to='../' className='btn btn-type-1 btn-color-1 back-btn'>{'< Back'}</Link>
        <h1 className='title-2'>{capFirst(type)}</h1>
      </header>

      <section className='guide-body'>

        {popoutInfo ? renderPopout() : ''}

        <GuideFilter type={type} setInfo={setInfo} />
        
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