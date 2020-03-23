import React from "react";
import Countries from "../data/countries";
import Field from "./Field";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      repeatPassword: "",
      country: "",
      gender: "male",
      agree: true,
      avatar: "",
      age: 16,
      errors: {
        username: false,
        password: false,
        repeatPassword: false,
        age: false
      }
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = {};

    if (this.state.username.length < 5) {
      errors.username = "Must be 5 character or more";
    }
    if (!this.state.password.length) {
      errors.password = "Write password";
    }
    if (this.state.password !== this.state.repeatPassword) {
      errors.repeatPassword = "Not the same pasword";
    }

    console.log(Object.keys(errors));
    if (Object.keys(errors).length > 0) {
      this.setState({
        errors: errors
      });
    } else {
      this.setState({
        errors: {}
      });
      console.log("state", this.state);
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeCheckbox = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  onChangeAvatar = e => {
    const reader = new FileReader();
    reader.onload = e => {
      console.log("result", e.target.result);
      this.setState({
        avatar: e.target.result
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  getOptionsItems = items => {
    return items.map(item => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  };

  incrementAge = () => {
    this.setState(
      (prevState, prevProps) => ({
        age: prevState.age + 1
      }),
      () => {
        console.log("callback", this.state.age);
        this.setState({
          errors: {
            age: this.state.age > 18 ? false : "Must be more than 18"
          }
        });
      }
    );
  };

  decrementAge = () => {
    this.setState(
      (prevState, prevProps) => ({
        age: prevState.age - 1
      }),
      () => {
        console.log("callback", this.state.age);
        this.setState({
          errors: {
            age: this.state.age > 18 ? false : "Must be more than 18"
          }
        });
      }
    );
  };

  render() {
    return (
      <div className="form-container card">
        <form className="form card-body">
          <Field
            id="username"
            labelText="Username"
            type="text"
            placeholder="Enter username"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            error={this.state.errors.username}
          />
          <Field
            id="password"
            labelText="Password"
            type="password"
            placeholder="Enter password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            error={this.state.errors.password}
          />
          <Field
            id="repeatpassword"
            labelText="Repeat password"
            type="password"
            placeholder="Enter repeat password"
            name="repeatPassword"
            value={this.state.repeatPassword}
            onChange={this.onChange}
            error={this.state.errors.repeatPassword}
          />

          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Country</label>
            <select
              className="form-control"
              id="country"
              name="country"
              value={this.state.country}
              onChange={this.onChange}
            >
              {this.getOptionsItems(Countries)}
            </select>
          </div>
          <fieldset className="form-group">
            <div>Gender</div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={this.state.gender === "male"}
                onChange={this.onChange}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={this.state.gender === "female"}
                onChange={this.onChange}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </fieldset>
          <div className="form-group">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="file"
              className="form-control-file"
              id="avatar"
              name="avatar"
              onChange={this.onChangeAvatar}
            />
          </div>
          <div className="form-group">
            <div>
              <label>Age</label>
            </div>
            <div className="btn-group">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.decrementAge}
              >
                -
              </button>
              <input
                type="number"
                className="form-control"
                placeholder="Enter age"
                name="age"
                value={this.state.age}
                onChange={this.onChange}
              />
              <button
                className="btn btn-secondary"
                type="button"
                onClick={this.incrementAge}
              >
                +
              </button>
            </div>
            {this.state.errors.age ? (
              <div className="invalid-feedback">{this.state.errors.age}</div>
            ) : null}
          </div>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="agree"
              name="agree"
              value={this.state.agree}
              checked={this.state.agree}
              onChange={this.onChangeCheckbox}
            />
            <label className="form-check-label" htmlFor="agree">
              Confirm the processing of data
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
