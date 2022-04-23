import {createLoader} from '@mdx-js/node-loader'

// Load is for Node 17+, the rest for 12-16.
const {load, getFormat, transformSource} = createLoader(/* Options… */)

export {load, getFormat, transformSource}