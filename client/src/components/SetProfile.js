import React from "react";

import { useState } from "react";

const SetProfile = () => {
  const [profile, setProfile] = useState({
    image: "",
    bio: "",
    role: "",
  });

  console.log("I am form data  ", profile);
  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Upload picture and bio to profile

    // You can replace the URL with the endpoint for your API
    console.log(profile);
    fetch("/registration", {
      method: "PATCH",
      body: profile,
    })
      .then((response) => {
        // Handle response here
      })
      .catch((error) => {
        // Handle error here
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload picture:
        <input
          type="file"
          onChange={handleInputChange}
          value={profile.image}
          name="image"
        />
      </label>

      <label>
        bio:
        <textarea onChange={handleInputChange} name="bio" value={profile.bio} />
      </label>

      <button type="submit">Submit</button>
      {/* {profile.image && (
        <img
          src={profile.image}
          alt="Selected picture"
          width="100px"
          height="100px"
        />
      )} */}
    </form>
  );
};

export default SetProfile;
