import React, { FC, useState } from 'react'

import { useFocus } from 'utils'
import { NewItemFormContainer, NewItemInput, NewItemFormButton } from 'styles'

interface Props {
  onAdd(text: string): void
}

export const NewItemForm: FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState<string>('')

  const inputRef = useFocus()

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && onAdd(text)}
      />
      <NewItemFormButton onClick={() => onAdd(text)}>Create</NewItemFormButton>
    </NewItemFormContainer>
  )
}
