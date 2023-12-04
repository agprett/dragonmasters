import axios from 'axios'
import http from 'node:http'

function fail(reason = "fail was called in a test.") {
  throw new Error(reason);
}

let signedIn
let baseURL = 'http://localhost:6789/api/campaigns'

beforeAll(async () => {
  signedIn = axios.create({
    httpAgent: new http.Agent({keepAlive: true})
  })

  await signedIn.post('http://localhost:6789/api/user/login', {username: 'test1', password: 'badpass123'})
    .then(res => {
      signedIn.defaults.headers.Cookie = res.headers['set-cookie'][0]
    })
    .catch(() => {
      fail('Unable to sign in')
    })
})

describe.skip('Users can create campaigns when providing all required infomation', () => {
  test('Users can create a new campaign when providing required info and will be able to add an initial note when created', async () => {
    let newCamp = {
      name: 'Frozen Solid',
      description: 'Testing',
      length: 'Medium',
      world_name: 'Earth',
      start_level: 3,
      note: 'This is a test note'
    }

    let newCamp2 = {
      name: 'test',
      description: 'Testing',
      length: 'One Shot',
      world_name: 'Earth',
      start_level: 1
    }

    await signedIn.post(`${baseURL}`, newCamp)
      .then(res => {
        expect(res.data).toBe(`New campaign created!`)
      })
      .catch(() => {
        fail('Should not respond with an error')
      })
    
    await signedIn.post(`${baseURL}`, newCamp2)
      .then(res => {
        expect(res.data).toBe(`New campaign created!`)
      })
      .catch(() => {
        fail('Should not respond with an error')
      })
  })

  test('Users will not be able to create a new campaign when missing required information', async () => {
    let missingInfo = {
      description: 'Not working',
      world_name: 'This one',
      start_level: 5
    }

    await signedIn.post(`${baseURL}`, missingInfo)
      .then(() => {
        fail('User did not provide all required info, cannot create a new campaign')
      })
      .catch(err => {
        expect(err.response.data).toBe('You must provide all required info to create a campaign')
      })
  })
})

describe.skip('User can add new notes to created campaigns', () => {
  test('Users can add a note to an existing campaign', async () => {
    let newNote = {
      campaign_id: 11,
      note: 'This is a new note'
    }

    await signedIn.post(`${baseURL}/note`, newNote)
      .then(res => {
        expect(res.data).toBe('Note(s) added')
      })
      .catch(() => {
        fail('Should have worked')
      })
  })

  test('Users will not be able to edit or add notes to campaigns they did not create', async () => {
    let updateCamp = {
      name: 'BlackFang',
      description: 'Testing',
      length: 'Medium',
      world_name: 'Earth',
      start_level: 3,
      note: 'This is a test note'
    }

    let newNote = {
      campaign_id: 1,
      note: 'Should not be added'
    }

    await signedIn.put(`${baseURL}`, updateCamp)
      .then(() => {
        fail('Should not have added, not correct user')
      })
      .catch(err => {
        expect(err.response.data).toBe('Must be signed in as the owner of this campaign to edit information!')
      })

    await signedIn.post(`${baseURL}/note`, newNote)
      .then(() => {
        fail('Should not have added, not correct user')
      })
      .catch(err => {
        expect(err.response.data).toBe('Must be signed in as the owner of this campaign to add a note!')
      })
  })
})