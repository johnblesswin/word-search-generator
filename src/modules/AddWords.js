import React from 'react';
import { Input } from 'semantic-ui-react';

class AddWords extends React.Component {

  render() {
    return (
      <Input
        size='large'
        action={{ color: 'brown', labelPosition: 'right', icon: 'add square', content: 'Add' }}
        actionPosition='left'
        placeholder='New word...'
      />
    );
  }

}

export default AddWords;
