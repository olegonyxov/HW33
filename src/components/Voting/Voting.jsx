import { Component } from 'react'
import SmileCard from '../SmileCard/SmileCard';
import './Voting.css';

export default class Voting extends Component {
  state = {
    candidates: []
  };

  componentDidMount() {
    fetch('http://localhost:3000/data.json')
      .then(result => result.json())
      .then(result => {
        const myCandidates = result.map(candidate => {
          return {
            ...candidate,
            counter: 0,
          };
        });
        this.setState({ candidates: myCandidates })
      });
  }

  changeCounter = (id) => {
    this.setState(state => {
      const candidateIndex = state.candidates.findIndex(candidate => candidate.id == id);
      state.candidates[candidateIndex].counter++;
      return state;
    });
  }
  showResults = () => {
    // our function here
    this.state.candidates.forEach(function(candidate) {
      console.log(candidate.counter)
    })


  }





  render() {

    return (
      <div>
        <p>Hello world. Here is our voting:</p>
        {!this.state.candidates.length && (<div>No candidates available</div>)}
        {!!this.state.candidates.length && (
          <div className='container'>
            {this.state.candidates.map(candidate => (
              <SmileCard
                id={candidate.id}
                name={candidate.name}
                key={candidate.id}
                counter={candidate.counter}
                votingAction={this.changeCounter}
              />
            ))}
          </div>
        )}

        <input type="button" value="Show Results" onClick={this.showResults}/> 

      </div>
    )
  }
}
