import React, {useState, useEffect } from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
import './Display.css'

function Display() {

    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(err => setData("Failed to receive data!!!"));
    },[]);

    const photosPerPage = 12;
    const pagesVisited = pageNumber * photosPerPage;

    const displayPhotos = data.slice(pagesVisited, pagesVisited + photosPerPage).map(card =>{
        return(
            <div style={{ width: '16rem',margin: "20px" }}>
                <Card key={card.id}>
                <Card.Img variant="top" src={card.thumbnailUrl} />
                <Card.Body>
                    <Card.Text><small>{card.id}. {card.title}</small></Card.Text>
                </Card.Body>
                </Card>
            </div>
        );
    })

    const pageCount = Math.ceil(data.length/photosPerPage);

    const onPageChange = ({selected}) =>{
        setPageNumber(selected)
    }

    return (
        <>
            <CardGroup>
                <ReactPaginate 
                    previousLabel= "Prev"
                    nextLabel= "Next"
                    pageCount={pageCount}
                    onPageChange={onPageChange}
                    containerClassName = "paginationBttns"
                    previousLinkClassName = "previousBttn"
                    nextLinkClassName = "nextBttn"
                    activeClassName = "activeBttn"
                />
                {displayPhotos}
            </CardGroup>
        </>
    )
}

export default Display;
