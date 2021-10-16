![OneTable](https://www.sensedeep.com/images/ring-short.png?renew)

*One Table to Rule Them All*

# DynamoDB OneTable Migration Controller

This sample repository provides a sample hosting of the [DynamoDB OneTable Migration Library](https://www.npmjs.com/package/onetable-migrate).

Use the [OneTable CLI](https://github.com/sensedeep/onetable-cli) may be used to control migrations which are hosted and executed by this service.

Use the [SenseDeep DynamoDB Developer Studio](https://www.sensedeep.com) for a graphical controller for your migrations which provides a complete DynamoDB developer environment with a powerful data browser, single-table designer, provisioning planner, table metrics and control of database migrations.

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

## Deploy

To promote to the cloud defined by your AWS_PROFILE and AWS_REGION.


```shell
make promote
```

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

### Background

If you have large databases or complex migrations, you should host the OneTable Migrate library via AWS Lambda so that it executes in the same AWS region and availablity zone as your DynamoDB instance. This will accelerate migrations by minimizing the I/O transfer time.

This sample is a self-contained sample hosting of the OneTable Migration library for executing migrations in the cloud. It uses the serverless framework to create a Lambda proxy that responds to CLI and SenseDeep migration commands.

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
