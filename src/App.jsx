import React from 'react';
import { difficulty, breeds, difficultyNumber, randomImageUrl, mainColor } from './Globals';
import { StartingSettings } from './Starter';
import { GameInfo, TopPadding, MenuEntry, ColumnWrapper, Finished } from './FunComponents'
import './animations.css';
import { DualRing } from 'react-spinners-css';
import $ from 'jquery';
import M from 'materialize-css';

// handle list selection
class ButtonsMenu extends React.Component {
  //init materialize js for dropdown
  componentDidMount() {
    M.Dropdown.init($('.dropdown-trigger'), {
      container: $('#drop-options'),
      autoTrigger: true,
    });
  }
  render() {
    let listItems = [];
    let dogs = this.props.breeds;
    for (let i = 0; i < dogs.length; i++) {
      listItems[i] = <li key={dogs[i]}><a onClick={() => this.props.handler(i)}>{dogs[i]}</a></li>;
    }
    // return list with mapped options
    return (
      <div id='drop-options'>
        <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Choose</a>
        <ul id='dropdown1' className='dropdown-content '>
          {listItems}
        </ul>
      </div>
    );
  }
}

// component for fetching data and generating options
class ImageApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      url: null,
      prev_diff: null,
      correct_id: null,
      generatedBreeds: null,
      questionN: 0,
    };
  }
  // get photo from api
  fetch_photo = () => {
    fetch(randomImageUrl)
      .then(res => res.json())
      .then(
        (result) => {
          // handle respose error
          let url = String(result.message);
          if (result.status !== 'success') {
            this.setState({
              error: { message: result.status }
            });
          }
          else if (url.substr(url.length - 3, url.length) === 'txt') {
            this.setState({
              error: { message: 'file corrupted' }
            });
          }
          // set state for actual dog
          let generatedBreeds = this.generateBreeds(url);
          let correct_id = this.getCorrectId(generatedBreeds, this.getNameFromUrl(url));
          this.setState({
            isLoaded: true,
            url: url,
            status: result.status,
            correct_id: correct_id,
            generatedBreeds: generatedBreeds,
          });
        },
        // handle fetch error
        (error) => {
          this.setState({
            isLoaded: true,
            error: error,
          });
        }
      )
  }

  // fetch phono after component is mounted
  componentDidMount() {
    this.fetch_photo();
  }

  componentDidUpdate() {
    // if error encountered -> flush error and force update fetch
    if (this.state.error) {
      this.setState({
        error: null
      });
    }
    //if difficulty has changed -> get new photo and update old setting
    if (this.props.difficulty !== this.state.prev_diff) {
      this.fetch_photo();
      this.setState({ prev_diff: this.props.difficulty })
    }
  }

  // shuffle array using Math.random
  shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr;
  }
  // get dog name from api url
  getNameFromUrl = (url) => {
    const splitted = url.split('/');
    const n = splitted.length;
    return splitted[n - 2];
  }
  // generate options to choose
  generateBreeds = (url) => {
    const breedName = this.getNameFromUrl(url);
    const diff = this.props.difficulty;
    let breedCopy = [...breeds];
    breedCopy.splice(breedCopy.indexOf(breedName), 1);
    let generatedBreeds = [breedName];
    for (let i = 0; i < difficultyNumber[diff] - 1; i++) {
      let j = Math.floor(Math.random() * breedCopy.length);
      generatedBreeds.push(breedCopy[j]);
      breedCopy.splice(j, 1);
    }
    return this.shuffle(generatedBreeds);
  }
  // get correct id from shuffled list
  getCorrectId = (dogs, correct) => {
    return dogs.indexOf(correct);
  }
  // callback to paren App for option handler
  answerWrapper = (choosen_id) => {
    if (choosen_id === this.state.correct_id) {
      this.props.handleAnswer(true);
    }
    else {
      this.props.handleAnswer(false);
    }
    this.fetch_photo();
  }

  // render image with options to choose
  render() {
    const { error, isLoaded, url } = this.state;
    // handle error encountered after fetch from api
    if (error) {
      return (
        <ColumnWrapper content={<p>{error.message}</p>} columnClasses='image-container col s12 m10 offset-m1 l8 offset-l2' />
      );
    // return loading icon if image not loaded
    } else if (!isLoaded) {
      return (
        <ColumnWrapper content={<DualRing
          className='custom-spinner'
          color={mainColor}
          size={80}
        />} columnClasses='image-container col s12 m10 offset-m1 l8 offset-l2' />
      );
    }
    // display image with options
    else {
      const content = <img className='dog-image valign-wrapper scale-up-center z-depth-5' src={url} alt="" key={url} />
      return (
        <>
          <ColumnWrapper content={content} columnClasses='image-container col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4' />
          <ColumnWrapper content={<ButtonsMenu breeds={this.state.generatedBreeds} handler={this.answerWrapper} />}
            columnClasses='col s12 m10 offset-m1 l8 offset-l2 center-align' />
        </>
      );
    }
  }
}

