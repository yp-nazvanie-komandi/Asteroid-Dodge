import { BrowserRouter, Routes, Route } from 'react-router'

import { Main } from '../../pages/Main/Main'
import { Login } from '../../pages/Login/Login'
import { Registration } from '../../pages/Registration/Registration'
import { Profile } from '../../pages/Profile/Profile'
import { GameCanvas } from '../../pages/Game/Game'
import { Leaderboard } from '../../pages/Leaderboard/Leaderboard'
import { Forum } from '../../pages/Forum/Forum'
import { ForumTopicCreation } from '../../pages/ForumTopicCreation/ForumTopicCreation'
import { ForumTopic } from '../../pages/ForumTopic/ForumTopic'
import { Exception } from '../../pages/Exception/Exception'
import { GameOver } from '../../pages/Game-over/Game-over'
import { Start } from '../../pages/Start/Start'
import Error400 from '../../pages/400/400'
import { CreateForumTopic } from '../../pages/CreateForumTopic/CreateForumTopic'

import { PrivateRoutes } from '../PrivateRoutes/PrivateRoutes'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        {/* element={<PrivateRoutes />} */}
        <Route path="/">
          <Route path="profile" element={<Profile />} />
          {/* TODO: при необходимости можем добавить отдельными роутами старт экран и конец экран игры и вынести game как родителя */}
          <Route path="game" element={<GameCanvas />} />
          <Route path="start" element={<Start />} />
          <Route path="game-over" element={<GameOver />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="topics">
            <Route index element={<Forum />} />
            <Route path="new" element={<CreateForumTopic />} />
            <Route path=":topicId" element={<ForumTopic />} />
          </Route>
          <Route path="/error" element={<Exception />} />
          <Route path="*" element={<Error400 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
