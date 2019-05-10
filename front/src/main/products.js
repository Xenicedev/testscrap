import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import {Typography, Button, CardMedia, CardContent, CardActions, CardActionArea, Card} from '@material-ui/core';
import Axios from '../components/Axios.js';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
        products: []
    }
  }
  
  refreshData() {
    Axios.request('get', '/products', {}, res => {
        if (res.data === -1)
          alert("Error -1");
        else
            this.setState({products: res.data});
    });
  }

  componentDidMount(){
      this.refreshData();
  }

  scrap = () => {
    Axios.request('post', '/leboncoin1', {}, res => {
        if (res.data === -1)
          alert("Error -1");
        else
            this.refreshData();
    });
  }

  render() {
    const {classes} = this.props;
    const {products} = this.state;

    return (
        <div>
            <Button onClick={this.scrap} size="small" variant="contained" color="primary">
                "Scrap"
            </Button>
            {products && products.map(product => {
                return(<Card className={classes.card} key={product._id}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={product.pictures ? product.pictures[0] : ''}
                        title="No picture"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {product.name}
                            </Typography>
                            <Typography component="p">
                                {product.description.substring(0, 50)}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button component={Link} to={'/product/' + product._id} size="small" variant="contained" color="primary">
                        More
                        </Button>
                    </CardActions>
                </Card>)
            })}
        </div>
    );
  }
}

Products.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Products);