import React, { FC } from 'react'

import { useAppState } from 'AppStateContext'
import { CustomDragLayer } from 'CustomDragLayer'
import { Column } from 'Column'
import { AddNewItem } from 'AddNewItem'
import { AppContainer } from 'styles'

export const App: FC = () => {
  const { state, dispatch } = useAppState()

  return (
    <AppContainer>
      <CustomDragLayer />
      {state.lists.map((list, index) => (
        <Column key={list.id} id={list.id} text={list.text} index={index} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add another list'
        onAdd={text => dispatch({ type: 'ADD_LIST', payload: text })}
      />
    </AppContainer>
  )
}
