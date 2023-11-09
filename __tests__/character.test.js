import axios from 'axios'
import http from 'node:http'

function fail(reason = "fail was called in a test.") {
  throw new Error(reason);
}

let signedIn

beforeAll(async () => {
  signedIn = axios.create({
    httpAgent: new http.Agent({keepAlive: true})
  })

  await signedIn.post('http://localhost:6789/api/user/login', {username: 'test1', password: 'badpass123'})
    .then(res => {
      signedIn.defaults.headers.Cookie = res.headers['set-cookie'][0]
    })
    .catch(err => {
      fail('Unable to sign in')
    })
})

describe.skip('Users can create new characters when providing all the correct information', () => {
  test('Users can create a new character when providing the required information', async () => {
    let newChar = {
      player: 'Me',
      hit_points: 43,
      name: 'new char',
      level: 6
    }
    
    let newChar2 = {
      player: 'John',
      hit_points: 35,
      name: 'new char 2',
      level: 5,
      race: 'Elf',
      char_class: 'Rogue',
      armor_class: 15
    }

    await signedIn.post('http://localhost:6789/api/characters', newChar)
      .then(res => {
        expect(res.data).toBe(`New character, ${newChar.name}, created!`)
      })
      .catch(() => {
        fail('Should not respond with error')
      })
    
    await signedIn.post('http://localhost:6789/api/characters', newChar2)
      .then(res => {
        expect(res.data).toBe(`New character, ${newChar2.name}, created!`)
      })
      .catch(() => {
        fail('Should not respond with error')
      })

  })

  test('Users cannot create a character when not signed in', async () => {
    let newChar = {
      player: 'Me',
      hit_points: 43,
      name: 'newChar',
      level: 6
    }

    await axios.post('http://localhost:6789/api/characters', newChar)
      .then(() => {
        fail('User was not signed in, should not have worked')
      })
      .catch(err => {
        expect(err.response.data).toBe('You must be signed in to create a character!')
      })
  })

  test('Users cannot create a character when not providing all information', async () => {
    let newChar = {
      player: 'Me',
      hit_points: 43,
      level: 6
    }

    await signedIn.post('http://localhost:6789/api/characters', newChar)
      .then(() => {
        fail('User did not provide all required info, should have failed')
      })
      .catch(err => {
        expect(err.response.data).toBe('You must provide all required info to create a character')
      })
  })
})

describe.skip('Users can retrieve all of their created characters', () => {
  test('User can retrieve all of their characters', async () => {
    await signedIn.get('http://localhost:6789/api/characters')
      .then(res => {
        expect(res.data).toHaveLength(4)
      })
      .catch(() => {
        fail('User should have recieved a list of their characters')
      })
  })

  test('User will recieve an error when not signed in and trying to get characters', async () => {
    await axios.get('http://localhost:6789/api/characters')
      .then(() => {
        fail('User was not signed in and should not have been able to get their characters')
      })
      .catch(err => {
        expect(err.response.data).toBe('You must be signed in to view your characters!')
      })
  })

})

describe.skip('Users can retrieve a single character', () => {
  test('User can retrieve a character by that characters ID', async () => {
    await signedIn.get('http://localhost:6789/api/characters/6')
      .then(res => {
        expect(res.data.name).toBe('char1')
      })
      .catch(() => {
        fail('Server failed to respond with the character')
      })
  })
})

describe.skip('Users can delete a character they created', () => {
  test('Users will not be able to delete a character if they are not signed in', async () => {
    let {data} = await signedIn.get('http://localhost:6789/api/characters')
  
    let id = data[data.findIndex(ele => ele.name === 'new char')].character_id

    await axios.delete('http://localhost:6789/api/characters/' + id)
      .then(() => {
        fail('Should not have been allowed to delete item')
      })
      .catch(err => {
        expect(err.response.data).toBe('You must be signed in as the creator to delete this character!')
      })
  })

  test('Users will not be able to delete a character if they are not signed in', async () => {
    let {data} = await signedIn.get('http://localhost:6789/api/characters')
  
    let id1 = data[data.findIndex(ele => ele.name === 'new char')].character_id
    let id2 = data[data.findIndex(ele => ele.name === 'new char 2')].character_id

    await signedIn.delete('http://localhost:6789/api/characters/' + id1)
      .then(res => {
        expect(res.data).toBe('Successfully deleted character!')
      })
      .catch(() => {
        fail('Should have been signed in and provided correct id')
      })
      
    await signedIn.delete('http://localhost:6789/api/characters/' + id2)
        .then(res => {
          expect(res.data).toBe('Successfully deleted character!')
        })
        .catch(() => {
          fail('Should have been signed in and provided correct id')
        })
    
    // Tests to make sure they are actually deleted
    await signedIn.get('http://localhost:6789/api/characters')
      .then(res => {
        expect(res.data).toHaveLength(2)
      })
      .catch(() => {
        fail('User should have recieved a list of their characters')
      })
  })
})