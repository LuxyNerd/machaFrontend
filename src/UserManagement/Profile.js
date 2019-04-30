import { userStore } from '../stores/UserStore';
import React, { Component } from 'react';

class Profile extends Component {
  componentDidMount() {
    // store a reference to the added event listener.
    this.removeListener = userStore.addListener(state => {
      this.setState(state);
    });
    this.setState(userStore.getState());
  }
  componentWillUnmount() {
    // Destroy the listener when the component unmounts.
    this.removeListener();
  }
  //     userStore.addListener(state => {
  //       this.setState(state);
  //     });
  //     this.setState(userStore.getState());
  //   }
  render() {
    const { userId } = this.props;

    //accessing `this.state`
    const profile = this.state.find(user => user.id === userId);

    if (!profile) {
      return <div>Loading...</div>;
    }

    return (
      //TODO rename
      <dl>
        <dt>First Name</dt>
        <dd>{profile.firstName}</dd>
        <dt>Last Name</dt>
        <dd>{profile.lastName}</dd>
        <dt>Bio</dt>
        <dd>{profile.bio}</dd>
      </dl>
    );
  }

  shouldComponentUpdate({ user }) {
    return user !== this.state.user;
  }
}

export default Profile;
