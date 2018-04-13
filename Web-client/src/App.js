import React, { Component } from 'react';
import './App.css';
import {
    Route,
    HashRouter,
    Switch
} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, Nav, NavItem, NavLink, Row, Col, Breadcrumb, BreadcrumbItem} from 'reactstrap';


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
                      <Route component={NoMatch}/>
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

const Swapi = () =>
    (
        <h1>fetched stuff</h1>
    )

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
