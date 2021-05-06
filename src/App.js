const React = require('react')
const ms = require('pretty-ms')

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: this.props.foodTime*1000,
      isOn: false,
      start: 0,
      foodState: 'Raw'
    };
    this.startTimer = this.startTimer.bind(this);
    this.underCookedTimer = this.underCookedTimer.bind(this);
    this.retrieveFood = this.retrieveFood.bind(this);
  }
  
  startTimer() {
    console.log(this.state.time)
    this.setState({
      isOn: true,
      start: Date.now() + this.state.time
    });
    this.timer = setInterval(() => {
      this.setState({
        time: this.state.start - Date.now()
      });
      if((Math.floor(this.state.time/1000) < 10 || (Math.floor(this.state.time/1000) < 20 && this.props.foodTime == 120)) && Math.floor(this.state.time/1000) > 0 && this.state.foodState != 'Under-Cooked') {
        this.setState({
          foodState: 'Under-Cooked'
        });
      } else if (Math.floor(this.state.time/1000) < 0 && Math.floor(this.state.time/1000) > -this.props.foodTime && this.state.foodState != 'Cooked') {
        this.setState({
          foodState: 'Cooked'
        });
      } else if ( Math.floor(this.state.time/1000) < -this.props.foodTime && this.state.foodState != 'Burnt') {
        this.setState({
          foodState: 'Burnt'
        });
      }
    }, 500);
  }

  underCookedTimer() {
    if(this.props.foodTime < 120) {
      this.setState({
        time: 10000,
      });
    } else {
      this.setState({
        time: 20000,
      });
    }
    this.startTimer();
  }
  
  retrieveFood() {
    this.setState({time: this.props.foodTime*1000, isOn: false});
    clearInterval(this.timer);
  }

  render() {
    let start = (this.state.time == this.props.foodTime*1000) ?
      <button onClick={this.startTimer}>Raw</button> :
      " "
      let underCooked = (this.state.time == this.props.foodTime*1000) ?
      <button onClick={this.underCookedTimer}>Under-Cooked</button> :
      " "
    let foodRetrieved = (this.state.time != this.props.foodTime*1000 && this.state.isOn) ?
      <button onClick={this.retrieveFood}>Retrieve Food</button> :
      " "
    return(
      <div>
        {(this.state.time != this.props.foodTime*1000) ?
          <h1>{this.state.foodState} {this.props.foodName}</h1> :
          <h1>{this.props.foodName}</h1>
        }
        <h3>timer: {Math.floor(this.state.time/1000)}secs</h3>
        {start} {underCooked} {foodRetrieved}
      </div>
    )
  }
}
export default App