import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = error => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}

const printSuccess = message => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

const printHelp = () => {
    console.log(
        dedent(`${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -t [API_KEY] для сохранения токена
        -h для вывода помощи
        `)
    )
}

const printWeather = res => {
    console.log(
        dedent(`${chalk.bgYellow(' Погода ')} в городе 
        ${chalk.bgYellow(res.weather[0].description)} ${res.name}
        Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
        Влажность: ${res.main.humidity}%
        Ветер: ${res.wind.speed}
        `)
    )
}

export { printError, printSuccess, printHelp, printWeather }
