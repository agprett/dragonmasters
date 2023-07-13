import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Nav from './Components/Nav/Nav.js'
import Home from './Components/Home/Home.js'

import GuideHome from './Components/Guides/GuideHome.js'
import Guide from './Components/Guides/Guide.js'
import MonsterSpecs from './Components/Specs/MonsterSpecs.js'
import SpellSpecs from './Components/Specs/SpellSpecs.js'

import Stuff from './Components/Stuff/Stuff.js'
import StuffNav from './Components/StuffNav/StuffNav.js'
import Campaigns from './Components/Campaigns/Campaigns.js'
import CampaignView from './Components/Campaigns/CampaignView.js'
import Encounters from './Components/Encounters/Encounters.js'
import EncounterNew from './Components/EncounterNew/EncounterNew.js'
import EncounterSummary from './Components/EncounterSummary/EncounterSummary.js'
import EncounterRun from './Components/EncounterRun/EncounterRun.js'

import Login from './Components/Login/Login.js'
import Signin from './Components/Signup/Signup.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'guide',
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
            element: <Guide />,
          }
        ]
      },
      {
        path: 'stuff',
        element: <StuffNav />,
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
                    element: <EncounterSummary />
                  },
                  {
                    path: 'run',
                    element: <EncounterRun /> 
                  }
                ]
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
// <Routes>
//   <Route path='/' element={<Nav/>}>
//     <Route index element={<Home/>}/>
//     <Route path='guide'>
//       <Route index element={<GuideHome/>}/>
//       <Route path=':guide_type' element={<Guide/>}/>
//     </Route>
//     <Route path='stuff' element={<StuffNav/>}>
//       <Route index element={<Stuff/>}/>
//       <Route path='campaigns'>
//         <Route index element={<Campaigns/>}/>
//         <Route path=':campaign_id' element={<CampaignView/>}/>
//       </Route>
//       <Route path='encounters'>
//         <Route index element={<Encounters/>}/>
//         <Route path='new' element={<EncounterNew/>}/>
//         <Route path=':encounter_id'>
//           <Route index element={<EncounterSummary/>}/>
//           <Route path='run' element={<EncounterRun/>}/>
//         </Route>
//       </Route>
//     </Route>
//   </Route>
//   <Route path='/login' element={<Login />}/>
//   <Route path='/signup' element={<Signin />}/>
// </Routes>

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App