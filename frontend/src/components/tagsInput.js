import React from 'react';

const TagsInput = ({ tags, activeButton, addTag }) => (
    <div className='tags'>
        {Object.entries(tags)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([tag, name]) => (
                <div key={tag} className='tag'>
                    <button
                        type="button"
                        className='tagButton'
                        onClick={() => { addTag(name); }}
                        style={{ backgroundColor: activeButton[name] ? 'black' : 'grey' }}
                    >
                        {name}
                    </button>
                </div>
            ))
        }
    </div>
);

export default TagsInput;
