import React, { useState } from 'react'
import { useParams, Link, useLoaderData } from 'react-router-dom'

import GuideFilter from './GuideFilter'
import GuideResult from './GuideResult'
import MonsterPopup from '../Popout/MonsterPopup'
import SpellPopup from '../Popout/SpellPopup'

const capFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)

function Guide () {
  const data = useLoaderData()
  const {guide_type: type} = useParams()

  const [viewPopup, setViewPopup] = useState(false)
  const [popupData, setPopupData] = useState({})
  const [guideData, setGuideData] = useState(data)

  const viewGuides = guideData.map(data => <GuideResult key={data.index} data={data} setViewPopup={setViewPopup} setPopupData={setPopupData} type={type} />)

  const renderPopup = () => {
    switch(type) {
      case 'monsters':
        return <MonsterPopup specs={popupData} setViewPopup={setViewPopup} />

      case 'spells':
        return <SpellPopup specs={popupData} setViewPopup={setViewPopup} />
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

        {viewPopup ? renderPopup() : ''}

        <GuideFilter type={type} setGuideData={setGuideData} />

        <table className='guide-results'>
          <thead>
            {resultsHead()}
          </thead>
          <tbody>
            {guideData[0] ? viewGuides : <tr className='guide-result'>No Data to Show</tr>}
          </tbody>
        </table>

      </section>
    </section>
  )
}

export default Guide