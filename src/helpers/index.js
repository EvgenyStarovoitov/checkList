import config from '../../config.json';

function convertDate(date) {
  const now = new Date(date).toLocaleDateString('ru', config.dateOptions);

  return now;
}

export { convertDate };
