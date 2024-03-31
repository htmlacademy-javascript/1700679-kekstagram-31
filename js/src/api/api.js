const baseURL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const routs = {GET_DATA: '/data', SEND_DATA: ''};
const methods = {GET : 'GET', POST : 'POST'};
const loadData = (route, method = methods.GET, body = null) =>
  fetch(`${baseURL}${route}`, {method, body}).then((response) => {
    if(!response.ok) {
      throw new Error('Проблемы с запроосом');
    }
    return response.json();
  });

export const getData = async () => await loadData(routs.GET_DATA);

export const sendData = async (body) => await loadData(routs.SEND_DATA, methods.POST, body);


