import { MenuItem } from '../models/menu.model'

export const findAllParent = (
  menuItems: MenuItem[],
  menuItem: MenuItem
): string[] => {
  let parents: string[] = []
  const parentKey = menuItem['parentKey']
  if (typeof parentKey === 'string') {
    const parent = findMenuItem(menuItems, parentKey)
    if (parent) {
      parents.push(parent['key']!)
      if (parent['parentKey'])
        parents = [...parents, ...findAllParent(menuItems, parent)]
    }
  }

  return parents
}

export const findMenuItem = (
  menuItems: MenuItem[] | undefined,
  menuItemKey: MenuItem['key'] | undefined
): MenuItem | null => {
  if (menuItems && menuItemKey) {
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i]
      }
      var found = findMenuItem(menuItems[i].subMenu, menuItemKey)
      if (found) return found
    }
  }
  return null
}
