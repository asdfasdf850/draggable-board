export type ColumnDragItem = {
  index: number
  id: string
  text: string
  type: 'COLUMN'
}

export type CardDragItem = {
  index: number
  id: string
  columnId: string
  text: string
  type: 'CARD'
}

export type DragItem = ColumnDragItem | CardDragItem

export type Action =
  | {
      type: 'SET_DRAGGED_ITEM'
      payload: DragItem | undefined
    }
  | {
      type: 'ADD_LIST'
      payload: string
    }
  | {
      type: 'ADD_TASK'
      payload: {
        text: string
        columnId: string
      }
    }
  | {
      type: 'MOVE_LIST'
      payload: {
        dragIndex: number
        hoverIndex: number
      }
    }
  | {
      type: 'MOVE_TASK'
      payload: {
        dragIndex: number
        hoverIndex: number
        sourceColumn: string
        targetColumn: string
      }
    }
