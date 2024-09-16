import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import './CreationForms.css'

import CharacterForm from './CreationSelections/CharacterForm.js';
import { clearCharacter } from '../../ducks/characterSlice.js';

function CharacterNew() {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const editChar = useSelector(state => state.character.info)

  const [panels, setPanels] = useState({one: true})
  const [characterInfo, setCharacterInfo] = useState(editChar.name ? editChar : {name: '', player: '', hitPoints: 0, level: 0, armorClass: 0})


  const postNewCharacter = (evt) => {
    evt.preventDefault()
    if(characterInfo.name && characterInfo.hitPoints, characterInfo.armorClass, characterInfo.level, characterInfo.player) {
      let {hitPoints, armorClass} = characterInfo

      const body = {
        ...characterInfo,
        hit_points: hitPoints,
        armor_class: armorClass,
      }
      
      
      if(body.id) {
        axios.put(`/api/characters/${body.id}`, body)
          .then(res => {
            toast('Character updated!')
            navigate('/stuff/characters')
          })
          .catch(err => {
            toast('Failed to update character. Please try again.', { type: 'error' })
          })
      } else {
        axios.post('/api/characters', body)
          .then(res => {
            toast('New character created!')
            navigate('/stuff/characters')
          })
          .catch(() => {
            toast('Failed to create character. Please try again.', { type: 'error' })
          })
      } 
    } else {
      toast('Please fill in all required data before creating a character!', { type: 'error' })
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
          dispatch(clearCharacter())
          navigate('/stuff/characters')
        }}
      >Cancel</button>

      <section className='breakdown-top'>
        <div className='breakdown-base-info'><h2>{characterInfo.name ? 'Update' : 'New'} Character</h2></div>
      </section>

      <button
        className='btn btn-type-1 btn-color-3 create-btn'
        onClick={postNewCharacter}
      >{characterInfo.name ? 'Save' : 'Create'}</button>


      <section className='accordion'>
        <div className='accordion-item'>
          <div
            className='accordion-item-header'             onClick={() => changeDisplay('one')}
          ><h4>Basic Info</h4><button className='accordion-item-status'>{panels.one ? '-' : '+'}</button></div>

          <div className={`accordion-content-wrapper ${panels.one ? 'accordion-content-expanded' : ''}`}>
            <CharacterForm characterInfo={characterInfo} setCharacterInfo={setCharacterInfo} />
          </div>
        </div>
      </section>

    </div>
  )
}

export default CharacterNew