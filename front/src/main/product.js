import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';
import {Typography, Button, CardMedia} from '@material-ui/core';
import Axios from '../components/Axios.js';

const styles = {
    media: {
        height: 140,
    },
};

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
        product: undefined
    }
  }
  

  componentDidMount(){
    Axios.request('get', '/products/id', {id: this.props.match.params.id}, res => {
        if (res.data === -1)
          alert("Error -1");
        else
            this.setState({product: res.data});
    });
  }

  render() {
    const {classes} = this.props;
    const {product} = this.state;

    return (
        <div>
            <Button component={Link} to='/products/' size="small" variant="contained" color="primary">
                Back
            </Button>
            {product && <div><Typography variant="h5" component="h2">
                {product.name}
            </Typography>
            <Typography variant="h5" component="h2">
                {product.price + '€'}
            </Typography>
            <Typography component="p">
                {product.description}
            </Typography>
            {product.pictures && product.pictures.map((picture, index) => {
                return (<CardMedia
                key={index}
                className={classes.media}
                image={picture}
                title="No picture"
                />)
            })}</div>}
        </div>
    );
  }
}

Product.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Product);