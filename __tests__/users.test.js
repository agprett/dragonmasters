import axios from 'axios'
import http from 'node:http'

describe('Test the sign up server functionality', () => {
  test('test that when providing a valid username and password, the user can create a new account', async () => {
    const user = {
      username: 'othertest1',
      password: 'badpass123'
    }

    let res = await axios.post('http://localhost:6789/api/user/register', user)

    expect(res.data.username).toBe(user.username)
  })

  test('when providing no password or username, the server should send an error', async () => {
    const user1 = {
      username: '',
      password: 'badpass123'
    }
    
    await axios.post('http://localhost:6789/api/user/register', user1)
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

    await axios.post('http://localhost:6789/api/user/register', user2)
      .then(res => {
        expect(res).toThrow()
      })
      .catch(err => {
        expect(err.response.data).toBe('Username and password need to be provided!')
      })
    })
    
    test('when providing an existing username, server should send an error', async () => {
      const user = {
        username: 'othertest1',
        password: 'badpass123'
      }
      
      await axios.post('http://localhost:6789/api/user/register', user)
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
    let res = await axios.post('http://localhost:6789/api/user/login', user)

    expect(res.data.username).toBe(user.username)
  })

  test('Users will get a error message when using the wrong username or password', async () => {
    await axios.post('http://localhost:6789/api/user/login', {username: 'test1', password: 'wrong'})
      .then(res => {
        expect('Should not have worked').toBe('Why did it work?')
      })
      .catch(err => {
        expect(err.response.data).toBe('Username or password incorrect!')
      })
      
      
    await axios.post('http://localhost:6789/api/user/login', {username: 'test9', password: 'badpass123'})
      .then(res => {
        expect('Should not have worked').toBe('Why did it work?')
      })
      .catch(err => {
        expect(err.response.data).toBe('Username or password incorrect!')
      })
    })
    
    test('User will get an error message when trying to sign in without a username or password', async () => {
      await axios.post('http://localhost:6789/api/user/login', {username: 'test1', password: ''})
        .then(res => {
          expect('Should have failed').toBe('Why did it work?')
        })
        .catch(err => {
          expect(err.response.data).toBe('Must provide a username and password!')
        })

      await axios.post('http://localhost:6789/api/user/login', {username: '', password: 'badpass123'})
        .then(res => {
          expect('Should have failed').toBe('Why did it work?')
        })
        .catch(err => {
          expect(err.response.data).toBe('Must provide a username and password!')
        })
  })
})

describe('Tests the endpoint that is used to ensure a user is signed in before being able to access certain parts of the site', () => {
  test('User will recieve an error code when this request is recieved without be logged in', async () => {

    await  axios.get('http://localhost:6789/api/user')
      .then(res => {
        expect('This should not work.').toBe('Why did it work?')
      })
      .catch(err => {
        expect(err.response.data).toBe('Must sign in!')
      })
  })

  test('User signs in, then the endpoint to check sign in should respond with a good status code', async () => {
    const instance = axios.create({
      httpAgent: new http.Agent({keepAlive: true})
    })

    const user = {
      username: 'test1',
      password: 'badpass123'
    }

    await instance.post('http://localhost:6789/api/user/login', user)
      .then(res => {
        instance.defaults.headers.Cookie = res.headers['set-cookie'][0]
      })
      .catch(err => {
        console.log(err.response.data)
      })
      
    await instance.get('http://localhost:6789/api/user')
      .then(res => {
        expect(res.data.username).toBe(user.username)
      })
      .catch(() => {
        expect('It is not working').toBe('I can not figure it out')
      })
  })
})

describe('Users can delete their account when providing the correct username and password, will recieve an error if ', () => {
  const user = {
    username: 'othertest1',
    password: 'badpass123'
  }

  test('User will not be able to delete an account when using the incorrect authentication for the account', async () => {
    const instance = axios.create({
      httpAgent: new http.Agent({keepAlive: true})
    })

    await instance.post('http://localhost:6789/api/user/login', {username: 'test1', password: 'badpass123'})
      .then(res => {
        instance.defaults.headers.Cookie = res.headers['set-cookie'][0]
      })
      .catch(err => {
        console.log(err.response.data)
      })

    await instance.post('http://localhost:6789/api/user/delete', {username: 'othertest1', password: 'wrongpassword'})
      .then(() => {
        expect('Should have given error').toBe('This test failed')
      })
      .catch(err => {
        expect(err.response.data).toBe('Incorrect credentials. Could not delete account.')
      })
  })

  test('User will not be able to delete an account when not signed in as that user', async () => {
    await axios.post('http://localhost:6789/api/user/delete', user)
    .then(() => {
      expect('Should have given error').toBe('This test failed')
    })
    .catch(err => {
      expect(err.response.data).toBe('Must be signed in as the user account being deleted.')
    })
  })

  test('When the user is signed in and properly inputs their username and password, they can delete their own account', async () => {
    const instance = axios.create({
      httpAgent: new http.Agent({keepAlive: true})
    })

    await instance.post('http://localhost:6789/api/user/login', user)
      .then(res => {
        instance.defaults.headers.Cookie = res.headers['set-cookie'][0]
      })
      .catch(err => {
        console.log(err.response.data)
      })

    await instance.post('http://localhost:6789/api/user/delete', user)
      .then(res => {
        expect(res.data).toBe('Account successfully deleted!')
      })
  })
})