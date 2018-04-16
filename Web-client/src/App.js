import React, { Component } from "react"
import facade from "./apiFacade";
import jwt_decode from 'jwt-decode';
import {
    Route,
    HashRouter,
    Switch
} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, Nav, NavItem, NavLink, Row, Col, Breadcrumb, BreadcrumbItem, Jumbotron} from 'reactstrap';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" }
    }
    login = (evt) => {
        evt.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }
    onChange = (evt) => {
        this.setState({[evt.target.id]: evt.target.value})
    }
    render() {
        return (
            <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                    <Form inline onSubmit={this.login} onChange={this.onChange}>
                        <FormGroup>
                            <Label for="username" hidden>Email</Label>
                            <Input type="username" name="username" id="username" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" hidden>Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Password" />
                        </FormGroup>
                        <Button>Login</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

class Header extends Component {
    render() {
        return (
            <Row>
                <Col xs="10">
                    <Nav tabs>
                        <NavItem>
                            <NavLink href="#">Login</NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col xs="2">
                    <Breadcrumb>
                        <BreadcrumbItem active>Username...</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
        )
    }
}

class FetchSwapi extends Component {
    constructor(props) {
        super(props);
        var person = facade.fetchPerson;
        this.state = {pers: person};
    }

    componentDidMount() {
        facade.fetchPerson().then(res => this.setState({pers: res}));
    }

    render() {
        return (
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <div class="well well-sm"><h4> Name: {this.state.pers.name}</h4></div>
                    <div class="well well-sm"><h4> Height: {this.state.pers.height} </h4></div>
                    <div class="well well-sm"><h4> Weight : {this.state.pers.mass} </h4></div>
                    <div class="well well-sm"><h4> Gender : {this.state.pers.gender} </h4></div>
                </div>
                <div class="col-sm-4"></div>
            </div>
        )
    }
}

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state= {dataFromServer: "Fetching!!"};
        var userToken = facade.getToken();
        var decoded = jwt_decode(userToken);
        var userRoles = decoded.roles;
        this.state = { dataFromServer: "Fetching!!", userroles: userRoles };
    }
    componentDidMount()
    {
        facade.fetchData(this.state.userroles).then(res=> this.setState({dataFromServer: res}));
    }

    render() {
        return (
            <Jumbotron>
                <h1 className="display-3">You are logged in</h1>
                <hr className="my-2" />
                <p>{this.state.dataFromServer}</p>
                <Button onClick={this.logout}>Logout</Button>
            </Jumbotron>
        )
    }
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false }
    }
    logout = () => {
        facade.logout();
        this.setState({ loggedIn: false });
    }
    login = (user, pass) =>
    {
        facade.login(user,pass)
            .then(res =>this.setState({ loggedIn: true }));
    }
    render() {
        return (
            <div>
                <Header></Header>
                {!this.state.loggedIn ? (<LogIn login={this.login} />) :
                    ( <div>
                        <LoggedIn/>
                        <Button onClick={this.logout}>Logout</Button>
                    </div>)}
            </div>
        )
    }
}
export default App;