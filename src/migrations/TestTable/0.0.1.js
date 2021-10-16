/*
    Test migration for 0.0.1
 */
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
