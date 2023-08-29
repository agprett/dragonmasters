import axios from 'axios'

describe.skip('Test the sign up server functionality', () => {
  test('test that when providing a valid username and password, the user can create a new account', async () => {
    const user = {
      username: 'test1',
      password: 'badpass123'
    }

    let res = await axios.post('http://localhost:6789/api/register', user)

    expect(res.data.username).toBe(user.username)
  })

  test('when providing no password or username, the server should send an error', async () => {
    const user1 = {
      username: '',
      password: 'badpass123'
    }
    
    await axios.post('http://localhost:6789/api/register', user1)
      .then(res => {
        expect(res).toThrow()
      })
      .catch(err => {
        expect(err.response.data).toBe('Username and password need to be provided!')
      })
      
    const user2 = {
      username: 'test2',
      password: ''
    }

    await axios.post('http://localhost:6789/api/register', user2)
      .then(res => {
        expect(res).toThrow()
      })
      .catch(err => {
        expect(err.response.data).toBe('Username and password need to be provided!')
      })
    })
    
    test('when providing an existing username, server should send an error', async () => {
      const user = {
        username: 'test1',
        password: 'badpass123'
      }
      
      await axios.post('http://localhost:6789/api/register', user)
        .then(res => {
          expect(res).toThrow()
        })
        .catch(err => {
          expect(err.response.data).toBe('Username already taken!')
        })
  })
})