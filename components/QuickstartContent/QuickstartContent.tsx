import { GoChiContent } from './backend/go/chi'
import { GoFiberContent } from './backend/go/fiber'
import { GoGinContent } from './backend/go/gin'
import { GoGqlgenContent } from './backend/go/go-gqlgen'
import { GoMuxContent } from './backend/go/mux'
import { JSApolloContent } from './backend/js/apollo'
import { JSCloudflareContent } from './backend/js/cloudflare'
import { JSExpressContent } from './backend/js/express'
import { JSFirebaseContent } from './backend/js/firebase'
import { JSNodeContent } from './backend/js/nodejs'
import { JStRPCContent } from './backend/js/trpc'
import { PythonAWSContext } from './backend/python/aws'
import { PythonAzureContext } from './backend/python/azure'
import { PythonDjangoContext } from './backend/python/django'
import { PythonFastAPIContext } from './backend/python/fastapi'
import { PythonFlaskContext } from './backend/python/flask'
import { PythonGCPContext } from './backend/python/gcp'
import { PythonOtherContext } from './backend/python/other'
import { AngularContent } from './frontend/angular'
import { GatsbyContent } from './frontend/gatsby'
import { NextContent } from './frontend/next'
import { OtherContext } from './frontend/other'
import { ReactContent } from './frontend/react'
import { VueContent } from './frontend/vue'
import { DevDeploymentContent } from './self-host/dev-deploy'
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
  hidden?: true
}

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
  PythonFastAPI = 'python/fastapi',
  PythonOther = 'python/other',
  PythonAWSFn = 'python/aws-lambda',
  PythonAzureFn = 'python/azure-functions',
  PythonGCPFn = 'python/google-cloud-functions',
  GoGqlgen = 'go/qglgen',
  GoFiber = 'go/fiber',
  GoChi = 'go/chi',
  GoMux = 'go/mux',
  GoGin = 'go/gin',
  JSApollo = 'js/apollo',
  JSCloudflare = 'js/cloudflare',
  JSExpress = 'js/express',
  JSFirebase = 'js/firebase',
  JSNodejs = 'js/nodejs',
  JStRPC = 'js/trpc',
}

export const quickStartContent = {
  client: {
    [QuickStartType.Angular]: AngularContent,
    [QuickStartType.React]: ReactContent,
    [QuickStartType.Next]: NextContent,
    [QuickStartType.Vue]: VueContent,
    [QuickStartType.Gatsby]: GatsbyContent,
    [QuickStartType.Other]: OtherContext,
  },
  server: {
    python: {
      [QuickStartType.PythonFlask]: PythonFlaskContext,
      [QuickStartType.PythonDjango]: PythonDjangoContext,
      [QuickStartType.PythonFastAPI]: PythonFastAPIContext,
      [QuickStartType.PythonOther]: PythonOtherContext,
      [QuickStartType.PythonAWSFn]: PythonAWSContext,
      [QuickStartType.PythonAzureFn]: PythonAzureContext,
      [QuickStartType.PythonGCPFn]: PythonGCPContext,
    },
    go: {
      [QuickStartType.GoGqlgen]: GoGqlgenContent,
      [QuickStartType.GoFiber]: GoFiberContent,
      [QuickStartType.GoChi]: GoChiContent,
      [QuickStartType.GoMux]: GoMuxContent,
      [QuickStartType.GoGin]: GoGinContent,
    },
    js: {
      [QuickStartType.JSApollo]: JSApolloContent,
      [QuickStartType.JSCloudflare]: JSCloudflareContent,
      [QuickStartType.JSExpress]: JSExpressContent,
      [QuickStartType.JSFirebase]: JSFirebaseContent,
      [QuickStartType.JSNodejs]: JSNodeContent,
      [QuickStartType.JStRPC]: JStRPCContent,
    },
  },
  other: {
    [QuickStartType.SelfHost]: SelfHostContent,
    [QuickStartType.DevDeploy]: DevDeploymentContent,
  },
} as const
