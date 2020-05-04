import * as QueryString from 'query-string';
import SpotifyWebApi from 'spotify-web-api-js';
import audioFeatureData from './sp-audio-features.json';

export class SpAudioFeature {
    name: string;
    range: string;
    step: number;
    blurb: string;

    constructor(o: any){
        this.name = o.name;
        this.range = o.range;
        this.step = o.step;
        this.blurb = o.blurb;
    }
}

export class SpPlaylist {
    name: string = '';
    id: string = '';
    userId: string = '';
    tracks: any[] = [];
    getUrl() {
        return `https://open.spotify.com/user/${this.userId}/playlist/${this.id}`
    }
}


export class SpWebApiClient {

    private spWebApi: any;
    private hasAuth: boolean = false;
    private audioFeatureData: SpAudioFeature[];
    
    private playlistSeeds: Map<string,any>;
    private playlistAudioFeatures: Map<string, number[]>;
    private playlist: SpPlaylist;

    private currentUser: any;
    
    private LS_TOKEN: string = 'sp-web-api-auth';

    constructor() {
        this.spWebApi = new SpotifyWebApi();
        this.audioFeatureData = audioFeatureData.map(a => new SpAudioFeature(a));

        this.playlistSeeds = new Map();
        this.playlistAudioFeatures = new Map();
        this.playlist = new SpPlaylist();

        this.signIn();
    }

    getAudioFeatures(): any {
        return this.audioFeatureData;
    }

    getSeeds(): Map<string, any> {
        return this.playlistSeeds;
    }

    toggleSeed(seed: any) {
        if (this.playlistSeeds.has(seed.id)) {
            this.playlistSeeds.delete(seed.id);
        } else {
            this.playlistSeeds.set(seed.id, seed);
        }
    }

    setAudioFeature(featureName: string, values: number[]) {

        const validFeature = this.audioFeatureData.find(feature => feature.name === String(featureName).toLowerCase());

        if (!validFeature) {
            return;
        }

        this.playlistAudioFeatures.set(featureName, values);
    }

    getPlaylist(): SpPlaylist {
        return this.playlist;
    }

    async savePlaylistFromReccomendations(playlistName: string): Promise<boolean> {

        if (!this.currentUser || !this.currentUser.id) {
            return false;
        }        

        this.playlist.name = playlistName;
        this.playlist.userId = this.currentUser.id;

        let audioParams: any = {};

        audioParams.seed_artists = Array.from(this.playlistSeeds)
            .map(seed => seed[0])
            .join(',');

        Array.from(this.playlistAudioFeatures)
            .filter(audioFeatureMap => audioFeatureMap[1][0] === 1)
            .forEach(audioFeatureMap => {
                const [featureName, range] = audioFeatureMap;
                audioParams[`min_${featureName}`] = range[1];
                audioParams[`max_${featureName}`] = range[2];
            });

        let recData;

        try {
            recData = await this.spWebApi.getRecommendations(audioParams);
        } catch (err) {
            console.error(err);
        }

        if (!recData || !recData.tracks.length) {
            // @todo toast error message
            return false;
        }

        this.playlist.tracks = recData.tracks;

        let newPlaylist;

        try {
            newPlaylist = await this.createEmptyPlaylist(this.playlist.userId, playlistName);
        } catch (err) {
            console.error(err);
        }

        if (!newPlaylist) {
            // @todo toast error message
            return false;
        }

        this.playlist.id = newPlaylist.id;

        const trackUris = this.playlist.tracks.map(track => track.uri);

        try {
            const tracksAdded = await this.addPlaylistTracks(newPlaylist.id, trackUris);
            return (tracksAdded && tracksAdded.snapshot_id);
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    async createEmptyPlaylist(userId: string, playlistName: string , isPublic?: boolean , isCollaborative?: boolean ): Promise<any> {
        return this.spWebApi.createPlaylist(userId, {name: playlistName, isPublic, isCollaborative});
    } 

    addPlaylistTracks(playlistId: string , trackUris: string[]): Promise<any> {
        return this.spWebApi.addTracksToPlaylist(playlistId, trackUris);
    }

    signIn(authParams?: any) {

        // anything in local storage?
        if (!authParams) {
            authParams = this.getStoredAuth();
        }

        // just getting back from a recent auth roundtrip?
        if (!authParams) {
            authParams = QueryString.parse(window.location.hash);            
        }

        if (!authParams || !authParams.access_token) {
            this.hasAuth = false;
            return;
        }

        this.spWebApi.setAccessToken(String(authParams.access_token));        
        this.hasAuth = true;

        authParams.created_at = Date.now();
        localStorage.setItem(this.LS_TOKEN, JSON.stringify(authParams));
    }

    signOut() {
        localStorage.removeItem(this.LS_TOKEN);
        this.hasAuth = false;
    }

    signedIn() {
        return this.hasAuth;
    }

    getAuthUrl() {
        const grantParams = {
            response_type: 'token',
            client_id: process.env.REACT_APP_SPOTIFY_API_KEY,
            redirect_uri: `${window.location.protocol}//${window.location.host}`,
            scope: process.env.REACT_APP_SPOTIFY_APP_SCOPE
          };    
  
          const grantQuerystring = QueryString.stringify(grantParams);
    
          return `https://accounts.spotify.com/authorize?${grantQuerystring}`;
    }    

    getCurrentUser(): Promise<any> {
        return this.spWebApi.getMe().then((user: any) => {
            this.currentUser = user;
            return user;
        })
    }

    search(
        query: string, 
        types: string[], // 'album', 'artist', 'playlist', and 'track',
        options?: any
        ) {

        return this.spWebApi.search(query, types, options);
    }

    private getStoredAuth() {
        const currentTime = Date.now();
        const storedAuthStr = localStorage.getItem(this.LS_TOKEN);

        if (!storedAuthStr) {
            return null;
        }

        const storedAuthParams = JSON.parse(storedAuthStr);
        
        if (!storedAuthParams) {
            return null;
        }

        const expireTime = (storedAuthParams.created_at + (storedAuthParams.expires_in * 1000));

        if (expireTime < currentTime) {
            return null;
        }

        return storedAuthParams;
    }
}
