import React from 'react';
import './App.css';
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
const difficulty = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3
}


function ColumnWrapper(props) {
  return (
    <div class="row">
      <div className="image-container col s12 m6 offset-m3 l4 offset-l4">
        {props.content}
      </div>
    </div>
  );
}

function ButtonsMenu(props) {

  let menu;
  if (props.difficulty === difficulty.EASY) {
    menu = (
      <>
        <button>1</button>
        <button>2</button>
      </>
    );
  }
  else if (props.difficulty === difficulty.MEDIUM) {
    menu = (
      <>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
      </>
    );
  }
  else {
    menu = <p>hard lvl</p>;
  }
  return (
    <>{menu}</>
  );
}

class ImageApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: props.difficulty,
      error: null,
      isLoaded: false,
      url: null,
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
  componentDidMount() {
    this.fetch_photo();
  }
  componentDidUpdate() {
    if (this.state.error) {
      this.setState({
        error: null
      });
    }
  }

  render() {
    const { error, isLoaded, url } = this.state;
    let content = null;
    if (error) {
      content = <p>{error.message}</p>;
    } else if (!isLoaded) {
      content = (<DualRing
        className='custom-spinner'
        color={mainColor}
        size={80}
      />);
    } else {
      content = <img className='dog-image valign-wrapper' src={url} alt="" />
    }
    return (
      <>
        <ColumnWrapper content={content} />
        <ColumnWrapper content={<ButtonsMenu difficulty={this.state.difficulty} />} />
      </>
    );
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
          <p className='question'>What dog is this?</p>
        </div>
      </div>
    </>
  );
}
class ChangeDifficulty extends React.Component {
  componentDidMount(){
    M.FloatingActionButton.init($('#diff_button'));
  }
  render(){
  return (
    <div className="fixed-action-btn difficulty_menu" id='diff_button'>
      <a className="btn-floating btn-large red">
        <i className="large material-icons">arrow_drop_up</i>
      </a>
      <ul>
        <li><a className="btn-floating green">easy</a></li>
        <li><a className="btn-floating yellow darken-3">mid</a></li>
        <li><a className="btn-floating red">hard</a></li>
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
      difficulty: difficulty.EASY,
    }
  }
  render() {
    return (
      <div class="container">
        <TopPadding />
        <ImageApp difficulty={this.state.difficulty} />
        <ChangeDifficulty/>
      </div>
    );
  }
}

export default App;
