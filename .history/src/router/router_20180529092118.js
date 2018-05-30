const isImportComponentModule = require(`./_import_${process.env.NODE_ENV}`)

const appRouter = [
  {
    path: '/',
    name: 'home',
    component: isImportComponentModule('dataTables/index')
  },
  {
    path: '/about',
    name: 'about',
    component: isImportComponentModule('About')
  }
]
export const routes = [...appRouter]
