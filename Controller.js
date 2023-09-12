/*
    OneTable Migration controller
*/
import {DynamoDBClient} from '@aws-sdk/client-dynamodb'
import SenseLogs from 'senselogs'
import {Migrate} from 'onetable-migrate'
import {Tables} from './tables/index.js'

/*
    One-time global config
*/
const profile = 'prod'
const client = new DynamoDBClient()
let log = new SenseLogs()

/*
    Lambda entry point
*/
exports.handler = async (event) => {
    let {cmd, args, config, dry} = event

    let module = Tables[config.name]
    if (!module) {
        throw new Error(`No migrations defined for ${config.name}`)
    }
    let migrations = `./tables/${module.migrations}`
    if (!migrations) {
        throw new Error(`No migrations directory configured for table ${config.name}`)
    }
    config.client = client
    config.senselogs = log
    // config.crypto = {crypto settings for onetable encrypted attributes}
    config.partial = true

    let params = {dir: migrations, dry, log, profile}
    let migrate = new Migrate(config, params)
    await migrate.init()

    let data
    switch (cmd) {
    case 'apply':
        let {action, version} = args
        data = await migrate.apply(action, version, params)
        break

    case 'getCurrentVersion':
        data = await migrate.getCurrentVersion()
        break

    case 'getNamedVersions':
        data = await migrate.getNamedVersions()
        break

    case 'getOutstandingVersions':
        data = await migrate.getOutstandingVersions()
        break

    case 'getOutstandingMigrations':
        data = await migrate.getOutstandingMigrations()
        break

    case 'getPastMigrations':
        data = await migrate.getPastMigrations()
        break

    case 'getPastVersions':
        data = await migrate.getPastVersions()
        break
    
    default:
        throw new Error(`Unknown migration action ${action}`)
    }
    return {
        body: data,
        statusCode: 200,
    }
}