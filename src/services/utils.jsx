export const storage = {
  uid: () => JSON.parse(window.localStorage.getItem('root'))?.uid,
  isAdmin: () => JSON.parse(window.localStorage.getItem('root')).isAdmin,
  setRoot: (payload) => window.localStorage.setItem('root', JSON.stringify(payload)),
  removeRoot: () =>  window.localStorage.removeItem('root')
}