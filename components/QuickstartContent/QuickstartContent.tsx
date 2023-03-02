import { AngularContent } from './frontend/angular'
import { GatsbyContent } from './frontend/gatsby'
import { NextContent } from './frontend/next'
import { OtherContext } from './frontend/other'
import { ReactContent } from './frontend/react'
import { VueContent } from './frontend/vue'
import { DevDeploymentContent } from './self-host/dev-deploy'
import { SelfHostContent } from './self-host/self-host'
import { FlaskContext, PythonFlaskContext } from './backend/python/flask'
import { PythonDjangoContext } from './backend/python/django'
import { PythonOtherContext } from './backend/python/other'
import { PythonAWSContext } from './backend/python/aws'
import { PythonGCPContext } from './backend/python/gcp'
import { PythonAzureContext } from './backend/python/azure'

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
  DevDeploy = 'dev-deploy',
  Other = 'other',
  PythonFlask = 'python/flask',
  PythonDjango = 'python/django',
  PythonOther = 'python/other',
  PythonAWSFn = 'python/aws-lambda',
  PythonAzureFn = 'python/azure-functions',
  PythonGCPFn = 'python/google-cloud-functions',
}

export const quickStartContent: { [type in QuickStartType]: QuickStartContent } = {
  [QuickStartType.Angular]: AngularContent,
  [QuickStartType.SelfHost]: SelfHostContent,
  [QuickStartType.React]: ReactContent,
  [QuickStartType.Next]: NextContent,
  [QuickStartType.Vue]: VueContent,
  [QuickStartType.DevDeploy]: DevDeploymentContent,
  [QuickStartType.Gatsby]: GatsbyContent,
  [QuickStartType.Other]: OtherContext,
  [QuickStartType.PythonFlask]: PythonFlaskContext,
  [QuickStartType.PythonDjango]: PythonDjangoContext,
  [QuickStartType.PythonOther]: PythonOtherContext,
  [QuickStartType.PythonAWSFn]: PythonAWSContext,
  [QuickStartType.PythonAzureFn]: PythonAzureContext,
  [QuickStartType.PythonGCPFn]: PythonGCPContext,
}
