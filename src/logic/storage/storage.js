export const saveItemStorage = (item, value) => {
    window.localStorage.setItem(item, JSON.stringify(value))
}

export const removeItemStorage = (item) => {
    window.localStorage.removeItem(item)
}

export const getItemStorage = (item) => {
    return JSON.parse(window.localStorage.getItem(item))
}