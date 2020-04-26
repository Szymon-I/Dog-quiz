import React from 'react';
import { difficulty, breeds, difficultyNumber, randomImageUrl } from './Globals';
import { StartingSettings } from './Starter';
import './App.css';
import './animations.css';
import { DualRing } from 'react-spinners-css';
import $ from 'jquery';
import M from 'materialize-css';


const mainColor = '#4287f5';

// class NextButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {}
//   }
//   render() {
//     return (
//       <>
//         <button onClick={() => this.props.fetch_photo()}>next</button>
//       </>
//     );
//   }
// }



function ColumnWrapper(props) {
  return (
    <div className="row">
      <div className={props.columnClasses}>
        {props.content}
      </div>
    </div>
  );
}

// function ImageWrapper(props) {
//   return (
//     <div class="row">
//       <div className="image-container col s12 m10 offset-m1 l8 offset-l2">
//         {props.content}
//       </div>
//     </div>
//   );
// }

class ButtonsMenu extends React.Component {
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
    // const listItems = this.props.breeds.map((dog) =>
    //   <li key={dog}><a onClick={()=>this.props.answerWrapper()}>{dog}</a></li>);
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


class ImageApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      url: null,
      //prev_diff: this.props.difficulty,
      prev_diff: null,
      correct_id: null,
      generatedBreeds: null,
      questionN: 0,
    };
  }
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
    //this.setState({prev_diff: this.props.difficulty});
    this.fetch_photo();
    //this.generateBreeds();
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
      //this.generateBreeds();
      this.setState({ prev_diff: this.props.difficulty })
    }
    //this.fetch_photo();
  }

  shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr;
  }
  getNameFromUrl = (url) => {
    const splitted = url.split('/');
    const n = splitted.length;
    return splitted[n - 2];
  }
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
  getCorrectId = (dogs, correct) => {
    return dogs.indexOf(correct);
  }
  answerWrapper = (choosen_id) => {
    if (choosen_id === this.state.correct_id) {
      this.props.handleAnswer(true);
    }
    else {
      this.props.handleAnswer(false);
    }
    this.fetch_photo();
    //this.setState({ questionN: this.state.questionN + 1 });
  }



  render() {
    const { error, isLoaded, url } = this.state;
    if (error) {
      return (
        <ColumnWrapper content={<p>{error.message}</p>} columnClasses='image-container col s12 m10 offset-m1 l8 offset-l2' />
      );
      // was || !this.state.url
    } else if (!isLoaded) {
      return (
        <ColumnWrapper content={<DualRing
          className='custom-spinner'
          color={mainColor}
          size={80}
        />} columnClasses='image-container col s12 m10 offset-m1 l8 offset-l2' />
      );
    } else {
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

function ProgressBar(props) {

}
function Footer(props) {
  return (
    <footer class="page-footer sticky-footer">
      <div class="footer-copyright">
        <div class="container">
          <span className='left'>© 2020 Szymon Idziniak</span>
          <span className='right'>{'Difficulty:  ' + props.difficulty}</span> 
        </div>
      </div>
    </footer>
  );
}

class PlayerInfo extends React.Component {

  render() {

    return (
      //<ColumnWrapper columnClasses='image-container col s12 m8 offset-m2 l6 offset-l3 xl4 offset-xl4' />
      // <>
      //   <p> {this.props.difficulty}</p>
      //   <p> {this.props.questionN}</p>
      // </>
      <Footer difficulty={this.props.difficulty}/>
    );
  }
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

class DifficultyMenu extends React.Component {
  componentDidMount() {
    M.FloatingActionButton.init($('#diff_button'));
  }
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

// function NoDog(props){
//   return(
//   <div>No dog {props.error}</div>
//   )
// }
// function LoadingDog(props){
//   return(
//      <div className="image-container">
//      <LoopCircleLoading />
//      </div>
//     );
// }




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
      //renderNext: true,
    }
  }
  starterSettings = (settings) => {
    this.setState({
      settingsApplied: true,
      difficulty: settings.difficulty,
      questionNumber: settings.questionNumber,
    });
  }
  changeDifficulty = (diff) => {
    if (diff !== this.state.difficulty) {
      this.setState({ difficulty: diff });
    }
  }

  // handleAnswer = (correct_id, chosen_id) => {
  //   if (correct_id === chosen_id) {
  //     this.setState({ correct: this.state.correct + 1 })
  //   }
  //   else {
  //     this.setState({ incorrect: this.state.incorrect + 1 })
  //   }
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
  render() {
    if (this.state.settingsApplied) {
      if (this.state.questionNumber !== this.state.playerAnswers.all) {
        return (
          <div className="container">
            <TopPadding message='What dog is this?' />
            <ImageApp difficulty={this.state.difficulty} handleAnswer={this.handleAnswer} questionN={this.state.playerAnswers.all} />
            <DifficultyMenu changeHandler={this.changeDifficulty} />
            <PlayerInfo difficulty={this.state.difficulty} questionN={this.state.playerAnswers.all} />
          </div>
        );
      }
      else {
        return (
          <p>finished</p>
        );
      }
    }
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
