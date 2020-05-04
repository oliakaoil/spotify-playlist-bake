import React from 'react';
import { Button } from '../common/Button';
import { SpPlaylist } from './SpWebApiClient';
import { FaRegFrown, FaExternalLinkAlt } from 'react-icons/fa';

interface Props {
    stepEnabled: boolean;
    onClick: CallableFunction;
    savedPlaylist: SpPlaylist;
}

interface State {
    playlistName: string;
}

export class SpSavePlaylistForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            playlistName: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event: React.MouseEvent) {
        if (!this.state.playlistName) {
            return;
        }
        this.props.onClick(this.state.playlistName);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({playlistName: event.target.value});
    }

    render() {

        const enabled = this.props.stepEnabled;
        const playlist = this.props.savedPlaylist;
        const saveAttempt = (playlist && playlist.name);
        const hasTracks = (saveAttempt && playlist.tracks.length);
        const playlistUrl = (playlist.id ? playlist.getUrl() : '#');


        return (
            <div className="card relative">
                <div className="header">
                    4. Save Your Playlist
                </div>
                <div className="description">
                    Give your playlist a name, and then save it to your Spotify account to start listening!
                </div>
                <div className="tc">
                    <input type="text" placeholder="Playlist name" value={this.state.playlistName} onChange={this.handleChange} />

                    <span className="ml2">
                        <Button label="Save Playlist" type="primary" onClick={this.handleClick}/>
                    </span>
                </div>
                <div className="tc mt4">
                    { saveAttempt && !hasTracks && 
                        <div className="i">
                            There were no recommended tracks found <span className="dib ml1 mt1"> <FaRegFrown /></span> 
                            <div className="mt2">
                                You might try changing your audio feature settings.
                            </div>
                        </div>
                    }

                    { playlist.id && hasTracks && 
                        <div>
                            <div>
                                Your playlist was created!
                            </div>
                            <div className="mt4">
                                <a href={playlistUrl} target="_blank" rel="noopener noreferrer" className="dib mr1">Playlist Url</a> 
                                <span className="dib v-mid">
                                    <FaExternalLinkAlt />
                                </span>
                            </div>                    
                        </div>
                    }
                </div>
                { !enabled &&
                    <div className="bg-white o-80 absolute h-100 w-100 top-0 left-0"></div>
                }                
            </div>      
        );  
    }
}