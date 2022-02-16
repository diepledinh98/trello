import React, { useState, useEffect } from 'react'
import Column from '../Column/Column'
import { initialData } from '../../actions/initialData'
import { isEmpty } from 'lodash'
import './BoardContent.scss'
import { mapOrder } from '../../untilities/sorts'
import { Container, Draggable } from 'react-smooth-dnd'
import { applyDrag } from '../../untilities/dragDrop'
import { Container as BootstrapContainer, Row, Col, FormControl, Button } from 'react-bootstrap'
function BoardContent() {

  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  if (isEmpty(board)) {
    return <div className='not-found' style={{ 'padding': '10px', 'color': '#fff' }}>Board not found!</div>

  }
  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns
    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]

      let currentColumn = newColumns.find(c => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i.id)

      setColumns(newColumns)
    }
  }
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
  }

  const onNewColumnTitleChange = (e) => {
    setNewColumnTitle(e.target.value)
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      return
    }

    const newColumnToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: []
    }

    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    setNewColumnTitle('')
    setOpenNewColumnForm(!openNewColumnForm)
  }
  return (
    <div className='board-content'>
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index} >
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>

      <BootstrapContainer>
        {!openNewColumnForm &&
          <Row className='add-new-column' onClick={toggleOpenNewColumnForm}>
            <Col><i className='fa fa-plus icon' /> Add another column</Col>
          </Row>
        }

        {openNewColumnForm &&
          <Row className='enter-new-column'>
            <Col>
              <FormControl
                size='sm'
                type='text'
                placeholder='Enter Column title...'
                className='input-enter-new-column'
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={event => (event.key == 'Enter') && addNewColumn()}
              />
              <Button
                variant='success'
                size='sm'
                onClick={addNewColumn}
              >Add Column</Button>
              <span className='cancel-new-column' onClick={toggleOpenNewColumnForm}>
                <i className='fa fa-trash icon' />
              </span>
            </Col>
          </Row>
        }

      </BootstrapContainer>

    </div >
  )
}

export default BoardContent