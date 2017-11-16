
const fetch = require('node-fetch')
const util = require('util')
//const xml2js = require('xml2js')
const parseXML = require('xml2js').parseString

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql')

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: '...',

    fields: () => ({
        title: {
            type: GraphQLString,
        },
        isbn: {
            type: GraphQLString
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: '...',

    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: xml =>
                xml.GoodreadsResponse.author[0].name[0]
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: xml => 
                xml.GoodreadsResponse.author[0].books[0]

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
                    .then(response => response.json())
                    .then(parseXML(xml, function (err, result) {
                        console.warn(xhr.responseText)
                        console.dir(result);
                    }))
            }
        })
    })
})
