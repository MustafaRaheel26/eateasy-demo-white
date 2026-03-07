import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'quztwy52',
    dataset: 'production',
  },
  deployment: {
    /**
     * The appId from your deployed Studio.
     * Get it after running `sanity deploy` or from sanity.io/manage
     */
    appId: 'kitpejzy2jkj4zpsnsyzt4qp',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
