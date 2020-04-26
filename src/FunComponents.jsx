
import React from 'react';

// player info at the bottom
function GameInfo(props) {
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

// padding for header text
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
// menu entry for floating button with dynamic difficulty
function MenuEntry(props) {
    return (
        <li key={props.color}><a className={"btn-floating " + props.color} onClick={props.changeHandler}>{props.difficulty}</a></li>
    )
}
// materialize row-column wrapper
function ColumnWrapper(props) {
    return (
        <div className="row">
            <div className={props.columnClasses}>
                {props.content}
            </div>
        </div>
    );
}
// screen rendered after finished game
function Finished(props) {
    return (
        <>
            <TopPadding />
            <div className="row center-align">
                <div className='s12'>
                    <p className='setting-hint'>{"Your score: " + props.score}</p>
                </div>
            </div>
            <div className="row center-align">
                <div className='col s12'>
                    <a className="waves-effect waves-light btn" onClick={() => props.resetGame()}>Play again</a>
                </div>
            </div>
        </>
    );
}

export { GameInfo, TopPadding, MenuEntry, ColumnWrapper, Finished }