import { assert } from 'chai'
import { createStore } from './index'

describe('createStore', () => {
    let store

    beforeEach(() => {
        store = createStore()
    })

    afterEach(() => {
        store = null
    })

    it('should create a store', () => { 
        assert.exists(store)
    })

    it('should allow to set value', () => {
        store.set('this', 'that')
        assert.equal(store.get('this'), 'that')
    })
})
