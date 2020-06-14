import React, { FC, useRef } from 'react'
import { useDrop } from 'react-dnd'

import { useAppState } from 'AppStateContext'
import { useItemDrag, isHidden } from 'utils'
import { CardDragItem } from 'types'
import { CardContainer } from 'styles'

interface Props {
  text: string
  index: number
  id: string
  columnId: string
  isPreview?: boolean
}

export const Card: FC<Props> = ({ text, index, id, columnId, isPreview }) => {
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)

  const { drag } = useItemDrag({ type: 'CARD', id, index, text, columnId })

  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item: CardDragItem) {
      if (item.type === 'CARD' && item.id === id) return

      const dragIndex = item.index
      const hoverIndex = index
      const sourceColumn = item.columnId
      const targetColumn = columnId

      dispatch({ type: 'MOVE_TASK', payload: { dragIndex, hoverIndex, sourceColumn, targetColumn } })

      item.index = hoverIndex
      item.columnId = targetColumn
    }
  })

  drag(drop(ref))

  return (
    <CardContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(isPreview, state.draggedItem, 'CARD', id)}
    >
      {text}
    </CardContainer>
  )
}
