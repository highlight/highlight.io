import { AngularContent } from './frontend/angular'
import { GatsbyContent } from './frontend/gatsby'
import { NextContent } from './frontend/next'
import { OtherContext } from './frontend/other'
import { ReactContent } from './frontend/react'
import { VueContent } from './frontend/vue'
import { SelfHostContent } from './self-host/self-host'

export type QuickStartContent = {
  subtitle: string
  entries: Array<QuickStartStep>
}

export type QuickStartStep = {
  title: string
  content: string
  code?: {
    text: string
    language: string
  }
}

// export type QuickStartType = "angular" | "react";;
export enum QuickStartType {
  Angular = 'angular',
  React = 'react',
  Next = 'next',
  Vue = 'vue',
  Gatsby = 'gatsby',
  SelfHost = 'self-host',
  Other = 'other',
}

export const quickStartContent: { [type in QuickStartType]: QuickStartContent } = {
  [QuickStartType.Angular]: AngularContent,
  [QuickStartType.SelfHost]: SelfHostContent,
  [QuickStartType.React]: ReactContent,
  [QuickStartType.Next]: NextContent,
  [QuickStartType.Vue]: VueContent,
  [QuickStartType.Gatsby]: GatsbyContent,
  [QuickStartType.Other]: OtherContext,
}
