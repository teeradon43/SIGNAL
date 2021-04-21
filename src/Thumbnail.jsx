import React, { Component } from 'react';
import { ReactComponent as LogoP } from './images/pictures.svg';

class Thumbnail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
        this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
              image: URL.createObjectURL(img)
            });
        }
    }

    render() {
        return (
            <div>
                <div>
                    <img src={this.state.image} style={{width: '150px', display: 'block', marginBottom: '20px', cursor: 'default', borderRadius: '4px'}}/>
                    <div style={{zIndex: 1, position: 'absolute'}}>
                        <label htmlFor='myPicture'> <LogoP style={{cursor: 'pointer', width: '30px', height: '30px'}}/> </label>
                        <input id='myPicture' type={'file'} style={{display: 'none'}} onChange={this.onImageChange}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Thumbnail;
