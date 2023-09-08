export const storage = {
  uid: JSON.parse(localStorage.getItem('root'))?.uid,
  auth: JSON.parse(localStorage.getItem('root'))?.auth,
  isAdmin: JSON.parse(localStorage.getItem('root'))?.isAdmin,
  setRoot: (payload) => localStorage.setItem('root', JSON.stringify(payload)),
  removeRoot: () =>  localStorage.removeItem('root')
}