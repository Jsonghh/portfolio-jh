import React from "react";
import DatePicker from "react-datepicker";
import { FormGroup, Label, Button } from 'reactstrap';



import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class PortDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: new Date(),
      isHidden: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  setFieldValueAndTouched(date, touched) {
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    setFieldValue(name, date, true);
    setFieldTouched(name, touched, true);
  }

  componentDidMount() {
    this.setState({ isBrowserLoaded: true });
  }

  handleChange(date) {
    this.setState({
      dateValue: date
    });

    this.setFieldValueAndTouched(date, true);
  }

  toggleDate(date) {

    this.setState({
      isHidden: !this.state.isHidden
    });

    this.setFieldValueAndTouched(date, true);

  }

  render() {
    const { isBrowserLoaded } = this.state;
    const { canBeDisabled, label, field, form: { touched, errors } } = this.props;
    const { isHidden, dateValue } = this.state;
    // const { touched, errors } = this.props.form;

    return (
      // <React.Fragment>
      <FormGroup>
        <Label>{label}</Label>
        <div className='input-group'>
          {!isHidden &&
            isBrowserLoaded && <DatePicker
              selected={dateValue}
              onChange={this.handleChange}
              peakNextMonth
              showMonthDropdown
              showYearDropdown
              maxDate={new Date()}
              dropdownMode='select' />
          }

        </div>
        {canBeDisabled && !isHidden && <Button onClick={() => this.toggleDate()}> Still Working Here</Button>}

        {canBeDisabled && isHidden &&
          <React.Fragment>
            <span> Still Working Here </span>
            <Button onClick={() => this.toggleDate(dateValue)}> Set End Date </Button>
          </React.Fragment>}


        {touched[field.name] &&
          errors[field.name] && <div className="error">{errors[field.name]}</div>}
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