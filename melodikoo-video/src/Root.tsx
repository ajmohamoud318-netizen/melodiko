import React from 'react';
import { Composition } from 'remotion';
import { MelodikoVideo } from './MelodikoVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MelodikoVideo"
      component={MelodikoVideo}
      durationInFrames={210}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
