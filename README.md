![OneTable](https://www.sensedeep.com/images/ring-short.png?renew)

*One Table to Rule Them All*

# DynamoDB OneTable Migration Controller

This repository provides hosting of the [OneTable Migration Library](https://www.npmjs.com/package/onetable-migrate) for DynamoDB.

You should host the OneTable Migrate library (via this repo) so that it executes in the same AWS region and availablity zone as your DynamoDB instance. This will accelerate migrations by minimizing the I/O transfer time.

Use the [SenseDeep DynamoDB Developer Studio](https://www.sensedeep.com) for a graphical controller for your migrations which provides a complete DynamoDB developer environment with a powerful data browser, single-table designer, provisioning planner, table metrics and control of database migrations.

Use the [OneTable CLI](https://github.com/sensedeep/onetable-cli) for command line control of migrations.


## OneTable Migration Features

* Mutate database schema and contents via discrete, reversible migrations.
* Migrate upwards, downwards, to specific versions.
* Automated, ordered sequencing of migrations in both directions.
* Add and remove seed data in any migration.
* Quick reset of DynamoDB databases for development.
* Show database status and list applied migrations.
* Show outstanding migrations.
* Stored history of migrations.
* Persist migration history and the current OneTable schema in the table.
* Control by the SenseDeep DynamoDB Developer Studio GUI.
* No module dependencies other than OneTable.
* Works with AWS SDK v2 and v3

## Installation

```sh
git clone git@github.com:sensedeep/onetable-controller.git
```

## Modify

Modify to add migrations scripts under the `src/migrations` directory. See below for more details.

## Deploy

To promote to the cloud defined by your AWS_PROFILE and AWS_REGION.


```shell
make promote
```

## Creating Migrations

The `src/migrations` directory contains sub-directories for each DynamoDB table you wish to manage. There is one sample called `TestTable`. Rename this to the name of your table and copy this directory for other tables you may wish to manage.

When creating migrations, you need to modify the following files:

* index.js
* latest.js
* X.Y.Z.js
* schema/schema.X.Y.Z

Migrations are versioned using [SemVer](https://semver.org/) and reside in the top of the per-table directory. There is a 0.0.1.js sample to get you started. This contains:

```javascript
import schema from './schemas/schema.0.0.1.js'

export default {
    version: '0.0.1',
    description: 'Test migration 0.0.1',
    schema,

    async up(db, migrate) {
        console.log(`Up ${this.description}`)
    },

    async down(db, migrate) {
        console.log(`Down ${this.description}`)
    }
}
```

The `db` property is a OneTable Table instance. You can use it to interact with the DynamoDB table. See [OneTable Migrate](https://github.com/sensedeep/onetable-migrate) for samples.

If you add a new migration, say 0.0.1.js, add an entry to the list of migrations in `index.js`.

Each migration should have its own versioned schema that defines the data entities at that migration version level. The schemas live by default in the ./schemas directory.

The `latest.js` migration is a special dev migration that is used by the [SenseDeep](https://www.sensedeep.com) and the [OneTable CLI](https://github.com/sensedeep/onetable-cli) to "reset" the database to the latest schema and discard all prior data. It is useful when developing and you need to reset the database to a good known state.


## Directories and Files

### src

The src/controller.js is the Lambda function that hosts the [OneTable Migration Library](https://www.npmjs.com/package/onetable-migration).

### src/migrations

The migration directory contains an index.js which is the top-level index of migrations for various tables.

Under this directory are directories for the migration scripts for each DynamoDB Table.

### src/migrations/TestTable

This directory contains the sample migrations for a DynamoDB `TestTable`. It has one migration "0.0.1" and a "latest" migration.

This directory also contains a `schemas` directory for the corresponding OneTable schemas for each migration version.

See the [OneTable Migration documentation](https://www.npmjs.com/package/onetable-migration) for details of how to use the migration library.



### OneTable CLI

The OneTable CLI can control your migration lambda when operating in proxy mode by setting the `arn` of your migration Lambda.

#### Lambda Hosting

The Lambda function `src/controller.js` receives proxied commands from the [OneTable CLI](https://www.npmjs.com/package/onetable-cli) or from the [SenseDeep Serverless Developer Studio](https://www.ssensedeep.com).

SenseDeep and/or the OneTable CLI should be configured with the ARN of this Lambda function.

### References

- [OneTable](https://www.npmjs.com/package/dynamodb-onetable).
- [OneTable CLI](https://www.npmjs.com/package/onetable-cli).
- [OneTable Migrate Library](https://www.npmjs.com/package/onetable-migrate).
- [DocumentClient SDK Reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html).

### Participate

All feedback, contributions and bug reports are very welcome.

* [OneTable Migrate Issues](https://github.com/sensedeep/onetable-controller/issues)

### Contact

You can contact me (Michael O'Brien) on Twitter at: [@SenseDeepCloud](https://twitter.com/SenseDeepCloud), or [email](mob-pub-18@sensedeep.com) and ready my [Blog](https://www.sensedeep.com/blog).

### SenseDeep

Please try our Serverless trouble shooter [SenseDeep](https://www.sensedeep.com/).
