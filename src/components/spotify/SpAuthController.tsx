import React from 'react';
import { SpAuthForm } from './SpAuthForm';
import { SpWebApiClient } from './SpWebApiClient';

interface Props {
    spApiWebClient: SpWebApiClient;
}

interface State {
    authorized: boolean;
    spotifyUser: any;
}

export class SpAuthController extends React.Component<Props, State>
{
    constructor(props: Props) {
        super(props);
        
        this.authorizeNewUser = this.authorizeNewUser.bind(this);
        this.signOut = this.signOut.bind(this);

        this.state = { 
            authorized: false,
            spotifyUser: {}
        };
    }

    authorizeNewUser() {
        window.location.href = this.props.spApiWebClient.getAuthUrl();
    }

    signOut() {
        const spApiWebClient = this.props.spApiWebClient;
        spApiWebClient.signOut();
        this.setState({authorized: spApiWebClient.signedIn()});
    }

    componentDidMount() {

        const spApi = this.props.spApiWebClient;

        if (!spApi.signedIn()) {
            return;
        }

        spApi.getCurrentUser().then((response: any) => {
            if (!response || !response.id) {
                return;
                // @todo toast error message
            }

            this.setState({authorized: true, spotifyUser: response});
        });
    }

    render() {

        const authorized = this.props.spApiWebClient.signedIn();

        return  (
            <SpAuthForm 
                onClickAuth={this.authorizeNewUser} 
                onClickSignout={this.signOut}
                authorized={authorized} 
                spotifyUser={this.state.spotifyUser} 
            />
        );
    }
}