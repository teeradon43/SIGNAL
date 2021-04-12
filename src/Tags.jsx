import React from 'react';
import './Tags.scss';

const TagsInput = props => {
	const [tags, setTags] = React.useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
    const checkSameTags = event => {
        for (var i = 0; i < tags.length; i++) {
            if (event.target.value === tags[i]) {
                return(null);
            }
        }
        addTags(event);
    }
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyUp={event => (event.key === "Enter" && tags.length < 6) ? checkSameTags(event) : null}
				placeholder="Press enter to add tags"
			/>
		</div>
	);
};

function TagsJSX() {
    const selectedTags = tags => {
		console.log(tags);
	};
	return (
		<div className="App">
			<TagsInput selectedTags={selectedTags}  tags={['Board Game', 'Party', 'Food']}/>
		</div>
	);   
}

export default TagsJSX;
