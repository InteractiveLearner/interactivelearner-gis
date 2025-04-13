---
title: Relational databases
description: Learn how relational databases can be used to store and manage spatial data.
author: Omar Kawach
order: 7
---

::: warning
Interactive examples are a work in progress for this page.
:::

# Relational databases in GIS

By {{ $frontmatter.author }}

[Relational databases](https://en.wikipedia.org/wiki/Relational_database) (RDBs) are commonly used in Geographic Information Systems (GIS) to efficiently manage, store, and retrieve vast volumes of spatial data (points, lines, and polygons), as well as associated attribute data such as feature names, kinds, and descriptions. These RDBs are sometimes referred to as "[spatial databases](https://en.wikipedia.org/wiki/Spatial_database)," and if they use a [geographic coordinate system](https://en.wikipedia.org/wiki/Geographic_coordinate_system), they may also be referred to as geographic databases or georeferenced spatial databases.

A RDB is a type of database management system that takes a structured approach to organizing and storing data in tables, with each table representing a certain type of information.

Spatial data are maintained in spatial tables while attribute data are stored in separate attribute tables. These tables are linked by a common field, typically a unique identifier, that connects spatial and attribute data.

RDBs also have a set of powerful data querying and analyzing capabilities, such as [SQL](https://en.wikipedia.org/wiki/SQL), which may be used to extract and manipulate specific subsets of data based on specific conditions.

RDBs, including spatial databases like [PostGIS](https://postgis.net/), can be integrated with GIS software to enable advanced spatial analysis and mapping activities. For example, a RDB can store massive volumes of spatial and attribute data, which can subsequently be queried and viewed using GIS tools like [GeoServer](https://geoserver.org/) or [QGIS](https://www.qgis.org/).

## Relationships between tables

### One-to-many relationship

A one-to-many relationship connects two tables, where one record in the first table acts as a "parent" and related records in the second table are its "children." For example, a RDB with two tables, a spatial data table containing polygon features and an attribute data table storing details about each polygon, forms a one-to-many relationship. The link between the two tables relies on a common field, usually a unique identifier or primary key in the first table, which appears as a foreign key in the second table. Both spatial and traditional relationships can be stored and queried together.

### Many-to-many relationship

A many-to-many relationship connects two tables where multiple records in one table relate to multiple records in the other. This relationship allows each record in one table to have multiple "parents" in the other table. For instance, a RDB with two tables for points of interest and categories can form a many-to-many relationship. To manage this relationship, a [junction table](https://en.wikipedia.org/wiki/Associative_entity) is used, which contains columns for unique identifiers from both tables. This relationship is useful in spatial databases for linking spatial features with multiple categories or attributes.

### One-to-one relationship

A one-to-one relationship is a relationship between two tables where each record in the first table is related to exactly one record in the second table. This means that each record in the first table is the "parent" of exactly one record in the second table, and each record in the second table is the "child" of exactly one record in the first table. This is useful in situations where each spatial feature only needs to be related to one set of attributes or where each set of attributes only needs to be related to one spatial feature, allowing for more efficient data storage and management.

## Entity relationship diagrams (ERD)

An entity relationship diagram (ERD) is a visual representation of the relationships between tables in a relational database.

## Relational algebra

Relational algebra is a formal approach to manipulating and accessing relational databases. It provides a collection of methods for extracting and manipulating data in relational databases. 

Relational algebra contains several fundamental operations, including selection, rename, projection, union, intersection, difference, join, and division. These methods can be combined to create more complicated searches that retrieve specific subsets of data from a relational database. 

## Terminology worth remembering

- **Attributes / fields / table columns**: Columns in a table which can be made up of different data types (e.g., text, number, date)
- **Domain**: The set of possible values for an attribute
- **Records / tuples**: Rows in a table
- **Sets**: A collection of unordered distinct values
- **Bags**: A collection of unordered values that may contain duplicates
- **Instance**: A single occurrence of an entity
- **Schema**: The blueprint of the database, including tables, attributes, constraints, keys, and relationships
- **Key**: An attribute in a table that uniquely identifies a record (e.g., two records cannot have the same value for the key attribute)
- **Primary key**: A unique identifier for each record in a table, used to link records in different tables.
- **Foreign key**: A field in a table that links to the primary key of another table, used to establish relationships between tables.

## Interaction

Coming soon.

## Test your knowledge

<Quiz :quiz-data="
    {
        questions: [
            {
            question: 'Can a spatial database have non-spatial relationships?',
            options: [
                {
                answer: 'Yes',
                key: 1
                },
                {
                answer: 'No',
                key: 2
                }
            ],
            correctAnswer: 1
            },
        ]
    }" 
/>

## Sources

<Sources 
  :sources="
    [{
        title: 'Section Five - What Are Relational Databases and Geodatabases',
        author: 'Learn GIS',
        url: 'https://vector.geospatial.science/textbook/chapter-four/what-are-relational-databases-and-geodatabases',
    },
    {
        title: 'Database Systems: The Complete Book',
        author: 'Hector Garcia-Molina, Jeffrey D. Ullman and Jennifer Widom',
        url: 'http://infolab.stanford.edu/~ullman/dscb.html',
    }]"
/>