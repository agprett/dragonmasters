import React, { useState } from 'react'
import { useParams, Link, useLoaderData } from 'react-router-dom'

import GuideFilter from './GuideFilter'
import GuideResult from './GuideResult'
import MonsterPopup from './MonsterPopup'
import SpellPopup from './SpellPopup'
import './GuideHome.css'

const capFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)

function Guide () {
  const data = useLoaderData()
  const {guide_type: type} = useParams()

  const [viewPopup, setViewPopup] = useState(false)
  const [popupData, setPopupData] = useState({})
  const [guideData, setGuideData] = useState(data)

  const viewGuides = guideData.map(data => <GuideResult data={data} setViewPopup={setViewPopup} setPopupData={setPopupData} type={type} />)

  const renderPopup = () => {
    switch(type) {
      case 'monsters':
        return <MonsterPopup specs={popupData} setViewPopup={setViewPopup} />

      case 'spells':
        return <SpellPopup specs={popupData} setViewPopup={setViewPopup} />
    }
  }

  return (
    <section className='guide-page'>
      <header className='guide-title'>
        <Link to='../' className='guide-back-btn'>{'< Back'}</Link>
        <h1>{capFirst(type)}</h1>
      </header>

      <section className='guide-body'>

        {viewPopup ? renderPopup() : ''}

        <GuideFilter type={type} setGuideData={setGuideData} />

        <section className='guide-results'>
          <p>Results</p>
          {guideData[0] ? viewGuides : <div className='guide-result'>No Data to Show</div>}
        </section>

      </section>
    </section>
  )
}

export default Guide