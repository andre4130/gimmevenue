import React from 'react'
import venues from '../../data/venues.json'
import cities from '../../data/cities.json'


class CitySelection extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      value: 'Barcelona',
      cities: cities
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  //   alert('You selected: ' + this.state.value);
  //   console.log(this.state.value)
  // }

  cityChange (event) {
    this.setState(
      {value: event.target.value}, 
      () => {alert('You selected: ' + this.state.value)}
    )
  }

  // handleChange(event) {
  //   this.setState(prevState => {
  //     const updatedCities = prevState.cities.map(city => {
  //       if (city.id === event){
  //         return {
  //           ...city,
  //           current: !city.current 
  //         }
  //       }
  //       return city
  //   })
  //       return {
  //         cities: updatedCities
  //       }
  // });
  //   alert('You selected: ' + this.state.cities.id);
  //   console.log(this.state.value)
  // }

  handleSubmit(event) {
    alert('You selected: ' + this.state.value);
    event.preventDefault();
  }


  render() {
    const citiesList = this.state.cities.map(city => 
    <option key={city.idNumber} value={city.id} >
        {city.id}
        </option>
    )
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Select your City:
          <select value={this.state.value} onChange={this.cityChange}>
              {citiesList}
          </select>
        </label>
      </form>
    );
  }
}
//     constructor(props) {
//         super(props);
//         this.state = {city: "Barcelona"}

//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
// }
// handleChange(event) {
//     console.log(this.state.city)
//     this.setState({city: event.target.city});
//   }

//   handleSubmit(event) {
//     alert('Your Selected City is: ' + this.state.city);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Choose a City
//           <select value={this.state.city} onChange={this.handleChange}>
//             <option value="Barcelona">Barcelona</option>
//             <option value="Lisbon">Lisbon</option>
//             <option value="coconut">London</option>
//           </select>
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

export default CitySelection