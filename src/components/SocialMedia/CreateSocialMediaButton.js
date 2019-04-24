import React from 'react';
import { Link } from 'react-router-dom';

const CreateSocialMediaButton = () => {
  return (
    <React.Fragment>
      //TODO addSocialMedia
      <Link to="/addSocialMedia" className="btn btn-lg btn-info">
        Create
      </Link>
    </React.Fragment>
  );
};

export default CreateSocialMediaButton;
