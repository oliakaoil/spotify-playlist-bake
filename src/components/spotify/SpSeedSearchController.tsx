import React from 'react';
import { SpSeedSearch } from './SpSeedSearch';
import { SpWebApiClient } from './SpWebApiClient';

interface Props {
    spApiWebClient: SpWebApiClient;
}

interface State {
    searchResults: any[];
    hasResults: boolean;
    seeds: Map<string, any>
}

export class SpSeedSearchController extends React.Component<Props, State>
{
    constructor(props: Props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleToggleSeed = this.handleToggleSeed.bind(this);

        this.state = {
            searchResults: [],
            hasResults: false,
            seeds: new Map()
        };
    }

    handleSearch(query: string){
        this.props.spApiWebClient.search(query, ['artist'], {limit: 12}).then((response: any) => {
            if (!response || !response.artists) {
                // @todo show error
                return;
            }

            this.setState({ 
                searchResults: response.artists.items,
                hasResults: true
            });
        });
    }

    handleToggleSeed(searchResult: any){
        this.props.spApiWebClient.toggleSeed(searchResult);
        this.setState({
            seeds: this.props.spApiWebClient.getSeeds()
        });
    }

    render() {

        const stepEnabled = this.props.spApiWebClient.signedIn();

        return  (
            <SpSeedSearch 
                stepEnabled={stepEnabled}
                onSearch={this.handleSearch} 
                onToggleSeed={this.handleToggleSeed} 
                searchResults={this.state.searchResults} 
                hasResults={this.state.hasResults} 
                selectedSeeds={this.state.seeds}
            />
        );
    }
}