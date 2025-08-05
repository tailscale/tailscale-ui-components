import React from "react"

/**
 * A wrapper around React.lazy that triggers a preload of the import shortly
 * after the page has loaded. This preserves the benefit of lazy loading
 * (initial chunk is small) while hiding the loading latency from the user
 * if they navigate around.
 *
 * The wrapper should only be used for views that are commonly used, and the
 * preloading of which does not have significant side effects (e.g. network
 * requests or complex initialization).
 */
export default function lazyView<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  importers.push(importer)
  return React.lazy(importer)
}

const importers: (() => Promise<any>)[] = []
function preloadImporters() {
  for (const importer of importers) {
    importer()
  }
}

// TypeScript thinks that requestIdleCallback is always available, but it's
// still not implemented in WebKit.
if (window.requestIdleCallback) {
  window.requestIdleCallback(preloadImporters)
} else {
  // Wait for everything to load...
  window.addEventListener("load", () => {
    // ...and then 3 seconds more, to make sure we don't compete with any API
    // requests that might be kicked off by the page loading.
    setTimeout(preloadImporters, 3000)
  })
}
