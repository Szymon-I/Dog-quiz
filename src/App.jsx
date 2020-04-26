import React from 'react';
import { difficulty, breeds, difficultyNumber } from './Globals';
import { StartingSettings } from './Starter';
import './App.css';
import './animations.css';
import { DualRing } from 'react-spinners-css';
import $ from 'jquery';
import M from 'materialize-css';
const randomImageUrl = 'https://dog.ceo/api/breeds/image/random';
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

function ButtonsMenu(props) {

  const listItems = props.breeds.map((dog) =>
  <li>{dog}</li>);
  if (props.difficulty === difficulty.EASY) {
    return (
      <ul>
      {listItems}
      </ul>
    );
  }
  else if (props.difficulty === difficulty.MEDIUM) {
    return (
      <ul>
      {listItems}
      </ul>
    );
  }
  else {
    return <p>hard lvl</p>;
  }

}

class ImageApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      url: null,
      prev_diff: props.difficulty
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
          this.setState({
            isLoaded: true,
            url: url,
            status: result.status
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
    // if difficulty has changed -> get new photo and update old setting
    if (this.props.difficulty !== this.state.prev_diff) {
      this.fetch_photo();
      this.setState({ prev_diff: this.props.difficulty })
    }
  }

  shuffle = (arr) =>{
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr;
  }
  generateBreeds = () => {
    const splitted = this.state.url.split('/');
    const n = splitted.length;
    const breedName = splitted[n - 2];
    const diff = this.props.difficulty;
    if (diff !== difficulty.HARD) {
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
    else {
      return [...breeds];
    }
  }

  render() {
    const { error, isLoaded, url } = this.state;
    if (error) {
      return (
        <ColumnWrapper content={<p>{error.message}</p>} columnClasses='image-container col s12 m10 offset-m1 l8 offset-l2' />
      );
    } else if (!isLoaded || !this.state.url) {
      return (
        <ColumnWrapper content={<DualRing
          className='custom-spinner'
          color={mainColor}
          size={80}
        />} columnClasses='image-container col s12 m10 offset-m1 l8 offset-l2' />
      );
    } else {
      const content = <img className='dog-image valign-wrapper scale-up-center' src={url} alt="" key={url} />
      const breedOptions = this.generateBreeds();
      return (
        <>
          <ColumnWrapper content={content} columnClasses='image-container col s12 m10 offset-m1 l8 offset-l2' />
          <ColumnWrapper content={<ButtonsMenu difficulty={this.props.difficulty} breeds={breedOptions} />}
            columnClasses='image-container col s12 m10 offset-m1 l8 offset-l2' />
        </>
      );
    }
  }
}


// function DogImageContainer(props) {
//   return (
//     <div class="row">
//       <div className="image-container col s12 m6 offset-m3 l4 offset-l4">
//         <ImageLoader />
//       </div>
//     </div>
//   );
// }

function TopPadding(props) {
  return (
    <>
      <div className='row'>
        <div className="top-padding s12">
          <p className='question'>{props.message}</p>
        </div>
      </div>
    </>
  );
}
function MenuEntry(props) {
  return (
    <li><a className={"btn-floating " + props.color} onClick={props.changeHandler}>{props.difficulty}</a></li>
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
      }
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
    this.setState({ difficulty: diff });
  }
  render() {
    if (this.state.settingsApplied) {
      return (
        <div className="container">
          <TopPadding message='What dog is this?' />
          <ImageApp difficulty={this.state.difficulty} />
          <DifficultyMenu changeHandler={this.changeDifficulty} />
        </div>
      );
    }
    else {
      return (
        <div className="container">
          <TopPadding message='' />
          <StartingSettings PushSettings={this.starterSettings} />
        </div>
      );
    }
  }
}

export default App;
