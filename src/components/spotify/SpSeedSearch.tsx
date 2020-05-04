import React from 'react';
import { SpSeedArtistSearchResult } from './SpSeedArtistSearchResult';
import { Button } from '../common/Button';


interface Props {
    stepEnabled: boolean;
    onSearch: CallableFunction;
    onToggleSeed: CallableFunction;
    searchResults: any[];
    hasResults: boolean;    
    selectedSeeds: Map<string, any>;
}

interface State{
    searchQuery: string;
}

export class SpSeedSearch extends React.Component<Props, State> {

    // @todo add correct type
    private searchInputRef: any;

    constructor(props: Props) {
        super(props);
        this.searchInputRef = React.createRef();
        this.state = { 
            searchQuery: '' 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleToggleSeed = this.handleToggleSeed.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({searchQuery: event.target.value});
    }

    handleClick(event: React.MouseEvent) {
        this.search();
    }

    handleKeyDown(event: React.KeyboardEvent) {
        if (event.key !== 'Enter') {
            return;
        }
        this.search();
    }

    handleToggleSeed(searchResult: any){
        this.props.onToggleSeed(searchResult);
    }

    private search() {
        this.props.onSearch(this.state.searchQuery);
    }

    componentDidMount() {
        this.searchInputRef.current.focus();
    }

    render() {

        const enabled = this.props.stepEnabled;
        const hasResults = this.props.hasResults;
        const seeds = this.props.selectedSeeds;

        const searchResults = this.props.searchResults
            .filter(result => !seeds.has(result.id));

        const allResults = Array.from(seeds)
            .map(selected => selected[1])
            .concat(searchResults);

        const searchResultElements = allResults.map((searchResult, index) => {
            const selected = this.props.selectedSeeds.has(searchResult.id);
            return (
                <div className="w-30 mr1 mb2" key={index}>
                    <SpSeedArtistSearchResult artist={searchResult} onClick={this.handleToggleSeed} selected={selected}/>
                </div>
            );
        });

        return (
            <div className="card relative">
                <div className="header">
                    2. Seed your playlist
                </div>
                <div className="description">
                    Search for artists to seed your playlist.
                </div>
                <div className="tc">
                    <input 
                        type="text" 
                        placeholder="Enter the name of an artist" 
                        className="w-40"  
                        ref={this.searchInputRef} 
                        onChange={this.handleChange} 
                        onKeyDown={this.handleKeyDown}
                        value={this.state.searchQuery}
                    />
                    <span className="ml2">
                        <Button label="Search" type="primary" onClick={this.handleClick}/>
                    </span>
                </div>
                
                { hasResults && allResults.length &&
                    <div className="mt4">
                        <div className="flex flex-start justify-center items-start flex-wrap">
                            { searchResultElements }
                        </div>
                    </div>
                }
                
                { hasResults && !this.props.searchResults.length &&
                    <div className="mt4">
                        <div className="tc">
                            <i>There were no artists found matching that search query. Please try again.</i>
                        </div>
                    </div>
                }                
                { !enabled &&
                    <div className="bg-white o-80 absolute h-100 w-100 top-0 left-0"></div>
                }
            </div>      
        );  
    }
}