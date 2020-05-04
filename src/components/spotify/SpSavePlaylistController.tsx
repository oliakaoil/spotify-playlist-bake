import React from 'react';
import { SpWebApiClient, SpPlaylist } from './SpWebApiClient';
import { SpSavePlaylistForm } from './SpSavePlaylistForm';

interface Props {
    spApiWebClient: SpWebApiClient;
}

interface State {
    savedPlaylist: SpPlaylist;
}

export class SpSavePlaylistController extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.state = {
            savedPlaylist: new SpPlaylist()
        };
    }

    async savePlaylist(playlistName: string) {
        const spApiWebClient = this.props.spApiWebClient;
        await spApiWebClient.savePlaylistFromReccomendations(playlistName);
        this.setState({
            savedPlaylist: spApiWebClient.getPlaylist()
        });
    }

    render() {

        const stepEnabled = this.props.spApiWebClient.signedIn();

        return  (
            <SpSavePlaylistForm onClick={this.savePlaylist} savedPlaylist={this.state.savedPlaylist} stepEnabled={stepEnabled} />
        );
    }
}