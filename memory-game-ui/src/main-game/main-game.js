import React, { useState, useEffect } from 'react';
import { Button, Alert } from "react-bootstrap";
import Timer from "./timer/timer";
import GameOverModal from "./game-over-modal/game-over-modal";
import axios from 'axios';
import MemoryCard from "./memory-card/memory-card";

function MainGame(props) {
    const [allCards, setAllCards] = useState([]);   // will contail all cards
    const [previousCard, setPreviousCard] = useState(undefined);    // will contain previous card
    const [alertMessage, setAlertMessage] = useState('');   // will contain result message
    const [clickNotAllowed, setClickNotAllowed] = useState(false);  // to prevent unwanted multiple card clicks
    const [matched, setMatched] = useState(undefined);  // if cards are matched or not
    const [errorScore, setErrorScore] = useState(0);   // contain error score
    const [hiddenCards, setHiddenCards] = useState([]);   // will contain hidden cards
    const [gameOver, setGameOver] = useState(false);    // if game is over or not
    const [timeValues, setTimeValues] = useState();    // will contain time elapsed

    useEffect(() => {
        // getting requested cards from backend server
        const getCards = async () => {
            const res = await axios.get(`/cards/${props.location.state.level}`);
            setAllCards(res.data)
        }
        getCards();
    }, [props.location.state.level]);

    const openCard = (card) => {
        if (clickNotAllowed) return;    // handling multiple clicks on card
        setClickNotAllowed(true);
        const cards = [...allCards];
        let cardTobeChange = {};
        cardTobeChange = { ...card };   // making new instance of selected card
        cardTobeChange.currentcolor = cardTobeChange.maincolor;    // showing card content
        let updatedCards = cards.filter(crd => crd.id !== cardTobeChange.id);
        updatedCards.splice(cardTobeChange.id - 1, 0, cardTobeChange)
        setAllCards(updatedCards);  // updating cards array with above change
        if (previousCard && previousCard.id !== card.id) {  // checking if previous card and current card is same or different
            if (previousCard.maincolor === card.maincolor) {
                findResult(updatedCards, card, true);   // if cards are matching
            } else {
                findResult(updatedCards, card, false);  // if cards are not matching
            }
        } else {
            setPreviousCard(card);  // set current card as previous card for future use
            setAlertMessage("");    // no message
            setMatched(undefined);  // no result
            setClickNotAllowed(false);  // set clicked allowed
        }
    }

    const findResult = (updatedCards, card, matching) => {
        let card1 = undefined, card2 = undefined;
        updatedCards.forEach(aCard => {
            if (aCard.id === card.id || aCard.id === previousCard.id) {    // getting both selected cards
                if (!card1) {
                    card1 = { ...aCard };   // having selected cards
                } else {
                    card2 = { ...aCard };   // having selected cards
                }
            }
            return aCard;
        })
        let newCardsSet = []
        if (card1) {
            if (matching) {
                card1.hidden = true;    // if selected cards are matching then they will disappear
            } else {
                card1.currentcolor = '#FFFFFF';   // if selected cards are not matching then they will be white again
            }
            setPreviousCard(undefined);   // now previous will be none for fresh start
            newCardsSet = updatedCards.filter(crd => crd.id !== card1.id);
            newCardsSet.splice(card1.id - 1, 0, card1)  // updating one card status
        }
        if (card2) {
            if (matching) {
                card2.hidden = true;    // if selected cards are matching then they will disappear
            } else {
                card2.currentcolor = '#FFFFFF';    // if selected cards are not matching then they will be white again
            }
            setPreviousCard(undefined);    // now previous will be none for fresh start
            newCardsSet = newCardsSet.filter(crd => crd.id !== card2.id);
            newCardsSet.splice(card2.id - 1, 0, card2)  // updating another card status
        }
        if (matching) {
            setAlertMessage("The card are matching example");
            setMatched(true);
            const newHiddenCards = [...hiddenCards, card2, card2];  // making an array of hidden cards
            setHiddenCards(newHiddenCards);
            setTimeout(() => {  // game if over if all cards are played or only one card is left
                if (allCards.length === newHiddenCards.length || allCards.length === (newHiddenCards.length + 1)) {
                    setGameOver(true);
                }
            }, 3000);
        } else {
            setErrorScore(errorScore + 1);  // updating error score
            setAlertMessage("The card's don't match example");
            setMatched(false);
        }
        setTimeout(() => {
            setAllCards(newCardsSet);
            setMatched(undefined);
            setAlertMessage("");
            setClickNotAllowed(false);
        }, 3000);   // showing result for three seconds
    }

    const GetCards = () => {
        return allCards?.map(card => {
            return <MemoryCard card={card} key={card.id} openCard={openCard} level={props.location.state.level} />
        })
    }

    const closeModal = () => {
        setGameOver(false);    // close game over modal
    }

    const receiveTime = (time) => {
        setTimeValues(time);   // getting total time elapsed after game is completed
    }

    return (
        <>
            <GameOverModal show={gameOver} closeModal={closeModal} timeElapsed={timeValues} errorScore={errorScore} />
            <div className="row mt-5">
                <Button className="m-2 ml-5 col-5" variant="outline-dark" size="lg">
                    <Timer gameOver={gameOver} receiveTime={receiveTime} />
                </Button>
                <Button className="m-2 col-5" variant="outline-dark" size="lg">
                    Error Score: {errorScore}
                </Button>
            </div>
            <div className="row ml-5">
                <GetCards />
            </div>
            <Alert variant={matched ? 'success' : 'danger'} hidden={matched === undefined} className="offset-8 col-3 offset-1">
                {alertMessage}
            </Alert>
        </>
    )
}

export default MainGame;
