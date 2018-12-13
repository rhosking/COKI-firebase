import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'

import Dashboard from './Dashboard.js';

let id = 0;
function createData(name, msa, scopus, wos) {
  id += 1;
  return { id, name, msa, scopus, wos };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 51, 3.9),
];

class App extends Component {

  constructor() {
    super();
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);

    this.institutionCollectionRef = firestore.collection("institutions")

    this.dispatchedTaskCollectionRef = firestore.collection("tasks").where('active', '==', true).where('state', '==', 'dispatched')
    this.fetchedTaskCollectionRef = firestore.collection("tasks").where('active', '==', true).where('state', '==', 'fetched')
    this.parsedTaskCollectionRef = firestore.collection("tasks").where('active', '==', true).where('state', '==', 'parsed')

    this.taskingsCollectionRef = firestore.collection("taskings")

    this.state = {
      institutionDocs: [],
      taskDispatchedDocs: [],
      taskFetchedDocs: [],
      taskParsedDocs: [],
      taskingsDocs: [],
    }
  }

  componentDidMount(){
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');

    provider.setCustomParameters({
      'allow_signup': 'false'
    });

    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user.displayName);
      } else {
        // No user is signed in.
        firebase.auth().signInWithRedirect(provider);
      }
    });

    this.unsubscribeInstitutionCol = this.institutionCollectionRef.onSnapshot(this.onInstitutionColUpdate);

    this.unsubscribeDispatchedTasksCol = this.dispatchedTaskCollectionRef.onSnapshot(this.onDispatchedTasksColUpdate);
    this.unsubscribeFetchedTasksCol = this.fetchedTaskCollectionRef.onSnapshot(this.onFetchedTasksColUpdate);
    this.unsubscribeParsedTasksCol = this.parsedTaskCollectionRef.onSnapshot(this.onParsedTasksColUpdate);

    this.unsubscribeTaskingsCol = this.taskingsCollectionRef.onSnapshot(this.onTaskingsColUpdate);
  }

  onInstitutionColUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      institutionDocs: docs,
      fetching: false
    });
  }

  onDispatchedTasksColUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      taskDispatchedDocs: docs,
      fetching: false
    });
  }

  onFetchedTasksColUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      taskFetchedDocs: docs,
      fetching: false
    });
  }

  onParsedTasksColUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      taskParsedDocs: docs,
      fetching: false
    });
  }

  onTaskingsColUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      taskingsDocs: docs,
      fetching: false
    });
  }

  render() {
    return (
      <Dashboard 
        institution={this.state.institutionDocs}
        dispatchedTasks={this.state.taskDispatchedDocs}
        fetchedTasks={this.state.taskFetchedDocs}
        parsedTasks={this.state.taskParsedDocs}
        taskings={this.state.taskingsDocs}/>
    );
  }
}

export default App;
