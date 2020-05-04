import React from 'react';
import { SpWebApiClient } from './SpWebApiClient';
import { SpAudioFeaturesForm } from './SpAudioFeaturesForm';

interface Props {
    spApiWebClient: SpWebApiClient;
}

interface State {
}

export class SpAudioFeaturesController extends React.Component<Props, State> {
    
    constructor(props: Props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(featureName: string, values: number[]) {
        this.props.spApiWebClient.setAudioFeature(featureName, values);
    }
    
    render() {

        const audioFeatures = this.props.spApiWebClient.getAudioFeatures();
        const stepEnabled = this.props.spApiWebClient.signedIn();

        return  (
            <SpAudioFeaturesForm audioFeatures={audioFeatures} onChange={this.handleChange} stepEnabled={stepEnabled} />
        );
    }
}