
//get figures from latest data
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
    const date = new Date()
    let month = date.getMonth() + 1
    let day = date.getDate() - 1
    if (day <= 9) {
      day = `0${day}`
    }
    if (month <= 9) {
      month = `0${month}`
    }
    
    const url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${month}-${day}-2020.csv`
    const _url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${month}-${day -1}-2020.csv`

    console.log({url})
    const response = await fetch(url)

  const body = await response.text()

    body.trim().split('\n').map((line, i) => {
      if (i === 0) {
        return
      }
      const [
        fips,
        admin2,
        province,
        country,
        timestamp,
        lat,
        long,
        confirmed,
        deaths,
        recovered,
        active,
        combined,
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
  const deathBattle = ((totals.recovered / totals.confirmed) - (totals.deaths/ totals.confirmed));
  const sickatHome = (totals.confirmed - totals.deaths - totals.recovered);
  
  //scale sphere add EventListener
  if (deathBattle < defaultValue) {
      console.log(1);
  } else {
      console.log(0);
  }
  

  
  figure.innerHTML = "confirmed " + totals.confirmed + "<br>" + "death " + totals.deaths + "<br>" + "recovered "  + totals.recovered + "<br>" + "sickatHome " + sickatHome +  "<br>" + deathBattle;
}



load()



