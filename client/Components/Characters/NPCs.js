import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Card, Col, Container, Row } from 'react-bootstrap'

import './Characters.css'
import DeletePopup from '../DeletePopup/DeletePopup'

import { addNPC, clearNPC } from '../../ducks/npcSlice.js'

function NPCs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [npcs, setNPCs] = useState([])
  const [displayPopup, setDisplayPopup] = useState(false)
  const [deleteData, setDeleteData] = useState({name: '', id: ''})

  useEffect(() => {
    axios.get('/api/npcs')
      .then(res => {
        setNPCs(res.data)
      })
  }, [displayPopup])

  const updateNPC = (npc) => {
    const {name, player, hit_points, armor_class, level, npc_id} = npc

    let info = {
      id: npc_id,
      name,
      player,
      hitPoints: hit_points,
      armorClass: armor_class,
      level
    }

    dispatch(addNPC(info))
    navigate('/stuff/npcs/new')
  }

  const handleDelete = (name, id) => {
    setDeleteData({name, id})
    setDisplayPopup(true)
  }

  const viewNewNPC = () => {
    dispatch(clearNPC())
    navigate('/stuff/npcs/new')
  }

  const npcsDisplay = npcs.map((npc, i) => {
    return (
      <Col className="p-3" key={npc.name + ' ' + i}>
        <Card className="character-blob">
          <Card.Header className='bg-secondary text-white'>
            <Card.Title>{npc.name}</Card.Title>
          </Card.Header>
          <Card.Body>
            <p>HP: {npc.hit_points}</p>
            <p>AC: {npc.armor_class}</p>
          </Card.Body>
          <Card.Body className='character-blob-btns'>
            <button className='btn btn-type-5 btn-color-1' onClick={() => updateNPC(npc)}>Edit</button>
            <button className='btn btn-type-5 btn-color-4' onClick={() => handleDelete(npc.name, npc.npc_id)}>Delete</button>
          </Card.Body>
        </Card>
      </Col>
    )
  })

  return (
    <section className="page-layout-2">
      {displayPopup && <DeletePopup name={deleteData.name} url={`/api/npcs/${deleteData.id}`} route={'/stuff/npcs'} setDisplay={setDisplayPopup}/>}


      <h2>My NPCs</h2>

      <button
        className='btn btn-type-2 btn-color-3 create-btn'
        onClick={() => viewNewNPC()}
      >+ Create New</button>

      <Container fluid className='p-3'>
        <Row xs={2} md={3} lg={4} className='g-2'>
          {npcsDisplay}
        </Row>
      </Container>

    </section>
  )
}

export default NPCs