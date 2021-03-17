import React from 'react'
import {Badge, Card } from "react-bootstrap"
import { Link } from 'react-router-dom'

function Discussions({d}) {



    return (
            <Card className="my-3">
                <Card.Header style={{color:"white"}}><Badge pill variant="success"><h6>Author: {d.name}</h6></Badge>{" "}</Card.Header>
                <Card.Body>
                    <Card.Title>Topic: <Badge variant="dark">{d.title}</Badge></Card.Title>
                    <Card.Text style={{color:"white"}}>
                        {d.description}
                    </Card.Text>

                    <Link to={`/reply/${d._id}`} className='btn btn-light my-3'>See Replies</Link>
                </Card.Body>

            </Card>
      
    )
}

export default Discussions
