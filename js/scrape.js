
const split = b => {
  const matches = b.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g);
  if (!matches) {
    return b.split(',');
  }
  for (let n = 0; n < matches.length; ++n) {
      matches[n] = matches[n].trim();
      if (matches[n] == ',') matches[n] = '';
  }
  if (b[0] === ',') matches.unshift("");
  return matches;
}

const load = async () => {
  const totals = {
    recovered: 0,
    deaths: 0,
    confirmed: 0,
  }

  try {
    const response = await fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-21-2020.csv')

	const body = await response.text()

    body.trim().split('\n').map((line, i) => {
      if (i === 0) {
        return
      }

      const [
        province,
        country,
        timestamp,
        confirmed,
        deaths,
        recovered,
        latitude,
        longitude
      ] = split(line)

      totals.confirmed += parseInt(confirmed, 10)
      totals.deaths += parseInt(deaths, 10)
      totals.recovered += parseInt(recovered, 10)
    })

  
  } catch(e) {
    document.body.innerHTML = e
  }
  const defaultValue = -1;
  const deathRatio = (totals.confirmed / totals.deaths);
  const deathBattle = ((totals.deaths / totals.confirmed) - (totals.recovered/ totals.confirmed));
  const sickatHome = (totals.confirmed - totals.deaths - totals.recovered);
  
  //scale sphere add EventListener
  if (deathBattle < defaultValue) {
      console.log(1);
  }else {
      console.log(0);
  }
  

  
  document.id=figure.innerHTML = "confirmed " + totals.confirmed + "<br>" + "death " + totals.deaths + "<br>" + "recovered "  + totals.recovered + "<br>" + "sickatHome " + sickatHome ;
}



load()

