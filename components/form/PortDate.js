import React from "react";
import DatePicker from "react-datepicker";
import { FormGroup, Label } from 'reactstrap';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class PortDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ isBrowserLoaded: true })
  }

  handleChange(date) {
    debugger;
    const formattedDate = date.format();
    this.setState({
      dateValue: formattedDate
  });
  }

  render() {
    const { isBrowserLoaded } = this.state;
    const { label } = this.props;

    return (
      // <React.Fragment>
      <FormGroup>
        <Label>{label}</Label>
        <div className='input-group'>
          {
            isBrowserLoaded && <DatePicker
              selected={this.state.dateValue}
              onChange={this.handleChange}
              peakNextMonth
              showMonthDropdown
              showYearDropdown
              maxDate={new Date()}
              dropdownMode='select' />

          }
        </div>
      </FormGroup>

      // </React.Fragment>
    );
  }
}


















// import React from "react";
// import DatePicker from "react-datepicker";
// import moment from 'moment';

// import "react-datepicker/dist/react-datepicker.css";

// // CSS Modules, react-datepicker-cssmodules.css
// // import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// export default class PortDate extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dateValue: moment()
//     };

//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(date) {
//     this.setState({
//       dateValue: date
//     });
//   }

//   render() {
//     return (
//       <DatePicker
//         selected={this.state.dateValue}
//         onChange={this.handleChange}
//       />
//     );
//   }
// }