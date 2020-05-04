import React from 'react';
import { Button } from '../common/Button';


interface Props {
    authorized: boolean;
    spotifyUser: any;
    onClickAuth: CallableFunction;
    onClickSignout: CallableFunction;
}

interface State{
}

export class SpAuthForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickSignout = this.handleClickSignout.bind(this);
    }


    handleClick(event: React.MouseEvent) {
        this.props.onClickAuth();
    }
    
    handleClickSignout(event: React.MouseEvent) {
        this.props.onClickSignout();
    }

    render() {
        const authorized = this.props.authorized;
        const spotifyUser = this.props.spotifyUser;

        return (
        <div className="card">
            <div className="header">
                1. Authorize Spotify
            </div>
            <div className="description">
                Start by granting the app access to your Spotify account so you can create and save new playlists.
            </div>
            { !authorized && 
                <div className="tc">
                    <Button type="primary" label="Authorize with Spotify" onClick={this.handleClick} />
                </div>
            }

            { authorized &&
                <div>
                    <div className="tc mb4">
                        Signed in as <span className="b">{spotifyUser.display_name}</span>
                    </div>
                    <div className="tc">
                        <span className='dib'>
                            <Button type="cancel" label="Sign out" onClick={this.handleClickSignout} />
                        </span>
                    </div>
                </div>
            }
        </div>      
        );  
    }
}