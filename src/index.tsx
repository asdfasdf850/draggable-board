import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { AppStateProvider } from 'AppStateContext'
import { App } from './App'
import { GlobalStyles } from 'styles'

render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <GlobalStyles />
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DndProvider>
  </StrictMode>,
  document.getElementById('root')
)
