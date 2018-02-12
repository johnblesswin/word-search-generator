import React from 'react';

class WordBox extends React.Component {

  render() {
        return (
            <div className="printable__word-box">
                {this.props.words.map(word => 
                    <span
                        className="printable__word-box--word"
                        key={word}
                    >
                        {word}
                    </span>
                )}
            </div>
        );
  }

}

export default WordBox;
