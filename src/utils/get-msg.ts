const getMsg = {
  add: (title: string) => `${title} Added`,
  update: (title: string) => `${title} Updated`,
  delete: (title: string) => `${title} Removed`,
  deleteConfirm: () => `Are you sure you want to remove? This action can not be undone.`
}

export default getMsg
