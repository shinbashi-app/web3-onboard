---
title: Unstoppable Domains Resolution
---

# {$frontmatter.title}

A module to add Unstoppable Domain resolution to web3-onboard.

### Install

<Tabs values={['yarn', 'npm']}>
<TabPanel value="yarn">

```sh copy
yarn add @shinbashi/unstoppable-resolution
```

  </TabPanel>
  <TabPanel value="npm">

```sh copy
npm install @shinbashi/unstoppable-resolution
```

  </TabPanel>
</Tabs>

### Standalone Setup

```typescript
import Onboard from '@shinbashi/core'
import unstoppableResolution from '@shinbashi/unstoppable-resolution'

const onboard = Onboard({
  // ... other Onboard options
  unstoppableResolution
})
```

## Build Environments

For build env configurations and setups please see the Build Env section [here](/docs/modules/core#build-environments)
