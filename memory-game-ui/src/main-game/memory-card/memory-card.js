import React from 'react';
import { Card } from "react-bootstrap";

function MemoryCard(props) {

    return (
        <div className={` ${props.level === 'easy' ? 'col-3' : 'col-2'} mr-2`}>
            <Card
                text='dark'
                style={{
                    'width': '11rem',
                    'height': '5rem',
                    'cursor': 'pointer',
                    'borderColor': 'black',
                    'backgroundColor': `${props.card.currentcolor}`,
                }}
                className="card m-4 cursor-pointer"
                onClick={() => props.openCard(props.card)}
                hidden={props.card.hidden}
            >
                <Card.Body>
                </Card.Body>
            </Card>
        </div>
    );
}

export default MemoryCard;
