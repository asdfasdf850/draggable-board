import React, { FC, CSSProperties } from 'react'
import { useDragLayer, XYCoord } from 'react-dnd'

import { Column } from 'Column'
import { Card } from 'Card'
import { CustomDragLayerContainer } from 'styles'

export const CustomDragLayer: FC = () => {
  const { item, isDragging, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset()
  }))

  function getItemStyles(currentOffset: XYCoord | null): CSSProperties {
    if (!currentOffset) {
      return {
        display: 'none'
      }
    }

    const { x, y } = currentOffset

    const transform = `translate(${x}px, ${y}px)`

    return {
      transform,
      WebkitTransform: transform
    }
  }

  if (!isDragging) return null

  return (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === 'COLUMN' ? (
          <Column id={item.id} text={item.text} index={0} isPreview={true} />
        ) : (
          <Card id={item.id} columnId={item.columnId} index={0} text={item.text} isPreview={true} />
        )}
      </div>
    </CustomDragLayerContainer>
  )
}
