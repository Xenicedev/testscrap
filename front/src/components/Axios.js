import axios from 'axios';
import {env} from '../config/env';

class Axios {
    static request(method, path, params, thenCallback){
        axios({
            baseURL: env.url_api,
            method: method,
            url: path,
            params: params,
            headers: {'x-authorization': env.token}
        }).then(res => {
            if (res.data === -2 || res.data === -4);
            else
                thenCallback(res);
        }).catch(error => {
        });
    }
}

export default Axios;