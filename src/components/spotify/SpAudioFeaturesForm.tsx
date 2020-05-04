import React from 'react';
import { SpAudioFeature } from './SpWebApiClient';
import { SpAudioFeatureToggle } from './SpAudioFeatureToggle';


interface Props {
    stepEnabled: boolean;
    onChange: CallableFunction;
    audioFeatures: SpAudioFeature[];
}

interface State{
}

export class SpAudioFeaturesForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(featureName: string, values: number[]) {
        this.props.onChange(featureName, values);
    }

    render() {

        const enabled = this.props.stepEnabled;
        const audioFeatures = this.props.audioFeatures;
        const toggleElements = audioFeatures.map((audioFeature: SpAudioFeature, index:number) => {
            return (
                <div className="mb3" key={index}>
                    <SpAudioFeatureToggle audioFeature={audioFeature} onChange={this.handleChange}/>
                </div>
            )
        });        

        return (
        <div className="card relative">
            <div className="header">
                3. Tweak audio features
            </div>
            <div className="description">
                Use the toggles below to enable audio feature settings, then set a range for the setting. Tracks added to your playlist will have scores that fall within the range.
            </div>
            <div>
                {toggleElements}
            </div>
            { !enabled &&
                    <div className="bg-white o-80 absolute h-100 w-100 top-0 left-0"></div>
            }               
        </div>      
        );  
    }
}