import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import Switch from "react-switch";

interface Props {
    onChange: CallableFunction;
    audioFeature: any;
}

interface State {
    sliderValues: number[];
    disabled: boolean;
}

const thumbStyle = {
    border: '1px solid #33C3F0',
    backgroundColor: '#fff',
    width: 20,
    height: 20
};


export class SpAudioFeatureToggle extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSwitch = this.handleChangeSwitch.bind(this);

        this.state = {
            sliderValues: this.props.audioFeature.range.slice(2,4),
            disabled: true
        };
    }

    handleChange(values: number[]) {
        this.props.onChange(this.props.audioFeature.name, [this.state.disabled ? 0 : 1].concat(values));
        this.setState({
            sliderValues:  values
          });
    }

    handleChangeSwitch() {
        const disabled = !this.state.disabled;
        
        this.setState({disabled}, () => {
            const audioFeature = this.props.audioFeature;
            this.handleChange(audioFeature.range.slice(2,4));
        });
    }


    render() {
        const disabled = this.state.disabled;

        const audioFeature = this.props.audioFeature;
        const featureMin = audioFeature.range[0];
        const featureMax = audioFeature.range[1];

        return (
            <div>
                <div className="mb3 flex">
                    <div className="b ttc w-50 flex items-bottom">
                        <div className="mr2">
                            {audioFeature.name}
                        </div>
                        <div>
                            <Switch 
                                onChange={this.handleChangeSwitch} 
                                checked={!this.state.disabled} 
                                height={15} 
                                width={30} 
                                onColor="#33C3F0"
                                />
                        </div>                        
                    </div>
                    { !disabled && 
                        <div className="w-50 tr gray f6">
                            {this.state.sliderValues[0]} - {this.state.sliderValues[1]}
                        </div>
                    }
                </div>

                <div className="mb4 flex items-center relative">
                    <div className="mr3">
                        {featureMin}
                    </div>
                    <Range
                        values={this.state.sliderValues}
                        min={featureMin} 
                        max={featureMax} 
                        step={1}
                        onChange={this.handleChange}
                        renderTrack={({ props, children }) => (
                            <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                              ...props.style,
                              height: '36px',
                              display: 'flex',
                              width: '100%'
                            }}
                          >
                            <div
                              ref={props.ref}
                              style={{
                                height: '5px',
                                width: '100%',
                                borderRadius: '4px',
                                background: getTrackBackground({
                                  values: this.state.sliderValues,
                                  colors: ['#ccc', '#33C3F0', '#ccc'],
                                  min: featureMin,
                                  max: featureMax
                                }),
                                alignSelf: 'center'
                              }}
                            >
                              {children}
                            </div>
                          </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                            {...props}
                            style={Object.assign({}, props.style, thumbStyle)}
                            />
                        )}                                          
                    />                
                    <div className="ml3">
                        {featureMax}
                    </div>                    
                    { disabled && 
                        <div className="absolute o-70 w-100 h-100 bg-white clickable" onClick={this.handleChangeSwitch} /> 
                    }
                </div>
            </div>
        );
    }
}