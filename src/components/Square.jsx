const Square = ({children,isSelected, updateBoard, index}) => {
    const classNameSelected = `square ${isSelected ? 'is-selected' : ''}`

    const handlerClick = () => {
      updateBoard(index)
    }

    return (
      <div onClick={handlerClick} className={classNameSelected}>
        {children}
      </div>
    )
  }

  export default Square