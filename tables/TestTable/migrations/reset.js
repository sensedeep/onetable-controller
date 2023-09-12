/*
    Test migration for 0.0.1
 */
import schema from '../schemas/schema.0.0.1.js'

export default {
    version: 'latest',
    description: 'Database reset to latest version',
    schema,

    async up(db, migrate, params) {
        console.log(`Up ${this.description}`)
    },

    async down(db, migrate, params) {
        console.log(`Down ${this.description}`)
    }
}
