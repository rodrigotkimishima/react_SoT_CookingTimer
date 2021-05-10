const React = require('react')

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startTime: this.props.foodStartTime*1000,
      undercookedTime: this.props.foodUndercookedTime*1000,
      isOn: false,
      start: 0,
      foodState: 'Raw',
      typeOfStart: 0,
    };
    this.startTimer = this.startTimer.bind(this);
    this.underCookedTimer = this.underCookedTimer.bind(this);
    this.retrieveFood = this.retrieveFood.bind(this);
  }
  
  async startTimer() {
    await this.setState({
      isOn: true,
    });

    if(this.state.typeOfStart) {
      await this.setState({
        start: Date.now() + this.state.undercookedTime
      })
    } else {
      await this.setState({
        start: Date.now() + this.state.startTime
      })
    }

    this.timer = setInterval(() => {
      this.setState({
        startTime: this.state.start - Date.now()
      });
      if((Math.floor(this.state.startTime/1000) < 10 || (Math.floor(this.state.startTime/1000) < 20 && this.props.foodStartTime == 120)) && Math.floor(this.state.startTime/1000) > 0 && this.state.foodState != 'Under-Cooked') {
        this.setState({
          foodState: 'Under-Cooked'
        });
      } else if (Math.floor(this.state.startTime/1000) < 0 && Math.floor(this.state.startTime/1000) > -this.props.foodStartTime && this.state.foodState != 'Cooked') {
        this.setState({
          foodState: 'Cooked'
        });
      } else if ( Math.floor(this.state.startTime/1000) < -this.props.foodStartTime && this.state.foodState != 'Burnt') {
        this.setState({
          foodState: 'Burnt'
        });
      }
    }, 500);
  }

  async underCookedTimer() {
    await this.setState({
      typeOfStart: 1
    });
    this.startTimer();
  }
  
  async retrieveFood() {
    await this.setState({
      startTime: this.props.foodStartTime*1000, 
      isOn: false,
      typeOfStart: 0
    });
    clearInterval(this.timer);
  }

  render() {
    let start = (this.state.startTime == this.props.foodStartTime*1000) ?
      <button onClick={this.startTimer}>Raw</button> :
      " "
      let underCooked = (this.state.startTime == this.props.foodStartTime*1000) ?
      <button onClick={this.underCookedTimer}>Under-Cooked</button> :
      " "
    let foodRetrieved = (this.state.startTime != this.props.foodStartTime*1000 && this.state.isOn) ?
      <button onClick={this.retrieveFood}>Retrieve Food</button> :
      " "
    return(
      <div>
        {(this.state.startTime != this.props.foodStartTime*1000) ?
          <h1>{this.state.foodState} {this.props.foodName}</h1> :
          <h1>{this.props.foodName}</h1>
        }
        <h3>timer: {Math.floor(this.state.startTime/1000)}secs</h3>
        {start} {underCooked} {foodRetrieved}
      </div>
    )
  }
}
export default App