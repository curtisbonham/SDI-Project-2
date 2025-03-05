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
const DraggableImage = ({ id, src, onDelete }) => {
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
      />
      </div>
  );
};

// Droppable Grid Cell Component
const DroppableCell = ({ index, image, onDrop}) => {
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
      {image && <DraggableImage id={image.objectID} src={image.primaryImage} />}
    </div>
  );
};

// Main Grid Component
const DragDropGrid = () => {
  const[images, setImages] = useState([]);

  if (images.length == 0) {
    setImages(mockData);
  }

  // const [images, setImages] = useContext(
  // SavedContext
  // );

  const [grid, setGrid] = useState(Array(2000).fill(null));

  const handleDrop = (imageId, index) => {
    const draggedImage = images.find((img) => img.objectID === imageId);
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
    const index = newGrid.find((img) => img && img.objectID == id)
    if(index !== -1) {
      newGrid[index] = null;
    }
    return newGrid
  })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='image-hold'>
        {images.map((image) => (
          <DraggableImage
          key={image.objectID}
          id={image.objectID}
          src={image.primaryImage}
          onDelete={handleDelete}
          />
          ))}
      </div>
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

let mockData = [{
  "objectID": 405040,
  "primaryImage": "https://images.metmuseum.org/CRDImages/dp/original/DP846643.jpg",
  "dimensions": "sheet: 2 11/16 x 1 3/8 in. (6.9 x 3.5 cm)",
  "measurements": [
      {
          "elementName": "Sheet",
          "elementDescription": null,
          "elementMeasurements": {
              "Height": 6.9,
              "Width": 3.5
          }
      }
  ],
  "creditLine": "The Jefferson R. Burdick Collection, Gift of Jefferson R. Burdick",
  "geographyType": "",
  "city": "",
  "state": "",
  "county": "",
  "country": "",
  "region": "",
  "subregion": "",
  "locale": "",
  "locus": "",
  "excavation": "",
  "river": "",
  "classification": "Photographs",
  "rightsAndReproduction": "",
  "linkResource": "",
  "metadataDate": "2020-11-21T04:34:11.18Z",
  "repository": "Metropolitan Museum of Art, New York, NY",
  "objectURL": "https://www.metmuseum.org/art/collection/search/405040",
  "tags": [
      {
          "term": "Portraits",
          "AAT_URL": "http://vocab.getty.edu/page/aat/300015637",
          "Wikidata_URL": "https://www.wikidata.org/wiki/Q134307"
      },
      {
          "term": "Women",
          "AAT_URL": "http://vocab.getty.edu/page/aat/300025943",
          "Wikidata_URL": "https://www.wikidata.org/wiki/Q467"
      },
      {
          "term": "Actresses",
          "AAT_URL": "http://vocab.getty.edu/page/aat/300025658",
          "Wikidata_URL": "https://www.wikidata.org/wiki/Q21169216"
      }
  ],
  "objectWikidata_URL": "",
  "isTimelineWork": false,
  "GalleryNumber": ""
}, {
  "objectID": 192015,
  "isHighlight": false,
  "accessionNumber": "13.7.1",
  "accessionYear": "1913",
  "isPublicDomain": true,
  "primaryImage": "https://images.metmuseum.org/CRDImages/es/original/SF13_7_1.jpg",
  "primaryImageSmall": "https://images.metmuseum.org/CRDImages/es/web-large/SF13_7_1.jpg",
  "additionalImages": [],
  "constituents": null,
  "department": "European Sculpture and Decorative Arts",
  "objectName": "Wineglass",
  "title": "Wineglass",
  "culture": "",
  "period": "",
  "dynasty": "",
  "reign": "",
  "portfolio": "",
  "artistRole": "",
  "artistPrefix": "",
  "artistDisplayName": "",
  "artistDisplayBio": "",
  "artistSuffix": "",
  "artistAlphaSort": "",
  "artistNationality": "",
  "artistBeginDate": "",
  "artistEndDate": "",
  "artistGender": "",
  "artistWikidata_URL": "",
  "artistULAN_URL": "",
  "objectDate": "18th–early 19th century",
  "objectBeginDate": 1700,
  "objectEndDate": 1815,
  "medium": "Glass",
  "dimensions": "Height: 5 3/8 in. (13.7 cm)",
  "measurements": [
      {
          "elementName": "Height",
          "elementDescription": null,
          "elementMeasurements": {
              "Height": 13.652527
          }
      }
  ],
  "creditLine": "Rogers Fund, 1913",
  "geographyType": "",
  "city": "",
  "state": "",
  "county": "",
  "country": "",
  "region": "",
  "subregion": "",
  "locale": "",
  "locus": "",
  "excavation": "",
  "river": "",
  "classification": "Glass",
  "rightsAndReproduction": "",
  "linkResource": "",
  "metadataDate": "2025-01-31T04:54:36.6Z",
  "repository": "Metropolitan Museum of Art, New York, NY",
  "objectURL": "https://www.metmuseum.org/art/collection/search/192015",
  "tags": null,
  "objectWikidata_URL": "",
  "isTimelineWork": false,
  "GalleryNumber": ""
}, {
  "objectID": 544679,
  "isHighlight": false,
  "accessionNumber": "26.7.767",
  "accessionYear": "1926",
  "isPublicDomain": true,
  "primaryImage": "https://images.metmuseum.org/CRDImages/eg/original/DT11685.jpg",
  "primaryImageSmall": "https://images.metmuseum.org/CRDImages/eg/web-large/DT11685.jpg",
  "additionalImages": [
      "https://images.metmuseum.org/CRDImages/eg/original/26.7.767_top.jpg",
      "https://images.metmuseum.org/CRDImages/eg/original/26.7.767_side.jpg",
      "https://images.metmuseum.org/CRDImages/eg/original/EG142.jpg"
  ],
  "constituents": null,
  "department": "Egyptian Art",
  "objectName": "Ring with Akhenaten and Nefertiti as the deities Shu and Tefnut; TW-STOP14",
  "title": "Finger Ring depicting King Akhenaten and Queen Nefertiti as Shu and Tefnut",
  "culture": "",
  "period": "New Kingdom, Amarna Period",
  "dynasty": "Dynasty 18",
  "reign": "reign of Akhenaten",
  "portfolio": "",
  "artistRole": "",
  "artistPrefix": "",
  "artistDisplayName": "",
  "artistDisplayBio": "",
  "artistSuffix": "",
  "artistAlphaSort": "",
  "artistNationality": "",
  "artistBeginDate": "",
  "artistEndDate": "",
  "artistGender": "",
  "artistWikidata_URL": "",
  "artistULAN_URL": "",
  "objectDate": "ca. 1353–1336 BC",
  "objectBeginDate": -1358,
  "objectEndDate": -1348,
  "medium": "Gold",
  "dimensions": "diam. 2.5 cm (1 in); l. of bezel 2.3 cm (7/8 in)",
  "measurements": [
      {
          "elementName": "Overall",
          "elementDescription": null,
          "elementMeasurements": {
              "Diameter": 2.5,
              "Length": 2.3
          }
      }
  ],
  "creditLine": "Purchase, Edward S. Harkness Gift, 1926",
  "geographyType": "From",
  "city": "",
  "state": "",
  "county": "",
  "country": "Egypt",
  "region": "Middle Egypt",
  "subregion": "Amarna (Akhetaten)",
  "locale": "Town",
  "locus": "",
  "excavation": "Petrie excavations, 1891–92",
  "river": "",
  "classification": "",
  "rightsAndReproduction": "",
  "linkResource": "",
  "metadataDate": "2025-02-11T04:53:43.503Z",
  "repository": "Metropolitan Museum of Art, New York, NY",
  "objectURL": "https://www.metmuseum.org/art/collection/search/544679",
  "tags": [
      {
          "term": "Kings",
          "AAT_URL": "http://vocab.getty.edu/page/aat/300025481",
          "Wikidata_URL": "https://www.wikidata.org/wiki/Q12097"
      },
      {
          "term": "Nefertiti",
          "AAT_URL": "http://vocab.getty.edu/page/ulan/500356630",
          "Wikidata_URL": "https://www.wikidata.org/wiki/Q40930"
      },
      {
          "term": "Hieroglyphs",
          "AAT_URL": "http://vocab.getty.edu/page/aat/300028721",
          "Wikidata_URL": "https://www.wikidata.org/wiki/Q193762"
      }
  ],
  "objectWikidata_URL": "https://www.wikidata.org/wiki/Q116247547",
  "isTimelineWork": true,
  "GalleryNumber": "121"
}]