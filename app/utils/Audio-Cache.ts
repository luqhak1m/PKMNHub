
const audio_cache: {[key: number] : HTMLAudioElement}={};

export default function getCachedAudio(id: number, url: string){
    if(!audio_cache[id]){
        const audio=new Audio(url);
        audio_cache[id]=audio;
        console.log("new audio cache added");
    }else{console.log("loaded audio cache");}
    return audio_cache[id];
}