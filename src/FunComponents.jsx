
import React from 'react';

function PlayerInfo(props) {
    return (
        <footer class="page-footer sticky-footer blue">
            <div class="footer-copyright">
                <div class="container">
                    <span className='left'>© 2020 Szymon Idziniak</span>
                    <span className='right'>{'Difficulty:  ' + props.difficulty + '  -  Answered:  ' + props.questionN.answered + ' / ' + props.questionN.all}</span>
                </div>
            </div>
        </footer>
    );
}

function TopPadding(props) {
    return (
        <>
            <div className='row'>
                <div className="top-padding s12">
                    <p className='header-text wobble-hor-bottom'>{props.message}</p>
                </div>
            </div>
        </>
    );
}
function MenuEntry(props) {
    return (
        <li key={props.color}><a className={"btn-floating " + props.color} onClick={props.changeHandler}>{props.difficulty}</a></li>
    )
}

function ColumnWrapper(props) {
    return (
        <div className="row">
            <div className={props.columnClasses}>
                {props.content}
            </div>
        </div>
    );
}
function PlayNext(props) {
    return (
        <button onClick={() => props.resetGame()} >reset</button>
    );
}

function Finished(props) {
    return (
        <>
            <TopPadding message={"Your score: " + props.score} />
            <PlayNext resetGame={props.resetGame} />
        </>
    );
}
function Summary(props) {
    return (null);
}

export { PlayerInfo, TopPadding, MenuEntry, ColumnWrapper, Finished }