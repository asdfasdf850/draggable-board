import styled, { createGlobalStyle } from 'styled-components'

interface AddItemButtonProps {
  dark?: boolean
}

interface DragPreviewContainerProps {
  isHidden?: boolean
  isPreview?: boolean
}

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    html {
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    html,
    body,
    #root {
        height: 100%;
    }
`

export const AppContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow: scroll;
  background-color: #3179ba;
`

export const CustomDragLayerContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 100;
`

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  transform: ${({ isPreview }) => isPreview && 'rotate(5deg)'};
`

export const ColumnContainer = styled(DragPreviewContainer)`
  flex-grow: 0;
  flex-shrink: 0;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  background-color: #ebecf0;
`

export const ColumnTitle = styled.div`
  padding: 6px 12px 12px;
  font-weight: bold;
`

export const CardContainer = styled(DragPreviewContainer)`
  max-width: 300px;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
  background-color: #fff;
  box-shadow: #091e4240 0px 1px 0px 0px;
`
export const AddItemButton = styled.button<AddItemButtonProps>`
  width: 100%;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background 85ms ease-in;
  background-color: #ffffff3d;
  color: ${({ dark }) => (dark ? '#000' : '#fff')};

  &:hover {
    background-color: #ffffff52;
  }
`

export const NewItemFormContainer = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const NewItemFormButton = styled.button`
  padding: 6px 12px;
  text-align: center;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  color: #fff;
  background-color: #5aac44;
`

export const NewItemInput = styled.input`
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
`
