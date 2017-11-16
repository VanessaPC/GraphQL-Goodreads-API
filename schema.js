const fetch = require('node-fetch')
const util = require('util')
require('util.promisify').shim()
const parseXML = util.promisify(require('xml2js').parseString)

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} = require('graphql')


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: '...',

    fields: () => ({
        name: {
            type: GraphQLString,
        }
    })
})
module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '....',
    
        fields: () => ({
            author: {
                type: AuthorType,
                args: {
                    id: { type: GraphQLInt }
                },
                resolve: (root, args) => fetch(
                    `https://www.goodreads.com/author/show.xml?id=${args.id}&key=ZCYaT2kiTjM6VUkY7GxEDA`)
                    .then(response => response.txt())
                    .then(parseXML)
            }
        })
    })
})

