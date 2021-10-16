/*
    OneTable Migration controller
*/
import DynamoDB from 'aws-sdk/clients/dynamodb'
import SenseLogs from 'senselogs'
import {Migrate} from 'onetable-migrate'

/*
    Own migrations. This sample assumes
*/
import Migrations from './migrations/index'

/*
    One-time global config
*/
let client = new DynamoDB.DocumentClient()
let log = new SenseLogs()

/*
    Lambda entry point
*/
exports.handler = async (event, context) => {
    let {action, args, config} = event

    log.info(`Migrate command ${action}`, {event, config})

    //  The event.config provides the table name

    let migrations = Migrations[config.name]

    log.info(`Migrations for ${config.name}`, {migrations})

    if (!migrations) {
        throw new Error(`No migrations configured for table`)
    }
    config.client = client

    let migrate = new Migrate(config, {migrations})
    let data

    switch (action) {
    case 'apply':
        let {direction, version} = args
        let cmd = ['downgrade', 'reset', 'upgrade', 'repeat'][direction + 1]
        log.info(`Migrate ${cmd} ${version} "${action}"`)
        data = await migrate.apply(direction, version)
        break

    case 'getCurrentVersion':
        data = await migrate.getCurrentVersion()
        break

    case 'findPastMigrations':
        data = await migrate.findPastMigrations()
        break

    case 'getOutstandingVersions':
        data = await migrate.getOutstandingVersions()
        break

    case 'getOutstandingMigrations':
        data = await migrate.getOutstandingMigrations()
        break

    default:
        throw new Error(`Unknown migration action ${action}`)
    }
    return {
        body: data,
        statusCode: 200,
    }
}
