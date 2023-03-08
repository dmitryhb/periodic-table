import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import {delay} from '@/lib/delay'

export interface IAppState {
  selectedCapabilities: string[]
}

const state: IAppState = {
  selectedCapabilities: []
}

const getters: GetterTree<IAppState, never> = {}

const mutations: MutationTree<IAppState> = {
  /**
   * Initialize application.
   */
  initApplication (): void {},

  /**
   * Sets on/off given capability ID.
   * @param state
   * @param capabilityId
   */
  toggleSelectedCapability (state: IAppState, capabilityId: string): void {
    if (state.selectedCapabilities.includes(capabilityId)) {
      state.selectedCapabilities = state.selectedCapabilities.filter((item: string) => item !== capabilityId)
    } else {
      state.selectedCapabilities.push(capabilityId)
    }
  }
}

const actions: ActionTree<IAppState, never> = {
  /**
   * Initialize application.
   * @param commit
   */
  async initApplication ({ commit }): Promise<void> {
    commit('initApplication')
    await delay(500)
  },

  /**
   * Sets on/off given capability ID.
   * @param commit
   * @param capabilityId
   */
  toggleSelectedCapability ({ commit }, capabilityId: string): void {
    commit('toggleSelectedCapability', capabilityId)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
