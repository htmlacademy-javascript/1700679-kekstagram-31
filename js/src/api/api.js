const baseURL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const routes = {GET_DATA: '/data', SEND_DATA: ''};
const loadData = (route, method = 'GET', body = null) =>
  fetch(`${baseURL}${route}`, {method, body}).then((response) => {
    if(!response.ok) {
      throw new Error('Problems with response');
    }
    return response.json();
  });

const getData = async () => await loadData(routes.GET_DATA);

const sendData = async (body) => await loadData(routes.SEND_DATA, 'POST', body);

export { getData, sendData };
