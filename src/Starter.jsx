import React from 'react';
import './App.css';
import { difficulty, answerNoptions } from './Globals';

// render starting difficulty to choose
function StartingDifficulty(props) {
  return (
    <>
      <div className="row center-align">
        <div className='col s12'>
          <p className='setting-hint'>Choose difficulty</p>
        </div>
      </div>
      <div className="row center-align">
        <div className='col s4'>
          <a className="waves-effect waves-light btn" onClick={() => props.setter(difficulty.EASY)}>{difficulty.EASY}</a>
        </div>
        <div className='col s4'>
          <a className="waves-effect waves-light btn" onClick={() => props.setter(difficulty.MEDIUM)}>{difficulty.MEDIUM}</a>
        </div>
        <div className='col s4'>
          <a className="waves-effect waves-light btn" onClick={() => props.setter(difficulty.HARD)}>{difficulty.HARD}</a>
        </div>
      </div>
    </>
  );
}

// render starting question number to choose
function StartingQuestionN(props) {
  return (
    <>
      <div className="row center-align">
        <div className='s12'>
          <p className='setting-hint'>Choose number of questions</p>
        </div>
      </div>
      <div className="row center-align">
        <div className='col s4'>
          <a className="waves-effect waves-light btn" onClick={() => props.setter(answerNoptions.easy)}>{answerNoptions.easy}</a>
        </div>
        <div className='col s4'>
          <a className="waves-effect waves-light btn" onClick={() => props.setter(answerNoptions.mid)}>{answerNoptions.mid}</a>
        </div>
        <div className='col s4'>
          <a className="waves-effect waves-light btn" onClick={() => props.setter(answerNoptions.hard)}>{answerNoptions.hard}</a>
        </div>
      </div>
    </>
  );
}

// starting components containing actual settings
class StartingSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: null
    }
  }
  setDifficulty = (setting) => {
    this.setState({ difficulty: setting });
  }
  setQuestionN = (setting) => {
    this.props.PushSettings({
      difficulty: this.state.difficulty,
      questionNumber: setting
    });
  }
  render() {
    if (!this.state.difficulty) {
      return <StartingDifficulty setter={this.setDifficulty} />;
    }
    else {
      return <StartingQuestionN setter={this.setQuestionN} />;
    }
  }
}
export { StartingSettings };