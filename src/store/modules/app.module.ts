import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import {delay} from '@/lib/delay'

export interface IAppState {
}

const state: IAppState = {
}

const getters: GetterTree<IAppState, never> = {}

const mutations: MutationTree<IAppState> = {
  initApplication (): void {
  }
}

const actions: ActionTree<IAppState, never> = {
  async initApplication ({ commit }): Promise<void> {
    commit('initApplication')
    await delay(500)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
