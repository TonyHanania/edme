import React, { useState } from "react";

export const CreateModuleButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  if (!isClicked) {
    return <button onClick={() => setIsClicked(true)}>Create Module</button>;
  }
};

export const AddModule = () => {
  return <button>Add Module</button>;
};

export const cancelCreateModule = () => {
  return <button>cancelCreateModule</button>;
};
