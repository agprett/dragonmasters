import axios from 'axios'

describe.skip('These tests will ensure that when the endpoint to retrieve all/filtered monsters returns the proper monsters', () => {
  const filter1 = 'name=dragon'
  const filter2 = 'challenge_rating_min=10'
  const filter3 = "challenge_rating_max=2"
  const filter4 = 'size=Medium'
  const filter5 = 'alignment=lawful evil'
  let filter6 = {
    name: 'dragon',
    alignment: 'lawful evil',
    size: 'Gargantuan'
  }
  let filter7 = {
    challenge_rating_min: 12,
    alignment: 'neutral'
  }
  let filter8 = {
    name: 'dragon',
    alignment: 'lawful evil',
    size: 'Gargantuan',
    challenge_rating_min: 8,
    challenge_rating_max: 18
  }

  test('Endpoint should return all monsters from database', async () => {
    let res = await axios('http://localhost:6789/api/monsters')

    let monsters = res.data

    // First monster should be the Aboleth and the total amount of monsters is 334
    expect(monsters[0].name).toBe('Aboleth')
    expect(monsters.length).toEqual(334)
  })

  test('Endpoint should filter out monsters whose name does not include the keyword dragon', async () => {
    let res = await axios('http://localhost:6789/api/monsters?' + filter1)

    let monsters = res.data

    monsters.forEach(monster => {
      expect(monster.name.toLowerCase().includes('dragon')).toBeTruthy()
    })
  })

  test('Endpoint should filter the monsters who have either a higher or lower challenge rating that what was specified in request', async () => {
    let res1 = await axios('http://localhost:6789/api/monsters?' + filter2)
    let res2 = await axios('http://localhost:6789/api/monsters?' + filter3)

    let monsters1 = res1.data
    let monsters2 = res2.data

    monsters1.forEach(monster => {
      expect(monster['challenge_rating']).toBeGreaterThanOrEqual(10)
    })

    monsters2.forEach(monster => {
      expect(monster['challenge_rating']).toBeLessThanOrEqual(2)
    })
  })

  test('Endpoint should send only monsters that are the size requested', async () => {
    let res = await axios.get('http://localhost:6789/api/monsters?' + filter4)

    let monsters = res.data

    monsters.forEach(monster => {
      expect(monster.size).toBe('Medium')
    })
  })

  test('Endpoint should retrieve monsters that have the alignment requested', async () => {
    let res = await axios.get('http://localhost:6789/api/monsters?' + filter5)

    let monsters = res.data

    monsters.forEach(monster => {
      expect(monster.alignment).toBe('lawful evil')
    })
  })

  test('Endpoint can retrieve monsters that have meet multiple different filters', async () => {
    //change filter object into a structured query string
    const joinFilter = (filters) => {
      let joined = []

      for(let filter in filters) {
        joined.push(filter + '=' + filters[filter])
      }

      return joined.join('&')
    }

    let res1 = await axios.get('http://localhost:6789/api/monsters?' + joinFilter(filter6))
    let res2 = await axios.get('http://localhost:6789/api/monsters?' + joinFilter(filter7))
    let res3 = await axios.get('http://localhost:6789/api/monsters?' + joinFilter(filter8))


    res1.data.forEach(monster => {
      expect(monster.name.toLowerCase().inlcudes(filter6.name)).toBeTruthy()
      expect(monster.alignment).toBe(filter6.alignment)
      expect(monster.size).toBe(filter6.size)
    })

    res2.data.forEach(monster => {
      expect(monster.challenge_rating).toBeGreaterThanOrEqual(filter7.challenge_rating_min)
      expect(monster.alignment).toBe(filter7.alignment)
    })

    res3.data.forEach(monster => {
      expect(monster.name.toLowerCase().inlcudes(filter8.name)).toBeTruthy()
      expect(monster.alignment).toBe(filter8.alignment)
      expect(monster.size).toBe(filter8.size)
      expect(monster.challenge_rating).toBeGreaterThanOrEqual(filter8.challenge_rating_min)
      expect(monster.challenge_rating).toBeLessThanOrEqual(filter8.challenge_rating_max)
    })
  })
})

describe.skip('Endpoint should respond with individual monsters based on the index that is put as a param', () => {
  test('Endpoint should respond with the monsters requested in the url', async () => {
    let zombie = await axios.get('http://localhost:6789/api/monsters/zombie')

    expect(zombie.data.name).toBe('Zombie')

    let blueDragon = await axios.get('http://localhost:6789/api/monsters/ancient-blue-dragon')

    expect(blueDragon.data.name).toBe('Ancient Blue Dragon')

    let toad = await axios.get('http://localhost:6789/api/monsters/giant-toad')

    expect(toad.data.name).toBe('Giant Toad')
  })
})