import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the type for draggable items
const ItemTypes = {
  IMAGE: "image",
};

// Draggable Image Component
const DraggableImage = ({ id, src }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={src}
      alt=""
      style={{
        width: 100,
        height: 100,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    />
  );
};

// Droppable Grid Cell Component
const DroppableCell = ({ index, image, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: (item) => onDrop(item.id, index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: 100,
        height: 100,
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isOver ? "lightgray" : "white",
      }}
    >
      {image && <DraggableImage id={image.id} src={image.src} />}
    </div>
  );
};

// Main Grid Component
const DragDropGrid = () => {
  const [images, setImages] = useState([
    { id: 1, src: "https://via.placeholder.com/100" },
    { id: 2, src: "https://via.placeholder.com/100" },
  ]);

  const [grid, setGrid] = useState(Array(9).fill(null));

  const handleDrop = (imageId, index) => {
    const draggedImage = images.find((img) => img.id === imageId);
    if (draggedImage) {
      const newGrid = [...grid];
      newGrid[index] = draggedImage;
      setGrid(newGrid);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {images.map((image) => (
          <DraggableImage key={image.id} id={image.id} src={image.src} />
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: 5,
        }}
      >
        {grid.map((image, index) => (
          <DroppableCell
            key={index}
            index={index}
            image={image}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DragDropGrid;

let mockData = [{
  "objectID": 405040,
  "isHighlight": false,
  "accessionNumber": "63.350.215.171.84",
  "accessionYear": "1963",
  "isPublicDomain": true,
  "primaryImage": "https://images.metmuseum.org/CRDImages/dp/original/DP846643.jpg",
  "primaryImageSmall": "https://images.metmuseum.org/CRDImages/dp/web-large/DP846643.jpg",
  "additionalImages": [],
  "constituents": [
      {
          "constituentID": 163285,
          "role": "Publisher",
          "name": "Issued by Goodwin &amp; Company",
          "constituentULAN_URL": "(not assigned)",
          "constituentWikidata_URL": "https://www.wikidata.org/wiki/Q5583666",
          "gender": ""
      }
  ],
  "department": "Drawings and Prints",
  "objectName": "Photograph",
  "title": "Annie Somerville, from the Actors and Actresses series (N171) for Old Judge Cigarettes",
  "culture": "",
  "period": "",
  "dynasty": "",
  "reign": "",
  "portfolio": "",
  "artistRole": "Publisher",
  "artistPrefix": "Issued by",
  "artistDisplayName": "Goodwin & Company",
  "artistDisplayBio": "",
  "artistSuffix": "",
  "artistAlphaSort": "Goodwin & Company",
  "artistNationality": "",
  "artistBeginDate": "1850",
  "artistEndDate": "1950",
  "artistGender": "",
  "artistWikidata_URL": "https://www.wikidata.org/wiki/Q5583666",
  "artistULAN_URL": "(not assigned)",
  "objectDate": "1886–90",
  "objectBeginDate": 1886,
  "objectEndDate": 1890,
  "medium": "Albumen photograph",
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