import React, { useState } from 'react';

const testData = [
    {name: "Zell Liew",
    avatar_url: "https://avatars3.githubusercontent.com/u/3607637?s=400&v=4",
    company: "Zellwk"},
    {name: "Tianon Gravi",
    avatar_url: "https://avatars0.githubusercontent.com/u/161631?s=400&v=4",
    company: "InfoSiftr"},
    {name: "Mike Penz",
    avatar_url: "https://avatars3.githubusercontent.com/u/1476232?s=400&u=5d3f22783822a219975386abfc1c4675296f01b6&v=4",
    company: "Lanora"}
];

class Card extends React.Component {
    render () {
        const profile = this.props;
        return (
            <div>
                <img src={profile.avatar_url}/>
                <div>
                    <div>{profile.name}</div>
                    <div>{profile.company}</div>
                </div>
            </div>
        )
    }
};

const CardList = (props) => {
    <div>
        {props.profiles.map(profile => <Card {...profile}/>)}
    </div>
};

class Form extends React.Component {
    state = { userName: "" };
    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`)
        console.log(resp.data);
    };
    render() {
        return (
           <form onSubmit={this.handleSubmit}>
               <input type="text"
                value={this.state.userName}
                onChange={event => this.setState({ userName: event.target.value })}
                placeholder="Github username" required/>
               <button>Add card</button>
           </form>
        );
    }
}

class Call extends React.Component {
    handleCall = async (event) => {
        const resp = await axios.get(`https://api.github.com/users/gaearon`)
        console.log(resp);
    }
    render() {
        return (
        <div onClick={this.handleCall}>Response component</div>
        )
    }
}

function App() {
    const [counter, setCounter] = useState(42);
    const Handler = (incrementValue) => setCounter(counter+incrementValue);
    return (
      <div>
        <Component onClickFunction={Handler} increment={1}/>
        <Component onClickFunction={Handler} increment={5}/>
        <Component onClickFunction={Handler} increment={10}/>
        <Component onClickFunction={Handler} increment={100}/>
        <Display message={counter}/>
        <Form />
        <CardList profiles={testData}/>
      </div>
    );
}

class App extends React.Component {
    state = {
        profiles: testData,
    };
    addNewProfile = (profileData) => {
        this.setState(prevState => ({
            profiles: [...prevState.profiles, profileData]
        }))
    };
    render() {
        return (
            <div>
                <div className="header">{this.props.title}</div>
                <Form />
                <CardList profiles={this.state.profiles} />
            </div>
        )
    }
}

const EmailInput = () => {
    const [inputMail,setMail] = useState("");
    const [history,setHistory] = useState([]);

    return <div>
    <input onChange={(e) => {
        setMail(e.target.value);
        setHistory([...history,e.target.value]);
    }} placeholder="Your E-mail here!"/>;
    <div>{inputMail}</div>
    <div>
        {history.map((rec)=> {return <div>{rec}</div>})}</div>
    </div>
};
