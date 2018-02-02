const sample = ['rainy', 'snow', 'sunny', 'wind', 'chilly', 'freezing', 'skiing', 'chinchilla', 'hamster', 'rabbit', 'honeymoon',
'magazine', 'newspaper', 'computer', 'jarring', 'petulence', 'comparison', 'mismatching', 'scarcity', 'obesity', 'masterrace', 'serfdom',
'sorcerer', 'magic', 'wand', 'spell', 'deatheater', 'wizard', 'dreaming', 'planet', 'wolverine', 'collapsing', 'mountains', 'minstrel',
'galaxy'].map(word => ({
    word,
    isValid: true,
    warnings: {
        invalidChars: false,
        maxLengthExceeded: false
    }
}));

export default sample;