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

    this.openTaskCollectionRef = firestore.collection("tasks").where('state', '==', 'open')
    this.dispatchedTaskCollectionRef = firestore.collection("tasks").where('state', '==', 'dispatched')
    this.fetchedTaskCollectionRef = firestore.collection("tasks").where('state', '==', 'fetched')
    this.parsedTaskCollectionRef = firestore.collection("tasks").where('state', '==', 'parsed')
    this.loadedTaskCollectionRef = firestore.collection("tasks").where('state', '==', 'loaded')

    this.taskingsCollectionRef = firestore.collection("taskings")

    this.state = {
      institutionDocs: [],
      taskOpenDocs: [],
      taskDispatchedDocs: [],
      taskFetchedDocs: [],
      taskParsedDocs: [],
      taskLoadedDocs: [],
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

    this.unsubscribeOpenTasksCol = this.openTaskCollectionRef.onSnapshot(this.onOpenTasksColUpdate);
    this.unsubscribeDispatchedTasksCol = this.dispatchedTaskCollectionRef.onSnapshot(this.onDispatchedTasksColUpdate);
    this.unsubscribeFetchedTasksCol = this.fetchedTaskCollectionRef.onSnapshot(this.onFetchedTasksColUpdate);
    this.unsubscribeParsedTasksCol = this.parsedTaskCollectionRef.onSnapshot(this.onParsedTasksColUpdate);
    this.unsubscribeLoadedTasksCol = this.loadedTaskCollectionRef.onSnapshot(this.onLoadedTasksColUpdate);

    this.unsubscribeTaskingsCol = this.taskingsCollectionRef.onSnapshot(this.onTaskingsColUpdate);

    /*const collectionRef = firestore.collection("institutions")
      .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
              console.log("New: ", change.doc.data());
          }
          if (change.type === "modified") {
              console.log("Modified: ", change.doc.data());
          }
          if (change.type === "removed") {
              console.log("Removed: ", change.doc.data());
          }
          const docs = snapshot.docs.map((docSnapshot) => ({
            id: docSnapshot.id,
            data: docSnapshot.data()
          }));


      });
    }); */
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

  onOpenTasksColUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      taskOpenDocs: docs,
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

  onLoadedTasksColUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      taskLoadedDocs: docs,
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
        openTasks={this.state.taskOpenDocs}
        dispatchedTasks={this.state.taskDispatchedDocs}
        fetchedTasks={this.state.taskFetchedDocs}
        parsedTasks={this.state.taskParsedDocs}
        loadedTasks={this.state.taskLoadedDocs}
        taskings={this.state.taskingsDocs}/>
    );
  }
}

export default App;
