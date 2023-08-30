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

describe('Users can login with proper credentials, will be reminded to send username and password or will recieve an error message that there credentials were incorrect', () => {
  const user = {
    username: 'test1',
    password: 'badpass123'
  }

  test('User can login when providing the proper credentials', async () => {
    let res = await axios.post('http://localhost:6789/api/login', user)

    expect(res.data.username).toBe(user.username)
  })

  test('Users will get a error message when using the wrong username or password', async () => {
    await axios.post('http://localhost:6789/api/login', {username: 'test1', password: 'wrong'})
      .then(res => {
        expect('Should not have worked').toBe('Why did it work?')
      })
      .catch(err => {
        expect(err.response.data).toBe('Username or password incorrect!')
      })
      
      
    await axios.post('http://localhost:6789/api/login', {username: 'test9', password: 'badpass123'})
      .then(res => {
        expect('Should not have worked').toBe('Why did it work?')
      })
      .catch(err => {
        expect(err.response.data).toBe('Username or password incorrect!')
      })
    })
    
    test('User will get an error message when trying to sign in without a username or password', async () => {
      await axios.post('http://localhost:6789/api/login', {username: 'test1', password: ''})
        .then(res => {
          expect('Should have failed').toBe('Why did it work?')
        })
        .catch(err => {
          expect(err.response.data).toBe('Must provide a username and password!')
        })

      await axios.post('http://localhost:6789/api/login', {username: '', password: 'badpass123'})
        .then(res => {
          expect('Should have failed').toBe('Why did it work?')
        })
        .catch(err => {
          expect(err.response.data).toBe('Must provide a username and password!')
        })
  })
})