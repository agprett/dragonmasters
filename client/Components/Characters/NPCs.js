import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Card, Col, Container, Row } from 'react-bootstrap'

import './Characters.css'
import DeletePopup from '../DeletePopup/DeletePopup'

import { addCharacter, clearCharacter } from '../../ducks/characterSlice.js'

function NPCs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [npcs, setNPCs] = useState([])
  const [displayPopup, setDisplayPopup] = useState(false)
  const [deleteData, setDeleteData] = useState({name: '', id: ''})

  useEffect(() => {
    axios.get('/api/characters')
      .then(res => {
        setNPCs(res.data)
      })
  }, [displayPopup])

  const updateCharacter = (npc) => {
    const {name, player, hit_points, armor_class, level, character_id} = character

    let info = {
      id: character_id,
      name,
      player,
      hitPoints: hit_points,
      armorClass: armor_class,
      level
    }

    dispatch(addCharacter(info))
    navigate('/stuff/npcs/new')
  }

  const handleDelete = (name, id) => {
    setDeleteData({name, id})
    setDisplayPopup(true)
  }

  const viewNewCharacter = () => {
    dispatch(clearCharacter())
    navigate('/stuff/npcs/new')
  }

  const charactersDisplay = npcs.map((character, i) => {
    return (
      <Col className="p-3" key={character.name + ' ' + i}>
        <Card className="character-blob">
          <Card.Header className='bg-secondary text-white'>
            <Card.Title>{character.name}</Card.Title>
            <Card.Subtitle>{character.player}</Card.Subtitle>
          </Card.Header>
          <Card.Body>
            <p>HP: {character.hit_points}</p>
            <p>AC: {character.armor_class}</p>
          </Card.Body>
          <Card.Body className='character-blob-btns'>
            <button className='btn btn-type-5 btn-color-1' onClick={() => updateCharacter(character)}>Edit</button>
            <button className='btn btn-type-5 btn-color-4' onClick={() => handleDelete(character.name, character.character_id)}>Delete</button>
          </Card.Body>
        </Card>
      </Col>
    )
  })

  return (
    <section className="page-layout-2">
      {displayPopup && <DeletePopup name={deleteData.name} url={`/api/characters/${deleteData.id}`} route={'/stuff/characters'} setDisplay={setDisplayPopup}/>}


      <h2>My NPCs</h2>

      <button
        className='btn btn-type-2 btn-color-3 create-btn'
        onClick={() => viewNewCharacter()}
      >+ Create New</button>

      <Container fluid className='p-3'>
        <Row xs={2} md={3} lg={4} className='g-2'>
          {charactersDisplay}
        </Row>
      </Container>

    </section>
  )
}

export default NPCs