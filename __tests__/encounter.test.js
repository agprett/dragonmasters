import axios from 'axios'
import http from 'node:http'

function fail(reason = "fail was called in a test.") {
  throw new Error(reason);
}

let signedIn
let baseURL = 'http://localhost:6789/api/encounters'

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

describe('Users can create a new encounter when providing all needed information', () => {
  test('Users can create new encounters when providing needed information', async () => {
    let newEnc = {
      name: 'test1',
      description: 'test1 long description',
      short_description: 'test1 short',
      terrain: 'normal',
      location: 'somewhere',
      rewards: 'EVERYTHING',
      campaign_id: 11,
      monsters: [
        {
          name: 'Zombie',
          count: 5,
          url: '/api/monsters/zombie'
        }
      ],
      characters: [
        {
          characterId: 6
        },
        {
          characterId: 7
        }
      ]
    }
    
    let newEnc2 = {
      name: 'test2',
      short_description: 'test2 short',
      terrain: 'normal',
      monsters: [
        {
          name: 'Aboleth',
          count: 2,
          url: '/api/monsters/aboleth'
        }
      ]
    }

    await signedIn.post(`${baseURL}`, newEnc)
      .then(async (res) => {
        expect(res.data).toBe('New encounter created!')

        await signedIn.post(`${baseURL}`, newEnc2)
          .then(res => {
            expect(res.data).toBe('New encounter created!')
          })
          .catch(() => {
            fail('Shoud not respond with an error')
          })
      })
      .catch(() => {
        fail('Shoud not respond with an error')
      })



  })

  test('Users cannont create a new encounter when missing required information', async () => {
    let missingInfo = {
      description: 'nothing',
      terrain: 'normal'
    }

    await signedIn.post(`${baseURL}`, missingInfo)
      .then(() => {
        fail('This should have failed')
      })
      .catch(err => {
        expect(err.response.data).toBe('Must send all required data to create a new encounter')
      })
  })
})

// describe('Users can get information about the encounters they have created', async () => {

// })