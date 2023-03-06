import Vuex from 'vuex'
import ui from './modules/ui.module'
import app from './modules/app.module'
import data from './modules/data.module'

export default new Vuex.Store({
  modules: {
    ui,
    app,
    data
  }
})
