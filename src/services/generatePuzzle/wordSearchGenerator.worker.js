import generateWordSearch from './WordSearchGenerator';

self.onmessage = ({data}) => {
    try {
        const result = generateWordSearch(...data);
        self.postMessage(result);
    } catch (error) {
        self.postMessage(false);
    };
    
};