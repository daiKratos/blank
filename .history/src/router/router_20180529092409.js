const isImportComponentModule = require(`./_import_${process.env.NODE_ENV}`)

const appRouter = [
  {
    path: '/',
    name: 'home',
    component: isImportComponentModule('dataTables/index')
  }
]
export const routes = [...appRouter]
