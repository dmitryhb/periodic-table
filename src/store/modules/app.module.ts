import type { ActionTree, GetterTree, MutationTree } from 'vuex'
import {delay} from '@/lib/delay'
import {Element} from '@/lib/element'
import {IPlatform} from '@/lib/platform'

export interface IAppState {
  selectedCapabilities: string[],
  currentPlatform: IPlatform | null,
  currentElement: Element | null
}

const state: IAppState = {
  selectedCapabilities: [],
  currentPlatform: null,
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
  },

  /**
   * Set current platform.
   * @param state
   * @param platform
   */
  setCurrentPlatform (state: IAppState, platform: IPlatform | null): void {
    state.currentPlatform = platform
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
  },

  /**
   * Set current platform.
   * @param commit
   * @param platform
   */
  setCurrentPlatform ({ commit }, platform: IPlatform | null): void {
    commit('setCurrentPlatform', platform)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
