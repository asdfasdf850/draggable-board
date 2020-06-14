import React, { createContext, Dispatch, Reducer, PropsWithChildren, useReducer, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { DragItem, Action } from 'types'
import { findItemIndexById } from 'utils'

interface Task {
  id: string
  text: string
}

interface List {
  id: string
  text: string
  tasks: Task[]
}

interface AppState {
  draggedItem: DragItem | undefined
  lists: List[]
}

interface AppStateContextProps {
  state: AppState
  dispatch: Dispatch<Action>
}

const initialState: AppState = {
  draggedItem: undefined,
  lists: [
    {
      id: '123',
      text: 'To Do',
      tasks: [{ id: 'c1', text: 'first' }]
    },
    {
      id: '456',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'second' }]
    },
    {
      id: '789',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'third' }]
    }
  ]
}

const appStateReducer: Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_DRAGGED_ITEM': {
      return { ...state, draggedItem: action.payload }
    }
    case 'ADD_LIST': {
      const newList: List = { id: uuidv4(), text: action.payload, tasks: [] }
      state.lists.push(newList)
      return { ...state }
    }
    case 'ADD_TASK': {
      const targetColumnIndex = findItemIndexById(state.lists, action.payload.columnId)
      state.lists[targetColumnIndex].tasks.push({ id: uuidv4(), text: action.payload.text })
      return { ...state }
    }
    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload
      const startIndex = hoverIndex < 0 ? state.lists.length + hoverIndex : hoverIndex
      const draggableItem = state.lists.splice(dragIndex, 1)[0]
      state.lists.splice(startIndex, 0, draggableItem)
      return { ...state }
    }
    case 'MOVE_TASK': {
      const { dragIndex, hoverIndex, sourceColumn, targetColumn } = action.payload
      const sourceColumnIndex = findItemIndexById(state.lists, sourceColumn)
      const targetColumnIndex = findItemIndexById(state.lists, targetColumn)
      const draggableItem = state.lists[sourceColumnIndex].tasks.splice(dragIndex, 1)[0]
      state.lists[targetColumnIndex].tasks.splice(hoverIndex, 0, draggableItem)
      return { ...state }
    }
    default:
      return state
  }
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const AppStateProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState)

  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}

/**
 * Reusable hook for getting state directly from './AppStateContext' without importing useContext() and AppStateContext everywhere
 */

export const useAppState = () => {
  return useContext(AppStateContext)
}
