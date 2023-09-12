/*
    0.0.1.js - Schema for 0.0.1
 */

const Schema = {
    format: 'onetable:1.0.0',
    version: '0.0.1',
    indexes: {
        primary: {
            hash: 'pk',
            sort: 'sk',
            description: 'Primary index',
        },
    },
    models: {
        User: {
            pk:             { type: String, value: 'user#' },
            sk:             { type: String, value: 'user#${email}' },

            activity:       { type: Date },
            email:          { type: String, required: true },
            first:          { type: String },
            id:             { type: String, required: true, generate: 'ulid' },
            last:           { type: String },
        },
    },
    params: {
        isoDates: true,
        timestamps: true,
    },
}

export default Schema
