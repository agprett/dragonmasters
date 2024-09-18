import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'

import Navi from './Components/Nav/Navi.js'
import Home from './Components/Home/Home.js'

import GuideHome from './Components/Guides/GuideHome.js'
import Guide from './Components/Guides/Guide.js'
import MonsterSpecs from './Components/Specs/MonsterSpecs.js'
import SpellSpecs from './Components/Specs/SpellSpecs.js'

import Stuff from './Components/Stuff/Stuff.js'
import Campaigns from './Components/Campaigns/Campaigns.js'
import CampaignView from './Components/Campaigns/CampaignView.js'
import CampaignNew from './Components/CreationForms/CampaignNew.js'

import Encounters from './Components/Encounters/Encounters.js'
import EncounterNew from './Components/CreationForms/EncounterNew.js'
import EncounterView from './Components/Encounters/EncounterView.js'
import EncounterRun from './Components/Encounters/EncounterRun.js'

import Characters from './Components/Characters/Characters.js'
import CharacterNew from './Components/CreationForms/CharacterNew.js'

import NPCs from './Components/Characters/NPCs.js'
import NPCNew from './Components/CreationForms/NPCNew.js'

import Login from './Components/Login/Login.js'
import Signin from './Components/Login/Signup.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navi />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'codex',
        children: [
          {
            index: true,
            element: <GuideHome />
          },
          {
            path: 'specs',
            children: [
              {
                path: 'monsters/:index',
                element: <MonsterSpecs />
              },
              {
                path: 'spells/:index',
                element: <SpellSpecs />
              }
            ]
          },
          {
            path: ':guide_type',
            loader: async ({params}) => {
              let {data} = await axios.get(`/api/${params.guide_type}`)

              return data
            },
            element: <Guide />,
          }
        ]
      },
      {
        path: 'stuff',
        children: [
          {
            index: true,
            element: <Stuff />
          },
          {
            path: 'campaigns',
            children: [
              {
                index: true,
                element: <Campaigns />
              },
              {
                path: 'new',
                element: <CampaignNew />
              },
              {
                path: ':campaign_id',
                element: <CampaignView />
              }
            ]
          },
          {
            path: 'encounters',
            children: [
              {
                index: true,
                element: <Encounters />
              },
              {
                path: 'new',
                element: <EncounterNew />
              },
              {
                path: ':encounter_id',
                children: [
                  {
                    index: true,
                    element: <EncounterView />
                  },
                  {
                    path: 'run',
                    element: <EncounterRun />, 
                    loader: async ({params}) => {
                      const {encounter_id} = params

                      let res = await axios.get(`/api/encounters/${encounter_id}`)

                      let {monsters, players, npcs, name} = res.data
                      
                      let combatants = [...players, ...npcs]

                      monsters.forEach(monster => {
                        let i = 1
                        while(i <= monster.count) {
                          let info = {...monster}

                          if(monster.count > 1) {
                            info.name = monster.name + ' - ' + i
                          }

                          info.amount = +info.count
                          delete info.count
                          combatants.push(info)
                          i++
                        }
                      });

                      return {initialCombatants: combatants, name, encounter_id}
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'characters',
            children: [
              {
                index: true,
                element: <Characters />
              },
              {
                path: 'new',
                element: <CharacterNew />
              },
            ]
          },
          {
            path: 'npcs',
            children: [
              {
                index: true,
                element: <NPCs />
              },
              {
                path: 'new',
                element: <NPCNew />
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: '/login',
    element: <Login />
  },
  
  {
    path: '/signup',
    element: <Signin />
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App