#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printSuccess, printError } from './services/log.service.js'
import { saveKeyValue } from './services/storage.service.js'

const saveToken = async token => {
    try {
        await saveKeyValue('token', token)
        printSuccess('Токен сохранён')
    } catch (error) {
        printError('saveToken(): ' + error.message)
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
    }
    if (args.t) {
        // Сохранить токен
        return saveToken(args.t)
    }
    // Вывести погоду
}

initCLI()
