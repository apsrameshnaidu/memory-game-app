import React from 'react';
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router";

function GameOverModal(props) {

    const goToHomePage = () => {
        props.closeModal();
        props.history.push('home');
    }

    return (
        <Modal show={props.show} onHide={props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Game is Over !</Modal.Title>
            </Modal.Header>
            <Modal.Body className="row">
                <div className="col-6">
                    Time Elapsed : {props.timeElapsed}
                </div>
                <div className="col-6">
                    Error Score : {props.errorScore}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={goToHomePage}>
                    Play Again
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default withRouter(GameOverModal);