// component for dynamic difficulty selection
class DifficultyMenu extends React.Component {
  // init materialize css floating button
  componentDidMount() {
    M.FloatingActionButton.init($('#diff_button'));
  }
  // render button with options
  render() {
    return (
      <div className="fixed-action-btn difficulty_menu" id='diff_button'>
        <a className="btn-floating btn-large red">
          <i className="large material-icons">arrow_drop_up</i>
        </a>
        <ul>
          <MenuEntry color='green' difficulty={difficulty.EASY} changeHandler={() => this.props.changeHandler(difficulty.EASY)} />
          <MenuEntry color='yellow darken-3' difficulty={difficulty.MEDIUM} changeHandler={() => this.props.changeHandler(difficulty.MEDIUM)} />
          <MenuEntry color='red' difficulty={difficulty.HARD} changeHandler={() => this.props.changeHandler(difficulty.HARD)} />
        </ul>
      </div>
    );
  }
}

// main component for app
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsApplied: false,
      difficulty: null,
      questionNumber: null,
      playerAnswers: {
        correct: 0,
        incorrect: 0,
        all: 0
      },
    }
  }
  // resert game along with all states
  resetGame = () => {
    this.setState({
      settingsApplied: false,
      difficulty: null,
      questionNumber: null,
      playerAnswers: {
        correct: 0,
        incorrect: 0,
        all: 0
      }
    });
  }
  // apply settings for app
  starterSettings = (settings) => {
    this.setState({
      settingsApplied: true,
      difficulty: settings.difficulty,
      questionNumber: settings.questionNumber,
    });
  }
  // handle dynamic difficulty change
  changeDifficulty = (diff) => {
    if (diff !== this.state.difficulty) {
      this.setState({ difficulty: diff });
    }
  }
  // handle chosen option
  handleAnswer = (goodOption) => {
    let correctN = this.state.playerAnswers.correct;
    let incorrectN = this.state.playerAnswers.incorrect;
    if (goodOption) {
      correctN += 1;
    }
    else {
      incorrectN += 1;
    }
    this.setState({
      playerAnswers: {
        correct: correctN,
        incorrect: incorrectN,
        all: correctN + incorrectN,
      },
    });
  }
  // render whole app
  render() {
    // render main app loop
    if (this.state.settingsApplied) {
      if (this.state.questionNumber !== this.state.playerAnswers.all) {
        return (
          <div className="container">
            <TopPadding message="What's it?" />
            <ImageApp difficulty={this.state.difficulty} handleAnswer={this.handleAnswer} questionN={this.state.playerAnswers.all} />
            <DifficultyMenu changeHandler={this.changeDifficulty} />
            <GameInfo difficulty={this.state.difficulty} questionN={{
              answered: this.state.playerAnswers.all,
              all: this.state.questionNumber,
            }} />
          </div>
        );
      }
      // render finish window if game is finished
      else {
        return (
          <div className="container finished">
            <Finished score={this.state.playerAnswers.correct + '/' + this.state.playerAnswers.all} resetGame={this.resetGame} />
          </div>
        );
      }
    }
    // render starting page at start
    else {
      return (
        <div className="container">
          <TopPadding message='' className='bar-top' />
          <StartingSettings PushSettings={this.starterSettings} />
        </div>
      );
    }
  }
}

export default App;
