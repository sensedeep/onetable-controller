/*
    Test migration for 0.0.3
 */
import schema from '../schemas/schema.0.0.1.js'

export default {
    version: '0.0.3',
    description: 'Test migration 0.0.3',
    schema,

    async up(db, migrate, params) {
        console.log(`Up ${this.description}`)
    },

    async down(db, migrate, params) {
        console.log(`Down ${this.description}`)
    }
}
