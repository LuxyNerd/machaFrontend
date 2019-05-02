import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Facebook extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: '' };
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null });
  };

  facebookResponse = e => {};

  onFailure = error => {
    alert(error);
  };
  render() {
    let content = !!this.state.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>{this.state.user.email}</div>
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <div>
        <FacebookLogin
          appId="2080923161984321"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.facebookResponse}
        />
      </div>
    );

    return <div className="Facebook">{content}</div>;
  }
}

export default Facebook;

// import React, { Component } from 'react';
// import FacebookLogin from 'react-facebook-login';

// class Facebook extends Component {
//   state = {
//     isLoggedIn: false,
//     userID: '',
//     name: '',
//     email: '',
//     picture: ''
//   };

//   responseFacebook = response => {
//     // console.log(response);
//     this.setState({
//       isLoggedIn: true,
//       userID: response.userID,
//       name: response.name,
//       email: response.email
//       // picture: response.picture.data.url
//     });
//   };
//   componentClicked = () => console.log('clicked');

//   render() {
//     let fbContent;

//     if (this.state.isLoggedIn) {
//       fbContent = (
//         <div
//           style={{
//             width: '400px',
//             margin: 'auto',
//             background: '#f4f4f4',
//             padding: '20px'
//           }}
//         >
//           <img src={this.state.picture} alt={this.state.name} />
//           <h2>Welcome {this.state.name}</h2>
//           Email: {this.state.email}
//         </div>
//       );
//     } else {
//       fbContent = (
//         <FacebookLogin
//           appId="2080923161984321"
//           autoLoad={true}
//           fields="name,email,picture"
//           onClick={this.componentClicked}
//           callback={this.responseFacebook}
//         />
//       );
//     }

//     return (
//       <div className="register">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8 m-auto">
//               <h1 className="display-4 text-center">Facebook</h1>
//               <form onSubmit={this.onSubmit}>
//                 <div className="form-group" />
//                 <div>{fbContent}</div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Facebook;
