const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async (
  { actions: { createNode }, node, createContentDigest, store, cache },
  { filter, nodeName = `localFile` }
) => {
  if (filter(node)) {
    // Doesn't appear to cache and use it as expected?
    let fileNodeID
    const remoteDataCacheKey = `remote-image-${node.image_id}`
    const cacheRemoteData = await cache.get(remoteDataCacheKey)

    if (cacheRemoteData) {
      fileNodeID = cacheRemoteData.fileNodeID // eslint-disable-line prefer-destructuring
      touchNode({ nodeId: cacheRemoteData.fileNodeID })
    }

    if (!fileNodeID) {
    try {
      const fileNode = await createRemoteFileNode({
        url: node.url,
        store,
        cache,
        createNode,
        createNodeId: createContentDigest,
      })

      if (fileNode) {
        fileNodeID = fileNode.id

        await cache.set(remoteDataCacheKey, { fileNodeID })
      }
    }  catch (err) {
      // Ignore
      console.log("Oh no! Something went wrong!!!! :(")
    }
  }

    if (fileNodeID) {
      const fileNodeLink = `${nodeName}___NODE`
      node[fileNodeLink] = fileNodeID
    }
  }
}
