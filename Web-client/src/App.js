import React, { Component } from 'react';
import './App.css';
import {
    Route,
    HashRouter,
    Switch
} from 'react-router-dom'
import facade from "./Facade";
import { Button, Form, FormGroup, Label, Input, Nav, NavItem, NavLink, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';


class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    {Menu()}
                    <Switch>
                        <Route exact path="/" render={() => <Home />} />
                        <Route path="/login" render={() => <Login />} />
                        <Route path="/user" render={() => <UserEndpoint />} />
                        <Route path="/Swapi" render={() => <Swapi />} />
                        <Route component={NoMatch} />
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

const Login = () =>
    (
        <Row>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
                <Form inline>
                    <FormGroup>
                        <Label for="username" hidden>Email</Label>
                        <Input type="username" name="username" id="username" placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" hidden>Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </Col>
        </Row>
    )

const Home = () =>
    (
        <div id="home">
            <h1>Home</h1>
        </div>
    )

/*const Logout = () =>
{
    //destroy token
}*/

const UserEndpoint = () =>
    (
        <h1>user endpoint stuff</h1>
    )

class FetchSwapi extends Component {
    constructor(props) {
        super(props);

        var person = facade.fetchPerson;
        console.log(person);

        /*var person = fetch("https://swapi.co/api/people/1/")
            .then(response => response.json())
            .then(data => {
                const person = data;
                console.log(person);
            })
        this.state = { pers: person };*/
    }

    componentDidMount() {
        facade.fetchPerson().then(res => this.setState({ pers: res }));
    }

    render() {
        return (
            <div> name: </div>
        )
    }
}
class Swapi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '' };
        this._getRandomName = this.getRandomName.bind(this);
    }

    render() {
        const { name } = this.state;
        return (
            <div>
                <h1>{name}</h1>
                <button
                    onClick={this._getRandomName}
                >
                    PRESS ME!
          </button>
            </div>
        );
    }

    getRandomName() {
        fetch("https://swapi.co/api/people/1/")
            .then(response => response.json())
            .then(data => {
                const person = data;
                this.setState({ name: `${person.name}` })
            })
    }
}

const NoMatch = () =>
    (
        <h1>No match</h1>
    )

export default App;

const Menu = () =>
    (
        <Row>
            <Col xs="10">
                <Nav tabs>
                    <NavItem>
                        <NavLink href="#/" to="/" >Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#user">User Endpoint</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#swapi">Swapi Endpoint</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#logout">Logout</NavLink>
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
