import React from 'react';

export enum Feature {
  LandingPageDocs,
}

export const IsFeatureOn = (feature: Feature): boolean => {
  if (process.env.NODE_ENV === 'development') return true;
  switch (feature) {
    case Feature.LandingPageDocs:
      return true;
  }
  return false;
};

interface Props {
  feature: Feature;
  on: React.ReactNode;
  off: React.ReactNode;
}

export const FeatureFlag: React.FC<Props> = ({ feature, on, off }) => {
  if (IsFeatureOn(feature)) {
    return <>{on}</>;
  }
  return <>{off}</>;
};
