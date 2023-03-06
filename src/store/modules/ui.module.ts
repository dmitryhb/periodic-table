import type { ActionTree, GetterTree, MutationTree } from 'vuex'

export interface IUiState {
  isAppReady: boolean
}

const state: IUiState = {
  isAppReady: false
}

const getters: GetterTree<IUiState, never> = {}

const mutations: MutationTree<IUiState> = {
  /**
   * Set application ready state.
   * @param state
   * @param isReady
   */
  setAppReady (state: IUiState, isReady: boolean): void {
    state.isAppReady = isReady
  }
}

const actions: ActionTree<IUiState, never> = {
  setAppReady ({ commit }, isReady: boolean): void {
    commit('setAppReady', isReady)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
