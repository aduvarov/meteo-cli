import { homedir } from 'os'
import { join } from 'path'
import { writeFile, readFile, stat } from 'fs/promises'

const config = join(homedir(), '.config', 'meteo-cli.json')

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
}

const saveKeyValue = async (key, value) => {
    let data = {}
    const mode = 0o600

    if (await isExist(config)) {
        const file = await readFile(config)
        data = JSON.parse(file)
    }

    data[key] = value
    await writeFile(config, JSON.stringify(data), { mode })
}

const getKeyValue = async key => {
    if (await isExist(config)) {
        const file = await readFile(config)
        const data = JSON.parse(file)
        return data[key]
    }
}

const isExist = async file => {
    try {
        await stat(file)
        return true
    } catch (error) {
        return false
    }
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }
