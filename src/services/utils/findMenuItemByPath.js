export function findMenuItemByPath(
  items,
  path,
  currentPath = ""
) {
  for (const item of items) {
    const itemPath = item.route ? `${currentPath}${item.route}` : currentPath;
    if (itemPath === `/${path.join("/")}`) {
      return item;
    }

    if (item.child && item.child.length > 0) {
      const found = findMenuItemByPath(item.child, path, itemPath);
      if (found) return found;
    }
  }

  return null;
}