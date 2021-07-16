// /* eslint-disable class-methods-use-this */
// /* eslint-disable no-restricted-syntax */
// /* eslint-disable no-underscore-dangle */
// import cloneDeep from 'lodash.clonedeep'

// export class Immutable {
//   constructor(obj) {
//     this._state = cloneDeep(obj)
//   }

//   get state() {
//     return this._state
//   }

//   formatTypePayload(payload, stateWithKey) {
//     if (typeof payload === 'function') payload = payload(stateWithKey)
//     return payload
//   }

//   set(key, payload) {
//     if (typeof key !== 'string') throw new Error(`${key} not found in state`)
//     this._state[key] = this.formatTypePayload(payload, this._state[key])
//     return this
//   }

//   setIn(keys, payload) {
//     if (typeof keys === 'string') {
//       this.set(keys, payload)
//     } else if (Array.isArray(keys)) {
//       let state = this._state

//       for (const key of keys) {
//         if (typeof state[key] === 'undefined') throw new Error(`${key} not found in state`)

//         if (typeof state[key] === 'object' && !(keys[keys.length - 1] === key && typeof payload === 'object')) {
//           state = state[key]
//         } else {
//           if (typeof payload === 'object') Object.assign(state[key], this.formatTypePayload(payload, this._state[key]))
//           else {
//             state[key] = this.formatTypePayload(payload, state[key])
//           }
//           break
//         }
//       }
//     } else {
//       throw new Error(`${keys} is must array or string`)
//     }
//     return this
//   }

//   update(key, payload) {
//     if (typeof key !== 'string') throw new Error(`${key} not found in state`)
//     if (this._state[key] === undefined) throw new Error(`${key} not found in state`)

//     if (typeof payload === 'function') payload = payload(this._state[key])

//     this._state[key] = payload
//     return this
//   }

//   // updateIn(keys, payload) {
//   //   if (typeof keys === 'string') {
//   //     Object.assign(this._state[keys], payload)
//   //   } else if (Array.isArray(keys)) {
//   //     let state = this._state

//   //     for (const key of keys) {
//   //       if (typeof state[key] === 'undefined')
//   //         throw new Error(`${key} not found in state`)

//   //       if (
//   //         typeof state[key] === 'object' &&
//   //         !(keys[keys.length - 1] === key && typeof payload === 'object')
//   //       ) {
//   //         state = state[key]
//   //       } else {
//   //         if (typeof payload === 'object') Object.assign(state[key], payload)
//   //         else state[key] = payload
//   //         break
//   //       }
//   //     }
//   //   }
//   //   return this
//   // }
// }
