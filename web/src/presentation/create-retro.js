import React from 'react';

import KeepStopStart from '../containers/create-retro-keep-stop-start';
import LikeWishIf from '../containers/create-retro-like-wish-if';

function CreateRetro() {
  return (
    <div>
      <h1>Create a Retro</h1>
      <KeepStopStart />
      <LikeWishIf />
    </div>
  );
}

CreateRetro.propTypes = { };

export default CreateRetro;
