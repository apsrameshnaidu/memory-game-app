import React from 'react';
import "./home.css";
import { Button } from "react-bootstrap";

function Home(props) {

    const levels = [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
    ];

    const goToMainGamePage = (level) => {
        props.history.push('main-game', { level: level });
    }

    const getButtons = (level) => {
        return (
            <Button
                className="col-3 m-2 font-weight-bold"
                variant="outline-dark"
                size="lg"
                onClick={() => goToMainGamePage(level.value)}
            >
                {level.label}
            </Button>
        )
    }

    return (
        <>
            <h1 className="header mt-5">Memory Game</h1>
            <h2 className="ml-5 mt-5">Please select game difficulty:</h2>\
            <div className="row m-5 text-center">
                {levels.map(level => {
                    return getButtons(level)
                })}
            </div>
            <h5 className="footer mr-5">Start Game Board</h5>
        </>
    )
}

export default Home;