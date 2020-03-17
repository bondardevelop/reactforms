import React from "react";
import Countries from "../data/countries";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      repeatPassword: "",
      country: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.username.value, this.password.value);
    console.log("state", this.state);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getOptionsItems = items => {
    return items.map(item => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  };

  render() {
    console.log("getCountries", Countries, this.getOptionsItems);
    return (
      <div className="form-container card">
        <form className="form card-body">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name="username"
              ref={node => (this.username = node)}
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter password"
              name="password"
              ref={node => (this.password = node)}
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter repeat password"
              name="repeatPassword"
              ref={node => (this.repeatPassword = node)}
              value={this.state.repeatPassword}
              onChange={this.onChange}
            />
          </div>
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
