#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import {
    printHelp,
    printSuccess,
    printError,
    printWeather,
} from './services/log.service.js'
import {
    getKeyValue,
    saveKeyValue,
    TOKEN_DICTIONARY,
} from './services/storage.service.js'

const saveToken = async token => {
    if (!token.length) {
        printError('Не передан токен')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранён')
    } catch (error) {
        printError('saveToken(): ' + error.message)
    }
}

const saveCity = async city => {
    if (!city.length) {
        printError('Не передан город')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город сохранён')
    } catch (error) {
        printError('saveCity(): ' + error.message)
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
        const weather = await getWeather(city)
        printWeather(weather)
    } catch (error) {
        if (error?.response?.status == 404) {
            printError('Не верно указан город')
        } else if (error?.response?.status == 401) {
            printError('Неверно указан токен')
        } else {
            printError(error.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        // Вывод help
        printHelp()
    }
    if (args.s) {
        // Сохранить город
        saveCity(args.s)
    }
    if (args.t) {
        // Сохранить токен
        return saveToken(args.t)
    }
    getForcast()
}

initCLI()
