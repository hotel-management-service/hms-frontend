import router from '@/router'
import authInstance from '@/util/auth'

export default {
  namespaced: true,
  state: {
    error: {},
    review: {}
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
    },
    setReviewForm (state, payload) {
      state.review = payload
    }
  },
  actions: {
    async doReview ({ commit, state }, id) {
      let review = await authInstance.post('/review/', { ...state.review, booking_id: id })

      if (review.error) {
        commit('setError', {
          ...review.error
        })
      }

      if (!review.error) {
        commit('setReviewForm', {})
        commit('setError', {})
        router.push('/review')
      }
    }
  },
  getters: {}
}
