const fixURL = string => {return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(' ').join('-').toLocaleLowerCase().replace(/[^a-zA-Z0-9-_]/g, '')};
export default fixURL;