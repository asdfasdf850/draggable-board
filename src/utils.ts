import { useRef, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { useAppState } from 'AppStateContext'
import { DragItem } from 'types'

/**
 * Custom hook that automatically focuses on a NewItemForm after appearance
 */

export const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.focus()
  })

  return ref
}

/**
 * Finds column's number index by it's string id
 * @param items lists array
 * @param id generated uuidv4() string
 */

export const findItemIndexById = (items: any[], id: string): number => {
  return items.findIndex(item => item.id === id)
}

/**
 * Hook to drag columns and tasks
 * @param item item to drag
 * @returns drag method that accepts ref of a draggable element
 */

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState()

  const [, drag, preview] = useDrag({
    item,
    begin: () => dispatch({ type: 'SET_DRAGGED_ITEM', payload: item }),
    end: () => dispatch({ type: 'SET_DRAGGED_ITEM', payload: undefined })
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  return { drag }
}

/**
 * Function to hide layer when dragging item
 */

export const isHidden = (
  isPreview: boolean | undefined,
  draggedItem: DragItem | undefined,
  itemType: string,
  id: string
): boolean => {
  return Boolean(!isPreview && draggedItem && draggedItem.type === itemType && draggedItem.id === id)
}
