import React, { useState, useContext } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SavedContext from '../SavedContext.jsx';
import './Layout.css';

// Define the type for draggable items
const ItemTypes = {
  IMAGE: "image",
};

// Draggable Image Component
const DraggableImage = ({ id, src, height, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className='dragable-el'>
      <button className='remove-btn' onClick={()=> onDelete(id)}>x</button>
      <img className='dragable-image'
        ref={drag}
        src={src}
        alt=""
        style={
          height={height}
        }
      />
      </div>
  );
};

// Droppable Grid Cell Component
const DroppableCell = ({ index, image, onDrop, onDelete}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: (item) => onDrop(item.id, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className='droppable-cell'
      ref={drop}>
      {image && <DraggableImage
      id={image.objectID}
      src={image.primaryImage}
      height={image.measurements[0].elementMeasurements.Height == undefined? 100 : image.measurements[0].elementMeasurements.Height * 10}
      onDelete={onDelete}
      />}
    </div>
  );
};

// Main Grid Component
const DragDropGrid = () => {
  const {savedArray, setsavedArray} = useContext(
  SavedContext
  );

  const [grid, setGrid] = useState(Array(2000).fill(null));

  const handleDrop = (imageId, index) => {
    const draggedImage = savedArray.find((img) => img.objectID === imageId);
    if (draggedImage) {
      setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      let matchingImage = newGrid.find((image) =>  image == draggedImage )
      if (matchingImage)
       {newGrid.splice(newGrid.indexOf(matchingImage), 1, null)}
        newGrid[index] = draggedImage;
      return newGrid;
    });
    }
  };

  const handleDelete = (id) => {
   setGrid((prevGrid)=> {
    const newGrid = [...prevGrid]
    let matchingImage = newGrid.find((img) => img && img.objectID == id)
    let index = newGrid.indexOf(matchingImage)
    if(index !== -1) {
    newGrid[index] = null;
    }
    return newGrid
  })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <h3>Saved Pieces</h3>
      <div className='image-hold'>
        {savedArray.map((image) => (
          <DraggableImage
          key={image.objectID}
          id={image.objectID}
          src={image.primaryImage}
          height = {image.measurements[0]?.elementMeasurements.Height == undefined? 100 : image.measurements[0].elementMeasurements.Height * 10}
          onDelete={handleDelete}
          />
          ))}
      </div>
      <h3>Gallery Wall</h3>
      <div className='grid-container' >
        {grid.map((image, index) => (
          <DroppableCell
            key={index}
            index={index}
            image={image}
            onDrop={handleDrop}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DragDropGrid;
