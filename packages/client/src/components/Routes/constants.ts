import { TRouteDescriptor } from './types'

// TODO: перевести на рельсы Lazy + Suspense
import { Main } from '../../pages/Main/Main'
import { Login } from '../../pages/Login/Login'
import { Registration } from '../../pages/Registration/Registration'
import { Profile } from '../../pages/Profile/Profile'
import { GameCanvas } from '../../pages/Game/Game'
import { Leaderboard } from '../../pages/Leaderboard/Leaderboard'
import { ForumIndex } from '../../pages/ForumIndex/ForumIndex'
import { ForumTopic } from '../../pages/ForumTopic/ForumTopic'
import { Exception } from '../../pages/Exception/Exception'
import { GameOver } from '../../pages/Game-over/Game-over'
import { Start } from '../../pages/Start/Start'
import Error400 from '../../pages/400/400'
import { CreateForumTopic } from '../../pages/CreateForumTopic/CreateForumTopic'
import { OAuth } from '../../pages/OAuth/OAuth'

import { PrivateRoutes } from '../PrivateRoutes/PrivateRoutes'
import { ForumLayout } from '../../layouts/Forum/Forum'

export const routes: TRouteDescriptor[] = [
  {
    index: true,
    Component: Main,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/oauth',
    Component: OAuth,
  },
  {
    path: '/registration',
    Component: Registration,
  },
  {
    path: '/',
    Component: PrivateRoutes,
    children: [
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'game',
        Component: GameCanvas,
      },
      {
        path: 'start',
        Component: Start,
      },
      {
        path: 'game-over',
        Component: GameOver,
      },
      {
        path: 'leaderboard',
        Component: Leaderboard,
      },
      {
        path: 'topics',
        Component: ForumLayout,
        children: [
          { index: true, Component: ForumIndex },
          { path: 'new', Component: CreateForumTopic },
          { path: ':topicId', Component: ForumTopic },
        ],
      },
    ],
  },
  {
    path: '/error',
    Component: Exception,
  },
  {
    path: '*',
    Component: Error400,
  },
]
