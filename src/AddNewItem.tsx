import React, { FC, useState } from 'react'

import { NewItemForm } from 'NewItemForm'
import { AddItemButton } from 'styles'

interface Props {
  onAdd(text: string): void
  toggleButtonText: string
  dark?: boolean
}

export const AddNewItem: FC<Props> = ({ onAdd, toggleButtonText, dark }) => {
  const [showForm, setShowForm] = useState<boolean>(false)

  if (showForm) {
    return (
      <NewItemForm
        onAdd={text => {
          onAdd(text)
          setShowForm(false)
        }}
      />
    )
  }

  return (
    <AddItemButton onClick={() => setShowForm(true)} dark={dark}>
      {toggleButtonText}
    </AddItemButton>
  )
}
