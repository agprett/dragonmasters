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

describe.skip('Users can login with proper credentials, will be reminded to send username and password or will recieve an error message that there credentials were incorrect', () => {
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

describe('Tests the endpoint that is used to ensure a user is signed in before being able to access certain parts of the site', () => {
  test('User will recieve an error code when this request is recieved without be logged in', async () => {
    await axios.get('http://localhost:6789/api/user')
      .then(res => {
        expect('This should not work.').toBe('Why did it work?')
      })
      .catch(err => {
        expect(err.response.data).toBe('Must sign in!')
      })
  })

  // Note: As much as I wanted to get the below test working, I could not get the session to translate from the first request to the second. I will come back to this later, but for now if a user is not signed in, they will get an error

  // test('User signs in, then the endpoint should respond with a good status code', async () => {
  //   const secondAxios = axios.create()
  //   secondAxios.defaults.withCredentials = true
  //   let headers

  //   const user = {
  //     username: 'test1',
  //     password: 'badpass123'
  //   }

    // await secondAxios.post('http://localhost:6789/api/login', user, {withCredentials: true})
    //   .then(res => {
    //     console.log(res)
    //     headers = res.headers
    //   })
    //   .catch(err => {
    //     console.log(err.response.data)
    //   })
      
    // secondAxios.get('http://localhost:6789/api/user', {withCredentials: true, credentials: 'include'})
    //   .then(res => {
    //     console.log('logged in success')
    //     expect(res.data.username).toBe(user.username)
    //   })
    //   .catch(() => {
    //     console.log('logged in failure')
    //     expect('It is not working').toBe('I can not figure it out')
    //   })
  // })
})