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
            console.log(this.state.image)
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <label htmlFor='myPicture' style={{ display: 'flex' }}>
                            <LogoP style={{cursor: 'pointer', width: '30px', height: '30px'}} />
                            <h4 style={{ marginLeft: '1vw' }}> Thumbnail </h4>
                        </label>
                        <input id='myPicture' name='img' type={'file'} style={{display: 'none'}} onChange={this.onImageChange}/>
                    </div>
                    <img src={this.state.image} style={{width: '10vw', cursor: 'default', borderRadius: '4px', marginTop: '10px', marginBottom: '20px'}}/>
                </div>
            </div>
        );
    }
}

export default Thumbnail;
