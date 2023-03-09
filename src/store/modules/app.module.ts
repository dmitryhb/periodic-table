import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import {delay} from '@/lib/delay'
import {Element} from '@/lib/element'

export interface IAppState {
  selectedCapabilities: string[],
  currentElement: Element | null
}

const state: IAppState = {
  selectedCapabilities: [],
  currentElement: null
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
  },

  /**
   * Clear all selected capabilities.
   * @param state
   */
  clearSelectedCapabilities (state: IAppState): void {
    state.selectedCapabilities = []
  },

  /**
   * Set current element.
   * @param state
   * @param element
   */
  setCurrentElement (state: IAppState, element: Element | null): void {
    state.currentElement = element
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
  },

  /**
   * Clear selected capabilities.
   * @param commit
   */
  clearSelectedCapabilities ({ commit }): void {
    commit('clearSelectedCapabilities')
  },

  /**
   * Set current element.
   * @param commit
   * @param element
   */
  setCurrentElement ({ commit }, element: Element | null): void {
    commit('setCurrentElement', element)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
