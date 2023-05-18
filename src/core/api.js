import axios from 'axios';
export class apilib{
host ='https://localhost:44366/api/'
async Get(url) {
    return axios
    .get(this.host + url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
    axios.get(this.host + url)
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error;
        });
}
Post(url, obj) {
    axios.post(this.host + url, obj)
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error;
        });
}
Delete (url, id) {
    axios.delete(this.host + url + id)
        .then((response) => {
            return response
        })
        .catch((error) => {
            return error;
        });
}
}