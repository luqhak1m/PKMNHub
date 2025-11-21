
const audio_cache: {[key: number] : HTMLAudioElement}={};

export default function getCachedAudio(id: number, url: string){
    if(!audio_cache[id]){
        const audio=new Audio(url);
        audio_cache[id]=audio;
    }
    
    return audio_cache[id];
}