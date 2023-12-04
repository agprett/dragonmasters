import axios from 'axios'
import http from 'node:http'

function fail(reason = "fail was called in a test.") {
  throw new Error(reason);
}

describe.skip('Test the sign up server functionality', () => {
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
        fail('User did not provide a password when signing up')
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
        fail('User did not provide a password when signing up')
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
          fail('User provided an existing username, should give error')
        })
        .catch(err => {
          expect(err.response.data).toBe('Username already taken!')
        })
  })
})

describe.skip('Users can login with proper credentials, will be reminded to send username and password or will recieve an error message that there credentials were incorrect', () => {
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
        fail('User did not provide valid sign in info')
      })
      .catch(err => {
        expect(err.response.data).toBe('Username or password incorrect!')
      })
      
      
    await axios.post('http://localhost:6789/api/user/login', {username: 'test9', password: 'badpass123'})
      .then(res => {
        fail('User did not provide valid sign in info')
      })
      .catch(err => {
        expect(err.response.data).toBe('Username or password incorrect!')
      })
    })
    
    test('User will get an error message when trying to sign in without a username or password', async () => {
      await axios.post('http://localhost:6789/api/user/login', {username: 'test1', password: ''})
        .then(res => {
          fail('User did not have to provide password')
        })
        .catch(err => {
          expect(err.response.data).toBe('Must provide a username and password!')
        })

      await axios.post('http://localhost:6789/api/user/login', {username: '', password: 'badpass123'})
        .then(res => {
          fail('User did not have to provide username')
        })
        .catch(err => {
          expect(err.response.data).toBe('Must provide a username and password!')
        })
  })
})

describe.skip('Tests the endpoint that is used to ensure a user is signed in before being able to access certain parts of the site', () => {
  test('User will recieve an error code when this request is recieved without be logged in', async () => {

    await  axios.get('http://localhost:6789/api/user')
      .then(res => {
        fail('User should have had to sign in')
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
        fail('User was unable to sign in')
      })
      
    await instance.get('http://localhost:6789/api/user')
      .then(res => {
        expect(res.data.username).toBe(user.username)
      })
      .catch(() => {
        fail('User should have been signed in')
      })
  })
})

describe.skip('Users can delete their account when providing the correct username and password, will recieve an error if ', () => {
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
        fail('Unable to sign in')
      })

    await instance.post('http://localhost:6789/api/user/delete', {username: 'othertest1', password: 'wrongpassword'})
      .then(() => {
        fail('Attempting to delete wrong account')
      })
      .catch(err => {
        expect(err.response.data).toBe('Incorrect credentials. Could not delete account.')
      })
  })

  test('User will not be able to delete an account when not signed in as that user', async () => {
    await axios.post('http://localhost:6789/api/user/delete', user)
    .then(() => {
      fail('Should not succeed, not signed in')
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
        fail('Unable to sign in')
      })

    await instance.post('http://localhost:6789/api/user/delete', user)
      .then(res => {
        expect(res.data).toBe('Account successfully deleted!')
      })
  })
})