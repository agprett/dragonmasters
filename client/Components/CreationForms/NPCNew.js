import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import './CreationForms.css'

import NPCForm from './CreationSelections/NPCForm.js';
import { clearNPC } from '../../ducks/npcSlice.js';

function NPCNew() {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const editChar = useSelector(state => state.npc.info)

  const [panels, setPanels] = useState({one: true})
  const [npcInfo, setNPCInfo] = useState(editChar.name ? editChar : {name: '', hitPoints: 0, armorClass: 0})


  const postNewNPC = (evt) => {
    evt.preventDefault()
    if(npcInfo.name && npcInfo.hitPoints && npcInfo.armorClass) {
      let {hitPoints, armorClass} = npcInfo

      const body = {
        ...npcInfo,
        hit_points: hitPoints,
        armor_class: armorClass,
      }
      
      
      if(body.id) {
        axios.put(`/api/npcs/${body.id}`, body)
          .then(res => {
            toast('NPC updated!')
            navigate('/stuff/npcs')
          })
          .catch(err => {
            toast('Failed to update NPC. Please try again.', { type: 'error' })
          })
      } else {
        axios.post('/api/npcs', body)
          .then(res => {
            toast('New NPC created!')
            navigate('/stuff/npcs')
          })
          .catch(() => {
            toast('Failed to create NPC. Please try again.', { type: 'error' })
          })
      } 
    } else {
      toast('Please fill in all required data before creating an NPC!', { type: 'error' })
    }
  }

  const changeDisplay = (panel) => {
    setPanels({...panels, [panel]: !panels[panel]})
  }


  return (
    <div className="page-layout-2">
      <button
        className='btn btn-type-1 btn-color-4 back-btn'
        onClick={() => {
          dispatch(clearNPC())
          navigate('/stuff/npcs')
        }}
      >Cancel</button>

      <section className='breakdown-top'>
        <div className='breakdown-base-info'><h2>{npcInfo.id ? 'Update' : 'New'} NPC</h2></div>
      </section>

      <button
        className='btn btn-type-1 btn-color-3 create-btn'
        onClick={postNewNPC}
      >{npcInfo.id ? 'Save' : 'Create'}</button>


      <section className='accordion'>
        <div className='accordion-item'>
          <div
            className='accordion-item-header'             onClick={() => changeDisplay('one')}
          ><h4>Basic Info</h4><button className='accordion-item-status'>{panels.one ? '-' : '+'}</button></div>

          <div className={`accordion-content-wrapper ${panels.one ? 'accordion-content-expanded' : ''}`}>
            <NPCForm npcInfo={npcInfo} setNPCInfo={setNPCInfo} />
          </div>
        </div>
      </section>

    </div>
  )
}

export default NPCNew