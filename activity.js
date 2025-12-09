const query = require("samp-query");

const options = {
  host: '159.223.64.118',
  port: 7019
}

const stats = () => {
  return new Promise((resolve, reject) => {
    query(options, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

const convertTimestamp = (timestamp, fullTime=true, onlyDate=false, onlyTime=false) => {
  const date = new Date(timestamp * 1000);
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const dateNumb = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const dayname = days[date.getDay()];

  const formatTime = waktu => {
    if (waktu > 10) return waktu;
    else return `0${waktu}`;
  }

  let time = '';
  if (fullTime) {
    time = `${dayname}, ${formatTime(dateNumb)} ${month} ${year}, ${formatTime(hour)}:${formatTime(min)}:${formatTime(sec)}`;
  } else if (onlyDate) {
    time = `${dayname}, ${formatTime(dateNumb)} ${month} ${year}`;
  } else if (onlyTime) {
    time = `${formatTime(hour)}:${formatTime(min)}:${formatTime(sec)}`;
  }
    
  return time;
}

module.exports = { stats, convertTimestamp};
