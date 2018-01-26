import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css'


class App extends Component {

    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }

    }

    componentDidMount() {
        // recuperation d'informations json (http request)
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                return res.json();
            })
            .then(users => {
                this.setState({ robots: users })
            });

    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })

        // au cas ou la recuperation prend du temps, on renvoit au chargement de la page 
        if (this.state.robots.length === 0) {
            return (<h1>Chargement</h1>);
        }

        else {
            return (
                <div className="tc">
                    <h1 className="f1">Robots</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <CardList robots={filteredRobots} />
                </div>
            );
        }
    }

}

export default App;